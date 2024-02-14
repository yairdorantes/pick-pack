import { useEffect, useState } from "react";
import ModalAssigment from "./ModalAssigment";
import axios from "axios";
import { api } from "../../../api";
import useStore from "../../../Context";
import toast from "react-hot-toast";
import SearchInput from "../../components/SearchInput";
import AddUser from "./AddUser";

const EverthingTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState({});
  const [loadingOrders, setLoadingOrders] = useState([]);
  const { fulFillmentUsers, setFulFillmentUsers } = useStore();
  const [orders, setOrders] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  function handleSelection(row) {
    setModalOpen(true);
    setRowSelected(row);
  }
  const getStatusString = (statusNumber) => {
    if (statusNumber === 3) {
      return "Listo para manejo 🚚";
    } else if (statusNumber === 4) {
      return "Surtiendo 🛒";
    } else if (statusNumber === 5) {
      return "Surtido ✅";
    } else if (statusNumber === 6) {
      return "Empacando 📦";
    } else if (statusNumber === 7) {
      return "Empacado 📦✅";
    }
  };

  function getOrders() {
    setLoadingOrders(true);
    axios
      .get(`${api}/pick-pack/orders_status`, {
        params: { status: [3, 4, 5, 6, 7] },
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
  function filterOrderId(query) {
    const filteredOrder = orders.find((order) => order.idVtex_order === query);
    console.log(filteredOrder);

    filteredOrder
      ? setFilteredResults([filteredOrder])
      : setFilteredResults(orders);
  }

  function getFullFillmentUsers() {
    axios
      .get(`${api}/pick-pack/fulfillment/users`)
      .then((res) => {
        // console.log(res.data);s
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
      <div className="sticky top-20 bg-white z-20">
        <SearchInput
          onHandleQuery={filterOrderId}
          placeHolderValue="Busca una orden"
        />
      </div>
      <div className="overflow-x-auto ">
        <table className="table  text-center table-pin-rows table-sm table-zebra">
          <thead>
            <tr className="">
              <th className="">Orden</th>
              <th>Estatus</th>
              <th>Asignar</th>
              {/* <th>Notas</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((order, i) => (
              <tr key={i}>
                <td>{order.idVtex_order}</td>
                <td className="">
                  <span className="">
                    {getStatusString(order.status2_order)}
                  </span>
                </td>
                {/* <td>Picker 1, picker 2, picker uno</td>
                <td>Picker 3, picker 4,picker 5</td> */}
                <td>
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
                </td>
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
    </div>
  );
};

export default EverthingTable;
