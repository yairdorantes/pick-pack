import usePagination from "../scripts/Paginator";
import logo from "/oms.png";
const NewTest = () => {
  const itemsPerPage = 10; // Assuming you want to display 10 items per page
  const {
    currentPage,
    nextPage,
    prevPage,
    jumpToPage,
    currentData,
    maxPage,
    getPageNumbers,
  } = usePagination([1, 2, 3], itemsPerPage);

  return (
    <div className="fixed flex items-center justify-center top-0 h-screen w-screen">
      <div className="animation-sides ">
        <img src={logo} className="w-20" alt="" />
      </div>
    </div>
  );
};

export default NewTest;
