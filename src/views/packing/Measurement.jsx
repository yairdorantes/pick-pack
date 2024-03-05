import { useForm } from "react-hook-form";

const Measurement = ({ setValues, toggleView }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setValues(data);
    toggleView(false);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed bottom-0 bg-white w-full pt-2 z-20"
    >
      <div className="flex gap-2 justify-center items-center">
        <div className="w-16 ">
          <label
            htmlFor="number-input"
            className="block  text-sm font-medium text-gray-900 "
          >
            Largo:
          </label>
          <input
            {...register("length", {
              required: true,
              valueAsNumber: true,
              min: 0.01,
            })}
            type="number"
            id="number-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  px-2.5 py-2  dark:focus:border-blue-500"
            placeholder="0"
            required
          />
        </div>
        <strong>x</strong>
        <div className="w-16">
          <label
            htmlFor="number-input"
            className="block  text-sm font-medium text-gray-900 "
          >
            Ancho:
          </label>
          <input
            {...register("width", {
              required: true,
              valueAsNumber: true,
              min: 0.01,
            })}
            type="number"
            id="number-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2  dark:focus:border-blue-500"
            placeholder="0"
            required
          />
        </div>
        <strong className="">x</strong>
        <div className="w-16">
          <label
            htmlFor="number-input"
            className="block  text-sm font-medium text-gray-900 "
          >
            Profundidad:
          </label>
          <input
            {...register("depth", {
              required: true,
              valueAsNumber: true,
              min: 0.01,
            })}
            type="number"
            id="number-input"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2  dark:focus:border-blue-500"
            placeholder="0"
            required
          />
        </div>
      </div>

      <div className="w-16 mt-2 mx-auto">
        <label
          htmlFor="number-input"
          className="block  text-sm font-medium text-gray-900 "
        >
          Peso (kg):
        </label>
        <input
          {...register("weigth", {
            required: true,
            valueAsNumber: true,
            min: 0.01,
          })}
          type="number"
          id="number-input"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2  dark:focus:border-blue-500"
          placeholder="0kg"
          required
        />
      </div>
      <div className="text-center p-2">
        <button type="submit" className="euro-btn">
          Confirmar medidas de embalaje
        </button>
      </div>
    </form>
  );
};

export default Measurement;
