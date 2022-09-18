import { Button, message } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
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
        color: "#4595CF",
      },
    };
    const razor = new window.Razorpay(options);

    razor.open();
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
      <div className="flex-1 md:flex-[0.6] flex flex-col my-4 mx-4  ">
        <div className="w-[95%] mx-auto flex flex-col justify-between h-full overflow-y-auto pt-5 md:pt-0">
          <div className="">
            <div className="flex justify-between">
              <button
                onClick={() => navigate("/order-summary")}
                className="hover:underline
                 text-blue-600">
                Back
              </button>
              <h1 className="text-center text-[24px] font-bold ">Payment</h1>
              <div className="opacity-0">Next</div>
            </div>
            <div className="flex items-center justify-center mt-[4rem]">
              <HiOutlineCurrencyRupee color="#30aa3c" size={60} />
            </div>
            <div className="flex flex-col mt-[2rem] space-y-10 items-center">
              <h1 className="text-center text-[20px]">
                Pay ₹ {orderSummary.TOTAL} using
              </h1>
              <div className="lg:w-[50%] w-full flex justify-center">
                <Button
                  onClick={() => checkoutOnline()}
                  style={{
                    width: "90%",
                    height: "3rem",
                    borderRadius: "10px",
                  }}
                  type="primary"
                  size="large">
                  Online (Debit/Credit Card, UPI etc)
                </Button>
              </div>
              <div className="lg:w-[50%] w-full flex justify-center">
                <Button
                  onClick={() => checkoutCash()}
                  style={{
                    width: "90%",
                    height: "3rem",
                    borderRadius: "10px",
                  }}
                  type="primary"
                  size="large">
                  Cash
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card />
    </OrderLayout>
  );
};

export default Payment;
