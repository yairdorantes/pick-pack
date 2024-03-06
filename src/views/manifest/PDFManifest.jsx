import axios from "axios";
import { api } from "../../../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Receipt from "./Receipt";
import NavBar from "../../components/NavBar";
import toast from "react-hot-toast";

const PDFManifest = () => {
  const { courierId } = useParams();
  const [modalDelConfirmation, setModalDelConfirmation] = useState(false);

  const [base64PDF, setBase64PDF] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [modalReceipt, setModalReceipt] = useState(false);
  const [rowSelected, setRowSelected] = useState({});
  const [courier, setCourier] = useState("");
  const base64pdf = "";
  function getManifest() {
    axios
      .get(`${api}/pick-pack/manifest/${courierId}`)
      .then((res) => {
        console.log(res.data);
        setTableData(res.data);
        const orders = res.data.map((order) => order.idVtex_order);
        // console.log(orders);
        setLoadingPDF(true);
        axios
          .post(`${api}/pick-pack/pdf`, {
            data: orders,
          })
          .then((res) => {
            // console.log(res.data.data);
            setBase64PDF(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoadingPDF(false);
          });
        // setTableData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function delOrderFromManifest() {
    console.log(rowSelected.idVtex_order);
    setModalDelConfirmation(false);
    axios
      .put(`${api}/pick-pack/remove_order_manifest`, {
        courier: courierId,
        order: rowSelected.idVtex_order,
      })
      .then((result) => {
        toast.success("Manifiesto actualizado!");

        console.log(result);
        const newTableData = tableData.filter(
          (order) => order.idVtex_order !== rowSelected.idVtex_order
        );
        setTableData(newTableData);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Algo salio mal, intenta de nuevo");
      });
  }
  useEffect(() => {
    getManifest();
    if (parseInt(courierId) === 1) {
      setCourier("FEDEX");
    } else if (parseInt(courierId) === 2) {
      setCourier("PAQUETEXPRESS");
    } else if (parseInt(courierId) === 3) {
      setCourier("ESTAFETA");
    } else if (parseInt(courierId) === 4) {
      setCourier("DHL");
    } else if (parseInt(courierId) === 5) {
      setCourier("UPS");
    }
  }, []);
  return (
    <NavBar>
      <div className="">
        <div className="text-center m-5 font-semibold">
          Manifiesto {courier}
        </div>
        <div className="overflow-x-auto w-screen mx-auto">
          <table className="table table-zebra text-center table-sm">
            <thead>
              <tr>
                <th></th>
                <th>orden</th>
                <th>sec</th>
                <th className="">cliente</th>
                <th>guia</th>
                <th>paqueteria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((order, i) => (
                <tr
                  onClick={() => setRowSelected(order)}
                  className="border-b-2"
                  key={i}
                >
                  <td>{i + 1}</td>
                  <td>{order.idVtex_order}</td>
                  <td>{"018190"}</td>
                  <td className="">{order.customerName_order}</td>
                  <td>{128198}</td>
                  <td>{order.courier_order}</td>
                  <td
                    className=""
                    onClick={() => setModalDelConfirmation(true)}
                  >
                    {" "}
                    <div
                      // onClick={() => changeFilteredData(originalData)}
                      className="mx-auto bg-red-500 border w-fit border-red-500 p-2 rounded-full text-white cursor-pointer hover:bg-white hover:text-red-500"
                    >
                      <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                      >
                        <path d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5v7a.5.5 0 01-1 0v-7a.5.5 0 011 0z" />
                      </svg>
                    </div>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {tableData.length === 0 && (
        <div className="text-center  mt-20 font-bold">
          Sin ordenes registradas...
        </div>
      )}
      <div className="m-3 font-bold">
        Ordenes en manifiesto: {tableData.length}
      </div>

      {/* tableData.length > 0 */}
      {tableData.length > 0 && (
        <div className="text-center mt-10 space-x-2">
          <div className="btn capitalize" onClick={() => setModalReceipt(true)}>
            Firmar Manifiesto
          </div>

          {base64PDF.length > 0 && (
            <a
              href={`data:application/pdf;base64,${base64PDF}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn capitalize"
            >
              {!loadingPDF && "Abrir PDF"}{" "}
              {/* <-- Modify the text accordingly */}
              {loadingPDF && (
                <span className="loading loading-dots loading-md" />
              )}
            </a>
          )}
        </div>
      )}
      <Modal isOpen={modalDelConfirmation} setIsOpen={setModalDelConfirmation}>
        <div data-theme="" className="card mx-auto  w-full bg-gray-200">
          <div className="card-body items-center text-center ">
            <h2 className="card-title text-gray-600">
              ¿Estás seguro de eliminar la orden {rowSelected.idVtex_order} del
              manifiesto?
            </h2>
            {/* <p>¿Deseas llevar a cabo esta accion?</p> */}
            <div className="card-actions justify-end">
              <button
                onClick={delOrderFromManifest}
                className="btn btn-success text-white"
              >
                Aceptar
              </button>
              <button
                className="btn btn-error text-white"
                onClick={() => setModalDelConfirmation(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal isOpen={modalReceipt} setIsOpen={setModalReceipt}>
        <div
          onClick={() => setModalReceipt(false)}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <svg
            className="w-7 h-7 text-red-500"
            fill="none"
            viewBox="0 0 15 15"
            height="1em"
            width="1em"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <Receipt setModal={setModalReceipt} courierId={courierId} />
      </Modal>
    </NavBar>
  );
};

export default PDFManifest;
