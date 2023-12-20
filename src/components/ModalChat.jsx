import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

const ModalChat = () => {
  const [inputText, setInputText] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "beautiful chat ",
    },
  ]);

  const sendMessage = () => {
    setMessages((prevMessages) => [...prevMessages, { text: inputText }]);

    setInputText("");
    setShowEmojis(false);
  };
  return (
    <div>
      <button
        onClick={() => document.getElementById("modal_chat").showModal()}
        className="px-4 py-3 rounded-lg   bg-blue-300 fixed bottom-3 right-3"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          height="2em"
          width="2em"
          className="text-blue-900 mx-auto"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M19.364 4.636a2 2 0 010 2.828 7 7 0 01-1.414 7.072l-2.122 2.12a4 4 0 00-.707 3.536L3.808 8.88a4 4 0 003.535-.707L9.464 6.05a7 7 0 017.072-1.414 2 2 0 012.828 0z" />
          <path d="M7.343 12.414l-.707.707a3 3 0 004.243 4.243l.707-.707" />
        </svg>
      </button>
      <dialog
        id="modal_chat"
        className="modal modal-bottom sm:modal-middle"
        data-theme="light"
      >
        <div className="modal-box p-3 max-w-lg relative">
          <div className="h-96 bg-white overflow-y-auto ">
            <div
              id="emoji_picker"
              className={`-translate-x-1/2 left-1/2 absolute z-10 ${
                showEmojis ? "opacity-100" : "opacity-0"
              }`}
            >
              <EmojiPicker
                width={350}
                height={400}
                onEmojiClick={(emoji) => {
                  // console.log(emoji.emoji);
                  setInputText((prevInputText) =>
                    prevInputText.concat(emoji.emoji)
                  );
                }}
              />
            </div>

            {messages.map((message, i) => (
              <div key={i} className="chat chat-end">
                <div className="chat-bubble">{message.text}</div>
              </div>
            ))}
          </div>
          <div className="h-20 bg-gray-200 flex w-full rounded-md p-1 items-center">
            <div className="flex  items-center p-2 bg-white border rounded-full w-full">
              <input
                value={inputText}
                className="flex h-10 w-full border-input  text-sm text-black ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 rounded-full px-4 py-2 border-0"
                placeholder="Escribe Algo..."
                onChange={(e) => {
                  setInputText(e.target.value);
                }}
              />
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
                className="mx-2 text-gray-600 cursor-pointer hover:text-black"
              >
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
              </svg>
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
                    className="mx-2 text-gray-600 cursor-pointer hover:text-black"
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
                    className="text-black mx-2"
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
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ModalChat;
