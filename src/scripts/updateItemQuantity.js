// import axios from "axios";
// import { api } from "../../api";

// export async function updateItemQuantity(
//   item_id,
//   remaining_item,
//   setSavingItem
// ) {
//   const items = [{ id_item: item_id, remaining_item: remaining_item }];
//   setSavingItem(true);
//   try {
//     //! this is for test
//     // await new Promise((resolve) => setTimeout(resolve, 2000));
//     await axios.put(`${api}/pick-pack/items`, { items: items });
//   } catch (err) {
//     console.log(err);
//     throw err;
//   } finally {
//     setSavingItem(false);
//   }
// }

import axios from "axios";
import { api } from "../../api";
import { useParams } from "react-router-dom";
import useStore from "../../Context";

const useUpdateItemQuantity = () => {
  const { orderId } = useParams();

  const { user } = useStore();
  const updateItemQuantity = async (
    item_id,
    remaining_item,
    setSavingItem,
    firstScan
  ) => {
    const items = [{ id_item: item_id, remaining_item }];
    //TODO add user id status intializing

    const updateStatus = { order: orderId };

    setSavingItem(true);
    try {
      //! this is for test
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      await axios.put(`${api}/pick-pack/items`, {
        items,
        firstScan: firstScan ? updateStatus : undefined,
        user: user.id,
      });
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setSavingItem(false);
    }
  };

  return { updateItemQuantity };
};

export default useUpdateItemQuantity;
