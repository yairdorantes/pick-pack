import { Route, Routes } from "react-router-dom";
import Scanner from "../src/components/Scanner";
import PendingPicking from "../src/components/PendingPicking";
import BarCodeScan from "../src/components/BarCodeScan";

const Router = () => {
  return (
    <Routes>
      <Route path="/picking/:orderId" element={<Scanner />} />
      <Route path="/pending" element={<PendingPicking />} />
      <Route path="/barcode" element={<BarCodeScan />} />
    </Routes>
  );
};

export default Router;
