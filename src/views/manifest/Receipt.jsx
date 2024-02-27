import { ReactSketchCanvas } from "react-sketch-canvas";
import { useCallback, useEffect, useRef, useState } from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import axios from "axios";
import toast from "react-hot-toast";
import { api } from "../../../api";
import Webcam from "react-webcam";
const videoConstraints = {
  width: 350,
  height: 400,
  facingMode: "environment", // Use the back camera
};
import audioCamera from "../../assets/audio/camera-13695.mp3";
const Receipt = ({ setModal, courierId }) => {
  const [photo, setPhoto] = useState("");
  const [draw, setDraw] = useState(false);
  const [loading, setLoading] = useState(false);

  const [rotationValue, setRotationValue] = useState("0");
  // const [confirm, setconfirm] = useState(second)
  const styles = {
    border: "0.0625rem solid #9c9c9c",
    borderRadius: "0.25rem",
    width: "300px",
    height: "200px",
    // color: "green",
  };
  const canvasRef = useRef(null);

  async function exportImg() {
    try {
      const res = await canvasRef.current.exportImage("png");
      return res;
    } catch (err) {
      console.log(err);
      return ""; // or handle the error in an appropriate way
    }
  }
  function resetCanvas() {
    canvasRef.current.clearCanvas();
  }

  const playSound = () => {
    const audio = new Audio(audioCamera);
    audio.play();
  };

  async function saveReceipt() {
    console.log(photo);
    if (photo.length > 0 && draw) {
      const imageSignature = await exportImg();
      setModal(false);
      // manifest/evidence/:courier_id
      setLoading(true);
      axios
        .post(`${api}/pick-pack/manifest/evidence/${courierId}`, {
          photo: photo,
          signature: imageSignature,
        })
        .then(() => {
          toast.success("Información enviada con éxito!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Información no recibida, intenta de nuevo");
        })
        .finally(() => setLoading(false));
    } else {
      toast.error("Llena todos los campos");
    }
  }

  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setPhoto(imageSrc);
    playSound();
  }, [webcamRef]);

  return (
    <div className="text-center ">
      <div className="mt-10 ">
        <div
          className={` ${
            photo.length === 0 ? "opacity-100 " : "opacity-0 -z-10 w-0"
          }`}
        >
          <div className="relative">
            <Webcam
              className="mx-auto "
              // audio={true}
              // height={720}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              // width={1280}
              videoConstraints={videoConstraints}
            />
            <div
              onClick={() => {
                webcamRef.current !== null && capture();
              }}
              className="absolute flex justify-center items-center bottom-3 -translate-x-1/2 left-1/2 bg-gray-400 w-16 h-16 rounded-full"
            >
              <div className="w-[85%] h-[85%] rounded-full bg-white" />
            </div>
          </div>
        </div>
        <div
          className={`relative bg-gray-100 w-full overflow-hidden  flex flex-col justify-center items-center ${
            photo.length > 0
              ? "opacity-100 max-h-64 z-30"
              : "opacity-0 -z-10 h-0"
          }`}
        >
          <img
            style={{
              rotate: `${rotationValue}deg`,
              // aspectRatio: "100/100",
              // objectFit: "cover",
            }}
            src={photo}
            className=""
            alt=""
          />
          <div className="absolute bottom-0">
            <div className=" flex gap-10 ">
              <div
                onClick={() => {
                  let rotate = parseInt(rotationValue);
                  rotate = rotate - 90;
                  rotate = rotate.toString();
                  setRotationValue(rotate);
                }}
                className="bg-blue-500 text-white cursor-pointer p-2 text-2xl rounded-full"
              >
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2l17.6-17.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3-163.8-62.5-226.3 0L125.7 160z" />
                </svg>
              </div>
              <div
                onClick={() => {
                  let rotate = parseInt(rotationValue);
                  rotate = rotate + 90;
                  rotate = rotate.toString();
                  setRotationValue(rotate);
                }}
                className="bg-blue-500 cursor-pointer text-white p-2 text-2xl rounded-full"
              >
                <svg
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32h128c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2l-17.6-17.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8 229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3 163.8-62.5 226.3 0l17.2 17.2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            setPhoto("");
            setRotationValue(0);
          }}
          className={`btn ${
            photo.length > 0 ? "opacity-100" : "opacity-0"
          } btn-sm mt-2`}
        >
          Tomar otra foto
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Firma de recibo</p>
        <ReactSketchCanvas
          style={styles}
          className="mx-auto "
          ref={canvasRef}
          onStroke={(stroke) => {
            setDraw(true);
            console.log(stroke);
          }}
          // width="200"
          // height="200"
          strokeWidth={4}
          strokeColor="black"
          // onStroke={exportImg}
        />
        <div className="flex justify-end mx-auto gap-2 mt-1 mb-5 w-[300px] ">
          <div className="btn btn-sm" onClick={resetCanvas}>
            <svg
              viewBox="0 0 1002 1000"
              fill="currentColor"
              height="1em"
              width="1em"
              className="w-5 h-5"
            >
              <path d="M902 150c28 0 51.667 9.667 71 29s29 43 29 71v500c0 26.667-9.667 50-29 70s-43 30-71 30H424c-25.333 0-48.667-9.333-70-28L14 526c-18.667-17.333-18.667-35.333 0-54l340-296c20-17.333 43.333-26 70-26h478M762 700l72-74-128-126 128-128-72-72-128 126-128-126-72 72 128 128-128 126 72 74 128-128 128 128" />
            </svg>
          </div>
          {/* <div className="btn btn-sm" onClick={exportImg}>
          image{" "}
        </div> */}
        </div>
      </div>

      <div className="px-4 mb-1">
        <button
          disabled={loading}
          className="euro-btn w-3/4 mx-auto"
          onClick={saveReceipt}
        >
          {loading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Enviar"
          )}
        </button>
      </div>
    </div>
  );
};

export default Receipt;
