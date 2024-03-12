import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import Modal from "../../components/Modal";

const InfoWS = () => {
  const { orderId } = useParams();

  const [QRModal, setQRModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});
  function formatToCurrencyMXN(value) {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      return numericValue.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
        minimumFractionDigits: 2,
      });
    } else {
      return "Invalid input";
    }
  }
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${api}/pick-pack/order/${orderId}`)
      .then((res) => {
        setOrder(res.data);
        console.log(res.data);
      })
      .catch(() => toast.error("No se pudo obtener informacion"))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {!loading ? (
        <div className="p-5">
          <h3 className="font-semibold  text-xl mb-3">General</h3>
          <div className="flex py-1 justify-between border-b-2 border-dashed">
            <div>Orden ID</div>
            <strong>{order.idVtex_order}</strong>
          </div>{" "}
          <div className="flex py-1 justify-between border-b-2 border-dashed">
            <div>Sequence</div>
            <strong>{order.sequence_order}</strong>
          </div>
          <div className="flex py-1 justify-between border-b-2 border-dashed">
            <div>Numero de prendas</div>
            <strong>{order.qtyItems_order}</strong>
          </div>
          <div className="flex py-1 justify-between border-b-2 border-dashed">
            <div>cliente</div>
            <div>{order.customerName_order}</div>
          </div>
          <div className="flex py-1 justify-between border-b-2 border-dashed">
            <div>Paqueteria</div>
            <div>{order.courier_order}</div>
          </div>
          <div className="flex py-1 justify-between border-b-2 border-dashed">
            <div>Ciudad</div>
            <div className="">{order.city_order}</div>
          </div>
          <div className="flex py-1 justify-between border-b-2 border-dashed">
            <div>Valor</div>
            <div>MXN {formatToCurrencyMXN(order.value_order)}</div>
          </div>{" "}
          <div className="flex py-1 justify-between border-b-2 border-dashed">
            <div>Contacto</div>
            <div className="flex gap-1 items-center cursor-pointer">
              {showInfo ? order.customerPhone_order : "**************"}
              <div onClick={() => setShowInfo(!showInfo)}>
                {showInfo ? (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="w-[21px] h-[21px]"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14 12c-1.095 0-2-.905-2-2 0-.354.103-.683.268-.973C12.178 9.02 12.092 9 12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-.092-.02-.178-.027-.268-.29.165-.619.268-.973.268z"></path>
                    <path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path>
                  </svg>
                ) : (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="w-[21px] h-[21px]"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558-2.28-2.28c.19-.39.308-.819.308-1.278 0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5-.302.692-1.166 2.342-2.954 3.558z"></path>
                  </svg>
                )}
              </div>
            </div>
          </div>
          {order.idVtex_order && (
            <div
              onClick={() => setQRModal(true)}
              className="w-32 cursor-pointer mx-auto mt-4"
            >
              <QRCode
                size={200}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={order.idVtex_order}
                viewBox={`0 0 256 256`}
              />
            </div>
          )}
          <Modal isOpen={QRModal} setIsOpen={setQRModal}>
            <QRCode
              size={200}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={order.idVtex_order}
              viewBox={`0 0 256 256`}
            />
          </Modal>
        </div>
      ) : (
        <div className="p-5 space-y-6">
          <div className="flex gap-20 animate-pulse">
            <div className="w-1/2 bg-gray-200 h-4 rounded-xl"></div>
            <div className="w-1/2 bg-gray-200 h-4 rounded-xl"></div>
          </div>{" "}
          <div className="flex gap-20 animate-pulse">
            <div className="w-1/2 bg-gray-200 h-4 rounded-xl"></div>
            <div className="w-1/2 bg-gray-200 h-4 rounded-xl"></div>
          </div>{" "}
          <div className="flex gap-20 animate-pulse">
            <div className="w-1/2 bg-gray-200 h-4 rounded-xl"></div>
            <div className="w-1/2 bg-gray-200 h-4 rounded-xl"></div>
          </div>{" "}
          <div className="flex gap-20 animate-pulse">
            <div className="w-1/2 bg-gray-200 h-4 rounded-xl"></div>
            <div className="w-1/2 bg-gray-200 h-4 rounded-xl"></div>
          </div>{" "}
          <div className="flex gap-20 animate-pulse">
            <div className="w-1/2 bg-gray-200 h-4 rounded-xl"></div>
            <div className="w-1/2 bg-gray-200 h-4 rounded-xl"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoWS;
