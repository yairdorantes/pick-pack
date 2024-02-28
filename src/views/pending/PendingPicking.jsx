import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../../api";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import toast from "react-hot-toast";
import { useGetItems } from "../../scripts/getProducts";
import useStore from "../../../Context";

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
  const handleOrderClick = (data) => {
    if (data.picking_assigment && data.picking_assigment.includes(user.id)) {
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
  const filterTable = (value) => {
    const filtered = pendingOrders.filter(
      (item) => item.idVtex_order === value.replace(/\s+$/, "")
    );
    console.log(value);
    console.log(filtered);
    filtered.length > 0
      ? setFilteredData(filtered)
      : setFilteredData(pendingOrders);
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
  const getUserNames = (usersIdAssigment) => {
    const usersNames = usersIdAssigment.map((id) => {
      const user = usersList.find((user) => user.id_user === id);
      return user ? user.name_user : "desconocido";
    });
    return usersNames.join(", ");
  };
  return (
    <div className="">
      {/* <h1 className="font-semibold flex justify-center items-center gap-2  text-center text-black mt-4">
        <div className="w-4 h-4 rounded-full bg-blue-600"></div>

        <div>Alistamiento</div>

        <div className="w-4 h-4 rounded-full bg-blue-600"></div>
      </h1> */}

      <form className=" mx-auto m-4 px-4">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full transition-all duration-500 p-2 ps-10  text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Busca una orden"
            required
            onChange={(e) => {
              // setQuery(e.target.value);
              filterTable(e.target.value);
            }}
          />
          {/* <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button> */}
        </div>
      </form>
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

      <div className="overflow-x-auto w-full   mx-auto">
        <table className="table table-zebra border-2 text-center" data-theme="">
          <thead>
            <tr className="text-black">
              <th className="">Orden ID</th>
              <th>Colaboradores Asignados</th>
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
                  {/* <td className="">Tú</td> */}
                  <td className="">
                    {order.picking_assigment === null ||
                    order.picking_assigment.length === 0
                      ? "..."
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
