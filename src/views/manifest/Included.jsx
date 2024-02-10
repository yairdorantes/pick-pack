import pe from "../../assets/images/pe.jpg";
import fedex from "../../assets/images/fedex2.png";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import estafeta from "../../assets/images/estafeta.webp";
import OutsideClickHandler from "react-outside-click-handler";

// import toast from "react-hot-toast";
import { useEffect, useState } from "react";
const Included = () => {
  const [courierOptions, setCourierOptions] = useState(false);
  const [optionsData, setOptionsData] = useState([]);
  const [courierName, setCourierName] = useState("");
  const [couriers] = useState([
    {
      id: 1,
      name: "fedex",
      options: [
        { id: 8, name: "5kg" },
        { id: 9, name: "10kg" },
        { id: 10, name: "30kg" },
        { id: 11, name: "30+ kg" },
        { id: 14, name: "Fedex" },
      ],
      image: fedex,
    },
    {
      id: 2,
      name: "paquetexpress",
      options: [
        { id: 3, name: "Paquetexpress Estándar" },
        { id: 17, name: "Paquetexpress" },
      ],
      image: pe,
    },
    {
      id: 3,
      name: "estafeta",
      options: [
        { id: 4, name: "Estafeta Estandar Domicilio" },
        { id: 5, name: "Estafeta Express" },
        { id: 6, name: "Estafeta Estandar Ocurre" },
        { id: 7, name: "Estafeta Zona Extendida" },
        { id: 18, name: "Estafeta" },
      ],
      image: estafeta,
    },
    // {
    //   id: 4,
    //   name: "dhl",
    //   options: [
    //     { id: 4, name: "Estafeta Estandar Domicilio" },
    //     { id: 5, name: "Estafeta Express" },
    //     { id: 6, name: "Estafeta Estandar Ocurre" },
    //     { id: 7, name: "Estafeta Zona Extendida" },
    //     { id: 18, name: "Estafeta" },
    //   ],
    //   image: estafeta,
    // },
  ]);
  const navigate = useNavigate();

  const handleCourier = (courierId) => {
    const url = `/manifest/pdf/${courierId}`;
    if (!document.startViewTransition) {
      navigate(url);
      return;
    }
    document.startViewTransition(() => flushSync(() => navigate(url)));
  };
  function courierSelection(id) {
    const selectedCourier = couriers.find((courier) => courier.id === id);
    setOptionsData(selectedCourier.options);
    setCourierName(selectedCourier.name);
  }

  // useEffect(() => {
  //   console.log("speech");
  //   const voices = window.speechSynthesis.getVoices();
  //   // Find a female voice (you may need to adjust this based on available voices)
  //   const femaleVoice = voices.find((voice) => voice.name.includes("Female"));
  //   var msg = new SpeechSynthesisUtterance();
  //   if (femaleVoice) {
  //     msg.voice = femaleVoice;
  //   }
  //   msg.text = `Prenda escaneada restan 5`;
  //   msg.lang = "es-MX";
  //   window.speechSynthesis.speak(msg);
  // }, []);

  return (
    <div className="">
      {courierOptions && (
        <div
          className={`fixed bg-black z-20 bg-opacity-40 backdrop-blur-sm transition-all  w-screen h-screen top-0 `}
        />
      )}
      {/* <div className="btn" onClick={speech}>
        voice
      </div> */}
      <div className="flex mt-10 mb-10 flex-wrap justify-center gap-14  items-center ">
        {couriers.map((courier, i) => (
          <div
            key={i}
            onClick={() => {
              setCourierOptions(true);
              courierSelection(courier.id);
            }}
            className="cursor-pointer"
          >
            <div
              style={{
                backgroundImage: `url(${courier.image})`,
              }}
              className="w-80 h-56 rounded-lg bg-center bg-cover  shadow-2xl"
            >
              {/* <img src={courier.image} alt="Shoes" /> */}
            </div>
          </div>
        ))}
      </div>

      <OutsideClickHandler onOutsideClick={() => setCourierOptions(false)}>
        <div
          className={`fixed transition-all -translate-x-1/2 left-1/2 duration-300 rounded-t-xl p-4 text-black  sm:w-96 ${
            courierOptions ? "bottom-0" : "-bottom-full"
          } w-full border z-30 border-black border-opacity-50 bg-slate-100`}
        >
          <div
            onClick={() => setCourierOptions(false)}
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
          <div className="font-semibold capitalize mb-2 text-xl text-center">
            📦 {courierName} 📦
          </div>
          <ul className="flex flex-col gap-4">
            {optionsData.map((option, i) => (
              <li
                key={i}
                onClick={() => handleCourier(option.id)}
                className="border-b-2 hover:bg-gray-400 rounded-xl border-gray-700 p-2 border-opacity-10"
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default Included;
