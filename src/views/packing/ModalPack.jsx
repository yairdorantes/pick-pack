import { useEffect, useState } from "react";
import useStore from "../../../Context";
import Modal from "../../components/Modal";
import axios from "axios";
import { api } from "../../../api";
import toast from "react-hot-toast";
import { firstPack } from "../../scripts/firstPack";
import { useParams } from "react-router-dom";
const ModalPack = ({ packing = true }) => {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(false);

  const { modalPack, setModalPack, itemData, itemsList, setItemsList } =
    useStore();

  const [quantity, setQuantity] = useState(0);

  function Add() {
    if (packing) {
      if (
        quantity < itemData.quantity_item &&
        quantity + 1 <= itemData.quantity_item - itemData.packed_item
      ) {
        setQuantity(quantity + 1);
      }
    } else {
      if (quantity < itemData.packed_item) {
        setQuantity(quantity + 1);
      }
    }
  }
  function Reduce() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }
  function sendPackData() {
    let packList = [];
    if (packing) {
      if (
        quantity <= itemData.quantity_item &&
        quantity <= itemData.quantity_item - itemData.packed_item
      ) {
        packList = [
          {
            id_item: itemData.id_item,
            packed_item: itemData.packed_item + quantity,
          },
        ];
        updatePacking(packList);
      }
    } else {
      if (itemData.packed_item - quantity >= 0) {
        packList = [
          {
            id_item: itemData.id_item,
            packed_item: itemData.packed_item - quantity,
          },
        ];
        updatePacking(packList);
      }
    }
  }
  function updatePacking(packList) {
    const resPack = firstPack(itemsList);
    const updateStatus = { order: orderId };
    setLoading(true);
    axios
      .put(`${api}/pick-pack/pack_items`, {
        items: packList,
        firstPacking: resPack ? updateStatus : undefined,
      })
      .then(() => {
        toast.success("¡Empaque actualizado!");
        setModalPack(false);

        const updateList = itemsList.map((obj) =>
          obj.id_item === itemData.id_item
            ? {
                ...obj,
                packed_item: packing
                  ? itemData.packed_item + quantity
                  : itemData.packed_item - quantity,
              }
            : obj
        );
        setItemsList(updateList);
        console.log(updateList);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "error, no se puedo actualizar el empaquetado, intenta de nuevo"
        );
      })
      .finally(() => setLoading(false));
    // .finally(() => setLoading(false));
  }

  useEffect(() => {
    setQuantity(0);
  }, [modalPack]);

  return (
    <Modal isOpen={modalPack} setIsOpen={setModalPack}>
      <div className="h-56 w-full flex justify-between flex-col p-4 bg-gray-100">
        <h3 className="font-semibold text-lg">
          {" "}
          {packing ? "Empacar" : "Desempacar"} Producto
        </h3>
        <div>
          <div className="text-sm mb-2">{itemData.refId_item}</div>
          <div className="text-sm">{itemData.name_item}</div>
        </div>
        {/* <p className="text-sm font-semibold">
          Especifica la cantidad de unidades a{" "}
          {packing ? "Empaquetar" : "Desempaquetar"}
        </p> */}
        <div className="grid grid-cols-3 gap-4 p-2 border-2 shadow-lg">
          <div className="text-sm flex justify-center items-center">
            Cantidad
          </div>
          {/* <div className="flex justify-center">
            {packing ? itemData.quantity_item : itemData.packed_item}
          </div> */}
          <div>
            <div className="flex justify-center">
              <button
                onClick={Reduce}
                className="bg-gray-200 flex items-center justify-center w-8 h-8 rounded-l-full"
              >
                -
              </button>
              <div>
                <input
                  value={quantity}
                  className="w-10 h-8 text-center"
                  type="number"
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </div>
              <button
                onClick={Add}
                className="bg-gray-200 flex items-center justify-center w-8 h-8 rounded-r-full"
              >
                +
              </button>
            </div>
          </div>
          <button
            disabled={quantity === 0 || isNaN(quantity)}
            onClick={sendPackData}
            className="flex justify-center items-center py-2 hover:bg-blue-300 hover:text-blue-700  bg-blue-200 rounded-md text-blue-600"
          >
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : packing ? (
              "Empacar"
            ) : (
              "Desempacar"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default ModalPack;
