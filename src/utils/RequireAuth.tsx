import { useLocation, Navigate, Outlet } from "react-router-dom";

type Props = {};

const RequireAuth: React.FC<Props> = () => {
  const location = useLocation();
  const loggedInUser = localStorage.getItem("token");

  const isLogin = loggedInUser ? true : false;

  return !isLogin ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default RequireAuth;
