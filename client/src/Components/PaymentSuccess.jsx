import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import API from "../API";
import {
  basicDetailsState,
  orderSummaryState,
  paymentState,
  productDetailsState,
  storeDetailsState,
} from "../atoms/orderModal";
import {
  paymentDetailsStatusState,
  productDetailsStatusState,
  summaryDetailsStatusState,
} from "../atoms/orderStatusModal";
import { progressState } from "../atoms/progressModal";
import Card from "./Card";
import OrderLayout from "./OrderLayout";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const referenceNumber = useSearchParams()[0].get("reference");
  const productDetails = useRecoilValue(productDetailsState);
  const basicDetails = useRecoilValue(basicDetailsState);
  const storeDetails = useRecoilValue(storeDetailsState);
  const orderSummary = useRecoilValue(orderSummaryState);
  const [progress, setProgress] = useRecoilState(progressState);
  const productDetailsStatus = useRecoilValue(productDetailsStatusState);
  const orderSummaryStatus = useRecoilValue(summaryDetailsStatusState);
  const paymentDetails = useRecoilValue(paymentState);
  const [pointsEarned, setPointsEarned] = useState(0);
  console.log(productDetailsStatus);
  const [orderId, setOrderId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useRecoilState(
    paymentDetailsStatusState
  );
  useEffect(() => {
    if (!orderSummaryStatus) {
      navigate("/payment");
    }
    setProgress(16.66 * 6);
  }, []);

  useEffect(() => {
    if (referenceNumber) {
      const createOrder = async () => {
        const { data } = await API.post("/order/create", {
          productSN: productDetails.PRODUCT_SN,
          productPrice: orderSummary.PRODUCT_PRICE,
          cgst: orderSummary.CGST,
          sgst: orderSummary.SGST,
          coupon: {
            couponCode: orderSummary.COUPON_CODE,
            coupon: orderSummary.COUPON,
          },
          points: orderSummary.POINTS,
          total: orderSummary.TOTAL,
          referenceNumber,

          paymentMode: paymentDetails.PAYMENT_TYPE,
          phoneNumber: basicDetails.PHONE,
          address:
            productDetails.DELIVERY_MODE !== "Pickup"
              ? basicDetails.ADDRESS.fullAddress
              : null,
          storeType: storeDetails.STORE_TYPE,
          storeName: storeDetails.STORE_NAME,
          productName: productDetails.PRODUCT,
          productColour: productDetails.COLOUR,
          productSize: productDetails.SIZE,
          quantity: productDetails.QUANTITY,
        });
        setPointsEarned(data.pointsEarned);
        setOrderId(data.orderId);
        setPaymentStatus(true);
      };
      createOrder();
    }
  }, [referenceNumber]);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", unloadCallback);
    return () => window.removeEventListener("beforeunload", unloadCallback);
  }, []);

  const handleNewOrder = () => {
    navigate("/");
  };

  return (
    <OrderLayout>
      <div className="flex-[0.6] flex flex-col my-4 mx-4 py-2 ">
        <div className="w-[95%] mx-auto flex flex-col justify-between h-full">
          <div className="">
            <div className="flex flex-col items-center">
              <img
                className="h-[15rem] w-[20rem]"
                src="https://cdn.dribbble.com/users/1751799/screenshots/5512482/media/1cbd3594bb5e8d90924a105d4aae924c.gif"
                alt=""
              />
              <h1 className="text-center text-[24px] font-bold">
                {paymentStatus
                  ? "Product Purchased Successfully"
                  : "Creating Order..."}
              </h1>
              {paymentStatus && (
                <div className="space-x-4">
                  <Button
                    onClick={() => navigate(`/track-order/order/${orderId}`)}
                    className="mt-3"
                    type="primary">
                    Check Order Details
                  </Button>
                  <Button
                    onClick={() => navigate("/invoice")}
                    className="mt-3"
                    type="primary">
                    Print Invoice
                  </Button>
                  <Button
                    onClick={() => handleNewOrder()}
                    className="mt-3"
                    type="primary">
                    Place New Order
                  </Button>
                </div>
              )}
              {pointsEarned !== 0 && (
                <Button aria-disabled={true} className="mt-6 font-bold">
                  You Earned {pointsEarned} points
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Card />
    </OrderLayout>
  );
};

export default PaymentSuccess;