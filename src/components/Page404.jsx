import React from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  const route = "/picking";
  const goBack = () => {
    if (!document.startViewTransition) {
      navigate(route);
      return;
    }
    document.startViewTransition(() => flushSync(() => navigate(route)));
  };
  return (
    <div className="h-screen w-screen bg-gray-50 flex items-center">
      <div className="container flex flex-col md:flex-row items-center justify-between px-5 text-gray-700">
        <div className="w-full lg:w-1/2 mx-8">
          <div className="text-7xl text-green-500 font-dark font-extrabold mb-8">
            {" "}
            404
          </div>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
            Ups parece que estás perdido.
          </p>

          <div
            onClick={goBack}
            className="px-5 cursor-pointer inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-green-600 active:bg-red-600 hover:bg-red-700"
          >
            LLevame de vuelta
          </div>
        </div>
        <div className="w-full lg:flex lg:justify-end lg:w-1/2 mx-5 my-12">
          <img
            src="https://user-images.githubusercontent.com/43953425/166269493-acd08ccb-4df3-4474-95c7-ad1034d3c070.svg"
            className=""
            alt="Page not found"
          />
        </div>
      </div>
    </div>
  );
};

export default Page404;
