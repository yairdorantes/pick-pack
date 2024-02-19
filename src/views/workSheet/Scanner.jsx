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

  const { itemsList, setItemsList, codeScanned } = useStore();

  const { getProducts, loading } = useGetItems();
  const handleCode = async () => {
    const orderIndex = itemsList.findIndex(
      (order) => order.ean_item === codeScanned
    );
    if (orderIndex !== -1) {
      const item = itemsList[orderIndex];
      if (item.remaining_item - 1 >= 0) {
        setProductsLoader(item.id_item);
        const resFirst = firstScan(itemsList);
        console.log(resFirst);
        try {
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
          setProductScanned(item);
          const speechTxt =
            item.remaining_item - 1 === 0
              ? `Felicidades Has terminado  ${item.refId_item}`
              : `Listo restan ${item.remaining_item - 1}`;
          setTxtSpeech(speechTxt);
        } catch (err) {
          console.log(err);
          toast.error("Intenta de nuevo", { position: "bottom-center" });
        }
      } else {
        toast("PRENDA YA ALISTADA!", {
          icon: "⚠️",
          position: "bottom-center",
        });
      }
    } else {
      toast("ESTA PRENDA NO ESTÁ EN LA ORDEN!", {
        icon: "⚠️",
        position: "bottom-center",
        style: {
          // border: "1px solid #bf1dff",
          padding: "10px",
          // borderRadius: "10px",
          // borderRadius: "40px",
          // color: "#0ccfb5",
        },
      });
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
  }, []);

  useEffect(() => {
    if (codeScanned.length === 13) {
      handleCode();
    }
    console.log(codeScanned);
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
            {showDetails ? "🙈 Ocultar " : "🙉 Mostrar "}
            detalles
          </div>
        </div>
      </div>
      <div className="overflow-x-hidden">
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
                  <div key={i} className="relative">
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                    >
                      <DragCard
                        setModal={memoizedSetProductModalOpen}
                        productData={order}
                      >
                        {showDetails ? (
                          <ProductCard order={order} />
                        ) : (
                          <SmallCardItem order={order} />
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
        </div>
      </div>
    </div>
  );
};
export default Scanner;
