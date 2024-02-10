import axios from "axios";
import { api } from "../../../api";
import toast from "react-hot-toast";
import useStore from "../../../Context";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import NavBar from "../../components/NavBar";
import QrScanner from "qr-scanner";

const QrScan = () => {
  const qrScannerRef = useRef(null); // Create a useRef for qrScanner

  const { user } = useStore();
  const [code, setCode] = useState("");
  const example = `{"data":"https://www.bourbon.co.jp/petit/" ,"cornerPoints":[{"x":318,"y":494.4},{"x":444,"y":508.79999999999995},{"x":429.59999999999997,"y": 637.2},{"x":301.2,"y":621.5999999999999}]}`;
  const res = JSON.parse(example);
  console.log(res.data);
  const navigate = useNavigate();

  const handleQRCode = () => {
    qrScannerRef.current?.stop();
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
        qrScannerRef.current?.start();
        toast.error("Ups algo salio mal, intenta de nuevo", {});
        // toast.remove();
      })
      .finally(() => setCode(""));
  };

  useEffect(() => {
    const videoElem = document.createElement("video");
    document.body.appendChild(videoElem);

    const qrScanner = new QrScanner(
      videoElem,
      (result) => {
        console.log(result);
        setCode(JSON.stringify(result));
      },
      { highlightScanRegion: true }
    );

    qrScannerRef.current = qrScanner; // Assign qrScanner to qrScannerRef.current

    qrScanner.start();

    return () => {
      qrScanner.stop();
      document.body.removeChild(videoElem);
    };
  }, []);
  return (
    <NavBar>
      <div className="bg-blue-500 fixed z-40 bottom-0 text-white">
        scanned: {code}
      </div>
      <video
        id="video"
        playsInline
        className="absolute top-40"
        // style={{ width: "10px", height: "10px" }}
      />
    </NavBar>
  );
};

export default QrScan;
