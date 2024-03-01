import { useState } from "react";
import useStore from "../../Context";
import Html5QrcodePlugin from "../views/QR/Html5QrcodeScannerPlugin";
import Modal from "./Modal";

const BarCodeCameraScanner = ({ onBarcodeScan, isLoading }) => {
  const { setBarcodeScanner, barcodeScanner, setCodeScanned, codeScanned } =
    useStore();
  const [codeDetected, setCodeDetected] = useState("");
  return (
    <div>
      <Modal isOpen={barcodeScanner} setIsOpen={setBarcodeScanner}>
        <Html5QrcodePlugin
          fps={1}
          qrbox={250}
          disableFlip={false}
          qrCodeSuccessCallback={(result) => {
            console.log(result);
            setCodeScanned(result);
            setCodeDetected(result);
            !isLoading && codeScanned.length === 13 && onBarcodeScan();
          }}
        />
        <div className="max-w-full ml-2 truncate">
          Último código escaneado: {codeDetected}
        </div>
      </Modal>
    </div>
  );
};

export default BarCodeCameraScanner;
