import { useState } from "react";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { api } from "../../../api";
import toast from "react-hot-toast";

const AddUser = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // axios.post;
    setLoading(true);
    axios
      .post(`${api}/pick-pack/create/user`, {
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        toast.success("Usuario creado exitosamente");
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ups algo salio mal, intenta de nuevo");
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="">
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="p-7">
          <div className="text-center font-semibold text-xl">
            Agregar Picker
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-semibold">Nombre(s):</span>
              </div>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Elsa Porrico

              "
                className="input input-bordered w-full max-w-xs"
              />
            </label>{" "}
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-semibold">Apellidos:</span>
              </div>
              <input
                {...register("last_name", { required: true })}
                type="text"
                placeholder="Willy Melano"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-semibold">
                  Correo electronico:
                </span>
              </div>
              <input
                {...register("email", { required: true })}
                type="text"
                placeholder="@example.com"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text font-semibold">Contraseña:</span>
              </div>
              <input
                {...register("password", { required: true })}
                type="text"
                placeholder="********"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            {/* {errors.name && <p>Name is required</p>} */}
            <div className="text-center mt-4">
              {loading ? (
                <span className="loading loading-spinner text-info"></span>
              ) : (
                <button type="submit" className="euro-btn w-3/4">
                  Enviar
                </button>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddUser;
