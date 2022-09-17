import { Button, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import API from "../API";
import {
  basicDetailsState,
  orderSummaryState,
  productDetailsState,
} from "../atoms/orderModal";
import { paymentDetailsStatusState } from "../atoms/orderStatusModal";
import { productSchema } from "../Utils/OrderSchema";
import Card from "./Card";
import OrderLayout from "./OrderLayout";

const Summary = () => {
  const navigate = useNavigate();
  const basicDetails = useRecoilValue(basicDetailsState);
  const productDetails = useRecoilValue(productDetailsState);
  const paymentDetailsStatus = useRecoilValue(paymentDetailsStatusState);
  const [orderSummary, setOrderSummary] = useRecoilState(orderSummaryState);
  const [price, setPrice] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [tempCouponCode, setTempCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const handleChange = async (value, type) => {
    if (type === "coupon") {
      setTempCouponCode(value);
    }
  };
  const applyCoupon = async () => {
    try {
      setIsApplying(true);
      const res = await API.post("/coupon/get", { couponCode: tempCouponCode });
      console.log(res);
      message.success("Applying Coupon");
      setIsApplying(false);
      setOrderSummary({
        ...orderSummary,
        COUPON: res.data.price,
        TOTAL: orderSummary.TOTAL - res.data.price,
      });
      setCouponCode(tempCouponCode);
      setPrice(price - res.data.price);
    } catch (error) {
      message.error(error.response.data);
      setIsApplying(false);
    }
  };

  useEffect(() => {
    let temp = productSchema.categories.find(
      (cat) => cat.id === productDetails.PRODUCT_SN.slice(0, 2)
    );
    const productPrice = temp.products.find(
      (pro) => pro.SN === productDetails.PRODUCT_SN.slice(2, 6)
    ).price;

    const sizePrice = temp.specifications[1].sizes.find(
      (siz) => siz.id === productDetails.PRODUCT_SN.slice(8, 10)
    ).price;
    console.log(sizePrice);
    setPrice(productPrice + sizePrice);
    setOrderSummary({
      ...orderSummary,
      PRODUCT_PRICE: productPrice + sizePrice,
      QUANTITY: productDetails.QUANTITY,
      CGST: Math.round((price * 9) / 100),
      SGST: Math.round((price * 9) / 100),
      TOTAL:
        (Math.round((price * 9) / 100) * 2 + price) * productDetails.QUANTITY -
        orderSummary.COUPON -
        orderSummary.POINTS,
    });
  }, []);
  return (
    <OrderLayout>
      <div className="flex-[0.6] flex flex-col my-4 mx-4 py-2 ">
        <div className="w-[95%] mx-auto flex flex-col justify-between h-full">
          <div className="">
            <div className="flex justify-between">
              <button
                onClick={() => navigate("/basic-details")}
                className="hover:underline
                 text-blue-600">
                Back
              </button>
              <h1 className="text-center text-[24px] font-bold ">
                Order Summary
              </h1>
              <button
                disabled={!paymentDetailsStatus}
                onClick={() => navigate("/payment")}
                className={`hover:underline ${
                  paymentDetailsStatus ? "text-blue-600" : "text-gray-400"
                }`}>
                Next
              </button>
            </div>
            <div className="flex space-x-10">
              <div className="w-[15rem] h-[18rem] flex items-center justify-center">
                <img
                  className="object-cover"
                  src="https://m.media-amazon.com/images/I/71L2wXXLthL._AC_SS450_.jpg"
                  alt=""
                />
              </div>
              <div className="flex flex-col mt-8">
                <h1 className="text-[24px]">{productDetails.PRODUCT}</h1>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex space-x-2">
                    <h3>Category:</h3>
                    <span>{productDetails.CATEGORY}</span>
                  </div>
                  <div className="flex space-x-2">
                    <h3>Colour:</h3>
                    <span>{productDetails.COLOUR}</span>
                  </div>
                  <div className="flex space-x-2">
                    <h3>Size:</h3>
                    <span>{productDetails.SIZE}</span>
                  </div>
                  <div className="flex space-x-2">
                    <h3>Quantity:</h3>
                    <span>{productDetails.QUANTITY}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="flex space-x-2">
                    <h3>Name:</h3>
                    <span>{basicDetails.NAME}</span>
                  </div>
                  <div className="flex space-x-2">
                    <h3>Phone Number:</h3>
                    <span>{basicDetails.PHONE}</span>
                  </div>
                  {basicDetails.EMAIL !== "" && (
                    <div className="flex space-x-2">
                      <h3>Email:</h3>
                      <span>{basicDetails.EMAIL}</span>
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <h3>Choice of communication:</h3>
                    <span>{basicDetails.COC}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <h3>Address:</h3>
                  {productDetails.DELIVERY_MODE !== "Pickup" ? (
                    <span>{basicDetails.ADDRESS?.fullAddress}</span>
                  ) : (
                    <span>{productDetails.DELIVERY_MODE}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="">
              <div className="flex justify-between">
                <h3>Product:</h3>
                <span>₹ {price}</span>
              </div>
              <div className="flex justify-between">
                <h3>Quantity:</h3>
                <span>{productDetails.QUANTITY}</span>
              </div>
              <div className="flex justify-between">
                <h3>CGST (9%):</h3>
                <span>₹ {Math.round((price * 9) / 100)}</span>
              </div>
              <div className="flex justify-between">
                <h3>SGST (9%):</h3>
                <span>₹ {Math.round((price * 9) / 100)}</span>
              </div>
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <label htmlFor="coupon">
                    <h3>Coupon:</h3>
                  </label>
                  {couponCode === "" ? (
                    <Input.Group compact>
                      <Input
                        style={{ width: "calc(100% - 100px)" }}
                        size="small"
                        id="coupon"
                        placeholder="Enter Valid Coupon"
                        value={tempCouponCode}
                        onChange={(e) => handleChange(e.target.value, "coupon")}
                      />
                      <Button
                        onClick={() => applyCoupon()}
                        type="primary"
                        size="small">
                        {isApplying ? "Applying" : "Apply"}
                      </Button>
                    </Input.Group>
                  ) : (
                    <p>Coupon Code {couponCode} applied</p>
                  )}
                </div>
                <span>
                  {couponCode !== "" ? `- ₹ ${orderSummary.COUPON}` : "0"}
                </span>
              </div>
              <div className="flex justify-between">
                <div className="flex space-x-2">
                  <h3>Points:</h3>
                  <Input.Group compact>
                    <Input
                      style={{ width: "calc(100% - 100px)" }}
                      size="small"
                      id="points"
                      placeholder="Enter Points"
                      value={tempCouponCode}
                      onChange={(e) => handleChange(e.target.value, "points")}
                    />
                    <Button
                      onClick={() => applyCoupon()}
                      type="primary"
                      size="small">
                      {isApplying ? "Applying" : "Apply"}
                    </Button>
                  </Input.Group>
                </div>
                <span>
                  {couponCode !== "" ? `- ₹ ${orderSummary.COUPON}` : "0"}
                </span>
              </div>
              <div className="flex justify-between">
                <h3>Total:</h3>
                <span className="font-semibold">
                  ₹{" "}
                  {(Math.round((price * 9) / 100) * 2 + price) *
                    productDetails.QUANTITY -
                    orderSummary.COUPON -
                    orderSummary.POINTS}
                </span>
              </div>
            </div>
          </div>
          <Button
            // disabled={
            //   productDetails.QUANTITY === 0 ||
            //   productDetails.DELIVERY_MODE === ""
            // }
            onClick={() => navigate("/payment")}
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

export default Summary;
