import { useState } from "react";
import NavBar from "../../components/NavBar";

const HomeContainer = () => {
  // const [openOrders, setOpenOrders] = useState(0);
  return (
    <NavBar>
      <div className="p-3 ">
        <div
          // onClick={() => setOpenOrders(1)}
          className="w-full transition-all relative hover:scale-95  bg-gray-100 shadow-lg"
        >
          <div className="flex mb-4 items-center gap-2 p-4">
            <div className="text-xl">✅</div>
            <div className="">
              Ordenes para Picking asignadas:
              <span className="font-semibold"> 17 </span>
            </div>
          </div>
        </div>
        <div
          // onClick={() => setOpenOrders(2)}
          className="w-full transition-all hover:scale-95  bg-gray-100 shadow-lg"
        >
          <div className="flex items-center gap-2 p-4">
            <div className="text-xl">📦</div>
            <div className="">
              Ordenes para Packing asignadas:
              <span className="font-semibold"> 17 </span>
            </div>
          </div>
        </div>
        <div className="fixed bottom-1"></div>
      </div>
    </NavBar>
  );
};

export default HomeContainer;
