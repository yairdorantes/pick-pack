export function firstPack(itemsList) {
  // console.log(itemsList);
  const isFirst = itemsList.every((obj) => obj.packed_item === 0);
  return isFirst;
}
