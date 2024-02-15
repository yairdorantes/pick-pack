import { useRef } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const FacialRec = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.start();
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const frameDataUrl = event.target.result;
        console.log("Frame data:", frameDataUrl);
      };
      reader.readAsDataURL(event.data);
    }
  };

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default FacialRec;
