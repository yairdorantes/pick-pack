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
            <span
              className={` text-sm  text-left flex items-center gap-2 text-gray-500`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="20"
                width="20"
              >
                <path d="M2 6h2v12H2V6m3 0h1v12H5V6m2 0h3v12H7V6m4 0h1v12h-1V6m3 0h2v12h-2V6m3 0h3v12h-3V6m4 0h1v12h-1V6z" />
              </svg>{" "}
              {product.ean_item === null || product.ean_item === ""
                ? "N/D"
                : product.ean_item}
            </span>
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
