import { useState } from "react";
import useStore from "../../../Context";
import DragReducePack from "./DragReducePack";
import ModalPack from "./ModalPack";
import PackedCard from "./PackedCard";
import SwipeConfirm from "../../components/SwipeConfirm";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { flushSync } from "react-dom";

const PackedList = () => {
  const { itemsList } = useStore();
  const [loading, setLoading] = useState(false);
  const [confirmButton, setConfirmButton] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();

  function countPacked() {
    let allPacked = true;
    itemsList.forEach((obj) => {
      if (obj.packed_item !== obj.quantity_item) {
        allPacked = false;
        return;
      }
    });
    return allPacked;
  }
  const changePage = (data) => {
    if (!document.startViewTransition) {
      navigate(`/end/${orderId}`);
      return;
    }
    document.startViewTransition(() =>
      flushSync(() => navigate(`/end/${orderId}`))
    );
  };

  function confirmPacking() {
    setLoading(true);
    axios
      .post(`${api}/pick-pack/change_status`, {
        order: orderId,
        status: 7,
        statusName: "Empacado",
      })
      .then(() => {
        toast.success("¡Confirmación enviada con éxito!", {
          position: "bottom-center",
        });
        // if (!document.startViewTransition) {
        //   navigate(`/pack/${orderId}`);
        //   return;
        // }
        // document.startViewTransition(() =>
        //   flushSync(() => navigate(`/pack/${orderId}`))
        // );
        setConfirmButton(false);
        setTimeout(() => {
          changePage();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("ups, algo salió mal");
      })
      .finally(() => setLoading(false));
  }
  function packedQuantity() {
    let countQuantity = 0;
    let packedQuantity = 0;
    itemsList.forEach((item) => {
      countQuantity += item.quantity_item;
      packedQuantity += item.packed_item;
    });
    return countQuantity === packedQuantity;
  }

  return (
    <div>
      {itemsList.map(
        (product, i) =>
          product.packed_item !== 0 && (
            <DragReducePack productData={product} key={i}>
              <PackedCard product={product} />
            </DragReducePack>
          )
      )}
      {packedQuantity() && (
        <SwipeConfirm
          onConfirm={confirmPacking}
          loading={loading}
          presence={confirmButton}
        />
      )}
      <ModalPack packing={false} />
    </div>
  );
};

export default PackedList;
