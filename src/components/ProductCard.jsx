import { memo, useMemo, useState } from "react";
import Barcode from "react-barcode";
// import toast from "react-hot-toast";

const ProductCard = ({ order, itemSelected }) => {
  console.log("**CARD PRODUCT RENDERED!!");
  const typeOfProduct = useMemo(() => {
    return (string) => `${string.slice(0, 7)}.png`;
  }, []);

  return (
    <div
      className={`overflow-hidden shadow-desktop flex transition-all  duration-150 h-32 border-b border-gray-200 group cursor-pointer relative items-center  space-x-2  bg-white`}
    >
      <div
        className={`${
          itemSelected.id_item === order.id_item ? "opacity-100" : "opacity-0"
        }  transition-all   font-bold flex  text-black text-2xl justify-center items-center flex-col absolute border border-gray-300 left-0 w-full h-full bg-white`}
      >
        <div>{order.refId_item}</div>
        <div className="">
          {order.ean_item === null || order.ean_item === "" ? (
            <span className="italic text-sm">Sin código EAN</span>
          ) : (
            <Barcode
              height={50}
              margin={0}
              background="#fffefeb8"
              width={1}
              value={order.ean_item}
              fontSize={10}
              lineColor="black"
            />
          )}
        </div>
      </div>
      <img
        src={order.imageUrl_item}
        alt={"Producto"}
        className={` w-[85px]  h-[85px] border-2 rounded-md`}
        // width="100"
        // height="100"
        style={{
          aspectRatio: "100/100",
          objectFit: "cover",
        }}
      />
      <div className={`w-full `}>
        <span className="text-sm text-left  text-gray-700 font-semibold capitalize">
          <p className="text-black ">SKU: {order.refId_item}</p>{" "}
          <p className={`sm:text-sm text-xs   `}>{order.name_item}</p>
        </span>
        <span
          className={` text-sm  text-left flex items-center gap-2 text-gray-500`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" height="20" width="20">
            <path d="M2 6h2v12H2V6m3 0h1v12H5V6m2 0h3v12H7V6m4 0h1v12h-1V6m3 0h2v12h-2V6m3 0h3v12h-3V6m4 0h1v12h-1V6z" />
          </svg>{" "}
          {order.ean_item === null || order.ean_item === ""
            ? "N/D"
            : order.ean_item}
        </span>
        <div className="flex items-center mt-1 space-x-1 ">
          <img
            loading="lazy"
            src={`/skus/${typeOfProduct(order.refId_item)}`}
            className="w-5"
            alt=""
          />
          {/* //  ${
            //   productScanned.id_item === order.id_item && "pulse"
            // }  */}
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
export default memo(ProductCard);
