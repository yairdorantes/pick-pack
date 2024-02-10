const CardLoader = () => {
  return (
    <div className="flex items-center space-x-2  ml-5">
      <div className="animate-pulse  bg-gray-500 h-20 w-20 rounded-md"></div>
      <div className="space-y-2">
        <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[200px]">
          {" "}
        </div>
        <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[170px]">
          {" "}
        </div>
      </div>
    </div>
  );
};

export default CardLoader;
