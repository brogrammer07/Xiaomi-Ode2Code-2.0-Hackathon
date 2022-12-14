import { Button, Input, message, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import API from "../API";
import {
  basicDetailsState,
  orderSummaryState,
  productDetailsState,
} from "../atoms/orderModal";
import {
  basicDetailsStatusState,
  paymentDetailsStatusState,
  productDetailsStatusState,
  summaryDetailsStatusState,
} from "../atoms/orderStatusModal";
import { progressState } from "../atoms/progressModal";
import Card from "./Card";
import OrderLayout from "./OrderLayout";

const Summary = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useRecoilState(progressState);
  const basicDetails = useRecoilValue(basicDetailsState);
  const basicDetailsStatus = useRecoilValue(basicDetailsStatusState);
  const productDetailsStatus = useRecoilValue(productDetailsStatusState);
  const productDetails = useRecoilValue(productDetailsState);
  const paymentDetailsStatus = useRecoilValue(paymentDetailsStatusState);
  const [orderSummary, setOrderSummary] = useRecoilState(orderSummaryState);
  const [orderSummaryStatus, setOrderSummaryStatus] = useRecoilState(
    summaryDetailsStatusState
  );
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [tempCouponCode, setTempCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isApplyingPoints, setIsApplyingPoints] = useState(false);
  const [availablePoints, setAvailablePoints] = useState(orderSummary.POINTS);
  const [searchPoints, setSearchPoints] = useState(false);
  const handleChange = async (value, type) => {
    if (type === "coupon") {
      setTempCouponCode(value);
    } else if (type === "points") {
      setAvailablePoints(value);
    }
  };
  const applyPoints = async () => {
    try {
      setIsApplyingPoints(true);
      const res = await API.post("/customer/points/use", {
        points: availablePoints,
        phoneNumber: basicDetails.PHONE,
      });
      message.success("Applying Points");
      setIsApplyingPoints(false);
      setOrderSummary({
        ...orderSummary,
        POINTS: orderSummary.POINTS + Math.round(availablePoints / 10),
        TOTAL: orderSummary.TOTAL - Math.round(availablePoints / 10),
      });
      setSearchPoints(false);
    } catch (error) {
      message.error(error.response.data);
      setIsApplyingPoints(false);
    }
  };
  const applyCoupon = async () => {
    try {
      setIsApplyingCoupon(true);
      const res = await API.post("/coupon/get", { couponCode: tempCouponCode });
      message.success("Applying Coupon");
      setIsApplyingCoupon(false);
      setOrderSummary({
        ...orderSummary,
        COUPON_CODE: tempCouponCode,
        COUPON: res.data.price,
        TOTAL: orderSummary.TOTAL - res.data.price,
      });
      setCouponCode(tempCouponCode);
      setPrice(price - res.data.price);
    } catch (error) {
      message.error(error.response.data);
      setIsApplyingCoupon(false);
    }
  };

  const getPoints = async () => {
    try {
      const res = await API.post("/customer/points/get", {
        phoneNumber: basicDetails.PHONE,
      });
      message.success(`${res.data.points} Points Found`);
      setAvailablePoints(res.data.points);
      setSearchPoints(true);
    } catch (error) {
      message.error("No Points Found");
      setAvailablePoints(0);
    }
  };

  useEffect(() => {
    if (!basicDetailsStatus) {
      navigate("/basic-details");
    }
    setProgress(16.66 * 4);
  }, []);

  useEffect(() => {
    const getProductBySN = async () => {
      try {
        const { data: productData } = await API.post(
          "/product/getproductbysn",
          { SN: productDetails.PRODUCT_SN }
        );
        const productPrice = productData.product.price;
        const sizePrice = productData.size.price;
        setPrice(productPrice + sizePrice);
        setImageUrl(productData.product.imageUrl);
        setOrderSummary({
          ...orderSummary,
          PRODUCT_PRICE: productPrice + sizePrice,
          QUANTITY: productDetails.QUANTITY,
          CGST: Math.round(((productPrice + sizePrice) * 9) / 100),
          SGST: Math.round(((productPrice + sizePrice) * 9) / 100),
          TOTAL:
            (Math.round(((productPrice + sizePrice) * 9) / 100) * 2 +
              (productPrice + sizePrice)) *
              productDetails.QUANTITY -
            orderSummary.COUPON -
            orderSummary.POINTS,
        });
        setOrderSummaryStatus(true);
      } catch (error) {
        console.log(error);
      }
    };
    getProductBySN();
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
        <div className="w-[95%] mx-auto flex flex-col justify-between h-full overflow-y-hidden pt-5 md:pt-0">
          <div className="h-[80%]">
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
            <div className="overflow-y-scroll h-full scrollbar-hide ">
              <div className="flex xl:flex-row flex-col space-x-10 mb-4">
                <img
                  className="object-contain w-[15rem] h-[18rem] self-center "
                  src={imageUrl}
                  alt=""
                />

                <div className="flex flex-col mt-8">
                  <h1 className="text-[24px]">{productDetails.PRODUCT}</h1>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="flex flex-col  space-y-3">
                      <div className="">
                        <Tag
                          style={{
                            fontSize: "15px",
                            padding: "3px 8px",
                            fontWeight: "500",
                            width: "5rem",
                          }}
                          color="blue">
                          Category
                        </Tag>
                        <span>{productDetails.CATEGORY}</span>
                      </div>
                      <div className="">
                        <Tag
                          style={{
                            fontSize: "15px",
                            padding: "3px 8px",
                            fontWeight: "500",
                            width: "5rem",
                          }}
                          color="blue">
                          Size
                        </Tag>
                        <span>{productDetails.SIZE}</span>
                      </div>
                      <div className="">
                        <Tag
                          style={{
                            fontSize: "15px",
                            padding: "3px 8px",
                            fontWeight: "500",
                            width: "5rem",
                          }}
                          color="blue">
                          Quantity
                        </Tag>
                        <span>{productDetails.QUANTITY}</span>
                      </div>
                      <div className="">
                        <Tag
                          style={{
                            fontSize: "15px",
                            padding: "3px 8px",
                            fontWeight: "500",
                            width: "5rem",
                          }}
                          color="blue">
                          Name
                        </Tag>
                        <span>{basicDetails.NAME}</span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-3">
                      <div className="">
                        <Tag
                          style={{
                            fontSize: "15px",
                            padding: "3px 8px",
                            fontWeight: "500",
                            width: "5rem",
                          }}
                          color="blue">
                          Colour
                        </Tag>
                        <span>{productDetails.COLOUR}</span>
                      </div>
                      <div className="">
                        <Tag
                          style={{
                            fontSize: "15px",
                            padding: "3px 8px",
                            fontWeight: "500",
                            width: "5rem",
                          }}
                          color="blue">
                          Phone No
                        </Tag>
                        <span>{basicDetails.PHONE}</span>
                      </div>
                      {basicDetails.EMAIL !== "" && (
                        <div className="">
                          <Tag
                            style={{
                              fontSize: "15px",
                              padding: "3px 8px",
                              fontWeight: "500",
                              width: "5rem",
                            }}
                            color="blue">
                            Email
                          </Tag>
                          <span>{basicDetails.EMAIL}</span>
                        </div>
                      )}
                      <div className="">
                        <Tag
                          style={{
                            fontSize: "15px",
                            padding: "3px 8px",
                            fontWeight: "500",
                            width: "5rem",
                          }}
                          color="blue">
                          COC
                        </Tag>
                        <span>{basicDetails.COC}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[12px]">
                    <Tag
                      style={{
                        fontSize: "15px",
                        padding: "3px 8px",
                        fontWeight: "500",
                        width: "5rem",
                      }}
                      color="blue">
                      {productDetails.DELIVERY_MODE !== "Pickup"
                        ? "Address"
                        : "Delivery"}
                    </Tag>
                    {productDetails.DELIVERY_MODE !== "Pickup" ? (
                      <span>{basicDetails.ADDRESS?.fullAddress}</span>
                    ) : (
                      <span>{productDetails.DELIVERY_MODE}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="border-2 py-2 px-3 rounded-md">
                <h1 className="text-center font-semibold text-[18px]">
                  Order Details
                </h1>
                <div className="flex justify-between">
                  <h3 className="text-[15px]">Product:</h3>
                  <span>??? {price}</span>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-[15px]">Quantity:</h3>
                  <span>{productDetails.QUANTITY}</span>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-[15px]">CGST (9%):</h3>
                  <span>??? {Math.round((price * 9) / 100)}</span>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-[15px]">SGST (9%):</h3>
                  <span>??? {Math.round((price * 9) / 100)}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <label htmlFor="coupon">
                      <h3 className="text-[15px]">Coupon:</h3>
                    </label>
                    {orderSummary.COUPON_CODE === "" ? (
                      <Input.Group compact>
                        <Input
                          style={{ width: "calc(100% - 126px)" }}
                          size="small"
                          id="coupon"
                          placeholder="Enter Coupon"
                          value={tempCouponCode}
                          onChange={(e) =>
                            handleChange(e.target.value, "coupon")
                          }
                        />
                        <Button
                          onClick={() => applyCoupon()}
                          type="primary"
                          size="small"
                          loading={isApplyingCoupon}>
                          {isApplyingCoupon ? "Applying" : "Apply"}
                        </Button>
                      </Input.Group>
                    ) : (
                      <p>Coupon Code {orderSummary.COUPON_CODE} applied</p>
                    )}
                  </div>
                  <span>
                    {orderSummary.COUPON !== 0
                      ? `- ??? ${orderSummary.COUPON}`
                      : "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="flex space-x-5">
                    <h3 className="text-[15px]">Points:</h3>
                    {!searchPoints ? (
                      <Button onClick={() => getPoints()} type="" size="small">
                        Search Points
                      </Button>
                    ) : (
                      <Input.Group compact>
                        <Input
                          style={{ width: "calc(100% - 126px)" }}
                          size="small"
                          id="points"
                          placeholder="Enter Points"
                          value={availablePoints}
                          onChange={(e) =>
                            handleChange(e.target.value, "points")
                          }
                        />
                        <Button
                          onClick={() => applyPoints()}
                          type="primary"
                          size="small"
                          loading={isApplyingPoints}>
                          {isApplyingPoints ? "Applying" : "Apply"}
                        </Button>
                      </Input.Group>
                    )}
                  </div>
                  <span>
                    {orderSummary.POINTS !== 0
                      ? `- ??? ${orderSummary.POINTS}`
                      : "0"}
                  </span>
                </div>
                <div className="flex justify-between border-t-[1px] border-gray-400 mt-2 pt-2">
                  <h3 className="text-[15px]">Total:</h3>
                  <span className="font-semibold">??? {orderSummary.TOTAL}</span>
                </div>
              </div>
            </div>
          </div>
          <Button
            onClick={() => navigate("/payment")}
            type="primary"
            size="large">
            Pay
          </Button>
        </div>
      </div>
      <Card />
    </OrderLayout>
  );
};

export default Summary;
