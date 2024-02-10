import { useState } from "react";
import PackedList from "./PackedList";
import PendingPackList from "./PendingPackList";
const InfoBarPack = () => {
  const [selection, setSelection] = useState(1);
  function handleSelection(number) {
    setSelection(number);
  }
  return (
    <div className="border-t-2">
      <div className="grid grid-cols-2  text-center  cursor-pointer">
        <div
          className={`p-3 ${
            selection === 1 && "border-b-4  border-b-blue-600 text-blue-600"
          }  `}
          onClick={() => handleSelection(1)}
        >
          Items pendientes
        </div>
        <div
          className={`p-3 ${
            selection === 2 && "border-b-4 border-b-blue-600 text-blue-600"
          }`}
          onClick={() => handleSelection(2)}
        >
          Items empacados
        </div>
      </div>

      <div>{selection === 1 && <PendingPackList />}</div>
      <div>{selection === 2 && <PackedList />}</div>
    </div>
  );
};

export default InfoBarPack;
