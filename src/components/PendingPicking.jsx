const PendingPicking = () => {
  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Hoja de trabajo ID</th>
              <th>Estatus</th>
              <th>Fecha límite</th>
              {/* <th>Favorite Color</th> */}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th className="pr-4">1</th>
              <td className="pr-4">Cy Ganderton</td>
              <td>Quality Control Specialist</td>
            </tr>
            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingPicking;
