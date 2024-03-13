import axios from "axios";
import { api } from "../../../api";
import toast from "react-hot-toast";
import useStore from "../../../Context";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import NavBar from "../../components/NavBar";
import Html5QrcodePlugin from "./Html5QrcodeScannerPlugin";
const QrScan = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allowScan, setAllowScan] = useState(true);
  const [txtQr, setTxtQr] = useState("");
  const [showResult, setShowResult] = useState(false);

  const instance = axios.create({
    timeout: 10000, // Tiempo de espera en milisegundos (10 segundos en este ejemplo)
  });

  const handleQRCode = () => {
    setLoading(true);

    instance
      .post(`${api}/pick-pack/assigment/qr`, {
        userId: user.id,
        orderId: txtQr,
      })
      .then((result) => {
        console.log(result);
        toast.success(`Se te ha asignado la order ${txtQr}`, {
          duration: 3000,
        });
        if (!document.startViewTransition) {
          navigate(`/picking/${txtQr}`);
          return;
        }
        document.startViewTransition(() =>
          flushSync(() => navigate(`/picking/${txtQr}`))
        );
      })
      .catch((err) => {
        console.log(err);
        err.code == "ECONNABORTED"
          ? toast.error("Alta latencia, verifica tu conexión", {})
          : err.response.status === 403
          ? toast.error("Orden ya asignada", { id: 1 })
          : toast.error("Ups algo salio mal, intenta de nuevo", {});

        // toast.remove();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    txtQr.length > 0 && setShowResult(true);
  }, [txtQr]);

  return (
    <NavBar>
      <div className="w-full h-full">
        <div className="bg-slate-200 font-semibold p-4 w-[90%] rounded-lg mt-4 flex mx-auto justify-center flex-col items-center">
          Escanea el código QR de tu siguiente orden
          <div className="">
            <svg
              className="w-8 h-8 "
              fill="currentColor"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
            >
              <path d="M2 2h2v2H2V2z" />
              <path d="M6 0v6H0V0h6zM5 1H1v4h4V1zM4 12H2v2h2v-2z" />
              <path d="M6 10v6H0v-6h6zm-5 1v4h4v-4H1zm11-9h2v2h-2V2z" />
              <path d="M10 0v6h6V0h-6zm5 1v4h-4V1h4zM8 1V0h1v2H8v2H7V1h1zm0 5V4h1v2H8zM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6zm0 0v1H2V8H1v1H0V7h3v1h3zm10 1h-1V7h1v2zm-1 0h-1v2h2v-1h-1V9zm-4 0h2v1h-1v1h-1V9zm2 3v-1h-1v1h-1v1H9v1h3v-2h1zm0 0h3v1h-2v1h-1v-2zm-4-1v1h1v-2H7v1h2z" />
              <path d="M7 12h1v3h4v1H7v-4zm9 2v2h-3v-1h2v-1h1z" />
            </svg>
          </div>
        </div>
        {
          <div
            className={`fixed transition-all ${
              loading ? "opacity-100 z-40" : " opacity-0 -z-10"
            } flex top-1/2 left-1/2 -translate-x-1/2 flex-col gap-4 justify-center items-center   bg-black  rounded-full bg-opacity-85`}
          >
            {/* <div className="text-white font-semibold">
              Procesando código, por favor espera...
            </div> */}
            <span className="loading loading-spinner text-info loading-lg"></span>
          </div>
        }
        {/* <div>{loading ? "loading" : "finished"}</div> */}
        <Html5QrcodePlugin
          fps={10}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={(result) => {
            setTxtQr(result);
          }}
        />
        <div
          className={`fixed transition-all flex gap-2 justify-center flex-col items-center  ${
            showResult ? "bottom-0" : "-bottom-44"
          } h-44 bg-white w-full rounded-t-xl p-4`}
        >
          <div
            onClick={() => {
              setTxtQr("");
              setShowResult(false);
            }}
            className="absolute top-2 right-3"
          >
            <svg
              className="text-error w-7 h-7"
              fill="none"
              viewBox="0 0 15 15"
              height="1em"
              width="1em"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>Valor detectado:</div>
          <div className="font-semibold text-lg truncate max-w-full">
            {txtQr}
          </div>
          <div className="flex gap-4 w-full justify-center">
            {/* <div className="btn btn-error w-1/2 text-white">
              Escanear de nuevo
            </div> */}
            <div
              className={`btn w-1/2 ${
                loading && "btn-disabled"
              } btn-success text-white`}
              onClick={handleQRCode}
            >
              {loading ? (
                <span className="loading loading-spinner text-info"></span>
              ) : (
                "Aceptar"
              )}
            </div>
          </div>
        </div>
      </div>
    </NavBar>
  );
};

export default QrScan;
