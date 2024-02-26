import { useState } from "react";
import Modal from "../../components/Modal";
import useStore from "../../../Context";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../../api";

const ModalUnList = ({ modalUnList, setModalUnList }) => {
  const [loading, setLoading] = useState(false);
  const { itemData } = useStore();
  const [quantity, setQuantity] = useState(0);
  const add = () => {
    if (
      quantity + 1 <= itemData.quantity_item - itemData.remaining_item &&
      quantity + 1 <= itemData.quantity_item
    ) {
      setQuantity(quantity + 1);
    }
  };
  const reduce = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const updateQuantity = () => {
    if (itemData.remaining_item + quantity <= itemData.quantity_item) {
      const items = [
        {
          id_item: itemData.id_item,
          remaining_item: itemData.remaining_item + quantity,
        },
      ];
      setLoading(true);
      axios
        .put(`${api}/pick-pack/items`, {
          items,
          firstScan: undefined,
          user: undefined,
        })
        .then(() => {
          toast.success("Alistamiento actualizado");
          setModalUnList(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ups algo salio mal, intenta de nuevo");
        })
        .finally(() => setLoading(false));
    } else {
      toast.error("No puedes enviar ese valor!");
    }
  };
  return (
    <div>
      <Modal isOpen={modalUnList} setIsOpen={setModalUnList}>
        <div className="h-56 w-full flex justify-between flex-col p-4 bg-gray-100">
          <h3 className="font-semibold text-lg"> Desenlistar Prenda</h3>
          <div>
            <div className="text-sm mb-2">{itemData.refId_item}</div>
            <div className="text-sm">{itemData.name_item}</div>
          </div>

          <div className="grid grid-cols-3 gap-4 p-2 border-2 shadow-lg">
            <div className="text-sm flex justify-center items-center">
              Cantidad
            </div>

            <div>
              <div className="flex justify-center">
                <button
                  onClick={reduce}
                  className="bg-gray-200 flex items-center justify-center w-8 h-8 rounded-l-full"
                >
                  -
                </button>
                <div>
                  <input
                    value={quantity}
                    className="w-10 h-8 text-center"
                    type="number"
                    onChange={(e) => {
                      try {
                        setQuantity(parseInt(e.target.value));
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  />
                </div>
                <button
                  onClick={add}
                  className="bg-gray-200 flex items-center justify-center w-8 h-8 rounded-r-full"
                >
                  +
                </button>
              </div>
            </div>
            <button
              disabled={loading}
              onClick={() => {
                if (quantity === 0 || isNaN(quantity)) {
                  toast.error("No puedes enviar este valor");
                } else {
                  updateQuantity();
                }
              }}
              className="flex justify-center items-center py-2 hover:bg-blue-300 hover:text-blue-700  bg-blue-200 rounded-md text-blue-600"
            >
              {loading ? (
                <span className="loading loading-spinner loading-md" />
              ) : (
                "Desenlistar"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalUnList;
