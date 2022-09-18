import { Button, message } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import API from "../API";
import {
  basicDetailsState,
  orderSummaryState,
  paymentState,
} from "../atoms/orderModal";
import { summaryDetailsStatusState } from "../atoms/orderStatusModal";
import { progressState } from "../atoms/progressModal";
import Card from "./Card";
import OrderLayout from "./OrderLayout";
import uniqid from "uniqid";
const Payment = () => {
  const navigate = useNavigate();
  const orderSummary = useRecoilValue(orderSummaryState);
  const basicDetails = useRecoilValue(basicDetailsState);
  const orderSummaryStatus = useRecoilValue(summaryDetailsStatusState);
  const [progress, setProgress] = useRecoilState(progressState);
  const [paymentDetails, setPaymentDetails] = useRecoilState(paymentState);
  const checkoutOnline = async () => {
    const {
      data: { order },
    } = await API.post("/payment/checkout", {
      amount: orderSummary.TOTAL,
    });
    setPaymentDetails({
      ...paymentDetails,
      PAYMENT_TYPE: "Online",
      TOTAL: order.amount,
    });

    var options = {
      key: process.env.REACT_APP_RAZOR_PAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "MI",
      order_id: order.id,
      handler: async function (response) {
        try {
          await API.post("/payment/verification", { ...response });
          navigate(`/paymentsuccess?reference=${response.razorpay_payment_id}`);
        } catch (error) {
          message.error(
            "An Error Occured. Please Choose another payment method"
          );
        }
      },
      prefill: {
        name: basicDetails.NAME,
        email: basicDetails.EMAIL,
        contact: basicDetails.PHONE,
      },
      notes: {
        address: basicDetails.ADDRESS.fullAddress,
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);

    razor.open();
    console.log("RAZOR", razor);
  };

  const checkoutCash = () => {
    setPaymentDetails({
      ...paymentDetails,
      PAYMENT_TYPE: "Cash",
      TOTAL: orderSummary.TOTAL,
    });
    const paymentId = uniqid();
    navigate(`/paymentsuccess?reference=${paymentId}`);
  };

  useEffect(() => {
    if (!orderSummaryStatus) {
      navigate("/order-summary");
    }
    setProgress(16.66 * 5);
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
      <div className="flex-[0.6] flex flex-col my-4 mx-4 py-2 ">
        <div className="w-[95%] mx-auto flex flex-col justify-between h-full">
          <div className="">
            <div className="flex justify-between">
              <button
                onClick={() => navigate("/order-summary")}
                className="hover:underline
                 text-blue-600">
                Back
              </button>
              <h1 className="text-center text-[24px] font-bold ">Payment</h1>
              <button></button>
            </div>
            <div className="flex flex-col mt-[8rem] space-y-10">
              <h1 className="text-center text-[20px]">
                Pay ₹ {orderSummary.TOTAL} using
              </h1>
              <Button
                onClick={() => checkoutOnline()}
                type="primary"
                size="large">
                Online (Debit/Credit Card, UPI etc)
              </Button>
              <Button
                onClick={() => checkoutCash()}
                type="primary"
                size="large">
                Cash
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Card />
    </OrderLayout>
  );
};

export default Payment;
