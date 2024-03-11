import { useEffect, useState } from "react";
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
  const [measureView, setMeasureView] = useState(false);
  const [measurementData, setMeasurementData] = useState({});
  const { orderId } = useParams();
  const [packsData, setPacksData] = useState([]);
  const [loadingPacks, setLoadingPacks] = useState(false);
  const [packData, setPackData] = useState({});
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

  const getPacks = () => {
    setLoadingPacks(true);
    axios
      .get(`${api}/pick-pack/packs/${orderId}`)
      .then((res) => {
        console.log(res.data);
        setPacksData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al recuperar información de los embalajes");
      })
      .finally(() => setLoadingPacks(false));
  };
  useEffect(() => {
    getPacks();
  }, []);

  return (
    <div className="mb-20 pt-4">
      {!measureView && packedQuantity() && (
        <div className=" text-white  sticky top-16 z-20  mx-auto bg-white flex justify-center gap-2 items-center">
          {packsData.map((pack, i) => (
            <div
              key={i}
              onClick={() => {
                setMeasureView(true);
                setPackData(pack);
                console.log(pack.id_pack);
              }}
              className="bg-blue-500 p-3 flex items-center gap-2 rounded-md"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
              >
                <path
                  fillRule="evenodd"
                  d="M15.528 2.973a.75.75 0 01.472.696v8.662a.75.75 0 01-.472.696l-7.25 2.9a.75.75 0 01-.557 0l-7.25-2.9A.75.75 0 010 12.331V3.669a.75.75 0 01.471-.696L7.443.184l.01-.003.268-.108a.75.75 0 01.558 0l.269.108.01.003 6.97 2.789zM10.404 2L4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461L10.404 2z"
                />
              </svg>
              {i + 1}
            </div>
          ))}

          <div
            onClick={() => setMeasureView(true)}
            className="border text-blue-500 border-blue-500 p-3 hover:bg-blue-500 hover:text-white flex items-center gap-2 rounded-md"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
              className="w-6 h-6"
            >
              <path d="M13 19.3v-6.7l6-3.4V13c.7 0 1.4.1 2 .4V7.5c0-.4-.2-.7-.5-.9l-7.9-4.4c-.2-.1-.4-.2-.6-.2s-.4.1-.6.2L3.5 6.6c-.3.2-.5.5-.5.9v9c0 .4.2.7.5.9l7.9 4.4c.2.1.4.2.6.2s.4-.1.6-.2l.9-.5c-.3-.6-.4-1.3-.5-2M12 4.2l6 3.3-2 1.1-5.9-3.4 1.9-1m-1 15.1l-6-3.4V9.2l6 3.4v6.7m1-8.5L6 7.5l2-1.2 6 3.5-2 1m8 4.2v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2z" />
            </svg>
          </div>
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
              packData={packData}
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
