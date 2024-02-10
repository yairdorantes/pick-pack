import { ReactSketchCanvas } from "react-sketch-canvas";
import { useEffect, useRef, useState } from "react";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import axios from "axios";
import toast from "react-hot-toast";
import { api } from "../../../api";
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

  // useEffect(() => {}, []);

  return (
    <div className="text-center ">
      {/* <ReactFileReader base64={true} handleFiles={handleFiles}>
        <div className="mt-10">
          <div
            style={{
              borderColor: "white",
              backgroundImage: "url(" + photo.base64 + ")",
            }}
            className="bg-gray-200 bg-center bg-cover mx-auto p-5 flex flex-col justify-center items-center w-3/4 h-44 rounded-xl"
          >
            {!photo.base64 && (
              <div>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="50"
                  width="50"
                  className="mx-auto"
                >
                  <path d="M22 3H2c-1.09.04-1.96.91-2 2v14c.04 1.09.91 1.96 2 2h20c1.09-.04 1.96-.91 2-2V5a2.074 2.074 0 00-2-2m0 16H2V5h20v14m-8-2v-1.25c0-1.66-3.34-2.5-5-2.5-1.66 0-5 .84-5 2.5V17h10M9 7a2.5 2.5 0 00-2.5 2.5A2.5 2.5 0 009 12a2.5 2.5 0 002.5-2.5A2.5 2.5 0 009 7m5 0v1h6V7h-6m0 2v1h6V9h-6m0 2v1h4v-1h-4" />
                </svg>
                Agrega una identificacion
              </div>
            )}
          </div>
        </div>
      </ReactFileReader> */}
      <div className="mt-10 ">
        <div
          className={` ${
            photo.length === 0 ? "opacity-100 " : "opacity-0 -z-10 w-0"
          }`}
        >
          <Camera
            isSilentMode
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            onTakePhoto={(photo) => {
              // console.log(photo);
              setPhoto(photo);
            }}
          />
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
