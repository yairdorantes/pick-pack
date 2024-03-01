import toast from "react-hot-toast";
// import Notifications from "./Notifications";
import Html5QrcodePlugin from "../views/QR/Html5QrcodeScannerPlugin";
import { useState } from "react";
import BarCodeCameraScanner from "./BarCodeCameraScanner";
import WebSocket from "./WebSocket";
const NewTest = () => {
  const [res, setRes] = useState("res");
  const getToast = () => {
    toast.custom(
      (t) => (
        <div
          className={`transition-all duration-200 ${
            t.visible ? "fadeInScale" : "fadeOutScale"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div onClick={() => console.log("great!")} className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://cdn.discordapp.com/avatars/1171876442586501121/7025947bea56fc3149a39f3d4ec2a656.webp?size=80"
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Adrian Mejia
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Ponte a chambear!!!
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg
                viewBox="0 0 512 512"
                fill="currentColor"
                height="1em"
                width="1em"
                className="w-6 h-6"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={32}
                  d="M368 368L144 144M368 144L144 368"
                />
              </svg>
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };
  const foo = (result) => {
    toast.success(result);
  };
  return (
    <div>
      {/* <Notifications></Notifications> */}
      <button onClick={getToast} className="btn">
        toast
      </button>
      {/* {res} */}
      {/* <BarCodeCameraScanner onBarcodeScan={(result) => foo(result)} /> */}
      {/* <WebSocket /> */}
    </div>
  );
};

export default NewTest;
