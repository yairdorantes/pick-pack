import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const SwipeConfirmManifest = ({
  onConfirm,
  loading = false,
  presence,
  confirmed,
  setConfirmed,
}) => {
  const [value, setValue] = useState(0);
  const [dragging, setdragging] = useState(false);
  //   const [confirmed, setConfirmed] = useState(false);
  const controls = useAnimation();

  const handleDrag = (event, info) => {
    controls.start({ x: info.offset.x });
    setValue(info.offset.x);
    if (info.offset.x >= 240) setConfirmed(true);
  };

  useEffect(() => {
    // console.log(confirmed, "conf");
    // onConfirm();
    confirmed && onConfirm();
  }, [confirmed]);
  const handleDragEnd = (event, info) => {
    setdragging(false);
    controls.start({ x: 0 });
  };

  return (
    <div
      className={`flex transition-all  justify-center mb-3 ${
        presence ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className=" relative  overflow-hidden">
        {!confirmed && (
          <motion.div
            id="1"
            className="flex cursor-pointer items-center justify-center absolute rounded-full  left-0 h-12 w-12 text-black bg-white"
            drag="x"
            // dragConstraints={{ left: 0, right: 50 }}
            onDrag={handleDrag}
            onDragStart={() => setdragging(true)}
            onDragEnd={handleDragEnd}
            // dragTransition={{ bounceDamping: 10, bounceStiffness: 100 }}
            animate={controls}
          >
            <svg fill="currentColor" viewBox="0 0 16 16" height="23" width="23">
              <path
                fillRule="evenodd"
                d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"
              />
            </svg>
          </motion.div>
        )}
        {
          <div
            id="2"
            className={` ${
              confirmed ? "w-14 h-14" : "w-72 h-12"
            }  flex justify-center items-center text-white ${
              dragging && "text-opacity-20"
            } rounded-full  bg-blue-700`}
          >
            {confirmed && loading ? (
              <span className="loading loading-spinner loading-lg"></span>
            ) : (
              "Enviar"
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default SwipeConfirmManifest;
