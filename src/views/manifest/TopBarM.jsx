import { useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
import Included from "./Included";
import NoIncluded from "./NoIncluded";
import Construction from "../../components/Construction";
import Shipped from "./Shipped";

const TopBarM = ({ view = 2 }) => {
  const navigate = useNavigate();
  const [selection, setSelection] = useState(view);
  const handleSelection = (selection) => {
    if (selection === 1) {
      setSelection(1);
    } else if (selection === 2) {
      setSelection(2);
    } else if (selection === 3) {
      setSelection(3);
    }
  };
  return (
    <div className="border-t-2 ">
      <div className="sticky top-16 bg-white z-20 grid grid-cols-2  text-center  cursor-pointer">
        {/* <div
          className={`p-3 inner-shadow ${
            selection === 1 && "border-b-4  border-b-blue-600 text-blue-600"
          }  `}
          onClick={() => handleSelection(1)}
        >
          Sin incluir
        </div> */}
        <div
          className={`p-3 ${
            selection === 2 && "border-b-4 border-b-blue-600 text-blue-600"
          }`}
          onClick={() => handleSelection(2)}
        >
          Activos
        </div>
        <div
          className={`p-3   ${
            selection === 3 && "border-b-4 border-b-blue-600 text-blue-600"
          }`}
          onClick={() => handleSelection(3)}
        >
          Embarcado
        </div>
      </div>
      {selection === 1 && <NoIncluded />}
      {selection === 2 && <Included />}
      {selection === 3 && <Shipped />}
    </div>
  );
};

export default TopBarM;
