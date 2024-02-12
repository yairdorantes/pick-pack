import { useEffect, useState } from "react";

const AlertScan = ({ number, sku, SpeechTxt }) => {
  const [animationKey, setAnimationKey] = useState(0);

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
  useEffect(() => {
    if (number !== undefined) {
      setAnimationKey((prevKey) => prevKey + 1);
      // speech(SpeechTxt);
    }
  }, [number]);

  return (
    <div
      key={animationKey}
      className={`fixed ${
        number !== undefined && "fade-in-out"
      } w-screen h-screen top-0  -translate-x-1/2 font-Lilita left-1/2 opacity-0 -z-10`}
    >
      <div
        className={` flex flex-col items-center justify-center h-full  bg-teal-400  `}
      >
        <div
          className={`text-white tracking-in-expand  font-bold  text-[200px]`}
        >
          {number}
        </div>
        <div className="text-white  text-4xl">{sku}</div>
      </div>
    </div>
  );
};

export default AlertScan;
