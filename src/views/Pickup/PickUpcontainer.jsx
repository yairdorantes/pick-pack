const PickUpcontainer = () => {
  return (
    <div>
      <div>
        <div className="rounded-lg max-w-lg mx-auto border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold whitespace-nowrap tracking-tight   text-2xl">
              Orden #3102187621876-01
            </h3>
            <p className="text-sm text-muted-foreground">¿Quien Recoge?</p>
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Who shot first?
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickUpcontainer;
