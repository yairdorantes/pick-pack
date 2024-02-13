import { useCallback, useEffect, useMemo } from "react";
import { useGetItems } from "../../scripts/getProducts";
import { useParams } from "react-router-dom";
import useStore from "../../../Context";
import PackingCard from "./PackingCard";
import DragAddPack from "./DragAddPack";
import { useState } from "react";
import axios from "axios";
import { api } from "../../../api";
import toast from "react-hot-toast";
import ModalPack from "./ModalPack";
import { firstPack } from "../../scripts/firstPack";
import { AnimatePresence, motion } from "framer-motion";
import AlertScan from "../../components/AlertScan";
import CardLoader from "../../components/CardLoader";

const PendingPackList = () => {
  const { orderId } = useParams();
  const { getProducts, loading } = useGetItems();
  const { itemsList, setItemsList, packList, setPackList, user, codeScanned } =
    useStore();
  // const [filteredItems, setFilteredItems] = useState([]);
  const [sendingInfo, setLoading] = useState(false);
  const [garmentScanned, setGarmentScanned] = useState({});
  const [speechTxt, setSpeechTxt] = useState("");

  const [itemScannedSaved, setItemScannedSaved] = useState({});

  const countSelected = useMemo(() => {
    let count = 0;
    packList.forEach((item) => {
      count += item.packed_item;
    });
    return count;
  }, [packList]);

  const packedQuantity = useCallback(() => {
    let countQuantity = 0;
    let packedQuantity = 0;
    itemsList.forEach((item) => {
      countQuantity += item.quantity_item;
      packedQuantity += item.packed_item;
    });
    return countQuantity === packedQuantity;
  }, [itemsList]);
  function packItems() {
    setLoading(true);
    const resPack = firstPack(itemsList);
    const updateStatus = { order: orderId };
    axios
      .put(`${api}/pick-pack/pack_items`, {
        items: packList,
        firstPacking: resPack ? updateStatus : undefined,
        user: user.id,
      })
      .then(() => {
        toast.success("¡Items empacados!", { position: "bottom-center" });

        // code for update current list locally
        const mapPackList = new Map(packList.map((obj) => [obj.id_item, obj]));
        const updatedItems = itemsList.map((obj) => ({
          ...obj,
          packed_item:
            (mapPackList.get(obj.id_item) || {}).packed_item || obj.packed_item,
        }));
        // console.log(updatedItems);
        setItemsList(updatedItems);
        // ends local update logic
        setPackList([]);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error, no se pudo empacar, intenta de nuevo", {
          position: "bottom-center",
        });
      })
      .finally(() => setLoading(false));
  }

  function scanAndPack() {
    // scanning
    const productIndex = itemsList.findIndex(
      (product) => product.ean_item === codeScanned
    );
    if (productIndex !== -1) {
      const product = itemsList[productIndex];
      setGarmentScanned(product);
      if (product.packed_item + 1 <= product.quantity_item) {
        const resPack = firstPack(itemsList);
        const updateStatus = { order: orderId };
        const packList = [
          { id_item: product.id_item, packed_item: product.packed_item + 1 },
        ];
        // scanning
        // kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

        axios
          .put(`${api}/pick-pack/pack_items`, {
            items: packList,
            firstPacking: resPack ? updateStatus : undefined,
            user: user.id,
          })
          .then(() => {
            toast.success("¡Empaque actualizado!");
            const updateList = itemsList.map((obj) =>
              obj.id_item === product.id_item
                ? {
                    ...obj,
                    packed_item: product.packed_item + 1,
                  }
                : obj
            );
            setItemScannedSaved(product);
            setItemsList(updateList);
            const txtSpeech = `${
              product.quantity_item - (product.packed_item + 1) === 0
                ? `Felicidades haz terminado ${product.refId_item}`
                : `Listo, restan ${
                    product.quantity_item - (product.packed_item + 1)
                  }`
            }`;
            setSpeechTxt(txtSpeech);
            // console.log(updateList);
          })
          .catch((err) => {
            console.log(err);
            toast.error(
              "error, no se puedo actualizar el empaquetado, intenta de nuevo"
            );
          });
      }
    } else {
      toast("ESTA PRENDA NO ESTÁ EN LA ORDEN!", {
        icon: "⚠️",
      });
    }
  }
  useEffect(() => {
    codeScanned.length === 13 && scanAndPack();
  }, [codeScanned]);

  useEffect(() => {
    getProducts(orderId);
    setPackList([]);
  }, []);
  return (
    <div className="overflow-x-hidden mb-24" tabIndex="0">
      {loading && (
        <div className="mt-5">
          <div className="mb-7">
            <CardLoader />
          </div>
          <div className="mb-7">
            <CardLoader />
          </div>
          <div className="mb-7">
            <CardLoader />
          </div>{" "}
          <div className="mb-7">
            <CardLoader />
          </div>{" "}
          <div className="mb-7">
            <CardLoader />
          </div>
        </div>
      )}
      <AlertScan
        number={
          itemScannedSaved.quantity_item &&
          itemScannedSaved.quantity_item - (itemScannedSaved.packed_item + 1)
        }
        sku={itemScannedSaved.refId_item}
        SpeechTxt={speechTxt}
      />
      <div>
        <AnimatePresence>
          {itemsList.map(
            (product, i) =>
              product.packed_item !== product.quantity_item && (
                <motion.div
                  key={i}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  // onClick={() => {
                  //   handleClick(order);
                  // }}
                >
                  <DragAddPack productData={product}>
                    <PackingCard product={product} />
                  </DragAddPack>
                </motion.div>
              )
          )}
        </AnimatePresence>
        {/* show image when there's no items to pack */}
        {packedQuantity() && (
          <div className="flex flex-col justify-center items-center">
            <svg
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="120"
              viewBox="0 0 193 97"
            >
              <rect
                opacity="0.8"
                x="29"
                y="41"
                width="142.769"
                height="16"
                rx="2"
                fill="#DAE3F5"
              ></rect>
              <rect
                opacity="0.6"
                x="29"
                y="61"
                width="150.154"
                height="16"
                rx="2"
                fill="#DAE3F5"
              ></rect>
              <rect
                opacity="0.4"
                x="29"
                y="81"
                width="135.385"
                height="16"
                rx="2"
                fill="#DAE3F5"
              ></rect>
              <rect
                x="29"
                y="21"
                width="163.692"
                height="16"
                rx="2"
                fill="#DAE3F5"
              ></rect>
              <g filter="url(#filter0_d)">
                <circle
                  cx="35.8182"
                  cy="27.8182"
                  r="19.6364"
                  fill="white"
                ></circle>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M49.6702 44.35C41.1389 51.5231 28.3882 51.0955 20.3599 43.0674C11.88 34.5877 11.88 20.8394 20.3599 12.3598C28.8397 3.88008 42.5883 3.88008 51.0681 12.3598C59.0967 20.3882 59.524 33.1394 52.3499 41.6705L61.445 50.7655C62.185 51.5054 62.185 52.7051 61.445 53.445C60.7051 54.185 59.5054 54.185 58.7654 53.445L49.6702 44.35ZM23.0395 15.0393C30.0394 8.03951 41.3886 8.03951 48.3885 15.0393C55.3307 21.9814 55.388 33.2012 48.5603 40.2138C48.4962 40.2632 48.4345 40.3173 48.3758 40.3761C48.3171 40.4348 48.263 40.4964 48.2136 40.5604C41.2008 47.3872 29.9814 47.3297 23.0395 40.3879C16.0395 33.3881 16.0395 22.0391 23.0395 15.0393Z"
                  fill="#B6C3E1"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M35.9339 32.7129C36.7353 32.75 37.3653 33.3423 37.3653 34.083C37.3653 34.8401 36.6896 35.4546 35.8572 35.4546C35.0249 35.4546 34.3492 34.8401 34.3492 34.0949C34.341 33.3512 34.9841 32.7426 35.7919 32.7129L35.8556 32.7114L35.9339 32.7129ZM35.8066 34.9366C35.8229 34.938 35.8393 34.938 35.8556 34.938L35.8066 34.9366Z"
                  fill="#B6C3E1"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M31.4546 24.1469C31.4546 21.9527 33.4115 20.1819 35.819 20.1819C38.2291 20.1819 40.1819 21.958 40.1819 24.1498C40.1819 25.8778 38.9421 26.7878 38.0876 27.3103L38.086 27.3112C37.3703 27.7474 37.0402 28.0889 37.0402 28.6709V29.0267C37.0402 29.6409 36.4927 30.1388 35.8174 30.1388C35.1421 30.1388 34.5946 29.6409 34.5946 29.0267V28.6709C34.5946 26.9195 35.8484 25.9977 36.7239 25.464C37.076 25.2486 37.3256 25.0598 37.4913 24.8567C37.6369 24.6783 37.7363 24.4672 37.7363 24.1498C37.7363 23.1863 36.8784 22.4061 35.819 22.4061C34.7572 22.4061 33.9001 23.1856 33.9001 24.1469C33.9001 24.7611 33.3527 25.259 32.6774 25.259C32.002 25.259 31.4546 24.7611 31.4546 24.1469Z"
                  fill="#B6C3E1"
                ></path>
              </g>
              <defs>
                <filter
                  id="filter0_d"
                  x="0"
                  y="0"
                  width="76"
                  height="76"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  ></feColorMatrix>
                  <feOffset dy="8"></feOffset>
                  <feGaussianBlur stdDeviation="7"></feGaussianBlur>
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.714028 0 0 0 0 0.765932 0 0 0 0 0.883333 0 0 0 0.6 0"
                  ></feColorMatrix>
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow"
                  ></feBlend>
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow"
                    result="shape"
                  ></feBlend>
                </filter>
              </defs>
            </svg>
            <p>Sin Items por empacar</p>
          </div>
        )}

        <div
          className={`flex shadow-md ${
            countSelected > 0 ? "bottom-2 " : "-bottom-16"
          } transition-all duration-150  text-black justify-between items-center bg-gray-100 fixed w-[98%] rounded-sm left-1/2 -translate-x-1/2 p-3  `}
        >
          <div>Unidades seleccionadas: {countSelected}</div>
          <div>
            <button
              onClick={packItems}
              disabled={sendingInfo || countSelected === 0}
              className="justify-center text-sm font-medium ring-offset-background  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-blue-800 h-10 bg-[#2A5DB0] text-white px-5 py-6 rounded flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                <path d="m3.3 7 8.7 5 8.7-5"></path>
                <path d="M12 22V12"></path>
              </svg>
              {sendingInfo ? (
                <span className="sendingInfo sendingInfo-spinner text-info"></span>
              ) : (
                <span>Empacar</span>
              )}
            </button>
          </div>
        </div>
      </div>
      <ModalPack packing={true} />
    </div>
  );
};

export default PendingPackList;
