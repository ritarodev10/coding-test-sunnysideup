import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

type Props = {};

const Layout = (props: Props) => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
