import pe from "../../assets/images/pe.jpg";
import fedex from "../../assets/images/fedex2.png";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";
import estafeta from "../../assets/images/estafeta.webp";
import OutsideClickHandler from "react-outside-click-handler";

// import toast from "react-hot-toast";
import { useState } from "react";
const Included = () => {
  const [courierOptions, setCourierOptions] = useState(false);
  const [optionsData, setOptionsData] = useState([]);
  const [courierName, setCourierName] = useState("");
  const [couriers] = useState([
    {
      id: 1,
      name: "fedex",
      image: fedex,
    },
    {
      id: 2,
      name: "paquetexpress",
      image: pe,
    },

    {
      id: 3,
      name: "estafeta",
      image: estafeta,
    },
    {
      id: 4,
      name: "DHL",
      image:
        "https://www.dhl.com/content/dam/dhl/global/core/images/teaser-image-main/dhl-logo.jpg",
    },
    {
      id: 5,
      name: "UPS",
      image: "https://thumbs.dreamstime.com/b/sube-insignia-93709604.jpg",
    },
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

  return (
    <div className="">
      {courierOptions && (
        <div
          className={`fixed bg-black z-20 bg-opacity-40  transition-all  w-screen h-screen top-0 `}
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
              handleCourier(courier.id);
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
    </div>
  );
};

export default Included;
