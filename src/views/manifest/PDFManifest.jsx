import axios from "axios";
import { api } from "../../../api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import Receipt from "./Receipt";
import NavBar from "../../components/NavBar";
const PDFManifest = () => {
  const { courierId } = useParams();
  const [base64PDF, setBase64PDF] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [modalReceipt, setModalReceipt] = useState(false);
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

  useEffect(() => {
    getManifest();
  }, []);
  return (
    <NavBar>
      <div className="">
        <div className="text-center m-5 font-bold">Manifiesto</div>
        <div className="overflow-x-auto w-screen mx-auto">
          <table className="table   text-center table-sm">
            <thead>
              <tr>
                <th>orden</th>
                <th>sec</th>
                <th className="">cliente</th>
                <th>guia</th>
                <th>paqueteria</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((order, i) => (
                <tr className="border-b-2" key={i}>
                  <td>{order.idVtex_order}</td>
                  <td>{"018190"}</td>
                  <td className="">{order.customerName_order}</td>
                  <td>{128198}</td>
                  <td>{order.courier_order}</td>
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
      {tableData.length > 0 && (
        <div className="text-center mt-10 space-x-2">
          <div className="btn capitalize" onClick={() => setModalReceipt(true)}>
            Firmar Manifiesto
          </div>

          {base64PDF.length > 0 && (
            <a
              download="Manifiesto"
              className="btn capitalize"
              href={`data:application/pdf;base64,${base64PDF}`}
            >
              {!loadingPDF && "Descargar PDF"}
              {loadingPDF && (
                <span className="loading loading-dots loading-md" />
              )}
            </a>
          )}
        </div>
      )}
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
