import { Navigate, Outlet } from "react-router-dom";
import useStore from "../Context";
import { Suspense } from "react";
import logo from "/oms.png";
const AuthRoutes = () => {
  const { user } = useStore();

  // Suspense fallback for lazy loading
  return (
    <Suspense
      fallback={
        <div className="fixed w-full animate-pulse h-full bg-gray-100 flex justify-center items-center flex-col ">
          <img src={logo} alt="" className="" />
          <div className="mt-2">Cargando...</div>
        </div>
      }
    >
      {user ? <Outlet /> : <Navigate to="/login" />}
    </Suspense>
  );
};
export default AuthRoutes;
