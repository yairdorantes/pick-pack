import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import logo from "/oms.png";
import axios from "axios";
import { api } from "../../../api";
import useStore from "../../../Context";
import toast from "react-hot-toast";

const NotifContainer = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user } = useStore();
  const getNotifications = () => {
    axios
      .get(`${api}/pick-pack/notifications/${user.id}`)
      .then((res) => {
        setNotifications(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log("error"));
  };
  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <NavBar>
      <div
        id="dropdownNotification"
        className="max-w-lg   mx-auto bg-white divide-y divide-gray-100 rounded-lg shadow"
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
                  src={logo}
                  alt="Jese image"
                />
                <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full">
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
                </div>
              </div>
              <div className="w-full ps-3">
                <div className="text-gray-500 text-sm mb-1.5">
                  {notification.content}
                </div>
                <div className="text-xs text-blue-600">a few moments ago</div>
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
