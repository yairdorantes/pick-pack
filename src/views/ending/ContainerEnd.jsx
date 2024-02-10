import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import ReturnSheet from "../../components/ReturnSheet";
import Stepper from "../../components/Stepper";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { api } from "../../../api";
import { flushSync } from "react-dom";

const ContainerEnd = () => {
  const navigate = useNavigate();

  const { orderId } = useParams();
  const [optionSelected, setOptionSelected] = useState(1);
  const [loading, setLoading] = useState(false);
  const [receivedAnswer, setReceivedAnswer] = useState(false);
  async function addToManifest() {
    const fetchData = async () => {
      const response = await axios.post(
        `${api}/pick-pack/add_to_manifest/${orderId}`
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
  return (
    <NavBar>
      <Stepper stepGiven={3} />
      <div className="w-72 mt-5 mx-auto border-2 p-4">
        <div className="font-semibold text-lg">
          ¿Deseas agregar la orden al manifiesto?
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
      </div>
      <div className="text-center">
        <button
          disabled={loading || receivedAnswer}
          onClick={send}
          className="btn btn-success text-white w-40 mt-4"
        >
          Enviar
        </button>
      </div>
      {/* <ReturnSheet route={"/packing"} ws={orderId} /> */}
    </NavBar>
  );
};

export default ContainerEnd;
