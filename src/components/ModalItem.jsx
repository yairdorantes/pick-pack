import { useEffect, useState } from "react";
import Modal from "./Modal";
import toast from "react-hot-toast";
import useStore from "../../Context";
import { firstScan } from "../scripts/firstScan";
import { useParams } from "react-router-dom";
import useUpdateItemQuantity from "../scripts/updateItemQuantity";
import Camera, { FACING_MODES } from "react-html5-camera-photo";
import CameraScan from "./CameraScan";

const ModalItem = ({ isOpen, setIsOpen, setProductsLoader, setSavingItem }) => {
  const { itemData, itemsList, setItemsList } = useStore();
  const { orderId } = useParams();
  const { updateItemQuantity } = useUpdateItemQuantity();
  const [showCamera, setShowCamera] = useState(false);

  //   const [isOpen, setIsOpen] = useState(true);
  const [quantity, setQuantity] = useState(1);
  //   const [itemData, setItemData] = useState({});
  function increaseQuantity() {
    if (quantity < itemData.remaining_item) setQuantity(quantity + 1);
  }
  function dicreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  async function handleQuantity() {
    if (quantity >= 1 && quantity <= itemData.remaining_item) {
      // order = order.filter((item) => item.remaining_item > 0);
      setIsOpen(false);
      setSavingItem(true);
      setProductsLoader(itemData.id_item);

      try {
        const resFirst = firstScan(itemsList);
        await updateItemQuantity(
          itemData.id_item,
          itemData.remaining_item - quantity,
          setSavingItem,
          resFirst
        );
        let order = itemsList;
        order = order.map((item) => {
          if (item.id_item === itemData.id_item) {
            return {
              ...item,
              remaining_item: item.remaining_item - quantity,
            };
          }

          return item;
        });
        setItemsList(order);
        toast.success("Hoja de trabajo Actualizada");
      } catch (error) {
        console.log(error);
        toast.error("Intenta de nuevo", { position: "bottom-center" });
      }
    } else {
      toast.error("No es posible modificar ");
    }
    setSavingItem(false);
  }
  async function pickAll() {
    try {
      setIsOpen(false);
      setSavingItem(true);
      setProductsLoader(itemData.id_item);
      console.log(itemData.id_item);
      const resFirst = firstScan(itemsList);
      await updateItemQuantity(itemData.id_item, 0, setSavingItem, resFirst);
      let updatedItems = itemsList;
      updatedItems = updatedItems.map((item) => {
        if (item.id_item === itemData.id_item) {
          return {
            ...item,
            remaining_item: 0,
          };
        }

        return item;
      });
      // console.log(updatedItems);
      setItemsList(updatedItems);
      toast.success("Hoja de trabajo Actualizada");
    } catch (error) {
      console.log(error);
      // toast.error("Intenta de nuevo");
      toast.error("Intenta de nuevo", { position: "bottom-center" });

      setIsOpen(false);
    }
    setSavingItem(false);
  }
  useEffect(() => {
    // console.log(`ws-${itemData.orden_item}`);
  }, [isOpen]);
  return (
    <div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div>
          <div
            onClick={() => setIsOpen(false)}
            className="absolute rounded-full border-2 border-error  top-3 z-10 right-3"
          >
            <svg
              className="text-error w-7 h-7"
              fill="none"
              viewBox="0 0 15 15"
              height="1em"
              width="1em"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      Alistar item
                    </h3>
                    <div className="mt-2">
                      <div className="flex">
                        <img
                          src={itemData.imageUrl_item}
                          alt="Polo shirt"
                          className="w-[100px] h-[100px] border-2 rounded-md"
                          width="100"
                          height="100"
                          style={{ aspectRatio: "100/100", objectFit: "cover" }}
                        />
                        <div className="ml-4 text-left">
                          <div className="text-sm text-gray-900">
                            <span className="font-semibold">
                              {itemData.refId_item}
                            </span>{" "}
                            <hr />
                            {itemData.name_item}
                          </div>
                          <p className="text-sm text-gray-500">
                            EAN: {itemData.ean_item}
                          </p>
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700">
                              Cantidad:
                            </p>
                            <p className="text-sm text-gray-700">
                              {itemData.remaining_item} unidades
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="quantity"
                          className="text-sm font-medium text-gray-700 block"
                        >
                          ¿Cuántas unidades estás alistando?
                        </label>
                        <div className="mt-1 flex justify-between  items-centerrounded-md shadow-sm">
                          <button
                            onClick={dicreaseQuantity}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  h-10 px-4 py-2 bg-blue-500 text-white"
                          >
                            -
                          </button>
                          <div className="flex">
                            <input
                              id="quantity-input"
                              className="focus:ring-indigo-500 w-20 text-center   focus:border-indigo-500 flex-1 block text-black bg-white rounded-xl sm:text-sm border-gray-300"
                              placeholder="1"
                              type="number"
                              value={quantity}
                              onChange={(e) => setQuantity(e.target.value)}
                              name="quantity"
                            />
                          </div>
                          <button
                            onClick={increaseQuantity}
                            className="inline-flex  items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  h-10 px-4 py-2 bg-blue-500 text-white"
                          >
                            +
                          </button>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {quantity} unidades
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="btn w-full "
                onClick={() => setShowCamera(!showCamera)}
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 15 15"
                  height="1em"
                  width="1em"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M2.5 1A1.5 1.5 0 001 2.5V5H0V2.5A2.5 2.5 0 012.5 0H5v1H2.5zm10 0H10V0h2.5A2.5 2.5 0 0115 2.5V5h-1V2.5A1.5 1.5 0 0012.5 1zm.5 7H2V7h11v1zM0 12.5V10h1v2.5A1.5 1.5 0 002.5 14H5v1H2.5A2.5 2.5 0 010 12.5zm14 0V10h1v2.5a2.5 2.5 0 01-2.5 2.5H10v-1h2.5a1.5 1.5 0 001.5-1.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div
                className={` transition-all ${
                  showCamera ? "h-auto" : "h-0"
                } overflow-hidden `}
              >
                <CameraScan
                  EAN={itemData.ean_item}
                  onDetected={() => {
                    handleQuantity();
                  }}
                />
              </div>
              {!showCamera && (
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleQuantity}
                    className="items-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Confirmar alistamiento
                  </button>
                  <button
                    onClick={pickAll}
                    className="items-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-10 mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Confirmar y alistar todas las unidades
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalItem;
