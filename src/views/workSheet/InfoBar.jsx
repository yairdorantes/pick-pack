import { useState } from "react";
import Scanner from "./Scanner";
import InfoWS from "./InfoWS";
import ResumeWS from "./ResumeWS";

const InfoBar = () => {
  const [selection, setSelection] = useState(1);
  function handleSelection(number) {
    setSelection(number);
  }
  return (
    <div className="border-t-2">
      <div className="grid grid-cols-3  text-center  cursor-pointer">
        <div
          className={`p-3 ${
            selection === 1 && "border-b-4  border-b-blue-600 text-blue-600"
          }  `}
          onClick={() => handleSelection(1)}
        >
          Items
        </div>
        <div
          className={`p-3 ${
            selection === 2 && "border-b-4 border-b-blue-600 text-blue-600"
          }`}
          onClick={() => handleSelection(2)}
        >
          informacion
        </div>
        <div
          className={`p-3   ${
            selection === 3 && "border-b-4 border-b-blue-600 text-blue-600"
          }`}
          onClick={() => handleSelection(3)}
        >
          Resumen
        </div>
      </div>
      <div>{selection === 1 && <Scanner />}</div>
      <div>{selection === 2 && <InfoWS />}</div>
      <div>{selection === 3 && <ResumeWS />}</div>
    </div>
  );
};

export default InfoBar;
