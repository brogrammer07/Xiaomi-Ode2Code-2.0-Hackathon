export const storeSchema = {
  storeTypes: [
    {
      title: "MI Home",
      storeNames: [
        {
          title: "MI Home  Mayur Vihar",
          POS_ID: "8765433",
        },
        {
          title: "MI Home  Vasant Kunj",
          POS_ID: "8443223",
        },
        {
          title: "MI Home  Mumbai",
          POS_ID: "3534356",
        },
        {
          title: "MI Home  Janak Puri",
          POS_ID: "7344652",
        },
      ],
    },
    {
      title: "MI Store",
      storeNames: [
        {
          title: "MI Store  Mayur Vihar",
          POS_ID: "8765432",
        },
        {
          title: "MI Store  Vasant Kunj",
          POS_ID: "2545446",
        },
        {
          title: "MI Store  Mumbai",
          POS_ID: "7435463",
        },
        {
          title: "MI Store  Janak Puri",
          POS_ID: "7433355",
        },
      ],
    },
  ],
};

export const productSchema = {
  categories: [
    {
      id: "SP",
      title: "Smart Phone",

      products: [
        { title: "Redmi Note 11", SN: "8246", price: 12999 },
        { title: "Redmi 10C", SN: "3641", price: 13999 },
        { title: "Redmi 9A", SN: "4652", price: 11999 },
        { title: "Redmi Note 10S", SN: "1252", price: 14999 },
        { title: "Redmi Note 10T", SN: "7521", price: 13999 },
      ],
      specifications: [
        {
          title: "Colour",
          colours: [
            { title: "Red", id: "01" },
            { title: "White", id: "02" },
            { title: "Green", id: "03" },
            { title: "Blue", id: "04" },
          ],
        },
        {
          title: "Size",
          sizes: [
            { title: "4/64GB", id: "01", price: 0 },
            { title: "4/128GB", id: "02", price: 2000 },
            { title: "6/128GB", id: "03", price: 3000 },
            { title: "6/256GB", id: "04", price: 4000 },
            { title: "8/256GB", id: "05", price: 5000 },
          ],
        },
      ],
    },
    {
      id: "TV",
      title: "TV",
      products: [
        { title: "Xiaomi TV A2", SN: "3741", price: 24999 },
        { title: "Xiaomi TV F2", SN: "2531", price: 25999 },
        { title: "Xiaomi TV P1E", SN: "7432", price: 26999 },
        { title: "Xiaomi TV Q1E", SN: "1232", price: 27999 },
        { title: "Xiaomi Smart TV 5A Pro  ", SN: "0443", price: 28999 },
      ],
      specifications: [
        {
          title: "Colour",
          colours: [
            { title: "Red", id: "01" },
            { title: "White", id: "02" },
            { title: "Green", id: "03" },
            { title: "Blue", id: "04" },
          ],
        },
        {
          title: "Size",
          sizes: [
            { title: "22 Inch", id: "01", price: 0 },
            { title: "26 Inch", id: "02", price: 5000 },
            { title: "32 Inch", id: "03", price: 8000 },
            { title: "52 Inch", id: "04", price: 15000 },
            { title: "56 Inch", id: "05", price: 18000 },
          ],
        },
      ],
    },
    {
      id: "LP",
      title: "Laptop",
      products: [
        { title: "Mi NoteBook Ultra", SN: "9731", price: 46999 },
        { title: "Mi NoteBook Pro", SN: "3245", price: 49999 },
        { title: "Mi Notebook 14 Horizon i7", SN: "7412", price: 69999 },
        { title: "Mi Notebook 14 Horizon i5", SN: "2541", price: 62999 },
        { title: "Mi NoteBook Pro 120", SN: "9731", price: 55999 },
      ],
      specifications: [
        {
          title: "Colour",
          colours: [
            { title: "Red", id: "01" },
            { title: "White", id: "02" },
            { title: "Green", id: "03" },
            { title: "Blue", id: "04" },
          ],
        },
        {
          title: "Size",
          sizes: [
            { title: "4GB/256GB HDD", id: "01", price: 0 },
            { title: "4GB/256GB SSD", id: "02", price: 3000 },
            { title: "8GB/512GB SSD", id: "03", price: 5000 },
            { title: "8GB/1TB HDD", id: "04", price: 7000 },
            { title: "16GB/1TB SSD", id: "05", price: 12000 },
          ],
        },
      ],
    },
  ],
};
