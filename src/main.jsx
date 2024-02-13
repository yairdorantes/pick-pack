import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import logo from "/oms.png";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Suspense
      fallback={
        <div className="fixed w-full animate-pulse h-full bg-gray-100 flex justify-center items-center flex-col ">
          <img src={logo} alt="" className="" />
          <div className="mt-2">Cargando...</div>
        </div>
      }
    >
      <App />
    </Suspense>
  </BrowserRouter>
);
