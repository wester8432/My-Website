import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <>
      <div className=" sticky top-0  z-10">
        <NavBar />
      </div>

      <div className=" min-h-svh bg-slate-900">
        <Outlet />
      </div>

      <div className=" text-center bg-black text-white">
        Create by N1ro Chen
      </div>
    </>
  );
};

export default Layout;
