import { Route, Routes } from "react-router-dom";
import Scanner from "../src/components/Scanner";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Scanner />} />
    </Routes>
  );
};

export default Router;
