import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { api } from "./api";

const useStore = create((set) => {
  let token = localStorage.getItem("authTokenFulfilment");
  if (token) {
    const data = jwtDecode(token);
    token = data.userData;
  } else token = null;
  return {
    codeScanned: "",
    setCodeScanned: (code) => set({ codeScanned: code }),
    itemData: {},
    setItemData: (itemInfo) => set({ itemData: itemInfo }),
    // items list for handle worksheet's products/items picking
    itemsList: [],
    setItemsList: (newItems) => set({ itemsList: newItems }),
    testingList: [
      {
        id_item: 55,
        orden_item: "1323540535559-01",
        refId_item: "TPOLPRCROJGDE",
        name_item: "Playera Tipo Polo Premium para Hombre Color Rojo r",
        imageUrl_item:
          "https://eurocotton.vtexassets.com/arquivos/ids/164759-800-800?v=638308220641230000&width=800&height=800&aspect=true",
        skuId_item: 544,
        quantity_item: 3,
        remaining_item: 3,
        ean_item: "7501991615172",
        // ean_item: "7501025406387",
        packed_item: 0,
      },
      {
        id_item: 57,
        orden_item: "1323540535559-01",
        refId_item: "TPOLPRCVERCHI",
        name_item: "Playera Tipo Polo Premium para Hombre Color Rojo G",
        imageUrl_item:
          "https://eurocotton.vtexassets.com/arquivos/ids/165230-800-800?v=638330926330200000&width=800&height=800&aspect=true",
        skuId_item: 544,
        quantity_item: 3,
        remaining_item: 3,
        ean_item: "7501991699806",
        packed_item: 0,
        // ean_item: "736085407747",
      },
    ],
    modalPack: false,
    setModalPack: (mpValue) => set({ modalPack: mpValue }),
    dragging: false,
    setDragging: (isDraggin) => set({ dragging: isDraggin }),
    packList: [],
    setPackList: (pack) => set({ packList: pack }),
    user: token || null,
    login: (username, password) => {
      return axios
        .post(`${api}/jwt/login`, { email: username, password: password })
        .then((res) => {
          localStorage.setItem("authTokenFulfilment", res.data.token);
          const data = jwtDecode(res.data.token);
          set({ user: data.userData });
        })
        .catch((err) => {
          console.log(err);
          // You may want to throw the error here or handle it accordingly
          throw err;
        });
    },
    logout: () => {
      localStorage.removeItem("authTokenFulfilment");
      return Promise.resolve();
    },
    fulFillmentUsers: [],
    setFulFillmentUsers: (users) => set({ fulFillmentUsers: users }),
  };
});

export default useStore;
