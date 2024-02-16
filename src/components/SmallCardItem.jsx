import { memo, useMemo, useState } from "react";

const SmallCardItem = ({ order }) => {
  const [showCover, setShowCover] = useState(false);
  const typeOfProduct = useMemo(() => {
    return (string) => `${string.slice(0, 7)}.png`;
  }, []);

  return (
    <div
      onClick={() => setShowCover(!showCover)}
      className={`overflow-hidden  shadow-desktop flex transition-all  duration-150 h-10 border-b border-gray-200 group cursor-pointer relative items-center  space-x-2  bg-white`}
    >
      <div
        className={`${
          showCover ? "opacity-100" : "opacity-0"
        }  transition-all duration-500  font-bold flex bg-opacity-60 text-white text-2xl justify-center items-center flex-col absolute left-0 w-full h-full bg-gray-900 `}
      >
        <div>{order.refId_item}</div>
      </div>

      <div className={`w-full flex flex-row justify-between`}>
        <span className="text-sm text-left  text-gray-700 font-semibold capitalize">
          <p className="text-black ">SKU: {order.refId_item}</p>{" "}
        </span>

        <div className="flex items-center mt-1 space-x-1 ">
          <img
            loading="lazy"
            src={`/skus/${typeOfProduct(order.refId_item)}`}
            className="w-5"
            alt=""
          />
          <span
            className={`text-sm  font-bold
             text-black`}
          >
            {order.remaining_item}
          </span>

          <span className="">ud</span>
        </div>
      </div>
    </div>
  );
};

export default memo(SmallCardItem);
