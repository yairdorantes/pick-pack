import { useEffect, useState } from "react";
import ModalAssigment from "./ModalAssigment";
import axios from "axios";
import { api } from "../../../api";
import useStore from "../../../Context";
import toast from "react-hot-toast";
import AddUser from "./AddUser";
import ModalChatAdmin from "./ModalChatAdmin";
import SendNotification from "../Notifications/SendNotification";
import Filters from "../pending/Filters";
import ExtraInfoOrder from "./ExtraInfoOrder";
import usePagination from "../../scripts/Paginator";
import Select from "react-select";
import ModalUsers from "./ModalUsers";
import OutsideClickHandler from "react-outside-click-handler";
const customStyles = {
  // menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
  menu: (provided) => ({ ...provided, zIndex: 9999 }),

  control: (provided, state) => ({
    ...provided,
    borderRadius: "100px",
    height: "34px",
    width: "80px",
    "min-height": "34px",
    fontSize: "12px",
  }),
};
const optionsRows = [
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];
const EverthingTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState({});
  const [modalAddUser, setModalAddUser] = useState(false);
  const [modalListUsers, setModalListUsers] = useState(false);
  const [displayRows, setDisplayRows] = useState(50);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const { fulFillmentUsers, setFulFillmentUsers } = useStore();
  const [modalNotification, setModalNotification] = useState(false);
  const [menuOptions, setMenuOptions] = useState(false);
  const [orders, setOrders] = useState([]);
  const [modalInfo, setModalInfo] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const {
    currentPage,
    nextPage,
    prevPage,
    jumpToPage,
    currentData,
    maxPage,
    getPageNumbers,
  } = usePagination(filteredResults, displayRows);
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
        params: { status: [3, 4, 5, 6, 7, 8, 9, 10] },
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
      <AddUser isOpen={modalAddUser} setIsOpen={setModalAddUser} />
      <Filters originalData={orders} changeFilteredData={setFilteredResults} />
      <ExtraInfoOrder
        isOpen={modalInfo}
        toggleOpen={setModalInfo}
        rowSelected={rowSelected}
      />
      <ModalUsers
        users={fulFillmentUsers}
        isOpen={modalListUsers}
        setIsOpen={setModalListUsers}
      />
      <OutsideClickHandler onOutsideClick={() => setMenuOptions(false)}>
        <div
          className={`fixed overflow-hidden ${
            menuOptions ? "z-30" : ""
          }  right-2  top-[70px]`}
        >
          <div
            onClick={() => setMenuOptions(!menuOptions)}
            className="mb-1 euro-btn"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 512 512"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M304 256 A48 48 0 0 1 256 304 A48 48 0 0 1 208 256 A48 48 0 0 1 304 256 z" />
              <path d="M470.39 300l-.47-.38-31.56-24.75a16.11 16.11 0 01-6.1-13.33v-11.56a16 16 0 016.11-13.22L469.92 212l.47-.38a26.68 26.68 0 005.9-34.06l-42.71-73.9a1.59 1.59 0 01-.13-.22A26.86 26.86 0 00401 92.14l-.35.13-37.1 14.93a15.94 15.94 0 01-14.47-1.29q-4.92-3.1-10-5.86a15.94 15.94 0 01-8.19-11.82l-5.59-39.59-.12-.72A27.22 27.22 0 00298.76 26h-85.52a26.92 26.92 0 00-26.45 22.39l-.09.56-5.57 39.67a16 16 0 01-8.13 11.82 175.21 175.21 0 00-10 5.82 15.92 15.92 0 01-14.43 1.27l-37.13-15-.35-.14a26.87 26.87 0 00-32.48 11.34l-.13.22-42.77 73.95a26.71 26.71 0 005.9 34.1l.47.38 31.56 24.75a16.11 16.11 0 016.1 13.33v11.56a16 16 0 01-6.11 13.22L42.08 300l-.47.38a26.68 26.68 0 00-5.9 34.06l42.71 73.9a1.59 1.59 0 01.13.22 26.86 26.86 0 0032.45 11.3l.35-.13 37.07-14.93a15.94 15.94 0 0114.47 1.29q4.92 3.11 10 5.86a15.94 15.94 0 018.19 11.82l5.56 39.59.12.72A27.22 27.22 0 00213.24 486h85.52a26.92 26.92 0 0026.45-22.39l.09-.56 5.57-39.67a16 16 0 018.18-11.82c3.42-1.84 6.76-3.79 10-5.82a15.92 15.92 0 0114.43-1.27l37.13 14.95.35.14a26.85 26.85 0 0032.48-11.34 2.53 2.53 0 01.13-.22l42.71-73.89a26.7 26.7 0 00-5.89-34.11zm-134.48-40.24a80 80 0 11-83.66-83.67 80.21 80.21 0 0183.66 83.67z" />
            </svg>
          </div>
          <div
            className={`flex transition-all  ${
              menuOptions ? "opacity-100 " : "opacity-0"
            }   flex-col justify-center gap-1 items-center`}
          >
            <div
              onClick={() => setModalNotification(true)}
              className="p-3 cursor-pointer bg-blue-500 text-white rounded-lg"
            >
              <svg
                viewBox="0 0 512 512"
                fill="currentColor"
                height="1em"
                width="1em"
                className="w-5 h-5"
              >
                <path d="M440.08 341.31c-1.66-2-3.29-4-4.89-5.93-22-26.61-35.31-42.67-35.31-118 0-39-9.33-71-27.72-95-13.56-17.73-31.89-31.18-56.05-41.12a3 3 0 01-.82-.67C306.6 51.49 282.82 32 256 32s-50.59 19.49-59.28 48.56a3.13 3.13 0 01-.81.65c-56.38 23.21-83.78 67.74-83.78 136.14 0 75.36-13.29 91.42-35.31 118-1.6 1.93-3.23 3.89-4.89 5.93a35.16 35.16 0 00-4.65 37.62c6.17 13 19.32 21.07 34.33 21.07H410.5c14.94 0 28-8.06 34.19-21a35.17 35.17 0 00-4.61-37.66zM256 480a80.06 80.06 0 0070.44-42.13 4 4 0 00-3.54-5.87H189.12a4 4 0 00-3.55 5.87A80.06 80.06 0 00256 480z" />
              </svg>
            </div>
            <div
              onClick={() => setModalAddUser(true)}
              className="p-3 cursor-pointer bg-blue-500 text-white rounded-lg"
            >
              <svg
                className="w-5 h-5 "
                viewBox="0 0 640 512"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path d="M352 128c0 70.7-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
              </svg>
            </div>
            <div
              onClick={() => setModalListUsers(true)}
              className="p-3 cursor-pointer bg-blue-500 text-white rounded-lg"
            >
              <svg
                viewBox="0 0 640 512"
                fill="currentColor"
                height="1em"
                className="w-5 h-5"
                width="1em"
              >
                <path d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7-1.3 7.2-1.9 14.7-1.9 22.3 0 38.2 16.8 72.5 43.3 96H21.3C9.6 320 0 310.4 0 298.7zM405.3 320h-.7c26.6-23.5 43.3-57.8 43.3-96 0-7.6-.7-15-1.9-22.3 13.6-6.3 28.7-9.7 44.6-9.7h42.7c58.9 0 106.7 47.8 106.7 106.7 0 11.8-9.6 21.3-21.3 21.3H405.3zm10.7-96c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96zM128 485.3c0-73.6 59.7-133.3 133.3-133.3h117.4c73.6 0 133.3 59.7 133.3 133.3 0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
              </svg>
            </div>
          </div>
        </div>
      </OutsideClickHandler>

      <SendNotification
        opening={modalNotification}
        changeState={setModalNotification}
      />
      {/* <ExportCSVPack users={fulFillmentUsers} /> */}
      <div className="flex items-center flex-wrap justify-between mb-2 space-y-1 px-2">
        <div>
          <span className="font-semibold">Total: </span>
          {orders.length} ,<span className="font-semibold"> Filtrado:</span>{" "}
          {filteredResults.length}
        </div>
        <div className="flex text-sm items-center gap-2">
          <div className="font-semibold">Registros a mostrar: </div>
          <Select
            placeholder="50"
            options={optionsRows}
            onChange={(option) => {
              console.log("status:", option);
              setDisplayRows(option.value);
            }}
            isSearchable={false}
            isClearable={false}
            styles={customStyles}
            className="text-sm text-gray-500 w-44"
          />
        </div>
      </div>

      <div className="overflow-x-auto w-screen h-[80vh] ">
        <table className="table table-pin-rows  text-center table-sm table-zebra">
          <thead className="">
            <tr className="text-black">
              <th className="">Info</th>
              <th className="">Orden ID</th>
              <th className="">Sequence</th>
              <th className="">Estatus</th>
              {/* <th className=""></th> */}
              <th className="">Paqueteria</th>
              <th>
                <abbr title="Colaboradores Asignados (PICKING)">
                  Col. Asignados (PICKING)
                </abbr>
              </th>
              <th>
                <abbr title="Colaboradores Asignados (PACKING)">
                  Col. Asignados (PACKING)
                </abbr>
              </th>

              <th>Acciones</th>
              {/* <th>Notas</th> */}
              {/* <th>Notas</th> */}
              {/* <th>Notas</th> */}
            </tr>
          </thead>
          <tbody>
            {currentData.map((order, i) => (
              <tr key={i}>
                <td
                  className="flex justify-center cursor-pointer items-center"
                  onClick={() => {
                    setRowSelected(order);
                    setModalInfo(true);
                  }}
                >
                  <div className="pt-1 text-blue-600 ">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                    >
                      <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </div>
                </td>
                <td className="">{order.idVtex_order}</td>
                <td className="">{order.sequence_order}</td>
                <th className="">{getStatusString(order.status2_order)}</th>
                {/* <th className="">
                  <div className="w-3 h-3 rounded-full mx-auto bg-blue-500"></div>
                </th> */}
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
        <nav
          className="fixed bottom-0 right-2"
          aria-label="Page navigation example"
        >
          <ul className="inline-flex -space-x-px text-sm">
            <li onClick={() => prevPage()}>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z"
                  />
                </svg>
              </a>
            </li>
            {getPageNumbers().map((page, i) => (
              <li
                key={i}
                onClick={() => Number.isInteger(page) && jumpToPage(page)}
              >
                <a
                  href="#"
                  className={`flex ${
                    currentPage === page
                      ? "bg-gray-300 text-gray-700"
                      : "text-gray-500 bg-white "
                  }   items-center justify-center px-3 h-8 leading-tight  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 `}
                >
                  {page}
                </a>
              </li>
            ))}

            <li onClick={() => nextPage()}>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
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
