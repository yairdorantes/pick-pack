import { Toaster } from "react-hot-toast";
import Router from "../routes/Router";
import { useEffect } from "react";
import axios from "axios";
import { api } from "../api";

function App() {
  // useEffect(() => {
  //   console.log(`${api}/jwt`);
  //   axios
  //     .get(`${api}/jwt`)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
