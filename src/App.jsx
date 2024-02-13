import { Toaster } from "react-hot-toast";
import Router from "../routes/Router";

function App() {
  return (
    <>
      <div>
        <Router />
        <Toaster />
      </div>
    </>
  );
}

export default App;
