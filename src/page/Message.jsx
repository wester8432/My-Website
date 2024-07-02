import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageAction } from "../store/message-slice";
import { IoMdClose } from "react-icons/io";
import { sendMessage, fetchMessage } from "../store/message-action";

const Message = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const message = useSelector((state) => state.message.message);

  const submit = () => {
    setErrorMessage("");
    if (name === "") {
      setErrorMessage("請輸入名稱");
      return;
    }
    if (content === "") {
      setErrorMessage("訊息不可為空");
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

    setName("");
    setContent("");
  };

  const deleteMessage = (id) => {
    dispatch(messageAction.DeleteMessage(id));
  };

  useEffect(() => {
    dispatch(fetchMessage());
  }, [dispatch]);

  useEffect(() => {
    dispatch(sendMessage(message));
  }, [message, dispatch]);
  console.log(isAdmin);
  return (
    <div className="  w-full pt-8 flex flex-wrap ">
      <ul className="w-full">
        {message.length > 0 ? (
          message.map((item) => (
            <li
              key={item.id}
              className=" flex flex-wrap justify-center w-full pb-8 "
            >
              <div className="w-3/4 bg-slate-200 dark:bg-slate-600 flex flex-wrap text-start rounded-md p-4 relative">
                <div className="w-full flex-1 pb-4">名稱: {item.name}</div>
                <div className="w-full pt-4 flex justify-between">
                  訊息: {item.message}
                  <span>{item.date}</span>
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
          <li className=" ">暫時沒有留言</li>
        )}
      </ul>

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
        <div className="w-3/4 justify-end flex">
          <button
            onClick={submit}
            className=" bg-sky-500 rounded-md w-12 hover:bg-sky-600"
          >
            送出
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;
