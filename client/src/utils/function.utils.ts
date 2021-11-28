export const filteredRow = (rows: any[], headers: any[], filter: any) => {
  const columns: any[] = [];
  if (headers && rows && filter) {
    for (const kolom of headers) kolom.id !== "_id" && columns.push(kolom.id);
    return rows.filter((row: any) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(filter.toLowerCase()) >
          -1
      )
    );
  } else {
    return rows;
  }
};

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

export const flatten_data = (data: any): Array<string> => {
  const property: Array<string> = [];
  const key = Object.keys(data);
  key.forEach((item) => {
    if (typeof data[item] === "number") {
      property.push(item);
    }
  });
  return property;
};
