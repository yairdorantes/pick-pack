import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { api } from "../../api";
import { useParams } from "react-router-dom";
import ModalChat from "./ModalChat";

const Scanner = () => {
  const [orders, setOrders] = useState([
    {
      id_item: 55,
      orden_item: "1258440731848-01",
      refId_item: "TPOLPRCROJGDE",
      name_item: "Playera Tipo Polo Premium para Hombre Color Rojo G",
      imageUrl_item:
        "https://eurocotton.vteximg.com.br/arquivos/ids/164197/TPOLPRCROJ-2.jpg?v=637928113262070000",
      skuId_item: 544,
      quantity_item: 3,
      ean_item: "7501991615172",
    },
    {
      id_item: 56,
      orden_item: "1258440731848-01",
      refId_item: "TPOLPRCJASGDE",
      name_item: "Playera Tipo Polo Premium para Hombre Color Jaspe G",
      imageUrl_item:
        "https://eurocotton.vteximg.com.br/arquivos/ids/164162/TPOLPRCJAS-2.jpg?v=637928088181630000",
      skuId_item: 509,
      quantity_item: 3,
      ean_item: "7501991699806",
    },
    {
      id_item: 57,
      orden_item: "1258440731848-01",
      refId_item: "TPOLPRCREYGDE",
      name_item: "Playera Tipo Polo Premium para Hombre Color Rey G",
      imageUrl_item:
        "https://eurocotton.vteximg.com.br/arquivos/ids/164192/TPOLPRCREY-2.jpg?v=637928110380130000",
      skuId_item: 539,
      quantity_item: 3,
      ean_item: "7506389322083",
    },
  ]);
  const { orderId } = useParams();

  // const [orderID, setOrderID] = useState("1765175-01");
  let [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem(`ws-${orderId}`);
    return storedItems ? storedItems : null;
  });
  const inputRef = useRef(null);
  const [readCode, setReadCode] = useState("");

  const handleCode = (event) => {
    const currentValue = event.target.value;
    setReadCode(currentValue);
    if (currentValue.length === 13) {
      const orderIndex = orders.findIndex(
        (order) => order.ean_item === currentValue
      );
      if (orderIndex !== -1) {
        if (orders[orderIndex].quantity_item > 1) {
          const updatedOrders = [...orders];
          updatedOrders[orderIndex] = {
            ...updatedOrders[orderIndex],
            quantity_item: updatedOrders[orderIndex].quantity_item - 1,
          };
          setOrders(updatedOrders);
          localStorage.setItem(`ws-${orderId}`, JSON.stringify(updatedOrders));
        } else {
          const filteredOrders = orders.filter(
            (order) => order.ean_item !== currentValue
          );

          setOrders(filteredOrders);
          localStorage.setItem(`ws-${orderId}`, JSON.stringify(filteredOrders));
        }
      }
      setReadCode("");
    }
  };

  function getItems() {
    axios
      .get(`${api}/pick-pack/${orderId}`)
      .then((res) => {
        // console.log(res.data);
        console.log("items server request");
        setOrders(res.data);
        localStorage.setItem(`ws-${orderId}`, JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    inputRef.current.focus();
    if (items) {
      setOrders(JSON.parse(items));
    } else {
      getItems();
    }
    // console.log(orderId);

    // console.log("items", items);
  }, []);
  return (
    <div>
      <ModalChat />
      <div
        className="btn"
        onClick={() => {
          localStorage.removeItem(`ws-${orderId}`);
        }}
      >
        reboot
      </div>
      <input
        inputMode="none"
        className="opacity-20"
        ref={inputRef}
        value={readCode}
        onBlur={(e) => e.target.focus()}
        onChange={(e) => {
          handleCode(e);
        }}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
          }
        }}
        type="text"
      />

      <div className="flex mt-10 max-w-lg mx-auto flex-col gap-1">
        {orders.map((order, i) => (
          <div key={i}>
            <div className="flex cursor-pointer items-center rounded-md space-x-4 p-4 bg-white">
              <img
                src={order.imageUrl_item}
                alt="Prenda"
                className="w-[100px] h-[100px] border-2 rounded-md"
                width="100"
                height="100"
                style={{ aspectRatio: "100/100", objectFit: "cover" }}
              />
              <div className="flex flex-col">
                <span className="text-sm text-left text-black font-semibold capitalize">
                  {order.name_item}
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
                  {order.ean_item}
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
                    {order.quantity_item} unidades
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
