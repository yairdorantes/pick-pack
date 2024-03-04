import { Navigate, Outlet } from "react-router-dom";
import useStore from "../Context";
// import { Suspense } from "react";
const AuthRoutes = () => {
  const { user } = useStore();

  if (user) {
    if (user.id == "kk") {
      return <Navigate to="/pickup" />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to="/login" />;
  }
  // Suspense fallback for lazy loading
};
export default AuthRoutes;
