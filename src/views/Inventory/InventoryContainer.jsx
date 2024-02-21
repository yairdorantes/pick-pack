import { useState } from "react";
import NavBar from "../../components/NavBar";
import Html5QrcodePlugin from "../QR/Html5QrcodeScannerPlugin";

const InventoryContainer = () => {
  const [alertQR, setAlertQR] = useState(false);
  const [dataInput, setDataInput] = useState({
    SKU: "jaja",
    NoClothes: 1,
    package: "091729shskj",
  });
  const [activeInput, setActiveInput] = useState(0);
  const [QRValues, setQRValues] = useState(["xs", "xs", "xs", "xs", "xs"]);
  const handleQRValue = (value) => {
    let separatedValue = "";
    try {
      separatedValue = value.split(",");
      setQRValues(separatedValue);
    } catch (error) {
      console.log("Error");
    }
  };

  // setQRValues(here);
  return (
    <NavBar>
      <div className="relative">
        <button className="btn" onClick={() => setAlertQR(!alertQR)}>
          ajaj
        </button>
        <div className={``}>
          <Html5QrcodePlugin
            fps={1}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={(result) => {
              !alertQR && handleQRValue(result);
              setAlertQR(true);
              console.log(result);
              //   handleQRCode(result);
            }}
          />
        </div>

        <div
          className={` fixed w-screen p-4 transition-all text-center rounded-t-lg border bg-gray-100 ${
            alertQR ? "bottom-0" : "-bottom-full"
          }  z-50 h-3/4`}
        >
          <div
            className="absolute top-2 right-2"
            onClick={() => setAlertQR(false)}
          >
            <svg
              className="text-error w-7 h-7"
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
          <div className="font-bold text-lg capitalize mt-4">
            Información obtenida
          </div>
          <div className="flex mt-4 justify-center flex-col gap-3">
            <div className="text-center border ">
              <div className=" ">SKU:{QRValues[2]}</div>
              <div className="">{QRValues[2]}</div>
            </div>
            <div className="text-center uppercase">
              <div className="text-blue-400 font-bold text-sm ">
                Numero de prendas:
              </div>
              {activeInput !== 2 && (
                <div
                  onClick={() => setActiveInput(2)}
                  className="font-semibold text-lg"
                >
                  {QRValues[3]}
                </div>
              )}
              {activeInput === 2 && (
                <input
                  type="number"
                  className="input-sm font-bold text-lg text-center"
                  value={dataInput.NoClothes}
                  onChange={(e) =>
                    setDataInput({ ...dataInput, NoClothes: e.target.value })
                  }
                />
              )}
            </div>
            <div className="text-center uppercase">
              <div className="text-blue-400 font-bold text-sm ">Bulto:</div>
              <div className="font-semibold text-lg">{QRValues[4]}</div>
            </div>
            <div>
              <div className="text-blue-400 uppercase font-bold text-sm ">
                Notas:
              </div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="h-20 rounded-lg bg-gray-200"
              />
            </div>
          </div>
          <div className="flex w-full  items-center flex-col">
            <div className="btn btn-success text-white w-3/4">Enviar</div>{" "}
          </div>
          {/* <div className="btn" onClick={() => setAlertQR(!alertQR)}>
            qrSCanned!!!!!
          </div> */}
        </div>
      </div>
    </NavBar>
  );
};

export default InventoryContainer;
