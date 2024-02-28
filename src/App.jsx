import { Toaster } from "react-hot-toast";
import Router from "../routes/Router";
import WebSocket from "./components/WebSocket";

function App() {
  return (
    <>
      <div className="">
        <Router />
        <Toaster />
        {/* <WebSocket></WebSocket> */}
        {/* <WebSocket /> */}
      </div>
    </>
  );
}

export default App;
