import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
const PendingPicking = () => {
  const navigate = useNavigate();
  const [pendingOrders, setPendingOrders] = useState([]);
  useEffect(() => {
    axios
      .get(`${api}/pick-pack/packing`)
      .then((res) => {
        // console.log(res.data);
        setPendingOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleOrderClick = (data) => {
    navigate(`/picking/${data.idVtex_order}`);
  };

  return (
    <div className="">
      <h1 className=" font-bold text-center text-white m-6">
        Ordenes pendientes
      </h1>
      <div className="overflow-x-auto w-full sm:w-3/4 mx-auto">
        <table className="table table-zebra" data-theme="light">
          <thead>
            <tr>
              <th></th>
              <th>Orden ID</th>
              <th>Picker</th>
              <th>Fecha de creación</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map((order, i) => (
              <tr
                onClick={() => handleOrderClick(order)}
                key={i}
                className="cursor-pointer hover"
              >
                <td>{i + 1}</td>
                <td className="">{order.idVtex_order}</td>
                <td className="">Willy Melano</td>
                <td>{order.creationDate_order}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PendingPicking;
