import { Sling as Hamburger } from "hamburger-react";
import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import MainIcon from "../assets/ReactIcons/MainIcon";
import HouseIcon from "../assets/ReactIcons/HouseIcon";
import SheetIcon from "../assets/ReactIcons/SheetIcon";
import BoxesIcon from "../assets/ReactIcons/BoxesIcon";
import BagIcon from "../assets/ReactIcons/BagIcon";
import LogoutIcon from "../assets/ReactIcons/LogoutIcon";
// import Steps from "./Steps";
import oms from "/oms.png";
import ModalChat from "./ModalChat";
import useStore from "../../Context";
const NavBar = ({ children }) => {
  // console.log("naaba");
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [showSideMenu, setShowSideMenu] = useState(false);
  const { user, logout } = useStore();

  const handleLink = useCallback(
    (e) => {
      const route = e.currentTarget.getAttribute("href");
      if (!document.startViewTransition) {
        navigate(route);
        return;
      }
      document.startViewTransition(() => navigate(route));
      setShowSideMenu(false);
    },
    [navigate]
  );
  const logoutClick = useCallback(() => {
    logout().then(() => {
      if (!document.startViewTransition) {
        navigate("/login");
        return;
      }
      document.startViewTransition(() => navigate("/login"));
      setShowSideMenu(false);
    });
  }, [logout, navigate]);
  const goHome = useCallback(() => {
    if (!document.startViewTransition) {
      navigate("/");
      return;
    }
    document.startViewTransition(() => navigate("/"));
  }, [navigate]);
  return (
    <div className="flex flex-col h-screen ">
      {/* NavBar */}

      <div
        className="navbar select-none z-40 fixed bg-base-100 shadow-md"
        data-theme="light"
      >
        <div className="flex-none"></div>
        <div className="flex-1">
          {/* <MainIcon /> */}
          <div>
            <img src={oms} alt="" className="w-8" />
          </div>
          <a
            onClick={goHome}
            className="btn btn-ghost text-sm capitalize sm:text-lg"
          >
            Eurocotton Fulfillment
          </a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs text-white badge-error indicator-item"></span>
            </div>
          </button>
        </div>

        {/* <div
          onClick={goHome}
          className="font-semibold  capitalize cursor-pointer text-sm w-16 ml-3 text-center"
        >
          {user.username}
        </div> */}
        <div>
          <Hamburger
            toggled={showSideMenu}
            onToggle={() => setShowSideMenu(!showSideMenu)}
          />
        </div>
      </div>

      {/* NavBar */}

      {/* Main Content */}
      <div className="flex flex-1">
        <div
          onClick={() => setShowSideMenu(false)}
          className={`fixed  w-full h-full bg-opacity-40  bg-black ${
            showSideMenu ? "z-30" : "hidden"
          }   `}
        />

        <div className="flex-1 mt-16">{children}</div>
      </div>
      {/* Main Content */}

      {/* Side Menu */}

      <div
        className={`z-30  select-none bg-white text-black fixed w-56 h-full ${
          showSideMenu ? "right-0" : "-right-56"
        } transition-all duration-200 top-16 overflow-y-auto`}
      >
        <>
          <div className="flex flex-col cursor-pointer ">
            <div
              href="/"
              onClick={handleLink}
              className="flex items-center  hover:bg-gray-100 h-24 p-4 border-b-2  gap-4"
            >
              <div>
                <HouseIcon />
              </div>
              <div className="font-semibold">Resumen</div>
              <div className="border-t border-gray-700 my-4"></div>
            </div>
            <div href="/picking" onClick={handleLink}>
              <div className="flex h-24 hover:bg-gray-100 border-b-2 p-4 items-center gap-4">
                <div>
                  <SheetIcon />
                </div>
                <div className="font-semibold">Ordenes</div>
              </div>
            </div>{" "}
            <div>
              {orderId !== undefined && (
                <ModalChat>
                  <div className="flex h-24 hover:bg-gray-100 border-b-2 p-4 items-center gap-4">
                    <div>
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="30"
                        width="30"
                        color="#545454"
                      >
                        <path d="M9 11h9v2H9v-2m9-4H6v2h12V7m4-3v18l-4-4H4a2 2 0 01-2-2V4c0-1.1.9-2 2-2h16a2 2 0 012 2m-2 0H4v12h14.83L20 17.17V4z" />
                      </svg>
                    </div>

                    <div className="font-semibold">Notas</div>
                  </div>
                </ModalChat>
              )}
            </div>
            <div
              href="/qr"
              onClick={handleLink}
              className="flex h-24 hover:bg-gray-100 border-b-2 p-4 items-center gap-4"
            >
              <div>
                <svg
                  className="text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="2em"
                  width="2em"
                >
                  <path d="M0 .5A.5.5 0 01.5 0h3a.5.5 0 010 1H1v2.5a.5.5 0 01-1 0v-3zm12 0a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-1 0V1h-2.5a.5.5 0 01-.5-.5zM.5 12a.5.5 0 01.5.5V15h2.5a.5.5 0 010 1h-3a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zm15 0a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 010-1H15v-2.5a.5.5 0 01.5-.5zM4 4h1v1H4V4z" />
                  <path d="M7 2H2v5h5V2zM3 3h3v3H3V3zm2 8H4v1h1v-1z" />
                  <path d="M7 9H2v5h5V9zm-4 1h3v3H3v-3zm8-6h1v1h-1V4z" />
                  <path d="M9 2h5v5H9V2zm1 1v3h3V3h-3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8zm2 2H9V9h1v1zm4 2h-1v1h-2v1h3v-2zm-4 2v-1H8v1h2z" />
                  <path d="M12 9h2V8h-2v1z" />
                </svg>
              </div>
              <div className="font-semibold">QR Orden</div>
            </div>
            <div
              href="/manifest"
              onClick={handleLink}
              className="flex h-24 hover:bg-gray-100 border-b-2 p-4 items-center gap-4"
            >
              <div>
                <svg
                  viewBox="0 0 21 21"
                  fill="currentColor"
                  color="#545454"
                  height="32"
                  width="32"
                >
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16.5 15.5v-10a2 2 0 00-2-2h-8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2zM7.5 7.5h6M7.5 10.5h6M7.5 13.5h6" />
                    <g>
                      <path d="M16.5 15.5v-10a2 2 0 00-2-2h-8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2zM7.5 7.5h6M7.5 10.5h6M7.5 13.5h6" />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="font-semibold">Manifiesto</div>
            </div>
            <div
              href="/inventory"
              onClick={handleLink}
              className="flex h-24 hover:bg-gray-100 border-b-2 p-4 items-center gap-4"
            >
              <div>
                <svg
                  fill="none"
                  className="text-gray-600 w-8 h-8"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M9.615 20H7a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v8M14 19l2 2 4-4M9 8h4M9 12h2" />
                </svg>
              </div>
              <div className="font-semibold">Inventario</div>
            </div>
            {user.rol <= 3 && (
              <div
                href="/admin"
                onClick={handleLink}
                className="flex h-24 hover:bg-gray-100 border-b-2 p-4 items-center gap-4"
              >
                <div>
                  <svg
                    viewBox="0 0 640 512"
                    fill="currentColor"
                    height="1em"
                    className="w-7 h-7 "
                    width="1em"
                  >
                    <path d="M224 256c-70.7 0-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128-57.3 128-128 128zm-45.7 48h91.4c11.8 0 23.4 1.2 34.5 3.3-2.1 18.5 7.4 35.6 21.8 44.8-16.6 10.6-26.7 31.6-20 53.3 4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3 0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8 10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v30.6c7.9 3.4 15.4 7.7 22.3 12.8l24.9-14.3c6.1-3.5 13.7-2.7 18.5 2.4 7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-25 14.4c.4 4 .7 8.1.7 12.3s-.2 8.2-.7 12.3l25 14.4c6.1 3.5 9.2 10.5 7.2 17.2-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4L546.3 442c-6.9 5.1-14.3 9.4-22.3 12.8v30.6c0 7-4.5 13.3-11.3 14.8-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8v-30.6c-8-3.4-15.6-7.7-22.5-12.9l-24.7 14.3c-6.1 3.5-13.7 2.7-18.5-2.4-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l24.8-14.3c-.4-4.1-.7-8.2-.7-12.4s.2-8.3.7-12.4L343.8 325c-6.1-3.5-9.2-10.5-7.2-17.2 3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l24.8 14.3c6.9-5.1 14.5-9.4 22.5-12.9v-30.4zm92.1 133.5c0-26.5-21.5-48-48.1-48s-48.1 21.5-48.1 48 21.5 48 48.1 48 48.1-21.5 48.1-48z" />
                  </svg>
                </div>
                <div className="font-semibold">Administrar</div>
              </div>
            )}
            {/* <div className="flex h-24 hover:bg-gray-100 border-b-2 p-4 items-center gap-4">
            <div>
              <BoxesIcon />
            </div>
            <div className="font-semibold">Inventario</div>
          </div> */}
            {/* <div
              href="/face"
              onClick={handleLink}
              className="flex h-24 hover:bg-gray-100 border-b-2 p-4 items-center gap-4"
            >
              <div>
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M9 11.75A1.25 1.25 0 007.75 13 1.25 1.25 0 009 14.25 1.25 1.25 0 0010.25 13 1.25 1.25 0 009 11.75m6 0A1.25 1.25 0 0013.75 13 1.25 1.25 0 0015 14.25 1.25 1.25 0 0016.25 13 1.25 1.25 0 0015 11.75M12 2A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2m0 18a8 8 0 01-8-8 4.12 4.12 0 010-.86 10.05 10.05 0 005.26-5.37A9.985 9.985 0 0017.42 10c.76 0 1.51-.09 2.25-.26 1.25 4.26-1.17 8.69-5.41 9.93-.76.22-1.5.33-2.26.33M0 2a2 2 0 012-2h4v2H2v4H0V2m24 20a2 2 0 01-2 2h-4v-2h4v-4h2v4M2 24a2 2 0 01-2-2v-4h2v4h4v2H2M22 0a2 2 0 012 2v4h-2V2h-4V0h4z" />
                </svg>
              </div>
              <div className="font-semibold">Facial Recognition</div>
            </div> */}
            <div
              onClick={logoutClick}
              className="flex h-24 hover:bg-gray-100 border-b-2 p-4 items-center gap-4 mb-20"
            >
              <div>
                <LogoutIcon />
              </div>
              <div className="font-semibold">Salir</div>
            </div>
          </div>
        </>
      </div>
      {/* Side Menu */}
    </div>
  );
};

export default NavBar;
