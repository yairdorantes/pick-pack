import { useState } from "react";
import usePagination from "../scripts/Paginator";
import { AnimatePresence, motion } from "framer-motion";
const NewTest = ({
  data = [
    { id: 1, name: "master" },
    { id: 2, name: "master" },
    { id: 3, name: "master" },
    { id: 4, name: "master" },
    { id: 5, name: "master" },
    { id: 6, name: "master" },
    { id: 7, name: "master" },
    { id: 8, name: "master" },
    { id: 9, name: "master" },
    { id: 10, name: "master" },
  ],
  itemsPerPage = 3,
}) => {
  const {
    currentPage,
    nextPage,
    prevPage,
    jumpToPage,
    currentData,
    maxPage,
    getPageNumbers,
  } = usePagination(data, itemsPerPage);

  const pageNumbers = getPageNumbers();

  const [modalOpen, setModalOpen] = useState(true);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  return (
    <div>
      <div>
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2>Modal Title</h2>
              <p>Modal Content</p>
              <button onClick={() => setModalOpen(false)}>Close Modal</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* </motion.button> */}
      <table>
        {/* Render your table headers */}
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        {/* Render your table body */}
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              {/* Render additional columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {pageNumbers.map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => jumpToPage(pageNumber)}
            disabled={pageNumber === "..."}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={nextPage} disabled={currentPage === maxPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default NewTest;
