import { useCallback, useRef } from "react";
import toast from "react-hot-toast";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 350,
  height: 400,
  facingMode: "environment", // Use the back camera
};
const NewTest = () => {
  const webcamRef = useRef(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
  }, [webcamRef]);
  return (
    <div className="relative">
      <Webcam
        audio={false}
        // height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        // width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </div>
  );
};

export default NewTest;
