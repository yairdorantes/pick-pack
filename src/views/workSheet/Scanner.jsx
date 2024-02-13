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

const Scanner = () => {
  const { updateItemQuantity } = useUpdateItemQuantity();
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
  const [productClicked, setProductClicked] = useState({});
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
          toast.error("Intenta de nuevo");
        }
      } else {
        toast("PRENDA YA ALISTADA!", {
          icon: "⚠️",
        });
      }
    } else {
      toast("ESTA PRENDA NO ESTÁ EN LA ORDEN!", {
        icon: "⚠️",
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
        <div className="w-full z-20 border-2 border-opacity-100 rounded-md bg-white  border-gray-200 p-4 flex items-center justify-between  ">
          <div className="flex gap-1 text-black">
            <div>Items restantes:</div>
            <span
              className={`font-bold  ${
                Object.keys(productScanned).length !== 0 && "pulse2"
              }`}
            >
              {countItemsMemoized}
            </span>
            <div>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                className="text-black"
                height="20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M483.2 790.3L861.4 412c1.7-1.7 2.5-4 2.3-6.3l-25.5-301.4c-.7-7.8-6.8-13.9-14.6-14.6L522.2 64.3c-2.3-.2-4.7.6-6.3 2.3L137.7 444.8a8.03 8.03 0 0 0 0 11.3l334.2 334.2c3.1 3.2 8.2 3.2 11.3 0zm62.6-651.7l224.6 19 19 224.6L477.5 694 233.9 450.5l311.9-311.9zm60.16 186.23a48 48 0 1 0 67.88-67.89 48 48 0 1 0-67.88 67.89zM889.7 539.8l-39.6-39.5a8.03 8.03 0 0 0-11.3 0l-362 361.3-237.6-237a8.03 8.03 0 0 0-11.3 0l-39.6 39.5a8.03 8.03 0 0 0 0 11.3l243.2 242.8 39.6 39.5c3.1 3.1 8.2 3.1 11.3 0l407.3-406.6c3.1-3.1 3.1-8.2 0-11.3z"></path>
              </svg>
            </div>
          </div>
          <div
            className="btn btn-sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "👀 Ocultar " : "👁️Mostrar "}
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
            {itemsList.map(
              (order, i) =>
                order.remaining_item > 0 && (
                  <div key={i} className="relative">
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                    >
                      <DragCard
                        productData={order}
                        setModal={memoizedSetProductModalOpen}
                      >
                        <ProductCard order={order} showDetails={showDetails} />
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
        </div>
      </div>
    </div>
  );
};
export default Scanner;
