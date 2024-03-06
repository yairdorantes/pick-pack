import { Toaster } from "react-hot-toast";
import Router from "../routes/Router";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   console.log("APP RENDERED");
  // }, []);

  return (
    <>
      <div className="">
        <Router />
        <Toaster />
      </div>
    </>
  );
}

export default App;
