import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useStore from "../../../Context";

const DragAddPack = ({ children, productData }) => {
  const { setItemData, setModalPack } = useStore();
  const { setDragging } = useStore();
  const [reachedValue, setReachedValue] = useState(false);
  const handleDrag = (event, info) => {
    // console.log(info.point.x);
    // console.log(info.offset.x);s
    const currentDragValue = info.offset.x;
    setReachedValue(currentDragValue);
  };
  useEffect(() => {
    if (reachedValue >= 220) {
      console.log("Reached the specific value!");
      setItemData(productData);

      setModalPack(true);
    }
  }, [reachedValue]);
  return (
    <>
      <div className="relative">
        <div id="1" className="absolute -z-10 w-full bg-[#4CAF50] h-32" />
        <motion.div
          id="2"
          className=" "
          drag="x"
          dragElastic={{ left: 0, right: 0.5 }}
          dragConstraints={{ left: 0, right: 0 }}
          onDrag={handleDrag}
          onDragStart={() => {
            setDragging(true);
          }}
          onDragEnd={() => {
            setDragging(false);
          }}
          style={{ cursor: "grab" }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
};

export default DragAddPack;
