import logo from "/oms.png";

const NotifContainer = () => {
  return (
    <div>
      <div
        id="dropdownNotification"
        className="w-full absolute left-0 top-0 max-w-sm mx-auto bg-white divide-y divide-gray-100 rounded-lg shadow"
        aria-labelledby="dropdownNotificationButton"
      >
        <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50">
          Notifications
        </div>
        <div className="divide-y divide-gray-100">
          <a href="#" className="flex px-4 py-3 hover:bg-gray-100">
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
                New message from{" "}
                <span className="font-semibold text-gray-900">Jese Leos</span>:
                Hey, whats up? All set for the presentation?
              </div>
              <div className="text-xs text-blue-600">a few moments ago</div>
            </div>
          </a>{" "}
          <a href="#" className="flex px-4 py-3 hover:bg-gray-100">
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
                New message from{" "}
                <span className="font-semibold text-gray-900">Jese Leos</span>:
                Hey, whats up? All set for the presentation?
              </div>
              <div className="text-xs text-blue-600">a few moments ago</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotifContainer;
