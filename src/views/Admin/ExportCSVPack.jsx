import axios from "axios";
import { mkConfig, generateCsv, download } from "export-to-csv";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../api";

const ExportCSVPack = ({ users }) => {
  const [isLoading, setIsLoading] = useState(false);
  const csvConfig = mkConfig({ useKeysAsHeaders: true });

  function firstWord(str) {
    // Split the string by whitespace and get the first element
    const words = str.trim().split(/\s+/);
    return words[0];
  }

  const getUserNames = (usersIdAssigment) => {
    const usersNames = usersIdAssigment.map((id) => {
      const user = users.find((user) => user.id_user === id);
      return user
        ? `${firstWord(user.lastname_user)} ${user.name_user}`
        : "desconocido";
    });
    return usersNames.join(", ");
  };
  const handleExportCSV = async () => {
    setIsLoading(true);
    try {
      let packsInfo = await axios.get(`${api}/pick-pack/packs/info`);
      packsInfo = packsInfo.data;
      if (packsInfo && packsInfo.length > 0) {
        const editedData = packsInfo.map((pack) => {
          const data = {
            Orden_id: pack.order_id,
            Largo: pack.length,
            Ancho: pack.width,
            Profundidad: pack.depth,
            Peso: pack.weight,
            Picking: getUserNames(pack.order.picking_assigment),
            Packing: getUserNames(pack.order.packing_assigment),
          };
          console.log(data);
          return data;
        });
        const csv = generateCsv(csvConfig)(editedData);
        download(csvConfig)(csv);
      }
    } catch (error) {
      toast.error(
        "Ups algo salio mal al intentar exportar la informacion de los embalajes"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`btn btn-sm ${
        isLoading && "btn-disabled"
      } btn-outline btn-success hover:!text-white`}
      onClick={handleExportCSV}
    >
      Embalajes a CSV{" "}
      <svg viewBox="0 0 24 24" fill="currentColor" height="1.2em" width="1.2em">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M2.859 2.877l12.57-1.795a.5.5 0 01.571.495v20.846a.5.5 0 01-.57.495L2.858 21.123a1 1 0 01-.859-.99V3.867a1 1 0 01.859-.99zM17 3h4a1 1 0 011 1v16a1 1 0 01-1 1h-4V3zm-6.8 9L13 8h-2.4L9 10.286 7.4 8H5l2.8 4L5 16h2.4L9 13.714 10.6 16H13l-2.8-4z" />
      </svg>
      {isLoading && <span className="loading loading-spinner text-info"></span>}
    </div>
  );
};

export default ExportCSVPack;
