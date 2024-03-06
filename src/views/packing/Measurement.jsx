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
      className="fixed bottom-0 bg-white w-full pt-4 z-20"
    >
      <div
        onClick={() => toggleView(false)}
        className="absolute flex top-2 right-2 bg-red-500 rounded-full w-6 h-6 text-white  items-center justify-center"
      >
        <svg fill="none" viewBox="0 0 15 15" height="1em" width="1em">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M11.782 4.032a.575.575 0 10-.813-.814L7.5 6.687 4.032 3.218a.575.575 0 00-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 00.814.814L7.5 8.313l3.469 3.469a.575.575 0 00.813-.814L8.313 7.5l3.469-3.468z"
            clipRule="evenodd"
          />
        </svg>
      </div>
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
            step="0.01"
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
            step="0.01"
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
            step="0.01"
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
          step="0.01"
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
