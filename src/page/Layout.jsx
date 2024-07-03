import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const Layout = ({ setPopState, isAdmin, setIsAdmin }) => {
  return (
    <>
      <div className="min-h-svh flex flex-col">
        <div className=" sticky top-0  z-10">
          <NavBar
            setPopState={setPopState}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
          />
        </div>

        <div className="flex-grow  dark:bg-slate-900">
          <Outlet />
        </div>

        <div className=" text-center bg-slate-300 dark:bg-black">
          Create by N1ro Chen
        </div>
      </div>
    </>
  );
};

export default Layout;
