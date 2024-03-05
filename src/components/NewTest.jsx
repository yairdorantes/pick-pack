import { useForm } from "react-hook-form";

const NewTest = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex gap-2 justify-center items-center">
        <div className="w-16 ">
          <label
            htmlFor="number-input"
            className="block  text-sm font-medium text-gray-900 "
          >
            Largo:
          </label>
          <input
            {...register("length", { required: true })}
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
            {...register("width", { required: true })}
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
            {...register("depth", { required: true })}
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
          {...register("weigth", { required: true })}
          type="number"
          id="number-input"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-2  dark:focus:border-blue-500"
          placeholder="0kg"
          required
        />
      </div>
      <button type="submit">send</button>
    </form>
  );
};

export default NewTest;
