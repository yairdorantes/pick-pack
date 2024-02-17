import { useState } from "react";

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPage));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const jumpToPage = (pageNumber) => {
    setCurrentPage(Math.min(Math.max(1, pageNumber), maxPage));
  };
  // const filteredData = await

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    const delta = 2;
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    const range = [];
    const pages = [];

    for (let i = 1; i <= maxPage; i++) {
      if (i === 1 || i === maxPage || (i >= left && i < right)) {
        range.push(i);
      }
    }

    let last;

    range.forEach((pageNumber) => {
      if (last) {
        if (pageNumber - last === 2) {
          pages.push(last + 1);
        } else if (pageNumber - last !== 1) {
          pages.push("...");
        }
      }
      pages.push(pageNumber);
      last = pageNumber;
    });

    return pages;
  };

  return {
    currentPage,
    nextPage,
    prevPage,
    jumpToPage,
    currentData,
    maxPage,
    getPageNumbers,
  };
};

export default usePagination;
