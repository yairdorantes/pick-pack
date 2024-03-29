import { memo, useMemo } from "react";

const SmallCardItem = ({ order, itemSelected }) => {
  console.log(itemSelected, "*******************");
  console.log(order, "+++++++++++++++++++++++++");
  const typeOfProduct = useMemo(() => {
    return (string) => `${string.slice(0, 7)}.png`;
  }, []);

  return (
    <div
      className={`relative overflow-hidden  shadow-desktop flex transition-all  duration-150 h-10 border-b border-gray-200 group cursor-pointer items-center  space-x-2  bg-white`}
    >
      <div
        className={`${
          itemSelected.id_item === order.id_item ? "opacity-100" : "opacity-0"
        }  transition-all duration-500  font-bold flex bg-opacity-90 text-white text-2xl justify-center items-center flex-col absolute left-0 w-full h-full bg-gray-900 `}
      >
        <div>{order.refId_item}</div>
      </div>
      <div className={`w-full  flex flex-row justify-between pr-5`}>
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
