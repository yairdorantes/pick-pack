import { useEffect, useState } from "react";
import useStore from "../../../Context";

const PackingCard = ({ product }) => {
  const [packQuantity, setPackQuantity] = useState(product.packed_item);
  const [hoverQuantity, setHoverQuantity] = useState(false);
  const { itemsList, setItemsList, packList, setPackList } = useStore();

  function QuantityChange(isAdding) {
    // const idToUpdate = product.id_item;
    // const newValue = isAdding ? packQuantity + 1 : packQuantity - 1;
    // const updatedList = itemsList.map((item) => ({
    //   ...item,
    //   packed_item: item.id_item === idToUpdate ? newValue : item.packed_item,
    // }));
    // setItemsList(updatedList);
    let newData = [...packList];
    const targetIndex = newData.findIndex(
      (obj) => obj.id_item === product.id_item
    );
    if (targetIndex !== -1) {
      newData[targetIndex].packed_item = isAdding
        ? packQuantity + 1
        : packQuantity - 1;
    } else {
      const newObj = {
        id_item: product.id_item,
        packed_item: isAdding ? packQuantity + 1 : packQuantity - 1,
      };
      newData.push(newObj);
    }
    setPackList(newData);
  }
  function handleAdd() {
    if (packQuantity < product.quantity_item) {
      QuantityChange(true);
      setPackQuantity(packQuantity + 1);
    }
  }
  function handleDecrease() {
    if (packQuantity > product.packed_item) {
      QuantityChange(false);
      setPackQuantity(packQuantity - 1);
    }
  }

  const handleMouseEnter = () => setHoverQuantity(true);
  const handleMouseLeave = () => setHoverQuantity(false);

  useEffect(() => {
    setPackQuantity(product.packed_item);
  }, [product]);
  return (
    <>
      <div className="relative   flex items-center justify-between p-4 bg-white border border-gray-200 ">
        <div className="flex items-center space-x-4">
          <img
            src={product.imageUrl_item}
            alt="Product image"
            className="h-24 w-24 rounded-md bg-gray-200"
            width="100"
            height="100"
            style={{
              aspectRatio: "100/100",
              objectFit: "cover",
            }}
          />
          <div>
            <h5 className="text-sm font-semibold">{product.name_item}</h5>
            <p className="text-sm text-gray-500">SKU: {product.refId_item}</p>
            <p className="font-semibold text-sm">
              {packQuantity} de {product.quantity_item}
            </p>
          </div>
        </div>

        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute bottom-3 right-2 flex px-1 pt-10  items-center cursor-pointer"
        >
          {!hoverQuantity && packQuantity > 0 && (
            <div className="py-1 px-4 rounded-full  text-white bg-blue-700">
              {packQuantity} u
            </div>
          )}
          {hoverQuantity && packQuantity > 0 && (
            <div className="flex text-center">
              <div
                onClick={handleDecrease}
                className="bg-gray-200  select-none flex items-center justify-center w-8 h-8 rounded-l-full"
              >
                -
              </div>
              <div className="">
                <input
                  value={packQuantity}
                  readOnly
                  className="w-6 h-8  text-center"
                  type="number"
                />
              </div>
              <div
                onClick={handleAdd}
                className="bg-gray-200  select-none flex items-center justify-center w-8 h-8 rounded-r-full"
              >
                +
              </div>
            </div>
          )}
          {packQuantity === 0 && (
            <div
              onClick={handleAdd}
              className="w-8 h-8 cursor-pointer  text-blue-300 bg-blue-800 rounded-full"
            >
              <svg fill="currentColor" viewBox="0 0 16 16" height="" width="">
                <path d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4.5a.5.5 0 00-1 0v3h-3a.5.5 0 000 1h3v3a.5.5 0 001 0v-3h3a.5.5 0 000-1h-3v-3z" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PackingCard;