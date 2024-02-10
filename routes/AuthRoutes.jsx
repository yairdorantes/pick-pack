import { Navigate, Outlet } from "react-router-dom";
import useStore from "../Context";

const AuthRoutes = () => {
  const { user } = useStore();
  return user ? <Outlet /> : <Navigate to="/login" />;
};
export default AuthRoutes;
