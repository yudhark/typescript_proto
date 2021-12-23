export const generateRandomData = (count: number): Array<any> => {
  const precision = 100; // 2 decimals
  const data: Array<any> = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      _id: i,
      ket: "Item " + Math.floor(Math.random() * 101),
      stock: Math.floor(Math.random() * 101),
      price:
        Math.floor(
          Math.random() * (100000 * precision - 1 * precision) + 1 * precision
        ) /
        (1 * precision),
    });
  }
  return data;
};