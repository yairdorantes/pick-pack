import { useState } from "react";
import Modal from "../../components/Modal";

const Shipped = () => {
  const [tableData, setTableData] = useState([]);
  const [modalOrders, setModalOrders] = useState(false);
  return (
    <div>
      <Modal isOpen={modalOrders} setIsOpen={setModalOrders}>
        <div className="m-10 ">
          <ul className="list-disc columns-2">
            <li className="mb-2">917971918-01</li>
            <li className="mb-2">917971918-01</li>
          </ul>
        </div>
      </Modal>
      <div className="overflow-x-auto w-screen mx-auto">
        <table className="table table-zebra text-center table-sm">
          <thead>
            <tr>
              <th>ordenes</th>
              {/* <th>sec</th> */}
              <th className="">Paqueteria</th>
              <th>Fecha</th>
              <th>Firma</th>
            </tr>
          </thead>
          <tbody>
            {/* {tableData.map((order, i) => ( */}
            <tr
              //   onClick={() => setRowSelected(order)}
              className="border-b-2"
              //   key={i}
            >
              <td onClick={() => setModalOrders(true)} className="">
                <span className="btn btn-sm">Ordenes</span>
              </td>
              <td>
                <div>Fedex</div>
              </td>
              <td>2024</td>
              <td>
                <div className="flex justify-center gap-3">
                  <div className="btn">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="w-7 h-7"
                    >
                      <path d="M2 3h20c1.05 0 2 .95 2 2v14c0 1.05-.95 2-2 2H2c-1.05 0-2-.95-2-2V5c0-1.05.95-2 2-2m12 3v1h8V6h-8m0 2v1h8V8h-8m0 2v1h7v-1h-7m-6 3.91C6 13.91 2 15 2 17v1h12v-1c0-2-4-3.09-6-3.09M8 6a3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3 3 3 0 00-3-3z" />
                    </svg>
                  </div>
                </div>
              </td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shipped;
