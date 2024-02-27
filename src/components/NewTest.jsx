import toast from "react-hot-toast";
import Notifications from "./Notifications";
const NewTest = () => {
  const getToast = () => {
    toast("Prenda ya alistada  o no ", {
      icon: "⚠️",
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "black",
        fontSize: "17px",
        background: "#fae7c7",
      },
      // iconTheme: {
      //   primary: "#713200",
      //   secondary: "#FFFAEE",
      // },
    });
  };
  return (
    <div>
      {/* <Notifications></Notifications> */}
      <button onClick={getToast} className="btn">
        toast
      </button>
    </div>
  );
};

export default NewTest;
