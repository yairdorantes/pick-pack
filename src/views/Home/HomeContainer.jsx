import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Chart from "./Chart";
import Stats from "./Stats";
import { flushSync } from "react-dom";

const HomeContainer = () => {
  const navigate = useNavigate();

  const goPicking = () => {
    if (!document.startViewTransition) {
      navigate("/picking");
      return;
    }
    document.startViewTransition(() => flushSync(() => navigate("/picking")));
  };

  const goPacking = () => {
    if (!document.startViewTransition) {
      navigate("/packing");
      return;
    }
    document.startViewTransition(() => flushSync(() => navigate("/packing")));
  };
  const goQRScanner = () => {
    if (!document.startViewTransition) {
      navigate("/qr");
      return;
    }
    document.startViewTransition(() => flushSync(() => navigate("/qr")));
  };
  return (
    <NavBar>
      <div className="p-3 select-none">
        <div
          // onClick={() => setOpenOrders(1)}
          className="w-full rounded-sm transition-all relative hover:scale-95  bg-gray-100 shadow-lg"
        >
          <div
            onClick={goPicking}
            className="flex cursor-pointer mb-4 items-center gap-2 p-4"
          >
            <div className="text-xl">✅</div>
            <div className="">
              Ordenes pendientes para Picking :
              <span className="font-semibold"> 17 </span>
            </div>
          </div>
          <div className="absolute right-2  top-1/2 -translate-y-1/2">
            <svg
              className="text-warning w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M20 12h2v6h-2v-6m0 8h2v2h-2v-2M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c2.3 0 4.3-.8 6-2V10h3.8c-.9-4.6-5-8-9.8-8m4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />
            </svg>
          </div>
        </div>
        <div
          // onClick={() => setOpenOrders(2)}
          onClick={goPacking}
          className="w-full rounded-sm relative cursor-pointer transition-all hover:scale-95  bg-gray-100 shadow-lg"
        >
          <div className="flex items-center gap-2 p-4">
            <div className="text-xl">📦</div>
            <div className="">
              Ordenes pendientes para Packing :
              <span className="font-semibold"> 17</span>
            </div>
          </div>
          <div className="absolute right-2  top-1/2 -translate-y-1/2">
            <svg
              className="text-warning w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M20 12h2v6h-2v-6m0 8h2v2h-2v-2M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c2.3 0 4.3-.8 6-2V10h3.8c-.9-4.6-5-8-9.8-8m4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />
            </svg>
          </div>
        </div>
      </div>
      <div
        onClick={goQRScanner}
        className="bg-gray-100 shadow-lg mb-4 flex w-[95%] mx-auto justify-between p-3 rounded-sm"
      >
        <div className="">Escanea tu orden</div>
        <div>
          <svg
            className="text-gray-600 w-7 h-7 scaling-element"
            fill="currentColor"
            viewBox="0 0 16 16"
            height="2em"
            width="2em"
          >
            <path d="M0 .5A.5.5 0 01.5 0h3a.5.5 0 010 1H1v2.5a.5.5 0 01-1 0v-3zm12 0a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-1 0V1h-2.5a.5.5 0 01-.5-.5zM.5 12a.5.5 0 01.5.5V15h2.5a.5.5 0 010 1h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm15 0a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 010-1H15v-2.5a.5.5 0 01.5-.5zM4 4h1v1H4V4z" />
            <path d="M7 2H2v5h5V2zM3 3h3v3H3V3zm2 8H4v1h1v-1z" />
            <path d="M7 9H2v5h5V9zm-4 1h3v3H3v-3zm8-6h1v1h-1V4z" />
            <path d="M9 2h5v5H9V2zm1 1v3h3V3h-3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8zm2 2H9V9h1v1zm4 2h-1v1h-2v1h3v-2zm-4 2v-1H8v1h2z" />
            <path d="M12 9h2V8h-2v1z" />
          </svg>
        </div>
      </div>

      <Chart />
      <Stats />
    </NavBar>
  );
};

export default HomeContainer;
