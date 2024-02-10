import { Route, Routes } from "react-router-dom";
import LoginForm from "../src/views/login/LoginForm";
import Test from "../src/components/Test";
// import CameraPhoto from "../src/components/CameraPhoto";
import Picking from "../src/views/workSheet/Picking";
import ContainerP from "../src/views/pending/ContainerP";
import ContainerPacking from "../src/views/packing/ContainerPacking";
import ContainerEnd from "../src/views/ending/ContainerEnd";
import AuthRoutes from "./AuthRoutes";
import ContainerManifest from "../src/views/manifest/ContainerManifest";
import PDFManifest from "../src/views/manifest/PDFManifest";
import Construction from "../src/components/Construction";
import AdminContainer from "../src/views/Admin/AdminContainer";
import QrScan from "../src/views/QR/QrScan";
import Page404 from "../src/components/Page404";
import HomeContainer from "../src/views/Home/HomeContainer";
const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/test" element={<Test />} />
      <Route element={<AuthRoutes />}>
        {/* <Route path="/pickup" element={<CameraPhoto />} /> */}
        <Route path="/picking/:orderId" element={<Picking />} />
        <Route path="/home" element={<HomeContainer />} />

        <Route path="/everthing" element={<ContainerP view={1} />} />
        <Route path="/picking" element={<ContainerP view={2} />} />
        <Route path="/packing" element={<ContainerP view={3} />} />
        <Route path="/pack/:orderId" element={<ContainerPacking />} />
        <Route path="/end/:orderId" element={<ContainerEnd />} />
        <Route path="/manifest" element={<ContainerManifest />} />
        <Route path="/manifest/pdf/:courierId" element={<PDFManifest />} />
        <Route path="/comingsoon" element={<Construction />} />
        <Route path="/qr" element={<QrScan />} />
        <Route path="/admin" element={<AdminContainer />} />
      </Route>
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};

export default Router;
