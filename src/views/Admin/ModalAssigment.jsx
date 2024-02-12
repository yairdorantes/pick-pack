import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import { useToggleList } from "../../scripts/ToggleList";
import axios from "axios";
import { api } from "../../../api";
import useStore from "../../../Context";
import toast from "react-hot-toast";
import SearchInput from "../../components/SearchInput";
//TODO 1 = picking
//TODO 2 = packing
const ModalAssigment = ({ opening, changeState, rowSelected }) => {
  const { fulFillmentUsers } = useStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [selection, setSelection] = useState(1);
  const { list, toggleList, setList } = useToggleList();
  function sendChanges() {
    setLoading(true);
    axios
      .post(
        `${api}/pick-pack/order_assigment/${rowSelected.idVtex_order}/${selection}`,
        { data: list }
      )
      .then(() => {
        toast.success("Cambios enviados!");
        changeState(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("ups ocurrio un error intenta de nuevo");
      })
      .finally(() => setLoading(false));
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
  }, [rowSelected]);
  useEffect(() => {
    // 1 = picking, 2= packing
    if (selection === 1) {
      rowSelected.picking_assigment !== null
        ? setList(rowSelected.picking_assigment)
        : setList([]);
    } else {
      rowSelected.packing_assigment !== null
        ? setList(rowSelected.packing_assigment)
        : setList([]);
    }
  }, [selection, rowSelected]);

  return (
    <Modal isOpen={opening} setIsOpen={changeState}>
      <div id="options" className="flex justify-center gap-8 p-2">
        <div
          onClick={() => setSelection(1)}
          className={`transition-all cursor-pointer px-5 py-3 w-1/2 text-center rounded-lg  ${
            selection !== 1
              ? "border-2 border-blue-500 text-blue-600"
              : "bg-blue-500 text-white"
          } `}
        >
          Pickeo
        </div>
        <div
          onClick={() => setSelection(2)}
          className={`transition-all cursor-pointer px-5 w-1/2 py-3 text-center rounded-lg  ${
            selection !== 2
              ? "border-2 border-blue-500 text-blue-600"
              : "bg-blue-500 text-white"
          } `}
        >
          Packing
        </div>
      </div>
      <div className="text-sm text-center font-semibold ">
        Los usuarios seleccionados{" "}
        {selection === 1 ? (
          <span className="text-info px-3">ALISTARÁN ✅</span>
        ) : (
          <span className="text-emerald-400 px-3">EPACANRÁN📦</span>
        )}{" "}
        la orden {rowSelected.idVtex_order}
      </div>
      <SearchInput
        placeHolderValue="Buscar Picker"
        onHandleQuery={filterTable}
      />
      <div className="overflow-x-auto max-h-96 mb-16">
        <table className="table table-pin-cols">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>XP</th>
              <th>Averge Time</th>
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
                          src={`https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_640.png`}
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
                <td>
                  <div>{i + 12}</div>
                </td>
                <td className="text-center">
                  <div>{22 + i}m</div>
                </td>
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
            <div onClick={sendChanges} className="euro-btn ">
              Confirmar cambios
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalAssigment;
