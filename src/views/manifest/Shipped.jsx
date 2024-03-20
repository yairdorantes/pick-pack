import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import axios from "axios";
import { api } from "../../../api";
import toast from "react-hot-toast";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const Shipped = () => {
  const [tableData, setTableData] = useState([]);
  const [modalOrders, setModalOrders] = useState(false);
  const [modalImages, setModalImages] = useState(false);
  const [orders, setOrders] = useState([]);
  const [images, setImages] = useState({ singature: "", card: "" });
  const getManifests = () => {
    axios
      .get(`${api}/pick-pack/shipped/manifests`)
      .then((res) => {
        setTableData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("No se pudo obtener información");
      });
  };
  useEffect(() => {
    getManifests();
  }, []);

  const getCourierName = (courierReference) => {
    switch (courierReference) {
      case 1:
        return "Fedex";
      case 2:
        return "PAQUETEXPRESS";
      case 3:
        return "estafeta";
      case 4:
        return "DHL";
      case 5:
        return "UPS";
      default:
        return "Unknown";
    }
  };
  function dateToReadable(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "UTC",
    };
    return date.toLocaleDateString("es-ES", options);
  }
  return (
    <div>
      <Modal isOpen={modalOrders} setIsOpen={setModalOrders}>
        <div className="m-10 ">
          {orders.length === 0 && "Sin ordenes"}
          <ul className="list-disc grid grid-cols-2 overflow-y-auto  max-h-96">
            {orders.map((order, i) => (
              <li key={i} className="mb-2">
                {order}
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <Transition appear show={modalImages} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={() => {
            setModalImages(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 "
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-0"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-0"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  tabIndex="0"
                  className="w-auto transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all"
                >
                  <div
                    onClick={() => setModalImages(false)}
                    className="absolute z-30 top-2 right-2 text-red-500 "
                  >
                    <svg
                      fill="none"
                      className="w-8 h-8"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                    >
                      <path
                        fill="currentColor"
                        d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"
                      />
                    </svg>
                  </div>
                  <div className="flex  flex-wrap justify-center items-center gap-1  ">
                    <div className="p-4 ">
                      <TransformWrapper>
                        <TransformComponent>
                          <img
                            src={images.card}
                            alt="Identificación"
                            className=" object-contain h-56 w-96  "
                          />
                        </TransformComponent>
                      </TransformWrapper>
                    </div>
                    <div className="divider divider-horizontal"></div>

                    <div className="p-4">
                      <img
                        src={images.singature}
                        alt="Firma"
                        className="object-contain h-56 w-96 "
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

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
            {tableData.map((manifest, i) => (
              <tr
                key={i}
                //   onClick={() => setRowSelected(order)}
                className="border-b-2"
                //   key={i}
              >
                <td>
                  <span
                    onClick={() => {
                      setOrders(manifest.data);
                      setModalOrders(true);
                    }}
                    className="px-3 py-2 border border-blue-500 bg-blue-600 text-white rounded-lg text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white"
                  >
                    Ordenes
                  </span>
                </td>
                <td>
                  <div>{getCourierName(manifest.courier_manifest)}</div>
                </td>
                <td>{dateToReadable(manifest.updatedAt)}</td>
                <td>
                  <div className="flex justify-center gap-3">
                    <div
                      onClick={() => {
                        setImages({
                          card: manifest.photo,
                          singature: manifest.signature,
                        });
                        setModalImages(true);
                      }}
                      className="px-3 py-2 border border-blue-500 rounded-lg text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white"
                    >
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
            ))}

            {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shipped;
