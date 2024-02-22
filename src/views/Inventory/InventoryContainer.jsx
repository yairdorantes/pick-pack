import { useState } from "react";
import NavBar from "../../components/NavBar";
import Html5QrcodePlugin from "../QR/Html5QrcodeScannerPlugin";

const InventoryContainer = () => {
  const [alertQR, setAlertQR] = useState(false);
  const [dataInput, setDataInput] = useState({
    SKU: "TCOMADCBLACHI_example",
    NoClothes: 7777357,
    package: "BULT21_example",
    notes: "",
    maquilero: "M00120_example",
  });
  const [activeInput, setActiveInput] = useState(0);

  const handleQRValue = (value) => {
    let separatedValue = "";
    try {
      separatedValue = value.split(",");
      setDataInput({
        SKU: separatedValue[2],
        NoClothes: parseInt(separatedValue[3]),
        package: separatedValue[0],
        notes: "",
        maquilero: separatedValue[4],
      });
    } catch (error) {
      console.log("Error");
    }
  };

  // setQRValues(here);
  return (
    <NavBar>
      <div className="relative ">
        {/* <button className="btn" onClick={() => setAlertQR(!alertQR)}>
          ajaj
        </button> */}
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
          className={`fixed w-screen sm:w-72 left-1/2 -translate-x-1/2 p-4 transition-all text-center rounded-t-xl border-2 bg-gray-100 ${
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
          <div className="flex mt-4  flex-col text-left max-w-lg mx-auto gap-3">
            <div className="">
              <div className=" ">
                SKU:<span className="font-bold"> {dataInput.SKU}</span>
              </div>
              {/* <div className="">{QRValues[2]}</div> */}
            </div>
            <div className=" capitalize">
              <div
                onClick={() => {
                  setActiveInput(2);
                }}
                className=" "
              >
                Numero de prendas:{" "}
                {activeInput !== 2 ? (
                  <span className="font-bold">{dataInput.NoClothes}</span>
                ) : (
                  <input
                    type="number"
                    className="input-sm rounded-xl  font-bold w-16 text-center"
                    value={dataInput.NoClothes}
                    onChange={(e) =>
                      setDataInput({ ...dataInput, NoClothes: e.target.value })
                    }
                  />
                )}
              </div>
            </div>
            <div className=" capitalize">
              <div className=" ">
                Bulto: <span className="font-bold">{dataInput.package}</span>
              </div>
            </div>{" "}
            <div className="capitalize">
              <div className=" ">
                Maquilero:{" "}
                <span className="font-bold">{dataInput.maquilero}</span>
              </div>
            </div>
            <div>
              {/* <div className="capitalize">Notas:</div> */}

              <div className="">
                <textarea
                  onClick={() => {
                    setActiveInput(5);
                  }}
                  onChange={(e) =>
                    setDataInput({ ...dataInput, notes: e.target.value })
                  }
                  value={dataInput.notes}
                  className="textarea textarea-info  textarea-md w-full max-w-xs"
                  placeholder="Agrega información adicional"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 w-3/4  mt-4  left-1/2 -translate-x-1/2">
            <div
              className="euro-btn w-full"
              onClick={() => console.log(dataInput)}
            >
              Enviar
            </div>{" "}
          </div>
        </div>
      </div>
    </NavBar>
  );
};

export default InventoryContainer;
