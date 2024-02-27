import axios from "axios";
import NavBar from "../../components/NavBar";
import { api } from "../../../api";
import useStore from "../../../Context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";

const HistoryContainer = () => {
  const { user } = useStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getData = () => {
    setLoading(true);
    axios
      .get(`${api}/pick-pack/orders/history/${user.id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getData();
  }, []);

  const getStringStatus = (idStatus) => {
    switch (idStatus) {
      case 1:
        return "Pendiente de pago";
      case 2:
        return "Ventana de cancelación";
      case 3:
        return "Listo para manejo";
      case 4:
        return "Surtiendo";
      case 5:
        return "Surtido";
      case 6:
        return "Empacando";
      case 7:
        return "Empacado";
      case 8:
        return "Embarcado";
      case 9:
        return "Entregado";
      case 10:
        return "Ticket generado";
      case 11:
        return "Facturado";
      case 12:
        return "Solicitud de cancelación";
      case 13:
        return "Cancelado";
      case 14:
        return "Reemplazado";
      case 15:
        return "Incompleto";
      default:
        return "Unknown";
    }
  };

  const goOrder = (orderId) => {
    if (!document.startViewTransition) {
      navigate(`/picking/${orderId}`);
      return;
    }
    document.startViewTransition(() =>
      flushSync(() => navigate(`/picking/${orderId}`))
    );
  };
  return (
    <NavBar>
      <div className="">
        <div className="mt-2 text-center font-semibold text-lg">
          Ordenes que has preparado
        </div>
        <div className="overflow-x-auto w-screen">
          <table className="table border-2 text-center table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Orden</th>
                <th>Estatus</th>
                <th>Fecha de creación</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, i) => (
                <tr
                  onClick={() => {
                    goOrder(order.idVtex_order);
                  }}
                  key={i}
                  className="cursor-pointer"
                >
                  <th className="whitespace-nowrap">{order.idVtex_order}</th>
                  <td> {getStringStatus(order.status2_order)}</td>
                  <td className="whitespace-nowrap">
                    {order.creationDate_order}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {loading && (
          <div className="flex justify-center ">
            <span className="loading text-info  loading-dots loading-lg"></span>
          </div>
        )}
        {!loading && data.length === 0 && (
          <div className="text-center text-xl font-bold">Sin datos</div>
        )}
      </div>
    </NavBar>
  );
};

export default HistoryContainer;
