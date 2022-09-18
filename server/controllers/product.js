import Category from "../models/category.js";
import Product from "../models/product.js";
import Colour from "../models/colour.js";
import Size from "../models/size.js";

export const createCategory = async (req, res) => {
  const { id, title } = req.body;
  const category = await Category.findOne({ id });
  if (category) {
    return res.status(200).json("Category Already Present");
  }
  const newCategory = await Category.create({
    id,
    title,
  });
  return res.status(200).json(newCategory);
};

export const addColourToCategory = async (req, res) => {
  const { categoryId, colourId, colourTitle } = req.body;
  const colour = await Colour.findOne({ title: colourTitle });
  const category = await Category.findOne({ id: categoryId });
  if (colour) {
    category.colours.push(colour._id);
    await category.save();
    return res.status(200).json("Colour Added");
  }

  const newColour = await Colour.create({
    id: colourId,
    title: colourTitle,
  });
  category.colours.push(newColour._id);
  await category.save();
  return res.status(200).json("Colour Added");
};
export const addSizeToCategory = async (req, res) => {
  const { categoryId, sizeId, sizeTitle, sizePrice } = req.body;
  const size = await Size.findOne({ title: sizeTitle });
  const category = await Category.findOne({ id: categoryId });
  if (size) {
    console.log(category.specifications);
    category.sizes.push(size._id);
    await category.save();
    return res.status(200).json("Size Added");
  }
  const newSize = await Size.create({
    id: sizeId,
    title: sizeTitle,
    price: sizePrice,
  });
  category.sizes.push(newSize._id);
  await category.save();
  return res.status(200).json("Size Added");
};
export const addProductToCategory = async (req, res) => {
  const { categoryId, productSN, productTitle, productPrice, productImageUrl } =
    req.body;
  const product = await Product.findOne({ SN: productSN });
  const category = await Category.findOne({ id: categoryId });
  if (product) {
    category.products.push(product._id);
    await category.save();
    return res.status(200).json("Product Added");
  }
  const newProduct = await Product.create({
    SN: productSN,
    imageUrl: productImageUrl,
    title: productTitle,
    price: productPrice,
  });
  category.products.push(newProduct._id);
  await category.save();
  return res.status(200).json("Product Added");
};

export const getAllCategory = async (req, res) => {
  const categories = await Category.find({}, "id title");
  console.log(categories);
  return res.status(200).json(categories);
};
export const getDataByCategory = async (req, res) => {
  const { categoryTitle } = req.body;
  const categoryData = await Category.findOne({ title: categoryTitle })
    .populate({ path: "products" })
    .populate({ path: "colours" })
    .populate({ path: "sizes" });
  return res.status(200).json({
    category: { id: categoryData.id, title: categoryData.title },
    products: categoryData.products,
    colours: categoryData.colours,
    sizes: categoryData.sizes,
  });
};
export const getProductBySN = async (req, res) => {
  const { SN } = req.body;
  const categoryId = SN.slice(0, 2);
  const productSN = SN.slice(2, 6);
  const colourId = SN.slice(6, 8);
  const sizeId = SN.slice(8, 10);
  const categoryData = await Category.findOne({ id: categoryId })
    .populate({ path: "products" })
    .populate({ path: "colours" })
    .populate({ path: "sizes" });
  let category = {
    _id: categoryData._id,
    id: categoryData.id,
    title: categoryData.title,
  };
  let product = categoryData.products.find((data) => data.SN === productSN);

  let colour = categoryData.colours.find((data) => data.id === colourId);
  let size = categoryData.sizes.find((data) => data.id === sizeId);

  const productData = {
    category,
    product,
    colour,
    size,
  };
  return res.status(200).json(productData);
};
