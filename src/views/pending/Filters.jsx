import toast from "react-hot-toast";
import Select from "react-select";
let options;

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "100px",
    height: "34px",
    "min-height": "34px",
  }),
};
const shippingOptions = [
  { value: 1, label: "DHL Economy 5Kg" },
  { value: 2, label: "Redpack Estándar Domicilio" },
  { value: 3, label: "Redpack Estándar Ocurre" },
  { value: 4, label: "Paquetexpress Estándar" },
  { value: 5, label: "Estafeta Estandar Domicilio" },
  { value: 6, label: "Estafeta Express" },
  { value: 7, label: "Estafeta Estandar Ocurre" },
  { value: 8, label: "Estafeta Zona Extendida" },
  { value: 9, label: "FedEx - 5Kg" },
  { value: 10, label: "FedEx - 10Kg" },
  { value: 11, label: "FedEx - 30Kg" },
  { value: 12, label: "FedEx - 30+Kg" },
  { value: 13, label: "DHL Economy - Zona AD" },
  { value: 14, label: "DHL Economy - Zona EG" },
  { value: 15, label: "FedEx" },
  { value: 16, label: "DHL" },
  { value: 17, label: "Redpack" },
  { value: 18, label: "Paquetexpress" },
  { value: 19, label: "Estafeta" },
  { value: 20, label: "UPS" },
  { value: 21, label: "Almacen general" },
  { value: 22, label: "Isabel La Catolica" },
  { value: 23, label: "Correo Mayor" },
  { value: 24, label: "Cancun" },
  { value: 25, label: "Merida" },
  { value: 26, label: "Palenque" },
  { value: 27, label: "Monterrey" },
  { value: 28, label: "Tuxtla" },
  { value: 29, label: "Toluca" },
  { value: 30, label: "Villahermosa" },
  { value: 31, label: "Guadalajara" },
  { value: 32, label: "Acapulco" },
  { value: 33, label: "Leon" },
  { value: 34, label: "Cancun 2" },
  { value: 35, label: "La Paz" },
  { value: 36, label: "Merida 2" },
  { value: 37, label: "Tijuana" },
  { value: 38, label: "Villahermosa 2" },
  { value: 39, label: "Tuxtla 2" },
  { value: 40, label: "Tienda en Linea" },
  { value: 41, label: "Queretaro" },
  { value: 42, label: "Merida 3" },
  { value: 43, label: "Hermosillo" },
];

const Filters = ({ originalData, filteredData, changeFilteredData }) => {
  if (window.location.pathname === "/picking") {
    options = [
      { value: 1, label: "Pendiente de pago" },
      { value: 2, label: "Ventana de cancelación" },
      { value: 3, label: "Listo para manejo" },
      { value: 4, label: "Surtiendo" },
      { value: 5, label: "Surtido" },
      // { value: 6, label: "Empacando" },
      // { value: 7, label: "Empacado" },
      // { value: 8, label: "Embarcado" },
      // { value: 9, label: "Entregado" },
      // { value: 10, label: "Ticket generado" },
      // { value: 11, label: "Facturado" },
      // { value: 12, label: "Solicitud de cancelación" },
      // { value: 13, label: "Cancelado" },
      // { value: 14, label: "Reemplazado" },
      // { value: 15, label: "Incompleto" },
    ];
  } else {
    options = [
      // { value: 1, label: "Pendiente de pago" },
      // { value: 2, label: "Ventana de cancelación" },
      // { value: 3, label: "Listo para manejo" },
      // { value: 4, label: "Surtiendo" },
      { value: 5, label: "Surtido" },
      { value: 6, label: "Empacando" },
      { value: 7, label: "Empacado" },
      { value: 8, label: "Embarcado" },
      { value: 9, label: "Entregado" },
      { value: 10, label: "Ticket generado" },
      { value: 11, label: "Facturado" },
      { value: 12, label: "Solicitud de cancelación" },
      { value: 13, label: "Cancelado" },
      { value: 14, label: "Reemplazado" },
      { value: 15, label: "Incompleto" },
    ];
  }

  const filterByOrderId = (value) => {
    const filtered = originalData.filter(
      (item) =>
        item.idVtex_order === value.replace(/\s+$/, "") ||
        item.sequence_order === parseInt(value.replace(/\s+$/, ""))
    );

    changeFilteredData(filtered);
    // toast.success("Filtro aplicado", { duration: 1000 });
    // if (filtered.length > 0) {
    // }
    // else {
    //   changeFilteredData(originalData);
    //   // toast.error("Sin resultados", { duration: 1000 });
    // }
  };
  const filterByStatus = (status) => {
    const filtered = originalData.filter(
      (order) => order.status2_order === status
    );
    if (filtered.length > 0) {
      changeFilteredData(filtered);
      console.log(filtered);
      toast.success("Filtro aplicado", { duration: 1000 });
    } else {
      changeFilteredData(originalData);
      toast.error("Sin resultados", { duration: 1000 });
    }
  };
  const filterByShipping = (shipping) => {
    let filtered = originalData.filter(
      (order) => order.courier_order.toLowerCase() === shipping.toLowerCase()
    );
    if (filtered.length > 0) {
      changeFilteredData(filtered);
      toast.success("Filtro aplicado", { duration: 1300 });
    } else {
      filtered = originalData.filter((order) =>
        order.courier_order.toLowerCase().includes(shipping.toLowerCase())
      );
      if (filtered.length > 0) {
        changeFilteredData(filtered);
        toast.success("Filtro aplicado", { duration: 1300 });
      } else {
        changeFilteredData(originalData);
        // toast.error("Sin resultados", { duration: 1000 });
      }
    }
  };

  return (
    <div className="flex mt-4 mb-4 px-1 items-center gap-2 justify-start flex-wrap">
      <div id="search-id-order" className="">
        <form onSubmit={(e) => e.preventDefault()} className="">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full transition-all duration-500 p-1 ps-10  text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=" orden o Sequence ID"
              required
              onChange={(e) => {
                // setQuery(e.target.value);
                filterByOrderId(e.target.value);
              }}
            />
            {/* <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button> */}
          </div>
        </form>
      </div>
      <div>
        <Select
          placeholder="Estatus"
          options={options}
          onChange={(option) => {
            console.log("status:", option);
            filterByStatus(option.value);
          }}
          isSearchable={true}
          isClearable={true}
          styles={customStyles}
          className="text-sm text-gray-500 w-44"
        />
      </div>
      <div>
        <Select
          placeholder="Paqueteria/Sucursal"
          options={shippingOptions}
          onChange={(option) => {
            console.log("courier:", option);
            filterByShipping(option.label);
          }}
          isSearchable={true}
          isClearable={true}
          styles={customStyles}
          className="text-sm text-gray-500 w-44"
        />
      </div>
      <div
        onClick={() => changeFilteredData(originalData)}
        className="bg-red-500 border border-red-500 p-2 rounded-full text-white cursor-pointer hover:bg-white hover:text-red-500"
      >
        <svg fill="currentColor" viewBox="0 0 16 16" height="1em" width="1em">
          <path d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5v7a.5.5 0 01-1 0v-7a.5.5 0 011 0z" />
        </svg>
      </div>
    </div>
  );
};

export default Filters;
