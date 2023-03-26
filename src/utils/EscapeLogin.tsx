import { Navigate, Outlet } from "react-router-dom";
import { FC } from "react";

const EscapeLogin: FC = () => {
  const loggedInUser = localStorage.getItem("token");

  return loggedInUser ? <Navigate to="/" /> : <Outlet />;
};

export default EscapeLogin;
