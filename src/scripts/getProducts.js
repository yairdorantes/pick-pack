import toast from "react-hot-toast";
import useStore from "../../Context";
import { api } from "../../api";
import axios from "axios";
import { useState } from "react";

export function useGetItems() {
  const [loading, setLoading] = useState(false);
  const { setItemsList, testingList } = useStore();
  const getProducts = (orderId) => {
    const url = `${api}/pick-pack/${orderId}`;
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        // console.log(res.data);
        console.log("items server request");
        // setItemsList(testing);
        setItemsList(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ocurrio un error al intentar obtener los productos");
        //! this is for testing
        setItemsList(testingList);
      })
      .finally(() => setLoading(false));
  };
  return { getProducts, loading };
}
