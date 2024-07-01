import { useState } from "react";

const PopCon = ({ setPopState }) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  let admin = { accound: "wester8432", password: "aasdwzx8432" };
  const closePopCon = () => {
    setPopState(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const confirm = () => {};

  return (
    <div
      onClick={closePopCon}
      className="z-20 fixed flex justify-center items-center bg-[#ffffff3a] w-svw h-svh"
    >
      {/** */}
      <div
        onClick={stopPropagation}
        className=" bg-slate-900 text-white min-w-[400px] z-30 flex justify-center rounded-md shadow-xl py-4"
      >
        <div className=" max-w-[300px] ">
          <p className=" py-4 w-full">管理員登入</p>
          <div className="flex justify-center pb-4 w-full">
            <label htmlFor="account">帳號:</label>
            <input
              id="account"
              type="text"
              name="account"
              onChange={(event) => {
                setAccount(event.target.value);
              }}
            />
          </div>
          <div className="flex justify-center pb-4 w-full">
            <label htmlFor="password">密碼:</label>
            <input
              type="text"
              id="password"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>

          <div className=" flex justify-end gap-4">
            <button
              onClick={() => {
                setPopState(false);
              }}
              className=" bg-red-500 rounded-md"
            >
              取消
            </button>
            <button className=" bg-sky-600 rounded-md">確認</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopCon;
