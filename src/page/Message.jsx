import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageAction } from "../store/message-slice";
import { IoMdClose } from "react-icons/io";
import { sendMessage, fetchMessage } from "../store/message-action";
import ReCAPTCHA from "react-google-recaptcha";
import IsLoading from "../components/IsLoading";
const Message = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const message = useSelector((state) => state.message.message);
  const [isLoading, setIsLoading] = useState(true);

  const [captchaToken, setCaptchaToken] = useState("");
  const recaptchaRef = useRef();

  const submit = async () => {
    setErrorMessage("");
    if (name === "") {
      setErrorMessage("請輸入名稱");
      return;
    }
    if (content === "") {
      setErrorMessage("訊息不可為空");
      return;
    }
    if (captchaToken === "") {
      setErrorMessage("請完成驗證");
      return;
    }

    try {
      const isValid = await verifyCaptcha(captchaToken); // 验证 captchaToken
      console.log({ isValid: isValid });
      if (isValid) {
        setErrorMessage("驗證失敗");
        return;
      }

      const currentTime = new Date().toLocaleString();
      dispatch(
        messageAction.AddMessage({
          name: name,
          message: content,
          date: currentTime,
        })
      );
    } catch (error) {
      console.log({ error: error });
    }

    setCaptchaToken("");
    setName("");
    setContent("");
    recaptchaRef.current.reset();
  };

  const verifyCaptcha = async (token) => {
    const proxyUrl = "https://cors.eu.org/";

    const formData = new FormData();
    formData.append("token", token);

    const uriGAS = `${proxyUrl}https://script.google.com/macros/s/AKfycbw0mUPQ_BdqOtzZE1rk-k9_VORz5blH1aUFFGinjjkVjssRQoXb8tNk3FehhzvNybVq/exec`;

    try {
      const response = await fetch(uriGAS, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        // 成功後執行
      } else {
        window.alert(result["error-codes"][0]);
      }
    } catch (err) {
      window.alert(err);
    }
  };

  const deleteMessage = (id) => {
    dispatch(messageAction.DeleteMessage(id));
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchMessage());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(sendMessage(message));
    setIsLoading(false);
  }, [message, dispatch]);
  return (
    <div className="  w-full pt-8 flex flex-wrap ">
      {isLoading ? (
        <IsLoading text="Is Loading..." />
      ) : (
        <ul className="w-full">
          {message.length > 0 ? (
            message.map((item) => (
              <li
                key={item.id}
                className=" flex flex-wrap justify-center w-full pb-8 "
              >
                <div className="w-3/4 bg-slate-200 dark:bg-slate-600 flex flex-wrap text-start rounded-md p-4 relative break-all">
                  <div className="w-full flex-1 pb-4">名稱: {item.name}</div>
                  <div className="w-full py-4 flex justify-between">
                    訊息: {item.message}
                    <span className=" absolute bottom-2 right-5 text-sm">
                      {item.date}
                    </span>
                  </div>
                  {isAdmin && (
                    <IoMdClose
                      size={20}
                      className=" absolute top-2 right-2"
                      onClick={() => deleteMessage(item.id)}
                    />
                  )}
                </div>
              </li>
            ))
          ) : (
            <li>暫時沒有留言</li>
          )}
        </ul>
      )}

      <div className="w-full flex flex-wrap justify-center pt-8  ">
        <div className="w-3/4 flex justify-center pb-8">
          <p className="  pr-8  whitespace-nowrap">請輸入名稱</p>
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-md border-[2px]"
            onChange={(event) => {
              setName(event.target.value);
            }}
            value={name}
          />
        </div>

        <div className="w-3/4 flex whitespace-nowrap pb-8 ">
          <p className="  pr-8">請輸入訊息</p>
          <textarea
            placeholder="Message"
            className="w-full h-32 resize-none rounded-md border-[2px]"
            onChange={(event) => {
              setContent(event.target.value);
            }}
            value={content}
          />
        </div>
        {errorMessage && (
          <div className=" text-red-500 w-full">{errorMessage}</div>
        )}
        <div className="w-3/4 justify-end flex items-center mb-8">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LeszwoqAAAAANwuvTIjycLQNeFqm-DVw6goLHQP"
            onChange={(token) => setCaptchaToken(token)}
          />
          <button
            onClick={submit}
            className=" bg-sky-500 rounded-md w-12 h-10 ml-8 hover:bg-sky-600"
          >
            送出
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
