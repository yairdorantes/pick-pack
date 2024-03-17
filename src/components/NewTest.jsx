import usePagination from "../scripts/Paginator";

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
    <div>
      <div>why get this </div>
    </div>
  );
};

export default NewTest;
