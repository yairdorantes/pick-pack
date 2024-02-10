import Camera, { FACING_MODES } from "react-html5-camera-photo";
import MyLoader from "./MyLoader";
import { useState } from "react";
import axios from "axios";
import { api } from "../../api";
import toast from "react-hot-toast";
import "react-html5-camera-photo/build/css/index.css";

const CameraScan = ({ EAN = "7501991615172", onDetected }) => {
  const [loading, setLoading] = useState(false);
  function speech(txt) {
    console.log("speech");
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find((voice) => voice.name.includes("Female"));
    var msg = new SpeechSynthesisUtterance();
    if (femaleVoice) msg.voice = femaleVoice;
    msg.text = txt;
    msg.lang = "es-MX";
    window.speechSynthesis.speak(msg);
  }
  function detectEan(photo) {
    setLoading(true);
    let detected = false;
    axios
      .post(`${api}/rekognition/text`, { buffer: photo })
      .then((res) => {
        for (let txt of res.data.TextDetections) {
          if (EAN === txt.DetectedText) {
            toast.success("Codigo detectado, prenda alistada");
            detected = true;
            speech("Codigo detectado, prenda alistada");
            onDetected();
            break;
          }
        }
        !detected &&
          toast.error(
            "No se detecto el código ean de la prenda, intenta nuevamente o alista la prenda de forma manual"
          );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ocurrio un error, intenta de nuevo");
      })
      .finally(() => {
        setLoading(false);
        console.log(detected);
      });
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute flex items-center justify-center w-full h-full z-30 bg-white backdrop-blur-sm  bg-opacity-10">
          <div className="bg-slate-100 bg-opacity-80 rounded-3xl p-2">
            <div className="font-semibold text-center text-lg">
              Procesando imagen
            </div>
            <div>
              <MyLoader />
            </div>
          </div>
        </div>
      )}
      <Camera
        onTakePhotoAnimationDone={false}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        onTakePhoto={(photo) => {
          detectEan(photo);
        }}
      />
    </div>
  );
};

export default CameraScan;
