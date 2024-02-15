import React, { useRef, useEffect } from "react";
import toast from "react-hot-toast";

const FacialScan = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = {
      video: true,
    };

    const startStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
        // Start logging frames
        logFrames();
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startStream();

    return () => {
      // Clean up by stopping the stream when component unmounts
      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const logFrames = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;

    const captureFrame = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/jpeg");
      console.log(imageData); // Print frame data to console
    };

    // Capture frame every second
    const intervalId = setInterval(captureFrame, 1000);

    return () => {
      clearInterval(intervalId); // Clean up interval when component unmounts
    };
  };

  return <video ref={videoRef} autoPlay className="w-screen" playsInline />;
};

export default FacialScan;
