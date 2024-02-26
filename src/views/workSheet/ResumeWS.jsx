import { useEffect, useState } from "react";
import useStore from "../../../Context";
import ResumeCard from "../../components/ResumeCard";
import DragUnList from "./DragUnList";
import ModalUnList from "./ModalUnList";
import { useGetItems } from "../../scripts/getProducts";
import { useParams } from "react-router-dom";

const ResumeWS = () => {
  const { itemsList } = useStore();
  const { orderId } = useParams();
  const { getProducts } = useGetItems();
  const [modalUnList, setModalUnList] = useState(false);

  useEffect(() => {
    getProducts(orderId);
  }, []);
  return (
    <div>
      <ModalUnList modalUnList={modalUnList} setModalUnList={setModalUnList} />

      {itemsList.map(
        (product, i) =>
          product.remaining_item < product.quantity_item && (
            <DragUnList
              setModalunList={setModalUnList}
              productData={product}
              key={i}
            >
              <ResumeCard product={product} />
            </DragUnList>
          )
      )}
    </div>
  );
};
export default ResumeWS;
