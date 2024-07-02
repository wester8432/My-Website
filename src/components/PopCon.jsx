import { useState } from "react";

const PopCon = ({ setPopState, setIsAdmin }) => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ errorState: false, errorMessage: "" });
  let admin = { account: "wester8432", password: "asdwzx8432" };
  const closePopCon = () => {
    setPopState(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const Login = () => {
    setError({ errorState: false, errorMessage: "" });
    if (account === "") {
      setError({ errorState: true, errorMessage: "帳號不可為空" });
      return;
    }
    if (password === "") {
      setError({ errorState: true, errorMessage: "密碼不可為空" });
      return;
    }
    if (account !== admin.account || password !== admin.password) {
      setError({ errorState: true, errorMessage: "帳號或密碼錯誤" });
      return;
    }
    if (password == admin.account && password == admin.password) {
      setIsAdmin(true);
    }
    setIsAdmin(true);
    setPopState(false);
  };

  return (
    <div
      onClick={closePopCon}
      className="z-20 fixed flex justify-center items-center bg-[#ffffff3a] w-svw h-svh"
    >
      {/** */}
      <div
        onClick={stopPropagation}
        className=" bg-slate-300 dark:bg-slate-900  min-w-[400px] z-30 flex justify-center rounded-md shadow-xl py-4"
      >
        <div className=" max-w-[300px] ">
          <p className=" py-4 w-full">管理員登入</p>
          <div className="flex justify-center pb-4 w-full gap-4">
            <label htmlFor="account pr-4">帳號:</label>
            <input
              id="account"
              type="text"
              name="account"
              onChange={(event) => {
                setAccount(event.target.value);
              }}
            />
          </div>
          <div className="flex justify-center pb-4 w-full gap-4">
            <label htmlFor="password">密碼:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          {error.errorState && (
            <div className="pb-4 text-red-500">{error.errorMessage}</div>
          )}

          <div className=" flex justify-end gap-4">
            <button
              onClick={() => {
                setPopState(false);
              }}
              className=" bg-red-500 rounded-md"
            >
              取消
            </button>
            <button onClick={Login} className=" bg-sky-600 rounded-md">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopCon;
