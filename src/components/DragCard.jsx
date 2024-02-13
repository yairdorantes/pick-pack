import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useStore from "../../Context";

const DragCard = ({ children, setModal, productData }) => {
  // console.log("drag rendered again");
  const { setItemData, setDragging } = useStore();

  const [scale, setScale] = useState(1);
  const [showCheck, setShowCheck] = useState(false);
  const [containerBackgroundColor, setContainerBackgroundColor] =
    useState("#4CAF50"); // Initial color
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleDrag = (_, info) => {
    const { offset } = info;

    // Adjust the scaling factor and set a maximum scale
    const scalingFactor = 0.005; // Adjust this factor for a slower scaling effect
    const maxScale = 5.5; // Set the maximum scale
    const newScale = Math.min(maxScale, 1 + Math.abs(offset.x) * scalingFactor);

    // Set the scale with a minimum value of 1
    setScale(newScale);
    setOffset(offset);

    // Change container background color based on drag direction
    setContainerBackgroundColor(offset.x < 0 ? "#E57373" : "#4CAF50");
  };

  const handleDragEnd = () => {
    setScale(1);
    // Reset scale when dragging ends
  };

  useEffect(() => {
    // Check the direction based on offset.x
    if (offset.x < -130) {
      //TODO do somethingj
      console.log("do something with");
    } else if (offset.x > 130) {
      setModal(true);
      setItemData(productData);
    }
  }, [offset]);

  return (
    <div className="relative">
      {/* Background container */}
      <div
        id="1"
        className={`absolute h-full w-full `}
        style={{ backgroundColor: containerBackgroundColor }}
      >
        <motion.div
          className="absolute  top-[40%] left-4 "
          style={{
            scale,
            transition: { type: "spring", stiffness: 50, damping: 10 },
          }}
        >
          {
            <svg
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="30"
              width="30"
              className="text-white "
            >
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
            </svg>
          }
        </motion.div>
        <motion.div
          className="absolute top-[40%] right-4"
          style={{
            scale,
            transition: { type: "spring", stiffness: 50, damping: 10 },
          }}
        >
          <svg
            className="text-white"
            fill="none"
            viewBox="0 0 15 15"
            height="20"
            width="20"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M.877 7.5a6.623 6.623 0 1113.246 0 6.623 6.623 0 01-13.246 0zM7.5 1.827a5.673 5.673 0 100 11.346 5.673 5.673 0 000-11.346zm2.354 3.32a.5.5 0 010 .707L8.207 7.5l1.647 1.646a.5.5 0 01-.708.708L7.5 8.207 5.854 9.854a.5.5 0 01-.708-.708L6.793 7.5 5.146 5.854a.5.5 0 01.708-.708L7.5 6.793l1.646-1.647a.5.5 0 01.708 0z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>
      </div>

      {/* Draggable div */}
      <motion.div
        id="2"
        className=""
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDrag={handleDrag}
        dragElastic={{ left: 0, right: 0.5 }}
        onDragStart={() => {
          setDragging(true);
        }}
        onDragEnd={() => {
          handleDragEnd();
          setDragging(false);
        }}
        style={{ cursor: "grab" }}
        // dragElastic={0.7}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default memo(DragCard);
