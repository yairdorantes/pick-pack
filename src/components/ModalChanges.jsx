import { useNavigate, useParams } from "react-router-dom";
import { useGetItems } from "../scripts/getProducts";
import Modal from "./Modal";
import axios from "axios";
import { api } from "../../api";
import toast from "react-hot-toast";
import { flushSync } from "react-dom";
const ModalChanges = ({ isOpen, setIsOpen, handleModal, action }) => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { getProducts } = useGetItems();
  function handleAction() {
    if (action === "restart") {
      axios
        .post(`${api}/pick-pack/rebootWS/${orderId}`)
        .then(() => {
          console.log("rebot success");
          getProducts(orderId);
        })
        .catch((err) => toast.error("ups algo salio mal"));
    } else {
      axios
        .post(`${api}/pick-pack/change_status`, {
          order: orderId,
          status: 5,
          statusName: "Surtido",
        })
        .then(() => {
          toast.success("Cambio de status exitoso!");
          if (!document.startViewTransition) {
            navigate(`/pack/${orderId}`);
            return;
          }
          document.startViewTransition(() =>
            flushSync(() => navigate(`/pack/${orderId}`))
          );
        })
        .catch(() => toast.error("ups, algo salió mal"));
    }
    setIsOpen(false);
  }
  return (
    <Modal setIsOpen={setIsOpen} isOpen={isOpen} handleModal={handleModal}>
      <div data-theme="" className="card mx-auto  w-full bg-gray-200">
        <div className="card-body items-center text-center ">
          <h2 className="card-title text-red-600">
            {action === "restart"
              ? "Reiniciar Hoja de trabajo"
              : "Enviar Hoja de trabajo terminada"}
          </h2>
          <p>¿Deseas llevar a cabo esta accion?</p>
          <div className="card-actions justify-end">
            <button
              onClick={handleAction}
              className="btn btn-success text-white"
            >
              Aceptar
            </button>
            <button
              className="btn btn-error text-white"
              onClick={() => setIsOpen(false)}
            >
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalChanges;
