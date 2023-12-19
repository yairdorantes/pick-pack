import { useEffect, useRef, useState } from "react";

const Scanner = () => {
  const [orders, setOrders] = useState([
    {
      orderId: "7501991615172",
      name: "playera cuello redondolo redondolo redondolo redondo manga corta para hombre color negro m ",
      quantity: 4,
      image:
        "https://eurocotton.vtexassets.com/arquivos/ids/163419-800-800?v=638138264125230000&width=800&height=800&aspect=true",
    },
    {
      orderId: "7501991699806",
      name: "orden2",
      quantity: 1,
      image:
        "https://eurocotton.vtexassets.com/arquivos/ids/165282-800-800?v=638343056243900000&width=800&height=800&aspect=true",
    },
    {
      orderId: "75019916998022",
      name: "orden3",
      quantity: 2,
      image:
        "https://eurocotton.vtexassets.com/arquivos/ids/163924-800-800?v=638138889370430000&width=800&height=800&aspect=true",
    },
    {
      orderId: "2",
      name: "orden4",
      quantity: 12,
      image:
        "https://eurocotton.vtexassets.com/arquivos/ids/163544-800-800?v=638138921318030000&width=800&height=800&aspect=true",
    },
  ]);
  const inputRef = useRef(null);
  const [readCode, setReadCode] = useState("");

  const handleCode = (event) => {
    event.preventDefault();
    const currentValue = event.target.value;
    setReadCode(currentValue);
    // console.log(currentValue);

    if (currentValue.length === 13) {
      const orderIndex = orders.findIndex(
        (order) => order.orderId === currentValue
      );

      if (orderIndex !== -1) {
        // Decrease the quantity if greater than 0
        if (orders[orderIndex].quantity > 1) {
          const updatedOrders = [...orders];
          updatedOrders[orderIndex] = {
            ...updatedOrders[orderIndex],
            quantity: updatedOrders[orderIndex].quantity - 1,
          };

          setOrders(updatedOrders);
        } else {
          const filteredOrders = orders.filter(
            (order) => order.orderId !== currentValue
          );

          setOrders(filteredOrders);
        }
      }
      setReadCode("");
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div>
      <div className="btn" onClick={() => handleCode("7506174503697")}>
        scanner
      </div>

      <input
        inputMode="none"
        className="opacity-0"
        ref={inputRef}
        value={readCode}
        onBlur={(e) => e.target.focus()}
        onChange={(e) => {
          handleCode(e);
        }}
        onKeyDown={(e) => {
          if (e.keyCode === 9) e.preventDefault();
        }}
        type="text"
      />

      <div className="flex mt-10 max-w-lg mx-auto flex-col gap-1">
        {orders.map((order, i) => (
          <div key={i}>
            <div className="flex cursor-pointer items-center rounded-md space-x-4 p-4 bg-white">
              <img
                src={order.image}
                alt="Black T-Shirt"
                className="w-[100px] h-[100px] border-2 rounded-md"
                width="100"
                height="100"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
              />
              <div className="flex flex-col">
                <span className="text-sm text-left text-black font-semibold capitalize">
                  Black round seck Short Sleeve T-Shirt for men size m
                </span>
                <span className="text-sm text-left flex items-center gap-2 text-gray-500">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    height="20"
                    width="20"
                  >
                    <path d="M2 6h2v12H2V6m3 0h1v12H5V6m2 0h3v12H7V6m4 0h1v12h-1V6m3 0h2v12h-2V6m3 0h3v12h-3V6m4 0h1v12h-1V6z" />
                  </svg>{" "}
                  {order.orderId}
                </span>
                <div className="flex items-center space-x-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-500"
                    data-darkreader-inline-stroke=""
                    // style="--darkreader-inline-stroke: currentColor;"
                  >
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                    <path d="m3.3 7 8.7 5 8.7-5"></path>
                    <path d="M12 22V12"></path>
                  </svg>
                  <span className="text-sm text-black">
                    {order.quantity} unidades
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scanner;
