import { Navigate, Outlet } from "react-router-dom";
import useStore from "../Context";
import { Suspense } from "react";

const AuthRoutes = () => {
  const { user } = useStore();

  // Suspense fallback for lazy loading
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {user ? <Outlet /> : <Navigate to="/login" />}
    </Suspense>
  );
};
export default AuthRoutes;
