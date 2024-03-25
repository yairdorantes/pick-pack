import Modal from "../../components/Modal";

const ModalUsers = ({ isOpen, setIsOpen, users }) => {
  function dateToReadable(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
      // timeZone: "UTC",
    };
    return date.toLocaleDateString("es-ES", options);
  }
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="overflow-x-auto max-h-96">
        <div className=" text-center font-semibold fixed w-full bg-white z-30">
          Lista de pickers
        </div>
        <table className="table mt-8">
          {/* head */}
          <thead>
            <tr className="text-black">
              <th></th>
              <th>Nombre</th>
              <th>Ingreso</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, i) => (
              <tr key={i}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQx99bK-uLFqLyjp6cPQY8kJbEcsc6u4pedrPxNIZYTrKValUzf3SoYf-8uhv9EmjYAs9I&usqp=CAU"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {" "}
                  <div className="font-semibold">
                    {user.name_user} {user.lastname_user}
                  </div>
                  <div className="text-sm opacity-70">{user.email_user}</div>
                </td>
                <td className="whitespace-nowrap">
                  {dateToReadable(user.creationDate_user)}
                </td>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          {/* <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th></th>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </Modal>
  );
};

export default ModalUsers;
