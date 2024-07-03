import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PlayBar from "./PlayBar";
import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";

const NavBar = ({ setPopState, isAdmin, setIsAdmin }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <>
      <PlayBar />
      <nav className=" bg-slate-300 dark:bg-black h-10  flex items-center justify-center relative">
        <div>
          <ul className="flex gap-4  ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? " text-[#1495d6] dark:text-yellow-500" : ""
                }
                end
              >
                關於我
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Portfolio"
                className={({ isActive }) =>
                  isActive ? " text-[#1495d6] dark:text-yellow-500" : ""
                }
              >
                作品集
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/message"
                className={({ isActive }) =>
                  isActive ? " text-[#1495d6] dark:text-yellow-500" : ""
                }
              >
                留言板
              </NavLink>
            </li>
            <li className=" absolute right-0 pr-8 cursor-pointer flex">
              <div className="pr-4" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <CiLight size={25} /> : <CiDark size={25} />}
              </div>
              {isAdmin ? (
                <div
                  onClick={() => {
                    setIsAdmin(false);
                  }}
                >
                  登出
                </div>
              ) : (
                <div
                  onClick={() => {
                    setPopState(true);
                  }}
                >
                  管理員登入
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
