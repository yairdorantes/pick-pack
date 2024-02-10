import { useParams } from "react-router-dom";
import NavBar from "../../components/NavBar";
import ReturnSheet from "../../components/ReturnSheet";
import Stepper from "../../components/Stepper";
import InfoBarPack from "./InfoBarPack";
import { useRef, useEffect } from "react";
import useStore from "../../../Context";
const ContainerPacking = () => {
  const focusArea = useRef(null);
  useEffect(() => {
    focusArea.current.focus();
  }, []);
  const { codeScanned, setCodeScanned } = useStore();

  // const { itemsList, setItemsList, packList } = useStore();
  const { orderId } = useParams();
  return (
    <div
      tabIndex="0"
      ref={focusArea}
      onKeyDown={(e) => {
        console.log(e.key);
        if (e.key === "Tab" || e.key === "Enter") {
          e.preventDefault();
          setCodeScanned("");
        }
        !isNaN(parseInt(e.key)) && setCodeScanned(codeScanned + e.key);
      }}
    >
      <NavBar>
        <Stepper stepGiven={2} />
        <ReturnSheet route={"/packing"} ws={orderId} />
        <InfoBarPack />

        {/* <PendingPackList /> */}
      </NavBar>
    </div>
  );
};
export default ContainerPacking;
