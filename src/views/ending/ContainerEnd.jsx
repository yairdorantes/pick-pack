import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import ReturnSheet from "../../components/ReturnSheet";
import Stepper from "../../components/Stepper";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../../api";
import { flushSync } from "react-dom";
import Select from "react-select";
const options = [
  { value: 1, label: "FedEx" },
  { value: 2, label: "PAQUETEXPRESS" },
  { value: 3, label: "estafeta" },
  { value: 4, label: "DHL" },
  { value: 5, label: "UPS" },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "100px",
    height: "34px",
    "min-height": "34px",
  }),
};

const ContainerEnd = () => {
  const navigate = useNavigate();

  const [courierSelected, setCourierSelected] = useState(0);
  const { orderId } = useParams();
  const [optionSelected, setOptionSelected] = useState(1);
  const [loading, setLoading] = useState(false);
  const [receivedAnswer, setReceivedAnswer] = useState(false);
  const [searchingLoader, setSearchingLoader] = useState(false);
  const [wasFound, setWasFound] = useState(false);
  async function addToManifest() {
    console.log(courierSelected);
    const fetchData = async () => {
      const response = await axios.post(
        `${api}/pick-pack/add_to_manifest/${orderId}/${courierSelected}`
      );
      console.log({ response }, "here");

      return response;
    };
    const callFunction = fetchData();
    setLoading(true);
    toast
      .promise(callFunction, {
        loading: "Enviando Datos...",
        error: "Ups ocurrio un error intenta de nuevo",
        success: "Se añadio la order al manifiesto 😃",
      })
      .then(() => {
        setReceivedAnswer(true);
        if (!document.startViewTransition) {
          navigate(`/manifest`);
          return;
        }
        document.startViewTransition(() =>
          flushSync(() => navigate(`/manifest`))
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }
  async function send() {
    if (optionSelected === 1) {
      await addToManifest();
    } else {
      toast.success("Respuesta enviada! :)");
      navigate(`/picking`);
    }
  }
  useEffect(() => {
    setSearchingLoader(true);
    axios
      .get(`${api}/pick-pack/seek_manifest/${orderId}`)
      .then((res) => {
        console.log(res);
        setWasFound(true);
      })
      .catch((err) => {
        console.log(err);
        err.response.status !== 404 && toast.error("Error obtener información");
      })
      .finally(() => setSearchingLoader(false));
  }, []);

  return (
    <NavBar>
      <Stepper stepGiven={3} />
      {searchingLoader ? (
        <div className="flex justify-center text-lg   mt-36">
          <span className="loading loading-bars loading-lg text-info"></span>
        </div>
      ) : (
        <div className="w-72 mt-5 mx-auto border-2 p-4">
          {wasFound ? (
            <div className="font-semibold text-lg">
              Orden {orderId} ya incluida en manifiesto
            </div>
          ) : (
            <>
              <div className="font-semibold text-lg">
                ¿Deseas agregar la orden {orderId} al manifiesto?
              </div>
              <div className="flex justify-start flex-col gap-3 mt-4">
                <label htmlFor="yes">
                  <div className="flex items-center gap-3 bg-slate-200 p-3 rounded-full">
                    <input
                      type="radio"
                      name="radio-7"
                      className="radio radio-info"
                      checked={optionSelected === 1}
                      id="yes"
                      onChange={() => setOptionSelected(1)}
                    />
                    SI
                  </div>
                </label>
                <label htmlFor="no">
                  <div className="flex items-center gap-3 bg-slate-200 p-3 rounded-full">
                    <input
                      type="radio"
                      name="radio-7"
                      className="radio radio-info"
                      onChange={() => setOptionSelected(2)}
                      checked={optionSelected === 2}
                      id="no"
                    />
                    NO
                  </div>
                </label>
              </div>
              {optionSelected === 1 && (
                <>
                  <div className="font-semibold text-lg mt-2">
                    Selecciona una paqueteria
                  </div>
                  <div className="">
                    <Select
                      placeholder="Paqueteria"
                      options={options}
                      onChange={(option) => {
                        console.log("status:", option);
                        setCourierSelected(option.value);
                      }}
                      isSearchable={true}
                      isClearable={true}
                      styles={customStyles}
                      className="text-sm text-gray-500 w-full"
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}

      {(courierSelected > 0 || optionSelected === 2) && (
        <div className="text-center">
          <button
            disabled={loading || receivedAnswer}
            onClick={send}
            className="euro-btn  text-white w-40 mt-4"
          >
            Enviar
          </button>
        </div>
      )}

      {/* <ReturnSheet route={"/packing"} ws={orderId} /> */}
    </NavBar>
  );
};

export default ContainerEnd;
