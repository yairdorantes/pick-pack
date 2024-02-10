const ResumeCard = ({ product }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
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
        </div>
      </div>
      <div className="flex px-1 items-center">
        <div className="">
          <p className="text-sm font-medium">Cantidad</p>
          <p className="flex items-center  text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1.5 h-4 w-4"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>{" "}
            {product.quantity_item} ud
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;
