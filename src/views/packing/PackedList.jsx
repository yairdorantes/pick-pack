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
    <div className="mb-20 pt-4">
      {!measureView && packedQuantity() && (
        <div
          onClick={() => setMeasureView(true)}
          className=" text-white  sticky top-20 z-20 bg-blue-500  w-[90%] mx-auto rounded-lg  py-4 flex justify-center gap-2 items-center"
        >
          <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
            <path
              fillRule="evenodd"
              d="M15.528 2.973a.75.75 0 01.472.696v8.662a.75.75 0 01-.472.696l-7.25 2.9a.75.75 0 01-.557 0l-7.25-2.9A.75.75 0 010 12.331V3.669a.75.75 0 01.471-.696L7.443.184l.01-.003.268-.108a.75.75 0 01.558 0l.269.108.01.003 6.97 2.789zM10.404 2L4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461L10.404 2z"
            />
          </svg>
          Establecer medidas de embalaje
          <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
            <path
              fillRule="evenodd"
              d="M15.528 2.973a.75.75 0 01.472.696v8.662a.75.75 0 01-.472.696l-7.25 2.9a.75.75 0 01-.557 0l-7.25-2.9A.75.75 0 010 12.331V3.669a.75.75 0 01.471-.696L7.443.184l.01-.003.268-.108a.75.75 0 01.558 0l.269.108.01.003 6.97 2.789zM10.404 2L4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461L10.404 2z"
            />
          </svg>
        </div>
      )}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            // style={{ position: "absolute" m}}
          >
            <Measurement
              toggleView={setMeasureView}
              setValues={setMeasurementData}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="">
        {packedQuantity() && !measureView && !isEmpty(measurementData) && (
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
