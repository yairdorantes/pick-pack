import axios from "axios";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const SwipeConfirm2 = ({ innerTxt, XLimit = 310, onConfirm }) => {
  const controls = useAnimation();
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dragging, setdragging] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const handleDrag = (event, info) => {
    // console.log(info.offset.x);
    setValue(info.offset.x);
    if (info.offset.x >= XLimit) {
      setConfirmed(true);
    }
  };
  async function confirmAction() {
    setLoading(true);
    const res = await onConfirm();
    if (res === "failure") {
      console.log("jaja falla");
      setConfirmed(false);
      setValue(0);
      controls.start({ x: 0 });
    }

    setLoading(false);
  }

  useEffect(() => {
    if (confirmed) {
      confirmAction();
    }
  }, [confirmed]);

  const handleDragEnd = (event, info) => {
    setdragging(false);
    if (value <= XLimit) {
      controls.start({ x: 0 });
    }
  };

  return (
    <div className={``}>
      <div>
        {value}
        {confirmed.toString()}
      </div>
      <div className="relative w-full overflow-hidden">
        <motion.div
          id="1"
          className={`flex cursor-pointer items-center left-0 justify-center absolute rounded-full ${
            value >= XLimit ? "" : ""
          }  h-12  w-12 text-black bg-white`}
          drag={value >= XLimit ? false : "x"}
          // dragConstraints={{ left: 0, right: 50 }}
          onDrag={handleDrag}
          onDragStart={() => setdragging(true)}
          onDragEnd={handleDragEnd}
          style={{ position: "absolute" }}
          animate={controls}
        >
          <svg
            className="transition-all "
            fill="currentColor"
            viewBox="0 0 16 16"
            height="23"
            width="23"
          >
            <path
              fillRule="evenodd"
              d={`${
                value >= XLimit
                  ? "M12.736 3.97a.733.733 0 011.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 01-1.065.02L3.217 8.384a.757.757 0 010-1.06.733.733 0 011.047 0l3.052 3.093 5.4-6.425a.247.247 0 01.02-.022z"
                  : "M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"
              }`}
            />
          </svg>
        </motion.div>

        <div
          id="2"
          className={`h-12  flex transition-all justify-center items-center text-white ${
            dragging && value < XLimit && "text-opacity-20"
          } rounded-full  ${value >= XLimit ? "bg-success" : "bg-blue-700"}`}
        >
          {loading ? (
            <span className="loading loading-dots loading-md" />
          ) : (
            innerTxt
          )}
        </div>
      </div>
    </div>
  );
};

export default SwipeConfirm2;
