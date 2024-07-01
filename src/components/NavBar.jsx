import { NavLink } from "react-router-dom";
import PlayBar from "./PlayBar";
const NavBar = ({ setPopState }) => {
  return (
    <>
      <PlayBar />
      <nav className=" bg-black h-10  flex items-center justify-center relative">
        <div>
          <ul className="flex gap-4 text-white ">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-yellow-500" : ""
                }
                end
              >
                關於我
              </NavLink>
            </li>
            <li>
              <NavLink>作品集</NavLink>
            </li>
            <li>
              <NavLink to="/message">留言板</NavLink>
            </li>
            <li
              onClick={() => {
                setPopState(true);
              }}
              className=" absolute right-0 pr-8 cursor-pointer"
            >
              管理員登入
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
