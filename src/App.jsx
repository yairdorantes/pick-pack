import { Toaster } from "react-hot-toast";
import Router from "../routes/Router";
import { Suspense } from "react";
import logo from "/oms.png";

function App() {
  return (
    <>
      <div>
        <Suspense
          fallback={
            <div className="fixed w-full animate-pulse h-full bg-gray-100 flex justify-center items-center flex-col ">
              <img src={logo} alt="" className="" />
              <div className="mt-2">Cargando...</div>
            </div>
          }
        >
          <Router />
          <Toaster />
        </Suspense>
      </div>
    </>
  );
}

export default App;
