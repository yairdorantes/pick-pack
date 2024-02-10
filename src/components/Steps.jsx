const Steps = () => {
  return (
    <div className="fixed  flex justify-between  top-36 bg-black h-10 w-full">
      <div className=" bg-white flex items-center justify-center relative w-1/3">
        <div className="">Picking</div>
        <div className="triangle absolute w-4 h-10 bg-white -right-4 top-0 "></div>
      </div>
      <div className="text-center bg-gray-300 flex items-center justify-center w-1/3">
        <div>Packing</div>
        <div className="triangle absolute w-4 h-10 bg-black -right-0top-0 "></div>
      </div>
      <div className="text-center  bg-gray-300  w-1/3 flex items-center justify-center">
        <div>Completed</div>
        <div></div>
      </div>
    </div>
  );
};

export default Steps;
