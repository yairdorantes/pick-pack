import { useState } from "react";
import Modal from "../../components/Modal";
import { useForm } from "react-hook-form";
import axios from "axios";
import { api } from "../../../api";
import toast from "react-hot-toast";

const AddUser = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
        setModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ups algo salio mal, intenta de nuevo");
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="">
      <div className="fixed bottom-2 left-2 z-30">
        <div
          onClick={() => setModalOpen(!modalOpen)}
          className="bg-blue-500 py-2 px-3 rounded-lg cursor-pointer"
        >
          <svg
            className="w-8 h-8 text-white"
            viewBox="0 0 640 512"
            fill="currentColor"
            height="1em"
            width="1em"
          >
            <path d="M352 128c0 70.7-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
          </svg>
        </div>
      </div>
      <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
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
