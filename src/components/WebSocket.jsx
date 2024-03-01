// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import io from "socket.io-client";
// import useStore from "../../Context";
// import socket from "../../socket";

// function WebSocket() {
//   const [message, setMessage] = useState("");
//   //   const [messageReceived, setMessageReceived] = useState("");
//   const { user } = useStore();

//   function sendMessage() {
//     console.log("Button clicked");
//     socket.emit("send_message", { message: message });
//   }
//   function sendNotification() {
//     socket.emit("send_notification", [23]);
//   }

//   useEffect(() => {
//     // Emit a custom event with specific data when the connection is established
//     socket.on("connect", () => {
//       console.log("Connected to server");
//       socket.emit("initial_data", user.id);
//     });

//     socket.on("receive_message", (data) => {
//       //   setMessageReceived(data.message);
//       //   console.log(data);
//       toast.custom(
//         (t) => (
//           <div
//             className={`transition-all duration-200 ${
//               t.visible ? "fadeInScale" : "fadeOutScale"
//             } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
//           >
//             <div
//               onClick={() => console.log("great!")}
//               className="flex-1 w-0 p-4"
//             >
//               <div className="flex items-start">
//                 <div className="flex-shrink-0 pt-0.5">
//                   <img
//                     className="h-10 w-10 rounded-full"
//                     src="https://cdn.discordapp.com/avatars/1171876442586501121/7025947bea56fc3149a39f3d4ec2a656.webp?size=80"
//                     alt=""
//                   />
//                 </div>
//                 <div className="ml-3 flex-1">
//                   <p className="text-sm font-medium text-gray-900">
//                     Adrian Mejia
//                   </p>
//                   <p className="mt-1 text-sm text-gray-500">
//                     Ponte a chambear!!!
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex border-l border-gray-200">
//               <button
//                 onClick={() => toast.dismiss(t.id)}
//                 className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               >
//                 <svg
//                   viewBox="0 0 512 512"
//                   fill="currentColor"
//                   height="1em"
//                   width="1em"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={32}
//                     d="M368 368L144 144M368 144L144 368"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         ),
//         { duration: 2500 }
//       );
//     });

//     // return () => {
//     //   socket.disconnect();
//     // };
//   }, [socket]);

//   return (
//     <div className="">
//       {/* <input
//         placeholder="Message"
//         onChange={(e) => {
//           setMessage(e.target.value);
//         }}
//       /> */}
//       <button onClick={sendNotification} className="btn">
//         send notification by user id
//       </button>
//       <button onClick={sendMessage}>Send message</button>
//       {/* <h1>Message: {messageReceived}</h1> */}
//     </div>
//   );
// }

// export default WebSocket;
import React from "react";

const WebSocket = () => {
  return <div>WebSocket</div>;
};

export default WebSocket;
