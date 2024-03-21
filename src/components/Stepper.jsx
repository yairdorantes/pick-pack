import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../Context";
import axios from "axios";
import { api } from "../../api";
import { testingMode } from "../../ProjectData";
import toast from "react-hot-toast";
import logo from "/oms.png";
import { AnimatePresence, motion } from "framer-motion";

const Stepper = ({ stepGiven = 1 }) => {
  const { itemsList } = useStore();

  const { orderId } = useParams();
  const [step, setStep] = useState(stepGiven);
  const [currentSatus, setCurrentSatus] = useState(0);
  const [lineStep, setLineStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleOrderClick = (route) => {
    if (!document.startViewTransition) {
      navigate(route);
      return;
    }
    document.startViewTransition(() => flushSync(() => navigate(route)));
  };
  function getOrderStatus() {
    setLoading(true);
    axios
      .get(`${api}/pick-pack/order_status/${orderId}`)
      .then((res) => {
        // console.log(res.data);
        const statusNumber = res.data;
        setCurrentSatus(statusNumber);
        console.log(statusNumber, "status number here ");
        if (statusNumber <= 4) {
          setLineStep(1);
          !testingMode && handleOrderClick(`/picking/${orderId}`);
        } else if (statusNumber === 6 || statusNumber === 5) {
          setLineStep(2);
          !testingMode && handleOrderClick(`/pack/${orderId}`);
        } else if (statusNumber >= 7) {
          setLineStep(3);
          !testingMode && handleOrderClick(`/end/${orderId}`);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("No pudimos obtener el status de la orden");
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }
  useEffect(() => {
    getOrderStatus();
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed flex z-30 bg-white items-center justify-center top-0 h-screen w-screen"
            transition={{ duration: 0.4 }}
            // initial={{ opacity: 0, x: -100 }} // Initial position and opacity
            // animate={{ opacity: 1, x: 0 }} // Animation when component enters
            exit={{ y: "-100%" }} // Animation when component exits
          >
            <div className="">
              <div className="animation-sides">
                <img src={logo} className="w-20" alt="" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="breadcrumb text-xs flat">
        <a
          onClick={() => {
            testingMode && handleOrderClick(`/picking/${orderId}`);
          }}
          className={`${step >= 1 && "active"} ${
            step !== 1 && "!text-gray-300"
          } disabled  select-none`}
        >
          Alistamiento
        </a>
        <a
          onClick={() => {
            testingMode && handleOrderClick(`/pack/${orderId}`);
          }}
          className={`${step >= 2 && "active"} ${
            step !== 2 && "!text-gray-300"
          }  select-none`}
        >
          Empaquetado
        </a>
        <a
          onClick={() => {
            testingMode && handleOrderClick(`/end/${orderId}`);
          }}
          className={`${step >= 3 && "active"} ${
            step !== 3 && "!text-gray-300"
          } select-none `}
        >
          Finalizar
        </a>
      </div>
      <div className="w-full  border-2 border-blue-700" />
      <div>
        {/* {lineStep} */}
        <div className="absolute  w-full top-[27px] grid grid-cols-3">
          <div className="flex items-center justify-center">
            {lineStep === 1 && <CurrentTime />}
            {lineStep > 1 && <CircleCheck />}
            {/* <CircleCheck /> */}
          </div>
          <div className="flex items-center justify-center">
            {lineStep === 2 && <CurrentTime />}
            {lineStep > 2 && <CircleCheck />}
            {lineStep < 2 && <SimpleCircle />}
          </div>
          <div className="flex items-center justify-center">
            {lineStep === 3 && <CurrentTime />}
            {lineStep > 3 && <CircleCheck />}
            {lineStep < 3 && <SimpleCircle />}
          </div>
        </div>
      </div>
    </div>
  );
};

function SimpleCircle() {
  return (
    <div className="rounded-full w-[18px] h-[18px] border-4  border-blue-700 bg-white" />
  );
}
function CircleCheck() {
  return (
    <svg
      className="text-blue-700 bg-white rounded-full"
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="22"
      width="22"
    >
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
    </svg>
  );
}
function CurrentTime() {
  return (
    <svg
      fill="#fff"
      viewBox="0 0 32.00 32.00"
      id="icon"
      className="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#2953b2"
      strokeWidth="0.00032"
    >
      <g
        id="SVGRepo_bgCarrier"
        strokeWidth="0"
        transform="translate(2.4000000000000004,2.4000000000000004), scale(0.85)"
      >
        <rect
          x="0"
          y="0"
          width="32.00"
          height="32.00"
          rx="16"
          fill="#fff"
          strokeWidth="0"
        ></rect>
      </g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#2953b2"
        strokeWidth="1.28"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2Zm0,26A12,12,0,0,1,16,4V16l8.4812,8.4814A11.9625,11.9625,0,0,1,16,28Z"
          fill="#2953b2"
        ></path>
      </g>
    </svg>
  );
}
export default Stepper;
