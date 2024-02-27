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
import { data } from "autoprefixer";

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
  const gohistory = () => {
    if (!document.startViewTransition) {
      navigate("/history");
      return;
    }
    document.startViewTransition(() => flushSync(() => navigate("/history")));
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
        // toast.error("Ocurrio un error al intentar recuperar la información", {
        //   position: "bottom-center",
        // });
      });
  }, []);

  return (
    <NavBar>
      <div className="px-3 mt-3 font-semibold ">{user.username}</div>
      <div className="p-3  select-none">
        <div
          // onClick={() => setOpenOrders(1)}
          className="w-full rounded-sm transition-all relative hover:scale-95  bg-gray-100 shadow-lg"
        >
          <div
            onClick={goPicking}
            className="flex cursor-pointer  items-center gap-2 p-4 rounded-lg border-2"
          >
            <div className="text-xl">
              {" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 384 512"
                color="#545454"
                height="30"
                width="30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 0-24-10.7-24-24V48H48v416h288z"></path>
              </svg>
            </div>
            <div className="">
              <div className="font-semibold"> {resumeData.pickingCurrent}</div>
              <div className="text-sm">Ordenes Pendientes</div>
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
        className="bg-gray-100 shadow-lg  flex w-[95%] mx-auto justify-between p-4 border-2 rounded-lg"
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
      <div className="text-center p-3">
        <select className="select select-bordered w-full max-w-lg ">
          <option disabled selected>
            Ultima semana
          </option>
          <option>Ultimos dias</option>
          <option>another</option>
        </select>
      </div>
      <Chart />
      <div className="flex gap-2 mb-2 p-3">
        <div className="border-2 w-1/2 p-2 rounded-lg">
          <strong className="flex items-center gap-1">
            {resumeData.handledOrders}
            <svg
              fill="currentColor"
              viewBox="0 0 16 16"
              className="text-success w-6 h-6"
              height="1em"
              width="1em"
            >
              <path d="M8.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L2.324 8.384a.75.75 0 111.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 01.02-.022zm-.92 5.14l.92.92a.75.75 0 001.079-.02l3.992-4.99a.75.75 0 10-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
            </svg>
          </strong>
          <div>Ordenes alistadas</div>
        </div>{" "}
        <div className="border-2 w-1/2 p-2 rounded-lg">
          <strong className="flex gap-1 items-center">
            {resumeData.garments}
            <svg
              viewBox="0 0 512 512"
              className="text-blue-700 h-6"
              fill="currentColor"
              height="1em"
              width="1em"
            >
              <path d="M256 96c33.08 0 60.71-25.78 64-58 .3-3-3-6-6-6a13 13 0 00-4.74.9c-.2.08-21.1 8.1-53.26 8.1s-53.1-8-53.26-8.1a16.21 16.21 0 00-5.3-.9h-.06a5.69 5.69 0 00-5.38 6c3.35 32.16 31 58 64 58z" />
              <path d="M485.29 89.9L356 44.64a4 4 0 00-5.27 3.16 96 96 0 01-189.38 0 4 4 0 00-5.35-3.16L26.71 89.9A16 16 0 0016.28 108l16.63 88a16 16 0 0013.92 12.9l48.88 5.52a8 8 0 017.1 8.19l-7.33 240.9a16 16 0 009.1 14.94A17.49 17.49 0 00112 480h288a17.49 17.49 0 007.42-1.55 16 16 0 009.1-14.94l-7.33-240.9a8 8 0 017.1-8.19l48.88-5.52a16 16 0 0013.92-12.9l16.63-88a16 16 0 00-10.43-18.1z" />
            </svg>
          </strong>
          <div>Prendas alistadas</div>
        </div>
      </div>

      {/* <Stats /> */}
      <div className="px-2 flex gap-2 ">
        <div
          onClick={goPacking}
          className="p-3 border-2 rounded-lg flex gap-2 items-center w-1/2"
        >
          <div>
            <svg
              width="30"
              height="30"
              viewBox="0 0 20 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.1897 0.298791C9.43641 0.157571 9.71576 0.083252 10.0001 0.083252C10.2844 0.083252 10.5637 0.157558 10.8104 0.298754L19.057 4.93743L19.0602 4.93923C19.2786 5.06327 19.4655 5.23499 19.6074 5.441C19.6336 5.47481 19.6578 5.5109 19.6795 5.5492C19.6957 5.57775 19.7102 5.60682 19.723 5.63627C19.8379 5.86455 19.8987 6.11675 19.9001 6.37326L19.9001 6.3781L19.9001 15.6218H19.0002L19.9001 15.6267C19.8985 15.9185 19.82 16.2047 19.6726 16.4564C19.5251 16.7082 19.3139 16.9166 19.0602 17.0607L19.057 17.0625L10.8105 21.7011C10.5638 21.8424 10.2844 21.9167 10.0001 21.9167C9.71573 21.9167 9.43634 21.8424 9.18961 21.7011L0.943237 17.0625L0.940041 17.0607C0.686322 16.9166 0.475079 16.7082 0.327615 16.4564C0.18015 16.2047 0.101678 15.9185 0.100111 15.6267L0.100098 15.6218V6.3781V6.37326C0.101476 6.11671 0.162328 5.86446 0.277249 5.63614C0.289073 5.60892 0.302348 5.58202 0.317101 5.55556C0.339794 5.51485 0.365179 5.47658 0.39291 5.44086C0.534768 5.23492 0.721672 5.06324 0.940041 4.93923L0.943234 4.93742L9.1897 0.298791ZM10.0001 1.90817L17.1687 5.94049L10.0803 9.96729L2.8438 5.93359L10.0001 1.90817ZM1.9001 15.5355V7.46831L9.18001 11.5262L9.11203 19.5922L1.9001 15.5355ZM10.9122 19.5787L18.1001 15.5355V7.48153L10.9801 11.5263L10.9122 19.5787Z"
                fill="#545454"
              ></path>
            </svg>
          </div>
          <div>
            <div>{resumeData.packingCurrent}</div>
            <div>Para Empacar</div>
          </div>
          <div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              className="text-blue-600"
              viewBox="0 0 448 512"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
            </svg>
          </div>
        </div>{" "}
        <div
          onClick={gohistory}
          className="p-3 border-2 rounded-lg cursor-pointer flex gap-2 items-center w-1/2"
        >
          <div>
            <svg
              width="23"
              height="23"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0001 1.90001C5.52659 1.90001 1.9001 5.5265 1.9001 10C1.9001 14.4735 5.52659 18.1 10.0001 18.1C14.4736 18.1 18.1001 14.4735 18.1001 10C18.1001 5.5265 14.4736 1.90001 10.0001 1.90001ZM0.100098 10C0.100098 4.53239 4.53248 0.100006 10.0001 0.100006C15.4677 0.100006 19.9001 4.53239 19.9001 10C19.9001 15.4676 15.4677 19.9 10.0001 19.9C4.53248 19.9 0.100098 15.4676 0.100098 10Z"
                fill="#545454"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0001 3.85001C10.4972 3.85001 10.9001 4.25295 10.9001 4.75001V9.10001H15.2501C15.7472 9.10001 16.1501 9.50295 16.1501 10C16.1501 10.4971 15.7472 10.9 15.2501 10.9H10.0001C9.50304 10.9 9.1001 10.4971 9.1001 10V4.75001C9.1001 4.25295 9.50304 3.85001 10.0001 3.85001Z"
                fill="#545454"
              ></path>
            </svg>
          </div>
          <div>
            <div>Ordenes</div>
            <div>Historial</div>
          </div>
          <div>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              className="text-blue-600"
              viewBox="0 0 448 512"
              height="20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
            </svg>
          </div>
        </div>
      </div>
    </NavBar>
  );
};

export default HomeContainer;
