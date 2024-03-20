import { useEffect, useMemo, useState } from "react";
import { useStore } from "zustand";

const Paginator = (step) => {
  const { itemsList } = useStore();
  const [cleanedItems, setCleanedItems] = useState([]);
  const [displayItems, setDisplayItems] = useState([]);
  const [limit, setLimit] = useState({ start: 0, end: step });
  const filterList = useMemo(() => {
    const cleanedItemsList = itemsList.filter(
      (item) => item.remaining_item !== 0
    );
    setCleanedItems(cleanedItemsList);

    const displayItemsList = cleanedItems.slice(limit.start, limit.end);
    setDisplayItems(displayItemsList);
  }, [itemsList, limit]);
  useEffect(() => {
    filterList();
  }, [itemsList, limit]);

  return (
    <div>
      <div
        id="paginator"
        className="flex mt-4  items-center gap-4 justify-center"
      >
        <div
          onClick={() => {
            limit.start >= step &&
              setLimit({
                start: limit.start - step,
                end: limit.end - step,
              });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className={`w-7 h-7 ${
              limit.start >= step ? "text-blue-600" : "text-gray-500"
            } `}
            viewBox="0 0 16 16"
          >
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />{" "}
          </svg>
        </div>
        <div>
          Página {limit.start / step + 1} de{" "}
          {Math.ceil(filterList.cleanedItems.length / step)} (
          {filterList.cleanedItems.length} ítems)
        </div>
        <div
          onClick={() =>
            limit.end < filterList.cleanedItems.length &&
            setLimit({ start: limit.start + step, end: limit.end + step })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            className={`w-7 h-7  ${
              limit.end < filterList.cleanedItems.length
                ? "text-blue-600"
                : "text-gray-500"
            } `}
          >
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />{" "}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Paginator;
