import { Button, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { productDetailsState } from "../atoms/orderModal";
import {
  basicDetailsStatusState,
  productDetailsStatusState,
} from "../atoms/orderStatusModal";
import { progressState } from "../atoms/progressModal";
import { productSchema } from "../Utils/OrderSchema";
import Card from "./Card";
import OrderLayout from "./OrderLayout";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import BarcodeReader from "react-barcode-reader";
const { Option } = Select;
const Product = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [progress, setProgress] = useRecoilState(progressState);
  const [productDetails, setProductDetails] =
    useRecoilState(productDetailsState);
  const basicDetailsStatus = useRecoilValue(basicDetailsStatusState);
  const [productDetailsStatus, setProductDetailsStatus] = useRecoilState(
    productDetailsStatusState
  );
  const [products, setProducts] = useState([]);
  const [colours, setColours] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [quantities, setQuantities] = useState([0, 1, 2, 3, 4, 5]);
  const [showVideo, setShowVideo] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    setProgress(16.66 * 2);
  }, []);
  const handleChange = (value, type) => {
    if (type === "category") {
      setProductDetails({
        ...productDetails,
        CATEGORY: value,
        PRODUCT: "",
        COLOUR: "",
        SIZE: "",
        QUANTITY: 0,
      });
      let temp = productSchema.categories.find((data) => data.title === value);
      setProducts(temp.products);
      setColours(
        temp.specifications.find((data) => data.title === "Colour").colours
      );
      setSizes(temp.specifications.find((data) => data.title === "Size").sizes);
    } else if (type === "product") {
      setProductDetails({
        ...productDetails,
        PRODUCT: value,
        COLOUR: "",
        SIZE: "",
        QUANTITY: 0,
      });
      setProductDetailsStatus(false);
    } else if (type === "colour") {
      setProductDetails({ ...productDetails, COLOUR: value });
    } else if (type === "size") {
      setProductDetails({ ...productDetails, SIZE: value });
    } else if (type === "quantity") {
      setProductDetails({ ...productDetails, QUANTITY: value });
      setProductDetailsStatus(value !== 0 ? true : false);
    } else return;
  };

  const handleOk = () => {
    setConfirmLoading(true);
    const category = serialNumber.slice(0, 2);
    const SN = serialNumber.slice(0, 6);
    const colourId = serialNumber.slice(6, 8);
    const sizeId = serialNumber.slice(8, 10);
    let temp = productSchema.categories.find((data) => data.id === category);
    console.log(temp);
    setProductDetails({
      ...productDetails,
      CATEGORY: temp.title,
      PRODUCT: temp.products.find((data) => data.SN === SN).title,
      COLOUR: temp.specifications[0].colours.find(
        (data) => data.id === colourId
      ).title,
      SIZE: temp.specifications[1].sizes.find((data) => data.id === sizeId)
        .title,
    });

    setTimeout(() => {
      setShowScanner(false);
      setConfirmLoading(false);
    }, 1000);
  };

  return (
    <OrderLayout>
      <div className="flex-[0.6] flex flex-col my-4 mx-4 py-2 ">
        <div className="w-[95%] mx-auto flex flex-col justify-between h-full">
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
                    value={productDetails.CATEGORY}
                    onChange={(value) => handleChange(value, "category")}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }>
                    {productSchema.categories.map((data) => (
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
                    value={productDetails.PRODUCT}
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
                    value={productDetails.COLOUR}
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
                    disabled={productDetails.PRODUCT === ""}
                    showSearch
                    placeholder="Select a Size"
                    optionFilterProp="children"
                    value={productDetails.SIZE}
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
            </div>
            <div className="text-center mt-10 space-y-6">
              <h1>OR</h1>
              <button
                onClick={() => {
                  setShowScanner(true);
                  setShowVideo(true);
                }}
                className="rounded-md bg-gray-600 hover:bg-gray-800 text-white px-5 py-2">
                Scan Serial Number
              </button>
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
            disabled={productDetails.QUANTITY === 0}
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
