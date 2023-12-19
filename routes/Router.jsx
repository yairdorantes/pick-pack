import { Route, Routes } from "react-router-dom";
import Scanner from "../src/components/Scanner";
import PendingPicking from "../src/components/PendingPicking";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Scanner />} />
      <Route path="/pending" element={<PendingPicking />} />
    </Routes>
  );
};

export default Router;
