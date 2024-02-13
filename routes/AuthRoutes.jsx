import { Navigate, Outlet } from "react-router-dom";
import useStore from "../Context";
// import { Suspense } from "react";
const AuthRoutes = () => {
  const { user } = useStore();

  // Suspense fallback for lazy loading
  return user ? <Outlet /> : <Navigate to="/login" />;
};
export default AuthRoutes;
