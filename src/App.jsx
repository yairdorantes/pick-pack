import toast, { Toaster } from "react-hot-toast";
import Router from "../routes/Router";
import { useEffect, useMemo } from "react";
import { io } from "socket.io-client";
import useStore from "../Context";
import { serverURL } from "../api";
import { adrianImg, pickImage, monoImg } from "../ProjectData";
import logo from "/oms.png";

function App() {
  const { user, setSocket } = useStore();

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath !== "/login") {
      let socketConn;
      const connectSocket = () => {
        socketConn = io.connect(serverURL);
        socketConn.on("connect", () => {
          console.log("Connected to server");
          socketConn.emit("initial_data", user.id);
        });
        socketConn.on("receive_message", (data) => {
          console.log(data);
          toast.custom(
            (t) => (
              <div
                className={`transition-all duration-200 ${
                  t.visible ? "fadeInScale" : "fadeOutScale"
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
              >
                <div className="flex-1 w-0 p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                      <img
                        className="h-10 w-10 rounded-full"
                        // src="https://cdn.discordapp.com/avatars/1171876442586501121/7025947bea56fc3149a39f3d4ec2a656.webp?size=80"
                        src={
                          data.userId === 2
                            ? adrianImg
                            : data.userId === 5
                            ? monoImg
                            : logo
                        }
                        alt=""
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {data.userId === 2
                          ? "Adrian Mejia"
                          : data.userId === 5
                          ? "Mónica Meina"
                          : "Sistema"}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {data.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex border-l border-gray-200">
                  <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <svg
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="w-6 h-6"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={32}
                        d="M368 368L144 144M368 144L144 368"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ),
            { duration: Infinity }
          );
        });
        setSocket(socketConn);
      };

      const connectTimeout = setTimeout(connectSocket, 2500);

      // Clean up function
      return () => {
        clearTimeout(connectTimeout);
        if (socketConn) {
          socketConn.disconnect();
        }
      };
    }
  }, []);

  const memoizedPickImage = useMemo(() => pickImage, []);

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
