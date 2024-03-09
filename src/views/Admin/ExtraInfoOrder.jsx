import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import axios from "axios";
import { api } from "../../../api";
import toast from "react-hot-toast";

const ExtraInfoOrder = ({ isOpen, toggleOpen, rowSelected }) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      axios
        .get(`${api}/pick-pack/packs/${rowSelected.idVtex_order}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ocurrio un error al intentar recurperar lainformacion");
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  return (
    <div className="">
      <Modal isOpen={isOpen} setIsOpen={toggleOpen}>
        {loading && (
          <div className="fixed flex justify-center  items-center w-full h-full bg-black bg-opacity-20">
            <div>
              <span className="loading loading-spinner loading-lg text-info"></span>
            </div>
          </div>
        )}
        <div className="m-4">
          <div className="text-xl mb-4 text-black font-semibold">
            Orden: 1876186851-01
          </div>
          <div className="w-full mb-2 flex justify-between items-center p-2 bg-gray-200 rounded-lg">
            <div>Embalaje</div>
            <div>
              <svg
                fill="none"
                className="w-5 h-5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
              >
                <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
              </svg>
            </div>
          </div>
          <div>{data.length === 0 && "Sin paquetes :("}</div>
          {data.map((pack, i) => (
            <div key={i} className="space-y-1 mb-2 text-black">
              Paquete {i + 1}
              <div>
                <span className="font-semibold">Dimensiones:</span>{" "}
                {pack.length} x {pack.width} x {pack.depth}
              </div>
              <div>
                <span className="font-semibold">Peso:</span> {pack.weight}kg
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ExtraInfoOrder;
