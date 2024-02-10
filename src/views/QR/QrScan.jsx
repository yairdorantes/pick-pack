import axios from "axios";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { api } from "../../../api";
import toast from "react-hot-toast";
import useStore from "../../../Context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import NavBar from "../../components/NavBar";

const QrScan = () => {
  const { user } = useStore();
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(code);
    if (code.length > 5) {
      axios
        .post(`${api}/pick-pack/assigment/qr`, {
          userId: user.id,
          orderId: code,
        })
        .then((result) => {
          console.log(result);
          toast.success(`Se te ha asignado la order ${code}`, {
            duration: 3000,
          });
          if (!document.startViewTransition) {
            navigate(`/picking/${code}`);
            return;
          }
          document.startViewTransition(() =>
            flushSync(() => navigate(`/picking/${code}`))
          );
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ups algo salio mal, intenta de nuevo", {});
          // toast.remove();
        })
        .finally(() => setCode(""));
    }
  }, [code]);

  const onNewScanResult = (decodedText, decodedResult) => {
    console.log(decodedResult, decodedText);
    setCode(decodedText);
  };
  return (
    <div className="">
      <NavBar>
        <div className="mt-40 ">
          <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
          />
        </div>
      </NavBar>
    </div>
  );
};

export default QrScan;
