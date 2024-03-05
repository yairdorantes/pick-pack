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
import Measurement from "./Measurement";
import { motion, AnimatePresence } from "framer-motion";

const PackedList = () => {
  const { itemsList } = useStore();
  const [loading, setLoading] = useState(false);
  const [confirmButton, setConfirmButton] = useState(true);
  const [measureView, setMeasureView] = useState(true);
  const [measurementData, setMeasurementData] = useState({});
  const { orderId } = useParams();
  const navigate = useNavigate();

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
        toast.success("¡Confirmación enviada con éxito!");
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
  function isEmpty(obj) {
    return JSON.stringify(obj) === "{}";
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

      <AnimatePresence>
        {measureView && packedQuantity() && (
          <motion.div
            className=""
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Measurement
              toggleView={setMeasureView}
              setValues={setMeasurementData}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="">
        {packedQuantity() && !measureView && (
          <SwipeConfirm
            onConfirm={confirmPacking}
            loading={loading}
            presence={confirmButton}
          />
        )}
      </div>

      <ModalPack packing={false} />
    </div>
  );
};

export default PackedList;
