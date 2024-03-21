import axios from "axios";
import Modal from "../../components/Modal";
import { api } from "../../../api";
import toast from "react-hot-toast";
import { useState } from "react";

const ModalOrderInfo = ({ isOpen, setIsOpen, changeTable }) => {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const getOrderInfo = () => {
    setLoading(true);
    axios
      .get(`${api}/pick-pack/orderInfo/${orderId}`)
      .then((res) => {
        console.log(res.data);
        changeTable([res.data]);
        setIsOpen(false);
        toast.success("Orden encontrada!");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.code === 404) {
          toast.error("Orden no encontrada!, intenta con otro identificador ");
        } else {
          toast.error(
            "Algo salio mal al intentar obtener información de la orden"
          );
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="p-4">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text font-semibold">
              Vtex id o Sequence de la orden a consultar:
            </span>
          </div>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value.trim())}
            placeholder="555777..."
            className="input input-bordered w-full input-info max-w-xs"
          />
        </label>
        <div className="text-center mt-4">
          <button
            disabled={loading || orderId.length === 0}
            onClick={getOrderInfo}
            className={`btn w-1/2 btn-info text-white`}
          >
            {loading ? (
              <span className="loading loading-spinner text-info"></span>
            ) : (
              "Consultar"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalOrderInfo;
