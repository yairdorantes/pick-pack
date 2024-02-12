import axios from "axios";
import { api } from "../../../api";
import toast from "react-hot-toast";
import useStore from "../../../Context";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import NavBar from "../../components/NavBar";
// import euroImg from "../../assets/images/eurocotton_logo.png";
import { Html5Qrcode } from "html5-qrcode";
const QrScan = () => {
  const qrCodeScannerRef = useRef(null);
  const { user } = useStore();
  const navigate = useNavigate();
  const handleQRCode = (resultQR) => {
    qrCodeScannerRef.current?.stop();

    axios
      .post(`${api}/pick-pack/assigment/qr`, {
        userId: user.id,
        orderId: resultQR,
      })
      .then((result) => {
        console.log(result);
        toast.success(`Se te ha asignado la order ${resultQR}`, {
          duration: 3000,
        });
        if (!document.startViewTransition) {
          navigate(`/picking/${resultQR}`);
          return;
        }
        document.startViewTransition(() =>
          flushSync(() => navigate(`/picking/${resultQR}`))
        );
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          qrCodeScannerRef.current?.start(
            { facingMode: "environment" },
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
            },
            (qrCodeMessage) => {
              // alert(qrCodeMessage);
              handleQRCode(qrCodeMessage);
              console.log("QR Code detected:", qrCodeMessage);
              // Handle the detected QR code message here
            },
            (errorMessage) => {
              console.error("Error:", errorMessage);
              // Handle any errors here
            }
          );
        }, 500);

        toast.error("Ups algo salio mal, intenta de nuevo", {});
        // toast.remove();
      })
      .finally(() => {
        // setIsScanning(true);
      });
  };
  useEffect(() => {
    // Create a new Html5Qrcode instance and save it to the ref
    qrCodeScannerRef.current = new Html5Qrcode("reader");

    // Start the QR code scanner
    qrCodeScannerRef.current.start(
      { facingMode: "environment" }, // Use the back camera
      {
        fps: 10, // Frames per second for video capture
        qrbox: { width: 250, height: 250 }, // Size of QR code scanning box
      },
      (qrCodeMessage) => {
        // alert(qrCodeMessage);
        handleQRCode(qrCodeMessage);
      },
      (errorMessage) => {
        console.error("Error:", errorMessage);
        // Handle any errors here
      }
    );

    return () => {
      qrCodeScannerRef.current
        .stop()
        .then((res) => {
          // toast.success("success stopin qr");
        })
        .catch(() => {
          toast.error("error stopin QR");
        });
    };
  }, []);

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
        <div id="reader">{/* Placeholder for the video feed */}</div>

        {/* <div className="fixed bottom-2 -translate-x-1/2 left-1/2">
          <img src={euroImg} alt="" className="opacity-40 w-36" />
        </div> */}
      </div>
    </NavBar>
  );
};

export default QrScan;
