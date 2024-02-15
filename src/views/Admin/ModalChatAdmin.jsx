import { useEffect, useRef, useState } from "react";
import Modal from "../../components/Modal";
import EmojiPickerWrapper from "../../components/EmojiPickerWrapper";
import ReactFileReader from "react-file-reader";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useStore from "../../../Context";
import { api } from "../../../api";
const ModalChatAdmin = ({ isOpen, setIsOpen, orderId }) => {
  const { user } = useStore();

  // const [isOpen, setIsOpen] = useState(showUp);
  const [labels, setLabels] = useState([
    { name: "queja", color: "#3498db" },
    { name: "paqueteria", color: "#e74c3c" },
    { name: "clientes info", color: "#9b59b6" },
  ]);
  const [labelSelected, setLabelSelected] = useState({});
  const [modalFile, setModalFile] = useState(false);
  const [FileData, setFileData] = useState({});
  const [sendingMsg, setSendingMsg] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const bottomRef = useRef(null);

  function handleModal() {
    setIsOpen(!isOpen);
  }
  function handleModalFile() {
    setModalFile(!isOpen);
  }
  const [inputText, setInputText] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const textData = {
      type: "text",
      text: inputText,
      tag: labelSelected.name,
      id_user: user.id,
    };
    // setMessages((prevMessages) => [...prevMessages, textData]);
    saveMessage(textData);
    setShowEmojis(false);
  };
  function handleFiles(file) {
    setModalFile(true);
    setFileData({ type: file.fileList[0].type, base64: file.base64 });
  }
  function acceptFiles() {
    if (FileData.type) {
      const imageData = {
        src: FileData.base64,
        type: "image",
        tag: labelSelected.name,
        id_user: user.id,
      };
      saveMessage(imageData);
    }
    setModalFile(false);
  }
  function formatDate(date) {
    const dateString = date;
    const dateObject = new Date(dateString);
    if (isNaN(dateObject)) {
      return "Ahora";
    } else {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false, // Use 24-hour format
      };
      const formattedDate = dateObject.toLocaleString("en-GB", options);
      return formattedDate;
    }
  }
  function saveMessage(message) {
    if (Object.keys(labelSelected).length > 0) {
      setSendingMsg(true);
      axios
        .post(`${api}/pick-pack/message/${orderId}`, message)
        .then((res) => {
          console.log(res);
          setMessages((prevMessages) => [...prevMessages, message]);
          setLabelSelected({});
          setInputText("");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ups, no se pudo enviar el mensaje");
        })
        .finally(() => {
          setSendingMsg(false);
        });
    } else {
      toast.error("Elige una etiqueta");
      setShowLabels(true);
    }
  }

  function getMessages() {
    setLoadingMessages(true);
    axios
      .get(`${api}/pick-pack/message/${orderId}`)
      .then((res) => {
        // console.log(res.data);
        setMessages(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingMessages(false);
      });
  }

  function tagColor(tag) {
    switch (tag) {
      case "queja":
        return "#3498db";
      case "paqueteria":
        return "#e74c3c";
      case "clientes info":
        return "#9b59b6";
      default:
        return "#3f3d3d";
    }
  }

  useEffect(() => {
    isOpen && getMessages();
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="">
      {/* <div onClick={handleModal}>{children}</div> */}

      <div className=" ">
        <Modal handleModal={handleModal} isOpen={isOpen} setIsOpen={setIsOpen}>
          <div
            id="labels"
            className={`fixed overflow-hidden  space-y-4 bottom-0 transition-all   duration-300 w-full bg-gray-100  ${
              showLabels ? "opacity-100 z-40" : "opacity-0 -z-10"
            }  p-4`}
          >
            <div className="absolute right-2 top-2">
              <button
                onClick={() => setShowLabels(false)}
                className=" btn btn-circle btn-accent btn-sm"
              >
                x
              </button>
            </div>
            {labels.map((label, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <div className="flex gap-2">
                  <input
                    type="radio"
                    id={`radio-${i}`}
                    name="radio-group"
                    onChange={() => {
                      setLabelSelected(label);
                      setShowLabels(false);
                    }}
                    className="radio radio-info"
                    // checked
                  />
                  <div
                    style={{
                      backgroundColor: label.color,
                    }}
                    className={`text-white font-bold text-sm py-1 px-2 rounded-full`}
                  >
                    {label.name}
                  </div>
                </div>
              </label>
            ))}
          </div>
          {loadingMessages && (
            <div className="bg-white absolute flex justify-center w-full bg-opacity-70 z-50 h-full ">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          )}

          <div className="h-[440px]  bg-white relative overflow-y-auto">
            <div
              id="emoji_picker"
              className={`-translate-x-1/2 left-1/2 fixed top-10 ${
                showEmojis ? "opacity-100 z-10" : "opacity-0 -z-10"
              }`}
            >
              <EmojiPickerWrapper
                onChange={(emoji) => {
                  // console.log(emoji);
                  setInputText((prevInputText) =>
                    prevInputText.concat(emoji.unicode)
                  );
                }}
              />
            </div>
            <div className=" w-full p-2  fixed flex justify-between items-center  z-10 bg-gray-100">
              <div className="font-bold">Orden: {orderId}</div>
              <div>
                <div
                  id="btn-labels"
                  style={{
                    backgroundColor:
                      Object.keys(labelSelected).length === 0
                        ? "#404041"
                        : labelSelected.color,
                  }}
                  onClick={() => {
                    setShowLabels(!showLabels);
                    console.log("butn show label");
                  }}
                  className="flex p-1 text-white select-none cursor-pointer items-center gap-1  rounded-md"
                >
                  <div>
                    <svg
                      viewBox="0 0 20 16"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="text-white"
                    >
                      <path
                        fill="currentColor"
                        d="M19.25 0h-6c-.412 0-.989.239-1.28.53L4.531 7.969a.752.752 0 000 1.061l6.439 6.439a.752.752 0 001.061 0L19.47 8.03c.292-.292.53-.868.53-1.28v-6a.752.752 0 00-.75-.75zM15.5 6a1.5 1.5 0 11.001-3.001A1.5 1.5 0 0115.5 6z"
                      />
                      <path
                        fill="currentColor"
                        d="M2 8.5L10.5 0H9.25c-.412 0-.989.239-1.28.53L.531 7.969a.752.752 0 000 1.061l6.439 6.439a.752.752 0 001.061 0l.47-.47-6.5-6.5z"
                      />
                    </svg>
                  </div>
                  <div>
                    {Object.keys(labelSelected).length === 0
                      ? "Etiquetas"
                      : labelSelected.name}
                  </div>
                </div>
              </div>
            </div>

            <div
              id="bubble messages"
              className="py-2 px-2 flex flex-col gap-4 relative"
            >
              {/* <ScrollToBottom> */}
              {messages.map((message, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  {/* <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt="Jese image"
                  /> */}
                  <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-200 rounded-e-xl rounded-es-xl ">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="text-sm font-semibold text-gray-900 ">
                        {message.user && message.id_user === user.id
                          ? "Tú"
                          : message.user && message.user.name_user}
                      </span>
                      <span className="text-sm font-normal text-gray-500 ">
                        {formatDate(message.updatedAt)}
                      </span>
                    </div>
                    <p className="text-sm font-normal py-2.5 text-gray-900">
                      {message.type === "text" && <span>{message.text}</span>}
                      {message.type === "image" && (
                        <span>
                          <img
                            className="w-56 cursor-pointer"
                            src={message.src}
                            alt=""
                          />
                        </span>
                      )}
                    </p>
                    <div>
                      <div
                        style={{
                          backgroundColor: tagColor(message.tag),
                        }}
                        className="inline-block px-2 text-sm font-normal rounded-lg   text-white "
                      >
                        {message.tag}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div ref={bottomRef} />

              {sendingMsg && (
                <div className="flex justify-start items-center gap-2">
                  Enviando
                  <span className="loading loading-spinner loading-md" />
                </div>
              )}
              {/* </ScrollToBottom> */}
            </div>
          </div>

          <div className="h-20 bg-gray-200 flex w-full rounded-md p-1 items-center">
            <div className="flex  items-center p-2 bg-white border rounded-full w-full">
              <input
                autoFocus={false}
                value={inputText}
                className="flex h-10 w-full bg-white border-input  text-sm text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 rounded-full px-4 py-2 border-0"
                placeholder="Escribe Algo..."
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
              />
              <ReactFileReader base64={true} handleFiles={handleFiles}>
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
                  className="mx-2 text-gray-600 cursor-pointer hover:text-blue-500"
                >
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
              </ReactFileReader>

              {!showEmojis ? (
                <div onClick={() => setShowEmojis(true)}>
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
                    className="mx-2 text-gray-600 cursor-pointer hover:text-blue-500"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" x2="9.01" y1="9" y2="9"></line>
                    <line x1="15" x2="15.01" y1="9" y2="9"></line>
                  </svg>
                </div>
              ) : (
                <div id="cross_svg" onClick={() => setShowEmojis(false)}>
                  <svg
                    className="text-black mx-2 cursor-pointer"
                    fill="none"
                    viewBox="0 0 15 15"
                    height="24"
                    width="24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M12.854 2.854a.5.5 0 00-.708-.708L7.5 6.793 2.854 2.146a.5.5 0 10-.708.708L6.793 7.5l-4.647 4.646a.5.5 0 00.708.708L7.5 8.207l4.646 4.647a.5.5 0 00.708-.708L8.207 7.5l4.647-4.646z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {inputText.length > 0 ? (
                <div id="arrow_send" onClick={sendMessage}>
                  <svg
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    height="24"
                    className="mx-2 text-blue-500 cursor-pointer"
                    width="24"
                  >
                    <path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z" />
                  </svg>
                </div>
              ) : (
                <svg
                  onClick={() =>
                    toast("Coming Soon...", {
                      icon: "⌛️",
                      position: "bottom-center",
                    })
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-2 text-gray-600 cursor-pointer hover:text-black"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                </svg>
              )}
            </div>
          </div>
          <div className="bg-blue-300 flex items-center"></div>
          <Modal
            id="modal-file"
            isOpen={modalFile}
            handleModal={handleModalFile}
            setIsOpen={setModalFile}
          >
            {FileData.type && FileData.type.includes("image") && (
              <div className="">
                <img src={FileData.base64} className="" alt="" />
                <div className="my-5 flex justify-evenly">
                  <button
                    onClick={() => {
                      setModalFile(false);
                      setFileData({});
                    }}
                    className="inline-flex items-center gap-1 justify-center text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:text-accent-foreground h-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <svg fill="none" viewBox="0 0 24 24" height="18" width="18">
                      <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M17 6V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1H4a1 1 0 000 2h1v11a3 3 0 003 3h8a3 3 0 003-3V8h1a1 1 0 100-2h-3zm-2-1H9v1h6V5zm2 3H7v11a1 1 0 001 1h8a1 1 0 001-1V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Descartar
                  </button>
                  <button
                    onClick={acceptFiles}
                    className="inline-flex gap-1 items-center justify-center text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <svg fill="none" viewBox="0 0 15 15" height="18" width="18">
                      <path
                        fill="currentColor"
                        d="M14.954.71a.5.5 0 01-.1.144L5.4 10.306l2.67 4.451a.5.5 0 00.889-.06L14.954.71zM4.694 9.6L.243 6.928a.5.5 0 01.06-.889L14.293.045a.5.5 0 00-.146.101L4.694 9.6z"
                      />
                    </svg>
                    Enviar
                  </button>
                </div>
              </div>
            )}
          </Modal>
        </Modal>
      </div>
    </div>
  );
};

export default ModalChatAdmin;
