import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import logo from "/oms.png";
import axios from "axios";
import { api } from "../../../api";
import useStore from "../../../Context";
import toast from "react-hot-toast";
import { adrianImg, monoImg, pickImage } from "../../../ProjectData";

const NotifContainer = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user } = useStore();
  const getNotifications = () => {
    axios
      .get(`${api}/pick-pack/notifications/${user.id}`)
      .then((res) => {
        setNotifications(res.data.reverse());
        const pending = res.data.some(
          (notification) => notification.read === false
        );

        pending && readNotifications();
        console.log(res.data);
      })
      .catch((err) => console.log("error"));
  };

  const readNotifications = () => {
    axios
      .post(`${api}/pick-pack/notifications/read/${user.id}`)
      .then((res) => {
        console.log(res.data);
        // setPendingNotfs(res.data.pendingNotifs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const notifElapsedTime = (dateTimeString) => {
    const now = new Date();
    const dateTime = new Date(dateTimeString);
    const elapsedMilliseconds = now - dateTime;

    // Calculate elapsed time in different units
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);

    // Return appropriate time format based on elapsed time
    if (elapsedDays > 0) {
      return `Hace ${elapsedDays} dia${elapsedDays !== 1 ? "s" : ""}`;
    } else if (elapsedHours > 0) {
      return `Hace ${elapsedHours} hora${elapsedHours !== 1 ? "s" : ""}`;
    } else if (elapsedMinutes > 0) {
      return `Hace ${elapsedMinutes} minuto${elapsedMinutes !== 1 ? "s" : ""}`;
    } else {
      return "Ahora";
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <NavBar>
      <div
        id="dropdownNotification"
        className="w-full   mx-auto bg-white divide-y divide-gray-100 rounded-lg shadow"
        aria-labelledby="dropdownNotificationButton"
      >
        <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50">
          Notificaciones
        </div>
        <div className="divide- divide-gray-100">
          {loading && (
            <div className="text-center">
              <span className="loading loading-dots text-info loading-md"></span>
            </div>
          )}

          {notifications.map((notification, i) => (
            <a key={i} href="#" className="flex px-4 py-3 hover:bg-gray-100">
              <div className="flex-shrink-0">
                <img
                  className="rounded-full w-11 h-11"
                  // src={logo}
                  src={
                    notification.sender_id === 2
                      ? adrianImg
                      : notification.sender_id === 5
                      ? monoImg
                      : logo
                  }
                  alt="Jese image"
                />

                {/* <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full">
                  <svg
                    className="w-2 h-2 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                    <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                  </svg>
                </div> */}
              </div>
              <div className="w-full ps-3">
                <div className="text-gray-500 text-sm mb-1.5">
                  {notification.content}
                </div>
                <div className="text-xs text-blue-600">
                  {notifElapsedTime(notification.createdAt)}
                </div>
              </div>
            </a>
          ))}
          {!loading && notifications.length === 0 && (
            <div className="text-center">Nada por aqui...</div>
          )}
        </div>
      </div>
    </NavBar>
  );
};

export default NotifContainer;
