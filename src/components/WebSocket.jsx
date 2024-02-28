import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import io from "socket.io-client";
import useStore from "../../Context";

function WebSocket() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const { user, socket } = useStore();

  function sendMessage() {
    console.log("Button clicked");
    socket.emit("send_message", { message: message });
  }
  function sendNotification() {
    socket.emit("send_notification", [23]);
  }

  //   useEffect(() => {
  //     // Emit a custom event with specific data when the connection is established
  //     socket.on("connect", () => {
  //       console.log("Connected to server");
  //       socket.emit("initial_data", user.id);
  //     });

  //     socket.on("receive_message", (data) => {
  //       setMessageReceived(data.message);
  //       console.log(data);
  //       toast.success(data.message);
  //     });
  //   }, []);

  return (
    <div className="">
      {/* <input
        placeholder="Message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      /> */}
      <button onClick={sendNotification} className="btn">
        send notification by user id{" "}
      </button>
      <button onClick={sendMessage}>Send message</button>
      {/* <h1>Message: {messageReceived}</h1> */}
    </div>
  );
}

export default WebSocket;
