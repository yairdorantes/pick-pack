import NavBar from "../../components/NavBar";
import Chart from "./Chart";
import Stats from "./Stats";

const HomeContainer = () => {
  return (
    <NavBar>
      <div className="p-3 ">
        <div
          // onClick={() => setOpenOrders(1)}
          className="w-full relative transition-all relative hover:scale-95  bg-gray-100 shadow-lg"
        >
          <div className="flex mb-4 items-center gap-2 p-4">
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
          className="w-full relative transition-all hover:scale-95  bg-gray-100 shadow-lg"
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
        <div className="fixed bottom-1"></div>
      </div>
      <Chart />
      <Stats />
    </NavBar>
  );
};

export default HomeContainer;
