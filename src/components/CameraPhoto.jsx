import axios from "axios";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { useEffect } from "react";
import { Quagga } from "quagga";

const CameraPhoto = () => {
  function handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
    const image64 = dataUri.split(",")[1];
    readBarcodeFromImage(image64);
    console.log(image64);
    // console.log(dataUri);
  }
  const readBarcodeFromImage = (base64String) => {
    Quagga.decodeSingle(
      {
        decoder: {
          readers: ["ean_reader"], // specify the barcode type you want to read
        },
        locate: true,
        src: base64String,
      },
      (result) => {
        if (result && result.codeResult) {
          alert(result.codeResult.code);
        } else {
          alert("No barcode detected");
        }
      }
    );
  };

  function handleTakePhotoAnimationDone(dataUri) {
    // Do stuff with the photo...
    console.log("takePhoto");
  }

  function handleCameraError(error) {
    console.log("handleCameraError", error);
  }

  function handleCameraStart(stream) {
    console.log("handleCameraStart");
  }
  function handleCameraStop() {
    console.log("handleCameraStop");
  }

  useEffect(() => {
    axios
      .post(`https://web-production-afeb.up.railway.app/api/musicians`, {
        image: "jajja",
      })
      .then(() => {
        console.log("posted");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Camera
      onTakePhoto={(dataUri) => {
        handleTakePhoto(dataUri);
      }}
      onTakePhotoAnimationDone={(dataUri) => {
        handleTakePhotoAnimationDone(dataUri);
      }}
      onCameraError={(error) => {
        handleCameraError(error);
      }}
      idealFacingMode={FACING_MODES.ENVIRONMENT}
      idealResolution={{ width: 640, height: 480 }}
      imageType={IMAGE_TYPES.JPG}
      imageCompression={0.97}
      isMaxResolution={true}
      isImageMirror={false}
      isSilentMode={false}
      isDisplayStartCameraError={true}
      isFullscreen={true}
      sizeFactor={1}
      onCameraStart={(stream) => {
        handleCameraStart(stream);
      }}
      onCameraStop={() => {
        handleCameraStop();
      }}
    />
  );
};

export default CameraPhoto;
