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
          className={`p-3 flex justify-center gap-2 items-center ${
            selection === 2 && "border-b-4 border-b-blue-600 text-blue-600"
          }`}
          onClick={() => handleSelection(2)}
        >
          <div>Picking</div>
          <div>
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              height="1em"
              width="1em"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10.854 7.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 11.708-.708L7.5 9.793l2.646-2.647a.5.5 0 01.708 0z"
              />
              <path d="M4 1.5H3a2 2 0 00-2 2V14a2 2 0 002 2h10a2 2 0 002-2V3.5a2 2 0 00-2-2h-1v1h1a1 1 0 011 1V14a1 1 0 01-1 1H3a1 1 0 01-1-1V3.5a1 1 0 011-1h1v-1z" />
              <path d="M9.5 1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h3zm-3-1A1.5 1.5 0 005 1.5v1A1.5 1.5 0 006.5 4h3A1.5 1.5 0 0011 2.5v-1A1.5 1.5 0 009.5 0h-3z" />
            </svg>
          </div>
        </div>
        <div
          className={`p-3 flex justify-center items-center gap-2 ${
            selection === 3 && "border-b-4 border-b-blue-600 text-blue-600"
          }`}
          onClick={() => handleSelection(3)}
        >
          <div>Packing </div>
          <div>
            <svg
              className="w-5 h-5"
              viewBox="0 0 16 16"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path
                fillRule="evenodd"
                d="M6.122.392a1.75 1.75 0 011.756 0l5.25 3.045c.54.313.872.89.872 1.514V7.25a.75.75 0 01-1.5 0V5.677L7.75 8.432v6.384a1 1 0 01-1.502.865L.872 12.563A1.75 1.75 0 010 11.049V4.951c0-.624.332-1.2.872-1.514L6.122.392zM7.125 1.69l4.63 2.685L7 7.133 2.245 4.375l4.63-2.685a.25.25 0 01.25 0zM1.5 11.049V5.677l4.75 2.755v5.516l-4.625-2.683a.25.25 0 01-.125-.216zm10.828 3.684a.75.75 0 101.087 1.034l2.378-2.5a.75.75 0 000-1.034l-2.378-2.5a.75.75 0 00-1.087 1.034L13.501 12H10.25a.75.75 0 000 1.5h3.251l-1.173 1.233z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBarP;
