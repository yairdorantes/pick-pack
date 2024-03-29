import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import toast from "react-hot-toast";
import { useGetItems } from "../../scripts/getProducts";
import useStore from "../../../Context";
import Filters from "./Filters";

const PendingPicking = () => {
  const navigate = useNavigate();
  // const [query, setQuery] = useState("");
  const [pendingOrders, setPendingOrders] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useStore();
  const [usersList, setUsersList] = useState([]);
  const [wsSelected] = useState(() => {
    const storedWs = localStorage.getItem("ws-picking");
    return storedWs ? storedWs : "";
  });
  const { getProducts } = useGetItems();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${api}/pick-pack/orders_status`, { params: { status: [3, 4] } })
      .then((res) => {
        console.log(res.data);
        // const usersOrders = res.data.filter(
        //   (order) =>
        //     order.picking_assigment !== null &&
        //     order.picking_assigment.includes(user.id)
        // );
        setPendingOrders(res.data.ordersList);
        setFilteredData(res.data.ordersList);
        setUsersList(res.data.usersList);
        // console.log(usersOrders);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error");
      })
      .finally(() => {
        setLoading(false);
      });
    // setTimeout(() => {
    // }, 1000);
    //! this is for test
    // setFilteredData(dataExample);
  }, []);
  const getStatusString = (statusNumber) => {
    switch (statusNumber) {
      case 1:
        return "Pendiente de pago";
      case 2:
        return "Ventana de cancelación";
      case 3:
        return "Listo para manejo ";
      case 4:
        return "Surtiendo ";
      case 5:
        return "Surtido ";
      case 6:
        return "Empacando ";
      case 7:
        return "Empacado ";
      case 8:
        return "Embarcado ";
      case 9:
        return "Entregado ";
      case 10:
        return "Ticket generado ";
      case 11:
        return "Facturado ";
      case 12:
        return "Solicitud de cancelación";
      case 13:
        return "Cancelado ";
      case 14:
        return "Reemplazado ";
      case 15:
        return "Incompleto ";
      default:
        return "";
    }
  };

  const handleOrderClick = (data) => {
    if (
      (data.picking_assigment && data.picking_assigment.includes(user.id)) ||
      user.rol <= 3
    ) {
      localStorage.setItem("ws-picking", data.idVtex_order);
      getProducts(data.idVtex_order);
      if (!document.startViewTransition) {
        navigate(`/picking/${data.idVtex_order}`);
        return;
      }
      document.startViewTransition(() =>
        flushSync(() => navigate(`/picking/${data.idVtex_order}`))
      );
    } else {
      toast.error("No tienes esta orden asiganda");
    }
  };

  const filterMyOrders = (filterOrders) => {
    if (filterOrders) {
      const filteredResults = pendingOrders.filter((order) => {
        return (
          order.picking_assigment && order.picking_assigment.includes(user.id)
        );
      });
      setFilteredData(filteredResults);
    } else {
      setFilteredData(pendingOrders);
    }
  };
  function firstWord(str) {
    // Split the string by whitespace and get the first element
    const words = str.trim().split(/\s+/);
    return words[0];
  }
  const getUserNames = (usersIdAssigment) => {
    const usersNames = usersIdAssigment.map((id) => {
      const user = usersList.find((user) => user.id_user === id);
      return user
        ? `${firstWord(user.lastname_user)} ${user.name_user}`
        : "desconocido";
    });
    return usersNames.join(", ");
  };
  return (
    <div className="mb-10">
      {/* <h1 className="font-semibold flex justify-center items-center gap-2  text-center text-black mt-4">
        <div className="w-4 h-4 rounded-full bg-blue-600"></div>

        <div>Alistamiento</div>

        <div className="w-4 h-4 rounded-full bg-blue-600"></div>
      </h1> */}

      <div className="sticky top-20 z-20 bg-white">
        <Filters
          changeFilteredData={setFilteredData}
          originalData={pendingOrders}
        />
        <div
          id="filterMyOrders"
          className="form-control mb-3 inline-block ml-4 border-2 rounded-lg shadow-sm"
        >
          <label className="cursor-pointer label">
            <span className="label-text mr-2  font-semibold">Mis ordenes:</span>
            <input
              onChange={(e) => filterMyOrders(e.target.checked)}
              type="checkbox"
              // checked="checked"
              className="checkbox checkbox-info"
            />
          </label>
        </div>
      </div>
      {wsSelected.length > 0 && (
        <div className="text-center mb-3">
          Última orden seleccionada:{" "}
          <span
            onClick={() => {
              handleOrderClick({
                idVtex_order: wsSelected,
                picking_assigment: [user.id],
              });
            }}
            className="link link-info"
          >
            {wsSelected}
          </span>
        </div>
      )}
      <div className="text-center font-semibold">
        Total: {pendingOrders.length} ordenes{" "}
      </div>

      <div className="overflow-x-auto w-screen h-[55vh]  mx-auto">
        <table
          className="table table-zebra table-pin-rows border-2 text-center"
          data-theme=""
        >
          <thead>
            <tr className="text-black">
              <th className="">Orden ID</th>
              <th className="">Sequence</th>
              <th className="">Estatus</th>
              <th className="">Paqueteria</th>
              <th>Colaboradores Asignados(PICKING)</th>
              <th>Colaboradores Asignados(PACKING)</th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              filteredData.map((order, i) => (
                <tr
                  onClick={() => handleOrderClick(order)}
                  key={i}
                  className={`${
                    wsSelected === order.idVtex_order && "!bg-blue-200"
                  } cursor-pointer`}
                >
                  <td className="">{order.idVtex_order}</td>
                  <td className="">{order.sequence_order}</td>
                  <th className="">{getStatusString(order.status2_order)}</th>
                  <td className="whitespace-nowrap">{order.courier_order}</td>
                  {/* <td className="">Tú</td> */}
                  <td>
                    {order.picking_assigment === null ||
                    order.picking_assigment.length === 0
                      ? "N/A"
                      : getUserNames(order.picking_assigment)}
                  </td>
                  <td className="">
                    {order.picking_assigment === null ||
                    order.picking_assigment.length === 0
                      ? "N/A"
                      : getUserNames(order.picking_assigment)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && (
          <div className="p-4">
            <div className="bg-gray-500 mb-2 rounded-md h-10 animate-pulse flex justify-between w-full text-white"></div>
            <div className="bg-gray-500 mb-2 rounded-md h-10 animate-pulse flex justify-between w-full text-white"></div>{" "}
            <div className="bg-gray-500 mb-2 rounded-md h-10 animate-pulse flex justify-between w-full text-white"></div>
            <div className="bg-gray-500  rounded-md h-10 animate-pulse flex justify-between w-full text-white"></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default PendingPicking;
