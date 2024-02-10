import { useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

const TopBarP = ({ view }) => {
  const navigate = useNavigate();
  const [selection, setSelection] = useState(view);
  const handleSelection = (selection) => {
    let route = "";
    if (selection === 1) {
      route = "/comingsoon";
      setSelection(1);
    } else if (selection === 2) {
      route = "/picking";
      setSelection(2);
    } else if (selection === 3) {
      route = "/packing";
      setSelection(3);
    }
    if (!document.startViewTransition) {
      navigate(route);
      return;
    }
    document.startViewTransition(() => flushSync(() => navigate(route)));
  };
  return (
    <div className="border-t-2 border-b-2">
      <div className="grid grid-cols-2  text-center  cursor-pointer">
        {/* <div
          className={`p-3 ${
            selection === 1 && "border-b-4  border-b-blue-600 text-blue-600"
          }  `}
          onClick={() => handleSelection(1)}
        >
          Todos
        </div> */}
        <div
          className={`p-3 ${
            selection === 2 && "border-b-4 border-b-blue-600 text-blue-600"
          }`}
          onClick={() => handleSelection(2)}
        >
          👉 Picking ✅
        </div>
        <div
          className={`p-3 ${
            selection === 3 && "border-b-4 border-b-blue-600 text-blue-600"
          }`}
          onClick={() => handleSelection(3)}
        >
          📦 Packing 📦
        </div>
      </div>
    </div>
  );
};

export default TopBarP;
