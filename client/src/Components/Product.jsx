import { Button, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { productDetailsState } from "../atoms/orderModal";
import {
  basicDetailsStatusState,
  productDetailsStatusState,
  storeDetailsStatusState,
} from "../atoms/orderStatusModal";
import { progressState } from "../atoms/progressModal";
import { productSchema } from "../Utils/OrderSchema";
import Card from "./Card";
import OrderLayout from "./OrderLayout";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import API from "../API";
const { Option } = Select;
const Product = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [progress, setProgress] = useRecoilState(progressState);
  const [productDetails, setProductDetails] =
    useRecoilState(productDetailsState);
  const basicDetailsStatus = useRecoilValue(basicDetailsStatusState);
  const storeDetailsStatus = useRecoilValue(storeDetailsStatusState);
  const [productDetailsStatus, setProductDetailsStatus] = useRecoilState(
    productDetailsStatusState
  );
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantities, setQuantities] = useState([0, 1, 2, 3, 4, 5]);
  const [showVideo, setShowVideo] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleChange = async (value, type) => {
    if (type === "category") {
      setProductDetails({
        ...productDetails,
        CATEGORY: value,
        PRODUCT: "",
        COLOUR: "",
        SIZE: "",
        QUANTITY: 0,
        DELIVERY_MODE: "",
      });
      let temp = categories.find((data) => data.title === value);
      console.log(temp);
      setSerialNumber(temp.id);
      const { data: getCategoryData } = await API.post(
        "/category/getcategorydata",
        { categoryTitle: value }
      );
      console.log(getCategoryData);
      setProducts(getCategoryData.products);
      setColours(getCategoryData.colours);
      setSizes(getCategoryData.sizes);
    } else if (type === "product") {
      setProductDetails({
        ...productDetails,
        PRODUCT: value,
        COLOUR: "",
        SIZE: "",
        QUANTITY: 0,
      });
      let temp = products.find((pro) => pro.title === value);
      setSerialNumber(serialNumber + temp.SN);
      setProductDetailsStatus(false);
    } else if (type === "colour") {
      setProductDetails({ ...productDetails, COLOUR: value });
      let temp = colours.find((col) => col.title === value);
      setSerialNumber(serialNumber + temp.id);
    } else if (type === "size") {
      let temp = sizes.find((siz) => siz.title === value);
      setSerialNumber(serialNumber + temp.id);
      setProductDetails({
        ...productDetails,
        SIZE: value,
        PRODUCT_SN: serialNumber + temp.id,
      });
    } else if (type === "quantity") {
      setProductDetails({ ...productDetails, QUANTITY: value });
    } else if (type === "deliveryMode") {
      setProductDetails({ ...productDetails, DELIVERY_MODE: value });
      setProductDetailsStatus(value !== 0 ? true : false);
    } else return;
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const category = serialNumber.slice(0, 2);
    let temp = categories.find((data) => data.id === category);
    const { data: getCategoryData } = await API.post(
      "/category/getcategorydata",
      { categoryTitle: temp.title }
    );
    console.log(getCategoryData);
    setProducts(getCategoryData.products);
    setColours(getCategoryData.colours);
    setSizes(getCategoryData.sizes);

    const SN = serialNumber.slice(2, 6);
    const colourId = serialNumber.slice(6, 8);
    const sizeId = serialNumber.slice(8, 10);
    console.log("PRODUCTS", products);
    console.log("SIZES", sizes);
    console.log("COLOURS", colours);
    setProductDetails({
      ...productDetails,
      PRODUCT_SN: serialNumber,
      CATEGORY: getCategoryData.category.title,
      PRODUCT: getCategoryData.products.find((data) => data.SN === SN).title,
      COLOUR: getCategoryData.colours.find((data) => data.id === colourId)
        .title,
      SIZE: getCategoryData.sizes.find((data) => data.id === sizeId).title,
    });

    setTimeout(() => {
      setShowScanner(false);
      setConfirmLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const { data } = await API.get("/category/getall");
        setCategories(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategory();
  }, []);

  useEffect(() => {
    if (!storeDetailsStatus) {
      navigate("/store");
    }
    setProgress(16.66 * 2);
  }, []);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);
  return (
    <OrderLayout>
      <div className="flex-1 md:flex-[0.6] flex flex-col my-4 mx-4 ">
        <div className="w-[95%] mx-auto flex flex-col justify-between h-full pt-5 md:pt-0">
          <div className="">
            <div className="flex justify-between">
              <button
                onClick={() => navigate("/store")}
                className="hover:underline
                 text-blue-600">
                Back
              </button>
              <h1 className="text-center text-[24px] font-bold ">
                Product Details
              </h1>
              <button
                disabled={!basicDetailsStatus}
                onClick={() => navigate("/basic-details")}
                className={`hover:underline ${
                  basicDetailsStatus ? "text-blue-600" : "text-gray-400"
                }`}>
                Next
              </button>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col space-y-5 ">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="category">Category</label>
                  <Select
                    id="category"
                    showSearch
                    placeholder="Select a Category"
                    optionFilterProp="children"
                    value={productDetails.CATEGORY || null}
                    onChange={(value) => handleChange(value, "category")}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }>
                    {categories.map((data) => (
                      <Option key={data.title} value={data.title}>
                        {data.title}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="product">Product</label>
                  <Select
                    id="product"
                    disabled={productDetails.CATEGORY === ""}
                    showSearch
                    placeholder="Select a Product"
                    optionFilterProp="children"
                    value={productDetails.PRODUCT || null}
                    onChange={(value) => handleChange(value, "product")}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }>
                    {products.map((data) => (
                      <Option key={data.SN} value={data.title}>
                        {data.title}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="colour">Colour</label>
                  <Select
                    aria-required
                    id="colour"
                    disabled={productDetails.PRODUCT === ""}
                    showSearch
                    placeholder="Select a Colour"
                    optionFilterProp="children"
                    value={productDetails.COLOUR || null}
                    onChange={(value) => handleChange(value, "colour")}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }>
                    {colours.map((data) => (
                      <Option key={data.id} value={data.title}>
                        {data.title}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="size">Size</label>
                  <Select
                    id="size"
                    disabled={
                      (productDetails.PRODUCT === "",
                      productDetails.COLOUR === "")
                    }
                    showSearch
                    placeholder="Select a Size"
                    optionFilterProp="children"
                    value={productDetails.SIZE || null}
                    onChange={(value) => handleChange(value, "size")}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }>
                    {sizes.map((data) => (
                      <Option key={data.id} value={data.title}>
                        {data.title}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="quantity">Quantity</label>
                  <Select
                    id="quantity"
                    disabled={
                      productDetails.COLOUR === "" || productDetails.SIZE === ""
                    }
                    showSearch
                    placeholder="Select Quantity"
                    optionFilterProp="children"
                    value={productDetails.QUANTITY}
                    onChange={(value) => handleChange(value, "quantity")}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }>
                    {quantities.map((data) => (
                      <Option key={data} value={data}>
                        {data}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="deliveryMode">Delivery Mode</label>
                  <Select
                    id="deliveryMode"
                    disabled={productDetails.QUANTITY === 0}
                    showSearch
                    placeholder="Select Delivery Mode"
                    optionFilterProp="children"
                    value={productDetails.DELIVERY_MODE || null}
                    onChange={(value) => handleChange(value, "deliveryMode")}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }>
                    <Option value={"Pickup"}>Pickup</Option>
                    <Option value={"Home Delivery"}>Home Delivery</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="text-center mt-10 space-y-6">
              <h1>OR</h1>
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  setShowScanner(true);
                  setShowVideo(true);
                }}>
                Scan Serial Number
              </Button>
            </div>
            <Modal
              title="Serial Number Scanner"
              open={showScanner}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={() => setShowScanner(false)}>
              {showVideo && (
                <BarcodeScannerComponent
                  width={500}
                  height={500}
                  onUpdate={(err, result) => {
                    if (result) {
                      setSerialNumber(result.text);
                      setShowVideo(false);
                    } else setSerialNumber("Not Found");
                  }}
                />
              )}

              <p>
                <span className="font-bold">Serial Number:</span> {serialNumber}
              </p>
            </Modal>
          </div>
          <Button
            disabled={
              productDetails.QUANTITY === 0 ||
              productDetails.DELIVERY_MODE === ""
            }
            onClick={() => navigate("/basic-details")}
            type="primary"
            size="large">
            Continue
          </Button>
        </div>
      </div>
      <Card />
    </OrderLayout>
  );
};

export default Product;
