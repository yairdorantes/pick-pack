import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Scanner from "./components/Scanner";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Scanner></Scanner>
    </>
  );
}

export default App;
