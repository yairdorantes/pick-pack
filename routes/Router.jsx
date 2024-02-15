import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import NewTest from "../src/components/NewTest";
import FacialRec from "../src/components/FacialRec";

const Picking = lazy(() => import("../src/views/workSheet/Picking"));
const LoginForm = lazy(() => import("../src/views/login/LoginForm"));
const Test = lazy(() => import("../src/components/Test"));
const ContainerP = lazy(() => import("../src/views/pending/ContainerP"));
const ContainerPacking = lazy(() =>
  import("../src/views/packing/ContainerPacking")
);
const ContainerEnd = lazy(() => import("../src/views/ending/ContainerEnd"));
const AuthRoutes = lazy(() => import("./AuthRoutes"));
const ContainerManifest = lazy(() =>
  import("../src/views/manifest/ContainerManifest")
);
const PDFManifest = lazy(() => import("../src/views/manifest/PDFManifest"));
const Construction = lazy(() => import("../src/components/Construction"));
const AdminContainer = lazy(() => import("../src/views/Admin/AdminContainer"));
const QrScan = lazy(() => import("../src/views/QR/QrScan"));
const Page404 = lazy(() => import("../src/components/Page404"));
const HomeContainer = lazy(() => import("../src/views/Home/HomeContainer"));
const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/test" element={<Test />} />
      <Route element={<AuthRoutes />}>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        {/* <Route path="/pickup" element={<CameraPhoto />} /> */}
        <Route path="/picking/:orderId" element={<Picking />} />
        <Route path="/picking" element={<ContainerP view={2} />} />
        <Route path="/" element={<HomeContainer />} />
        <Route path="/everthing" element={<ContainerP view={1} />} />
        <Route path="/packing" element={<ContainerP view={3} />} />
        <Route path="/pack/:orderId" element={<ContainerPacking />} />
        <Route path="/end/:orderId" element={<ContainerEnd />} />
        <Route path="/manifest" element={<ContainerManifest />} />
        <Route path="/manifest/pdf/:courierId" element={<PDFManifest />} />
        <Route path="/comingsoon" element={<Construction />} />
        <Route path="/qr" element={<QrScan />} />
        <Route path="/admin" element={<AdminContainer />} />
        <Route path="/test2" element={<NewTest />} />
        <Route path="/face" element={<FacialRec />} />
        {/* </Suspense> */}
      </Route>
      <Route path="/*" element={<Page404 />} />
    </Routes>
  );
};

export default Router;
