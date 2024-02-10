import { stringify } from "postcss";
import QrScanner from "qr-scanner";
import { useEffect } from "react";

const Test = () => {
  useEffect(() => {
    const videoElem = document.createElement("video");
    document.body.appendChild(videoElem);
    const qrScanner = new QrScanner(
      videoElem,
      (result) => {
        // console.log("decoded qr code:", result);
        console.log(result);
        alert(JSON.stringify(result));
        navigator.clipboard.writeText(JSON.stringify(result));
      },
      { highlightScanRegion: true }
    );
    qrScanner.start();
    return () => {
      qrScanner.stop();
      document.body.removeChild(videoElem);
    };
  }, []);
  return (
    <div>
      <video
        id="video"
        playsInline
        className=""
        style={{ width: "10px", height: "10px" }}
      />
    </div>
  );
};

export default Test;
