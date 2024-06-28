import { Outlet } from "react-router";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <>
      <div className=" sticky top-0">
        <NavBar />
      </div>
      <Outlet />
      <div className=" text-center bg-black text-white">
        Create by N1ro Chen
      </div>
    </>
  );
};

export default Layout;
