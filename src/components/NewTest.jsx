import toast from "react-hot-toast";
// import Notifications from "./Notifications";
import Html5QrcodePlugin from "../views/QR/Html5QrcodeScannerPlugin";
import { useState } from "react";
import BarCodeCameraScanner from "./BarCodeCameraScanner";
const NewTest = () => {
  const [res, setRes] = useState("res");
  const getToast = () => {
    toast("Prenda ya alistada  o no ", {
      icon: "⚠️",
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "black",
        fontSize: "17px",
        background: "#fae7c7",
      },
      // iconTheme: {
      //   primary: "#713200",
      //   secondary: "#FFFAEE",
      // },
    });
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
      <BarCodeCameraScanner onBarcodeScan={(result) => foo(result)} />
    </div>
  );
};

export default NewTest;
