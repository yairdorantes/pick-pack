import { useEffect, useState } from "react";
import ModalAssigment from "./ModalAssigment";
import axios from "axios";
import { api } from "../../../api";
import useStore from "../../../Context";
import toast from "react-hot-toast";
import SearchInput from "../../components/SearchInput";
import AddUser from "./AddUser";
import ModalChatAdmin from "./ModalChatAdmin";
import SendNotification from "../Notifications/SendNotification";
import Filters from "../pending/Filters";
const EverthingTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState({});
  const [loadingOrders, setLoadingOrders] = useState([]);
  const { fulFillmentUsers, setFulFillmentUsers } = useStore();
  const [modalNotification, setModalNotification] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  function handleSelection(row) {
    setModalOpen(true);
    setRowSelected(row);
  }
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

  function getOrders() {
    setLoadingOrders(true);
    axios
      .get(`${api}/pick-pack/orders_status`, {
        params: { status: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
      })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data.ordersList);
        setFilteredResults(res.data.ordersList);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ocurrio un error al intentar obtener las ordenes");
      })
      .finally(() => setLoadingOrders(false));
  }
  function firstWord(str) {
    // Split the string by whitespace and get the first element
    const words = str.trim().split(/\s+/);
    return words[0];
  }
  function filterOrderId(query) {
    const filteredOrder = orders.find((order) => order.idVtex_order === query);
    console.log(filteredOrder);

    filteredOrder
      ? setFilteredResults([filteredOrder])
      : setFilteredResults(orders);
  }
  const getUserNames = (usersIdAssigment) => {
    const usersNames = usersIdAssigment.map((id) => {
      const user = fulFillmentUsers.find((user) => user.id_user === id);
      return user
        ? `${firstWord(user.lastname_user)} ${user.name_user}`
        : "desconocido";
    });
    return usersNames.join(", ");
  };

  function getFullFillmentUsers() {
    axios
      .get(`${api}/pick-pack/fulfillment/users`)
      .then((res) => {
        console.log(res.data);
        setFulFillmentUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getOrders();
    getFullFillmentUsers();
  }, []);

  return (
    <div className="">
      <AddUser />
      <Filters originalData={orders} changeFilteredData={setFilteredResults} />

      <div
        onClick={() => setModalNotification(true)}
        className="fixed euro-btn flex items-center gap-2 w-fit ml-3 mb-4  top-[70px] right-2 z-50"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
        >
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>
      </div>
      <SendNotification
        opening={modalNotification}
        changeState={setModalNotification}
      />

      <div className="overflow-x-auto w-screen">
        <table className="table text-center table-pin-rows table-sm table-zebra">
          <thead className="">
            <tr className="font-bold">
              <th className="">Orden ID</th>
              <th className="">Sequence</th>
              <th className="">Estatus</th>
              <th className="">Paqueteria</th>
              <th>Colaboradores Asignados(PICKING)</th>
              <th>Colaboradores Asignados(PACKING)</th>
              <th>Acciones</th>
              {/* <th>Notas</th> */}
              {/* <th>Notas</th> */}
              {/* <th>Notas</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((order, i) => (
              <tr key={i}>
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
                </td>{" "}
                <td>
                  {order.packing_assigment === null ||
                  order.packing_assigment.length === 0
                    ? "N/A"
                    : getUserNames(order.packing_assigment)}
                </td>
                <td>
                  <div className="dropdown dropdown-left">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-sm"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                      >
                        <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li
                        onClick={() => {
                          handleSelection(order);
                        }}
                      >
                        <a>
                          <svg
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            height="1em"
                            width="1em"
                          >
                            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 100-6 3 3 0 000 6z" />
                            <path
                              fillRule="evenodd"
                              d="M5.216 14A2.238 2.238 0 015 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 005 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                            />
                            <path d="M4.5 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                          </svg>
                          Asignar Picker{" "}
                        </a>
                      </li>
                      <li
                        onClick={() => {
                          setRowSelected(order);
                          setShowModal(!showModal);
                        }}
                      >
                        <a>
                          <svg
                            fill="none"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                          >
                            <path
                              fill="currentColor"
                              d="M6 6a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zM6 10a1 1 0 011-1h10a1 1 0 110 2H7a1 1 0 01-1-1zM7 13a1 1 0 100 2h10a1 1 0 100-2H7zM6 18a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1z"
                            />
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M2 4a3 3 0 013-3h14a3 3 0 013 3v16a3 3 0 01-3 3H5a3 3 0 01-3-3V4zm3-1h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z"
                              clipRule="evenodd"
                            />
                          </svg>{" "}
                          Agregar notas{" "}
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
                {/* <td>Picker 1, picker 2, picker uno</td>
                <td>Picker 3, picker 4,picker 5</td> */}
                {/* <td>
                  <div
                    className="btn btn-sm"
                    onClick={() => {
                      handleSelection(order);
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="w-7 h-7"
                    >
                      <path d="M21.7 13.35l-1 1-2.05-2.05 1-1a.55.55 0 01.77 0l1.28 1.28c.21.21.21.56 0 .77M12 18.94l6.06-6.06 2.05 2.05L14.06 21H12v-2.06M12 14c-4.42 0-8 1.79-8 4v2h6v-1.89l4-4c-.66-.08-1.33-.11-2-.11m0-10a4 4 0 00-4 4 4 4 0 004 4 4 4 0 004-4 4 4 0 00-4-4z" />
                    </svg>
                  </div>
                </td> */}
                {/* <td
                  onClick={() => {
                    console.log("clic");
                    setRowSelected(order);
                    setShowModal(!showModal);
                  }}
                >
                  <div className="btn btn-sm">
                    <svg
                      className="w-7 h-7"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                    >
                      <path d="M8.5 18l3.5 4 3.5-4H19c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3.5zM7 7h10v2H7V7zm0 4h7v2H7v-2z" />
                    </svg>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loadingOrders && (
        <div className="text-center mt-10">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      )}
      <ModalAssigment
        opening={modalOpen}
        rowSelected={rowSelected}
        changeState={setModalOpen}
      />
      <ModalChatAdmin
        isOpen={showModal}
        orderId={rowSelected.idVtex_order}
        setIsOpen={setShowModal}
      />
    </div>
  );
};

export default EverthingTable;
