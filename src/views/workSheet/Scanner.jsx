import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ModalItem from "../../components/ModalItem";
import { AnimatePresence, motion } from "framer-motion";
import DragCard from "../../components/DragCard";
import ModalChanges from "../../components/ModalChanges";
import ProductCard from "../../components/ProductCard";
import useStore from "../../../Context";
import { useGetItems } from "../../scripts/getProducts";
import toast from "react-hot-toast";
import useUpdateItemQuantity from "../../scripts/updateItemQuantity";
import { firstScan } from "../../scripts/firstScan";
import AlertScan from "../../components/AlertScan";
import CardLoader from "../../components/CardLoader";
import SmallCardItem from "../../components/SmallCardItem";
import BarCodeCameraScanner from "../../components/BarCodeCameraScanner";
const step = 10;
const Scanner = () => {
  const { updateItemQuantity } = useUpdateItemQuantity();

  const [limit, setLimit] = useState({ start: 0, end: step });
  const [productModalOpen, setProductModalOpen] = useState(false);
  const memoizedSetProductModalOpen = useMemo(() => {
    return setProductModalOpen;
  }, []); // No dependencies, it won't be recreated on prop changes

  const [showDetails, setShowDetails] = useState(true);
  const [modalChanges, setModalChanges] = useState(false);
  const [modalChangesAction, setModalChangesAction] = useState("");
  const [savingItem, setSavingItem] = useState(false);
  const [productsLoader, setProductsLoader] = useState(0);
  const [productScanned, setProductScanned] = useState({});
  const [txtSpeech, setTxtSpeech] = useState("");
  const { orderId } = useParams();
  const [itemSelected, setItemSelected] = useState({});

  const {
    itemsList,
    setItemsList,
    codeScanned,
    setCodeScanned,
    setBarcodeScanner,
  } = useStore();

  const { getProducts, loading } = useGetItems();
  const handleCode = async () => {
    console.log("function scan called!!!***");
    // console.log(codeScanned == itemsList[0].ean_item);

    const orderIndex = itemsList.findIndex(
      (order) => order.ean_item === codeScanned
    );
    if (orderIndex !== -1) {
      if (!savingItem) {
        const item = itemsList[orderIndex];
        if (item.remaining_item - 1 >= 0) {
          setProductsLoader(item.id_item);
          const resFirst = firstScan(itemsList);

          try {
            setSavingItem(true);
            await updateItemQuantity(
              item.id_item,
              item.remaining_item - 1,
              setSavingItem,
              resFirst
            );
            if (itemsList[orderIndex].remaining_item > 0) {
              const updatedOrders = [...itemsList];
              updatedOrders[orderIndex] = {
                ...updatedOrders[orderIndex],
                remaining_item: updatedOrders[orderIndex].remaining_item - 1,
              };
              setItemsList(updatedOrders);
            }
            setBarcodeScanner(false);
            setProductScanned(item);

            // const speechTxt =
            //   item.remaining_item - 1 === 0
            //     ? `Felicidades Has terminado  ${item.refId_item}`
            //     : `Listo restan ${item.remaining_item - 1}`;
            // setTxtSpeech(speechTxt);
          } catch (err) {
            console.log(err);
            toast.error("Intenta de nuevo");
          } finally {
            setSavingItem(false);
            setCodeScanned("");
          }
        } else {
          toast("PRENDA YA ALISTADA ", {
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
        setCodeScanned("");
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
      setCodeScanned("");
    }
  };

  function countItems(list) {
    return list.reduce((count, element) => count + element.remaining_item, 0);
  }
  const countItemsMemoized = useMemo(() => {
    return countItems(itemsList);
  }, [itemsList]);

  useEffect(() => {
    getProducts(orderId);
    setCodeScanned("");
  }, []);

  useEffect(() => {
    if (codeScanned.length === 13) {
      console.log("CODE SCANNED:", codeScanned);
      handleCode();
    }
    // console.log(codeScanned);
    // console.log("hereeee scanner got uuu");
  }, [codeScanned]);

  const filterList = useMemo(() => {
    const cleanedItems = itemsList.filter((item) => item.remaining_item !== 0);
    const displayItems = cleanedItems.slice(limit.start, limit.end);
    return { displayItems, cleanedItems };
  }, [itemsList, limit]);
  return (
    <div>
      <AlertScan
        number={
          productScanned.remaining_item && productScanned.remaining_item - 1
        }
        sku={productScanned.refId_item}
        SpeechTxt={txtSpeech}
      />
      <BarCodeCameraScanner onBarcodeScan={handleCode} isLoading={savingItem} />

      <div className="sticky top-16 z-20">
        <div className="w-full z-20 border-2 border-opacity-100 rounded-md bg-white  border-gray-200 p-3 flex items-center justify-between">
          <div className="flex gap-1 text-black">
            <div>Prendas restantes:</div>

            <span
              className={`font-bold  ${
                Object.keys(productScanned).length !== 0 && "pulse2"
              }`}
            >
              {countItemsMemoized}
            </span>
            <div>
              <svg
                viewBox="0 0 512 512"
                fill="currentColor"
                height="1em"
                width="1em"
                className="text-black"
              >
                <path d="M256 42c-33.88 0-64-10-64-10v2a64 64 0 00128 0v-2s-30.12 10-64 10z" />
                <path d="M352 44c-5.49 47.76-46.79 85-96 85s-90.51-37.24-96-85L16 94l18 114 61.71 7.42c7.08.9 7.1.9 7.1 8.19L96 480h320l-6.81-256.39c-.21-7-.21-7 7.1-8.19L478 208l18-114z" />
              </svg>
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
      <div className="">
        <ModalItem
          isOpen={productModalOpen}
          setIsOpen={setProductModalOpen}
          setProductsLoader={setProductsLoader}
          setSavingItem={setSavingItem}
        />

        {countItemsMemoized === 0 && (
          <ModalChanges
            isOpen={modalChanges}
            setIsOpen={setModalChanges}
            action={modalChangesAction}
          />
        )}
        {/* show this when fetching items */}
        {loading && (
          <div className="">
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
        {/* show this when fetching items */}

        <div className="sticky flex justify-center items-center gap-1 font-semibold top-[116px] z-20 bg-blue-500 text-white text-center w-full">
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M256 42c-33.88 0-64-10-64-10v2a64 64 0 00128 0v-2s-30.12 10-64 10z" />
            <path d="M352 44c-5.49 47.76-46.79 85-96 85s-90.51-37.24-96-85L16 94l18 114 61.71 7.42c7.08.9 7.1.9 7.1 8.19L96 480h320l-6.81-256.39c-.21-7-.21-7 7.1-8.19L478 208l18-114z" />
          </svg>
          Alistamiento{" "}
          <svg
            viewBox="0 0 512 512"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M256 42c-33.88 0-64-10-64-10v2a64 64 0 00128 0v-2s-30.12 10-64 10z" />
            <path d="M352 44c-5.49 47.76-46.79 85-96 85s-90.51-37.24-96-85L16 94l18 114 61.71 7.42c7.08.9 7.1.9 7.1 8.19L96 480h320l-6.81-256.39c-.21-7-.21-7 7.1-8.19L478 208l18-114z" />
          </svg>
        </div>
        <div className="flex  mx-auto flex-col mb-16 ">
          {countItemsMemoized === 0 && !loading && (
            <div>
              <div
                className="flex items-center max-w-lg mx-auto p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50  "
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="text-lg ">
                  Alistamiento de Prendas finalizado
                </div>
              </div>
              <div id="options">
                <div
                  onClick={() => {
                    setModalChanges(true);
                    setModalChangesAction("restart");
                  }}
                  className="bg-error text-white w-3/4 mx-auto text-lg rounded-lg p-4"
                >
                  <div>
                    <svg
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="font-bold text-center mx-auto w-8 h-8"
                    >
                      <path d="M125.7 160H176c17.7 0 32 14.3 32 32s-14.3 32-32 32H48c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32s32 14.3 32 32v51.2l17.6-17.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3-163.8-62.5-226.3 0L125.7 160z" />
                    </svg>
                  </div>
                  <div className="text-center font-semibold">
                    Reiniciar hoja de alistamiento
                  </div>
                </div>
                <div
                  onClick={() => {
                    setModalChanges(true);
                    setModalChangesAction("change_status");
                  }}
                  className="bg-success mt-5 text-white w-3/4 mx-auto text-lg rounded-lg p-4"
                >
                  <div>
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      className="mx-auto w-8 h-8"
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                  </div>
                  <div className="text-center font-semibold">
                    Confirmar Alistamiento
                  </div>
                </div>
              </div>
            </div>
          )}
          <AnimatePresence>
            {filterList.displayItems.map(
              (order, i) =>
                order.remaining_item > 0 && (
                  <div key={i} className="relative overflow-x-hidden">
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => {
                        setItemSelected(
                          order.id_item === itemSelected.id_item ? {} : order
                        );
                      }}
                    >
                      <DragCard
                        setModal={memoizedSetProductModalOpen}
                        productData={order}
                      >
                        {showDetails ? (
                          <ProductCard
                            itemSelected={itemSelected}
                            order={order}
                          />
                        ) : (
                          <SmallCardItem
                            itemSelected={itemSelected}
                            order={order}
                          />
                        )}
                      </DragCard>
                    </motion.div>
                    {savingItem && productsLoader === order.id_item && (
                      <div className="flex justify-center items-center bg-gray-100 bg-opacity-60 absolute z-20 w-full h-full top-0">
                        <span className="loading loading-spinner loading-lg text-error" />
                      </div>
                    )}
                  </div>
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
                {Math.ceil(filterList.cleanedItems.length / step)}
                {/* (
                {filterList.cleanedItems.length} ítems) */}{" "}
                ({countItemsMemoized} prendas)
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
        </div>
      </div>
    </div>
  );
};
export default Scanner;
