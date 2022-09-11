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
        { title: "Redmi Note 11", SN: "SP8246" },
        { title: "Redmi 10C", SN: "SP3641" },
        { title: "Redmi 9A", SN: "SP4652" },
        { title: "Redmi Note 10S", SN: "SP1252" },
        { title: "Redmi Note 10T", SN: "SP7521" },
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
            { title: "4/64GB", id: "01" },
            { title: "4/128GB", id: "02" },
            { title: "6/128GB", id: "03" },
            { title: "6/256GB", id: "04" },
            { title: "8/256GB", id: "05" },
          ],
        },
      ],
    },
    {
      id: "TV",
      title: "TV",
      products: [
        { title: "Xiaomi TV A2", SN: "TV3741" },
        { title: "Xiaomi TV F2", SN: "TV2531" },
        { title: "Xiaomi TV P1E", SN: "TV7432" },
        { title: "Xiaomi TV Q1E", SN: "TV1232" },
        { title: "Xiaomi Smart TV 5A Pro  ", SN: "TV0443" },
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
            { title: "22 Inch", id: "01" },
            { title: "26 Inch", id: "02" },
            { title: "32 Inch", id: "03" },
            { title: "52 Inch", id: "04" },
            { title: "56 Inch", id: "05" },
          ],
        },
      ],
    },
    {
      id: "LP",
      title: "Laptop",
      products: [
        { title: "Mi NoteBook Ultra", SN: "LP9731" },
        { title: "Mi NoteBook Pro", SN: "LP3245" },
        { title: "Mi Notebook 14 Horizon i7", SN: "LP7412" },
        { title: "Mi Notebook 14 Horizon i5", SN: "LP2541" },
        { title: "Mi NoteBook Pro 120", SN: "LP9731" },
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
            { title: "4GB/256GB HDD", id: "01" },
            { title: "4GB/256GB SSD", id: "02" },
            { title: "8GB/512GB SSD", id: "03" },
            { title: "8GB/1TB HDD", id: "04" },
            { title: "16GB/1TB SSD", id: "05" },
          ],
        },
      ],
    },
  ],
};
