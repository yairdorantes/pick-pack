import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Chart from "./Chart";
import Stats from "./Stats";
import { flushSync } from "react-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../api";
import toast from "react-hot-toast";
import useStore from "../../../Context";

const HomeContainer = () => {
  const [resumeData, setresumeData] = useState({});
  const { user } = useStore();
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

  useEffect(() => {
    axios
      .get(`${api}/pick-pack/resume/${user.id}`)
      .then((res) => {
        console.log(res);
        setresumeData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ocurrio un error al intentar recuperar la información", {
          position: "bottom-center",
        });
      });
  }, []);

  return (
    <NavBar>
      <div className="p-3  select-none">
        <div
          // onClick={() => setOpenOrders(1)}
          className="w-full  rounded-sm transition-all relative hover:scale-95  bg-gray-100 shadow-lg"
        >
          <div
            onClick={goPicking}
            className="flex cursor-pointer mb-4 items-center gap-2 p-4"
          >
            <div className="text-xl">
              {" "}
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                className="w-5 h-5 text-blue-500"
              >
                <path
                  fillRule="evenodd"
                  d="M10.854 7.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-1.5-1.5a.5.5 0 11.708-.708L7.5 9.793l2.646-2.647a.5.5 0 01.708 0z"
                />
                <path d="M4 1.5H3a2 2 0 00-2 2V14a2 2 0 002 2h10a2 2 0 002-2V3.5a2 2 0 00-2-2h-1v1h1a1 1 0 011 1V14a1 1 0 01-1 1H3a1 1 0 01-1-1V3.5a1 1 0 011-1h1v-1z" />
                <path d="M9.5 1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h3zm-3-1A1.5 1.5 0 005 1.5v1A1.5 1.5 0 006.5 4h3A1.5 1.5 0 0011 2.5v-1A1.5 1.5 0 009.5 0h-3z" />
              </svg>
            </div>
            <div className="">
              Ordenes pendientes para Picking :
              <span className="font-semibold">
                {" "}
                {resumeData.pickingCurrent}{" "}
              </span>
            </div>
          </div>
          <div className="absolute right-2  top-1/2 -translate-y-1/2">
            <svg
              className="text-blue-500 w-6 h-6"
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
            <div className="text-xl">
              <svg
                className="w-5 h-5 text-blue-500"
                viewBox="0 0 16 16"
                fill="currentColor"
                height="1em"
                width="1em"
              >
                <path
                  fillRule="evenodd"
                  d="M6.122.392a1.75 1.75 0 011.756 0l5.25 3.045c.54.313.872.89.872 1.514V7.25a.75.75 0 01-1.5 0V5.677L7.75 8.432v6.384a1 1 0 01-1.502.865L.872 12.563A1.75 1.75 0 010 11.049V4.951c0-.624.332-1.2.872-1.514L6.122.392zM7.125 1.69l4.63 2.685L7 7.133 2.245 4.375l4.63-2.685a.25.25 0 01.25 0zM1.5 11.049V5.677l4.75 2.755v5.516l-4.625-2.683a.25.25 0 01-.125-.216zm10.828 3.684a.75.75 0 101.087 1.034l2.378-2.5a.75.75 0 000-1.034l-2.378-2.5a.75.75 0 00-1.087 1.034L13.501 12H10.25a.75.75 0 000 1.5h3.251l-1.173 1.233z"
                />
              </svg>
            </div>
            <div className="">
              Ordenes pendientes para Packing :
              <span className="font-semibold">
                {" "}
                {resumeData.packingCurrent}
              </span>
            </div>
          </div>
          <div className="absolute right-2  top-1/2 -translate-y-1/2">
            <svg
              className="text-blue-500 w-6 h-6"
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
