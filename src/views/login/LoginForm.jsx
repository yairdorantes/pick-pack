import { useEffect, useRef, useState } from "react";
import logo from "../../assets/images/oms.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../../api";
import useStore from "../../../Context";
import { flushSync } from "react-dom";
import toast from "react-hot-toast";
import omsLogo from "../../assets/images/oms.png";
// import video from "../../assets/videos/video.mp4";
const route = "/";
const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, login } = useStore();

  const videoRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const redirectPage = () => {
    if (!document.startViewTransition) {
      navigate(route);
      return;
    }
    document.startViewTransition(() => flushSync(() => navigate(route)));
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    login(username, password)
      .then((res) => {
        redirectPage();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Algo salio mal intenta de nuevo");
      })
      .finally(() => {
        setLoading(false);
      });
    // console.log("nice");
  };

  useEffect(() => {
    username.length > 0 && user && user.username && welcomeToast();
  }, [user]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.autoplay = true;
      video.play();
      // video.loop = true;
      // video.muted = true;
    }
    console.log(user);
  }, []);

  function welcomeToast() {
    toast.custom(
      (t) => (
        <div
          className={`absolute transition-all duration-200 ${
            t.visible ? "top-0 opacity-100 toast-welcome" : "-top-24 opacity-0"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-2">
                <img className="h-10 w-10 rounded-full" src={omsLogo} alt="" />
              </div>
              <div className="ml-3 flex-1">
                <p className="mt-1  text-gray-500">Bienvenid@</p>
                <p className=" font-medium text-gray-900">{user.username}</p>
              </div>
            </div>
          </div>
          {/* <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div> */}
        </div>
      ),
      { duration: 2000 }
    );
  }
  return (
    <div className="overflow-hidden">
      {/* <button onClick={welcomeToast} className="btn">
        toast
      </button> */}
      <div className="absolute inset-0 -z-10 bg-black">
        <div className="absolute w-screen h-screen bg-black bg-opacity-20"></div>
        <video
          // controls
          ref={videoRef}
          muted
          src="https://res.cloudinary.com/tolumaster/video/upload/v1707626688/video_s7z3sy.mp4"
          autoPlay
          loop
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-center pt-20">
        <img className="w-24 " src={logo} alt="" />
      </div>
      <div className="mt-10 w-[350px] mx-auto rounded-md bg-white ">
        <div className="rounded-lg border   text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 px-6 py-2 ">
            <h3 className="font-semibold tracking-tight text-2xl text-center mb-4">
              Inicio de sesión
            </h3>
            <p className=" font-semibold bg-gradient-to-r from-red-700 to-sky-500 bg-clip-text text-transparent">
              Eurocotton Fulfillment
            </p>
          </div>
          <form action="" onSubmit={handlesubmit} className="">
            <div className="px-6 py-2 space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="username"
                >
                  Correo empresarial:
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  placeholder="Email"
                  required=""
                  type="text"
                />
              </div>
              <div className="relative space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="password"
                >
                  Contraseña:
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  id="password"
                  required=""
                  placeholder=""
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type={showPassword ? "text" : "password"}
                />
                <button
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="inline-flex btn-ghost  items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground  h-10 px-4 py-2 absolute right-0 bottom-0 mt-8 mr-2"
                  type="button"
                >
                  {!showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="17"
                      width="17"
                    >
                      <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" />
                      <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center p-6">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-800 text-white hover:bg-primary/90 h-10 px-4 py-2 w-full"
              >
                {!loading ? (
                  "Ingresar"
                ) : (
                  <span className="loading loading-spinner text-white" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
