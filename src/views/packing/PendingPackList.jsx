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
import SmallCardItem from "../../components/SmallCardItem";
import BarCodeCameraScanner from "../../components/BarCodeCameraScanner";
const step = 10;

const PendingPackList = () => {
  const { orderId } = useParams();
  const [limit, setLimit] = useState({ start: 0, end: step });

  const { getProducts, loading } = useGetItems();
  const [showDetails, setShowDetails] = useState(true);
  const {
    itemsList,
    setItemsList,
    packList,
    setPackList,
    user,
    codeScanned,
    setBarcodeScanner,
    setCodeScanned,
  } = useStore();
  // const [filteredItems, setFilteredItems] = useState([]);
  const [sendingInfo, setLoading] = useState(false);
  const [speechTxt, setSpeechTxt] = useState("");
  const [productSelected, setProductSelected] = useState({});

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
        toast.success("¡Items empacados!");

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
        toast.error("Error, no se pudo empacar, intenta de nuevo");
      })
      .finally(() => setLoading(false));
  }

  function scanAndPack() {
    // scanning
    const productIndex = itemsList.findIndex(
      (product) => product.ean_item === codeScanned
    );

    if (productIndex !== -1) {
      if (!sendingInfo) {
        const product = itemsList[productIndex];
        if (product.packed_item + 1 <= product.quantity_item) {
          const resPack = firstPack(itemsList);
          const updateStatus = { order: orderId };
          const packList = [
            { id_item: product.id_item, packed_item: product.packed_item + 1 },
          ];
          // scanning
          // kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
          setLoading(true);
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
              setBarcodeScanner(false);

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
            })
            .finally(() => {
              setCodeScanned("");
              setLoading(false);
            });
        } else {
          toast("ESTA PRENDA YA HA SIDO EMPACADA! ", {
            icon: "⚠️",
            style: {
              border: "1px solid #713200",
              padding: "12px",
              color: "black",
              fontSize: "17px",
              background: "#fae7c7",
            },
            // iconTheme: {
            //   primary: "#713200",
            //   secondary: "#FFFAEE",
            // },
          });
        }
      }
    } else {
      toast("ESTA PRENDA NO ESTÁ EN LA ORDEN! ", {
        icon: "⚠️",
        style: {
          border: "1px solid #713200",
          padding: "12px",
          color: "black",
          fontSize: "17px",
          background: "#fae7c7",
        },
        // iconTheme: {
        //   primary: "#713200",
        //   secondary: "#FFFAEE",
        // },
      });
    }
  }
  const remainingToPack = useMemo(() => {
    return itemsList.reduce((accumulator, item) => {
      return accumulator + (item.quantity_item - item.packed_item);
    }, 0);
  }, [itemsList]);
  useEffect(() => {
    codeScanned.length === 13 && scanAndPack();
  }, [codeScanned]);

  useEffect(() => {
    getProducts(orderId);
    setPackList([]);
    setCodeScanned("");
  }, []);

  const filterList = useMemo(() => {
    const cleanedItems = itemsList.filter(
      (item) => item.packed_item !== item.quantity_item
    );
    const displayItems = cleanedItems.slice(limit.start, limit.end);
    return { displayItems, cleanedItems };
  }, [itemsList, limit]);
  return (
    <div className="mb-24">
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
      <BarCodeCameraScanner isLoading={loading} onBarcodeScan={scanAndPack} />
      <div className="sticky top-16  z-20">
        <div className=" w-full bg-white border-b border-b-gray-200 p-3 flex items-center justify-between">
          <div
            className="flex gap-1"
            onClick={() => console.log(remainingToPack())}
          >
            <span className="text-sm">Prendas por empacar: </span>
            <div className="flex gap-1 items-center">
              <span className="font-bold">{remainingToPack}</span>
              <div>
                <svg
                  className="w-5 h-5 text-black"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M13 19.3v-6.7l6-3.4V13c.7 0 1.4.1 2 .4V7.5c0-.4-.2-.7-.5-.9l-7.9-4.4c-.2-.1-.4-.2-.6-.2s-.4.1-.6.2L3.5 6.6c-.3.2-.5.5-.5.9v9c0 .4.2.7.5.9l7.9 4.4c.2.1.4.2.6.2s.4-.1.6-.2l.9-.5c-.3-.6-.4-1.3-.5-2M12 4.2l6 3.3-2 1.1-5.9-3.4 1.9-1m-1 15.1l-6-3.4V9.2l6 3.4v6.7m1-8.5L6 7.5l2-1.2 6 3.5-2 1m8 4.2v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2z" />
                </svg>
              </div>
            </div>
          </div>
          <div
            className="btn btn-sm hover:scale-95"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? (
              <div className="flex gap-1 items-center">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="17"
                  width="17"
                >
                  <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" />
                  <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" />
                </svg>
                Ocultar detalles
              </div>
            ) : (
              <div className="flex gap-1 items-center">
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
                  className="w-4 h-4"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Mostrar detalles
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="overflow-x-hidden">
        <AnimatePresence>
          {filterList.displayItems.map(
            (product, i) =>
              product.packed_item !== product.quantity_item && (
                <motion.div
                  key={i}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => {
                    setProductSelected(
                      product.id_item === productSelected.id_item ? {} : product
                    );
                  }}
                >
                  <DragAddPack productData={product}>
                    {showDetails ? (
                      <PackingCard
                        itemSelected={productSelected}
                        product={product}
                      />
                    ) : (
                      <SmallCardItem
                        itemSelected={productSelected}
                        order={product}
                      />
                    )}
                  </DragAddPack>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {filterList.displayItems.length !== 0 && (
          <div
            id="paginator"
            className="flex mt-4 items-center gap-4 justify-center"
          >
            <div
              onClick={() => {
                limit.start >= step &&
                  setLimit({
                    start: limit.start - step,
                    end: limit.end - step,
                  });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`w-7 h-7 ${
                  limit.start >= step ? "text-blue-600" : "text-gray-500"
                } `}
                viewBox="0 0 16 16"
              >
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />{" "}
              </svg>
            </div>
            <div>
              Página {limit.start / step + 1} de{" "}
              {Math.ceil(filterList.cleanedItems.length / step)} (
              {filterList.cleanedItems.length} ítems)
            </div>
            <div
              onClick={() =>
                limit.end < filterList.cleanedItems.length &&
                setLimit({ start: limit.start + step, end: limit.end + step })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className={`w-7 h-7  ${
                  limit.end < filterList.cleanedItems.length
                    ? "text-blue-600"
                    : "text-gray-500"
                } `}
              >
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />{" "}
              </svg>
            </div>
          </div>
        )}
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
                <span className="loading loading-spinner loading-sm"></span>
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
