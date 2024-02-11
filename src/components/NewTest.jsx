import logo from "../../dist/oms.png";
const NewTest = () => {
  return (
    <div className="fixed w-full animate-pulse h-full bg-gray-100 flex justify-center items-center flex-col ">
      <img src={logo} alt="" className="" />
      <div className="mt-2">Cargando...</div>
    </div>
  );
};

export default NewTest;
