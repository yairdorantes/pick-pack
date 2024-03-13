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
  const [modalDelEverthing, setModalDelEverthing] = useState(false);
  const [base64PDF, setBase64PDF] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalReceipt, setModalReceipt] = useState(false);
  const [rowSelected, setRowSelected] = useState({});
  const [courier, setCourier] = useState("");
  const [modalAdd, setModalAdd] = useState(false);
  const [orderToAdd, setOrderToAdd] = useState("");
  const [loaderAddOrder, setLoaderAddOrder] = useState(false);
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

  const delEverthing = () => {
    console.log("del everthibg");
    setLoading(true);
    axios
      .delete(`${api}/pick-pack/wipe_manifest/${courierId}`)
      .then(() => {
        toast.success("Ordenes eliminadas!");
        setModalDelEverthing(false);
        setTableData([]);
      })
      .catch((err) => {
        console.log("Ups algo salió mal");
      })
      .finally(() => setLoading(false));
  };

  const handleOpenPDF = () => {
    let pdfWindow = window.open("");
    pdfWindow.document.write(
      "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(base64PDF) +
        "'></iframe>"
    );
  };
  const trimName = (fullName) => {
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 2];
    return `${firstName} ${lastName}`;
  };
  const addToManifest = () => {
    const res =
      tableData.find((order) => order.idVtex_order === orderToAdd) ||
      tableData.find((order) => order.sequence_order === parseInt(orderToAdd));
    if (res) {
      toast.error("Esa orden ya está en el manfiesto");
    } else {
      setLoaderAddOrder(true);
      axios
        .post(`${api}/pick-pack/add_to_manifest/${orderToAdd}/${courierId}`)
        .then(() => {
          setModalAdd(false);
          getManifest();
          toast.success("Orden agregada al manifiesto");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ups algo salio mal, intenta de nuevo");
        })
        .finally(() => {
          setLoaderAddOrder(false);
        });
    }
  };
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
                  <td>{order.sequence_order}</td>
                  <td className="">{trimName(order.customerName_order)}</td>
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
        <div className="text-center mt-10 mb-10 flex justify-center flex-wrap gap-4">
          <div
            onClick={() => setModalAdd(true)}
            className="px-4 flex items-center py-2 cursor-pointer text-blue-500 hover:bg-blue-500 hover:text-white border-blue-500 border rounded-lg "
          >
            <svg
              className="w-7 h-7"
              viewBox="0 0 1024 1024"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM704 536c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z" />
            </svg>
          </div>
          <div
            className="px-4 py-2 text-info hover:bg-info hover:text-white border-info border rounded-lg "
            onClick={() => setModalReceipt(true)}
          >
            <svg
              viewBox="0 0 576 512"
              fill="currentColor"
              height="1em"
              className="w-8 h-8"
              width="1em"
            >
              <path d="M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64v-19.3c-2.7 1.1-5.4 2-8.2 2.7l-60.1 15c-3 .7-6 1.2-9 1.4-.9.1-1.8.2-2.7.2h-64c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 381l-9.8 32.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.8 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7 15.9 0 30.4 9 37.5 23.2l4.4 8.8h8.9c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l94.8-94.8V160H256c-17.7 0-32-14.3-32-32V0H64zm192 0v128h128L256 0zm293.8 139.7c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM311.9 321c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5.2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4l129.2-129.3-71-71L311.9 321z" />
            </svg>
          </div>
          {/* 
          <div
            onClick={handleOpenPDF}
            className={`px-4 py-2 text-error cursor-pointer hover:bg-error hover:text-white border-error border rounded-lg ${
              base64PDF.length === 0 && "pointer-events-none"
            }  btn-error hover:!text-white`}
          >
            {!loadingPDF && (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="1em"
                width="1em"
                className="w-8 h-8"
              >
                <path d="M8.267 14.68c-.184 0-.308.018-.372.036v1.178c.076.018.171.023.302.023.479 0 .774-.242.774-.651 0-.366-.254-.586-.704-.586zm3.487.012c-.2 0-.33.018-.407.036v2.61c.077.018.201.018.313.018.817.006 1.349-.444 1.349-1.396.006-.83-.479-1.268-1.255-1.268z" />
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM9.498 16.19c-.309.29-.765.42-1.296.42a2.23 2.23 0 01-.308-.018v1.426H7v-3.936A7.558 7.558 0 018.219 14c.557 0 .953.106 1.22.319.254.202.426.533.426.923-.001.392-.131.723-.367.948zm3.807 1.355c-.42.349-1.059.515-1.84.515-.468 0-.799-.03-1.024-.06v-3.917A7.947 7.947 0 0111.66 14c.757 0 1.249.136 1.633.426.415.308.675.799.675 1.504 0 .763-.279 1.29-.663 1.615zM17 14.77h-1.532v.911H16.9v.734h-1.432v1.604h-.906V14.03H17v.74zM14 9h-1V4l5 5h-4z" />
              </svg>
            )}
            {loadingPDF && <span className="loading loading-dots loading-md" />}
          </div> */}

          <div
            className={`px-4 py-2 cursor-pointer text-success hover:bg-success hover:text-white border-success border rounded-lg ${
              base64PDF.length === 0 && "pointer-events-none"
            }  btn-success hover:!text-white`}
          >
            <a
              href={`data:application/pdf;base64,${base64PDF}`}
              // target="_blank"
              onClick={() => toast.success("Generando PDF ")}
              download={"Manifiesto"}
              rel="noopener noreferrer"
              className=""
              // onClick={handleOpenPDF}
            >
              {!loadingPDF && (
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                  className="w-8 h-8"
                >
                  <path
                    fill="currentColor"
                    d="M9 4L7 2H0v13h16V4H9zm-1 9.5L4.5 10H7V6h2v4h2.5L8 13.5z"
                  />
                </svg>
              )}
              {loadingPDF && (
                <span className="loading loading-dots loading-md" />
              )}
            </a>
          </div>

          <div
            onClick={() => setModalDelEverthing(true)}
            className="px-4 flex items-center py-2 cursor-pointer text-error hover:bg-error hover:text-white border-error border rounded-lg "
          >
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              className="w-7 h-7"
              height="1em"
              width="1em"
            >
              <path d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5v7a.5.5 0 01-1 0v-7a.5.5 0 011 0z" />
            </svg>
          </div>
        </div>
      )}
      <Modal isOpen={modalDelEverthing} setIsOpen={setModalDelEverthing}>
        <div data-theme="" className="card mx-auto  w-full bg-gray-200">
          <div className="card-body items-center text-center ">
            <h2 className="text-xl  text-gray-600">
              ¿Estás segur@ de eliminar <strong>TODAS</strong> las ordenes del
              manifiesto?
            </h2>
            {/* <p>¿Deseas llevar a cabo esta accion?</p> */}
            <div className="card-actions justify-end">
              <button
                onClick={delEverthing}
                className={`btn ${
                  loading && "btn-disabled"
                } btn-success text-white`}
              >
                {loading ? (
                  <span className="loading loading-spinner text-info"></span>
                ) : (
                  "Aceptar"
                )}
              </button>
              <button
                className="btn btn-error text-white"
                onClick={() => setModalDelEverthing(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Modal>
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
      <Modal isOpen={modalAdd} setIsOpen={setModalAdd}>
        <div className="p-4 space-y-4 ">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-md">
                Introduce el identificador de la orden que deseas agregar al
                manifiesto (Vtex id o Sequence):
              </span>
            </div>
            <input
              type="text"
              value={orderToAdd}
              onChange={(e) => setOrderToAdd(e.target.value.trim())}
              placeholder="Ingresa el identificador"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <div className="text-center">
            <button
              onClick={addToManifest}
              className={`btn btn-info text-white ${
                loaderAddOrder && "btn-disabled"
              } `}
            >
              {loaderAddOrder ? (
                <span className="loading loading-spinner text-info"></span>
              ) : (
                "  Agregar al manifiesto"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </NavBar>
  );
};

export default PDFManifest;
