import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import useStore from "../../../Context";
import { useToggleList } from "../../scripts/ToggleList";
import SearchInput from "../../components/SearchInput";
import axios from "axios";
import { api } from "../../../api";
import { Socket } from "socket.io-client";
import toast from "react-hot-toast";

const SendNotification = ({ opening, changeState }) => {
  const { fulFillmentUsers, socket, user } = useStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selection, setSelection] = useState(1);
  const { list, toggleList, setList } = useToggleList();
  const [content, setContent] = useState("");
  function sendChanges() {
    // setLoading(true);
    // console.log(list);
    // console.log(content);
    try {
      socket.emit("send_notification", {
        users: list,
        message: content,
        sender_id: user.id,
      });

      changeState(false);
      toast.success("Notificacion enviada con Éxito");
      setContent("");
      setList([]);
    } catch (error) {
      console.log(error);
      toast.error("Error, Algo salio mal :(");
    }
  }
  function filterTable(query) {
    const filterUsers = users.filter((user) =>
      user.name_user.toLowerCase().includes(query.toLowerCase())
    );
    filterUsers.length > 0
      ? setFilteredUsers(filterUsers)
      : setFilteredUsers(users);
    // console.log(filterUsers);
  }
  useEffect(() => {
    setUsers(fulFillmentUsers);
    setFilteredUsers(fulFillmentUsers);
  }, [fulFillmentUsers]);

  return (
    <Modal isOpen={opening} setIsOpen={changeState}>
      <SearchInput
        placeHolderValue="Buscar Picker"
        onHandleQuery={filterTable}
      />
      <div className="px-3">
        <textarea
          value={content}
          placeholder="Contenido del mensaje... "
          className="textarea textarea-bordered textarea-sm w-full "
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="overflow-x-auto max-h-96 mb-16">
        <table className="table table-pin-cols">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {filteredUsers.map((user, i) => (
              <tr
                key={i}
                className="cursor-pointer"
                onClick={() => toggleList(user.id_user)}
              >
                <td>
                  <div className="">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10">
                        <img
                          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx99bK-uLFqLyjp6cPQY8kJbEcsc6u4pedrPxNIZYTrKValUzf3SoYf-8uhv9EmjYAs9I&usqp=CAU`}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{user.name_user}</div>
                    <div className="text-sm opacity-50">027</div>
                  </div>
                </td>

                <td className="text-center">{/* <div>{22 + i}m</div> */}</td>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-info"
                      readOnly
                      checked={list && list.includes(user.id_user)}
                    />
                  </label>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="fixed bottom-2 -translate-x-1/2 left-1/2">
          {loading ? (
            <span className="loading loading-infinity loading-lg text-green-500"></span>
          ) : (
            <div
              onClick={sendChanges}
              className={`btn bg-blue-500 text-white ${
                (list.length === 0 || content.length === 0) && "btn-disabled"
              }`}
            >
              <button disabled={list.length === 0 || content.length === 0}>
                Enviar Notificación
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default SendNotification;
