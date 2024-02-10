const PackedCard = ({ product }) => {
  return (
    <div>
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
              {product.packed_item} de {product.quantity_item}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackedCard;
