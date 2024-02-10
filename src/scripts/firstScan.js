export function firstScan(itemsList) {
  console.log(itemsList);
  const isFirst = itemsList.every(
    (obj) => obj.remaining_item === obj.quantity_item
  );
  return isFirst;
}
