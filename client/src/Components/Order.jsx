import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../API";
import OrderLayout from "./OrderLayout";

const Order = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    if (orderId) {
      const getOrder = async () => {
        try {
          const { data } = await API.post("/order/get", { orderId });
          console.log(data);
          setOrderData(data.orderData);
          setProductData(data.productData);
        } catch (error) {
          console.log(error);
        }
      };
      getOrder();
    }
  }, []);
  console.log(orderData);
  return (
    <>
      {productData && orderData && (
        <OrderLayout>
          <div className=" px-[10rem] items-center mt-[5rem] flex flex-col space-y-10 overflow-y-scroll h-[35rem] pb-[3rem]">
            <div className="flex space-x-[10rem]">
              <img
                className="w-[18rem] h-[20rem] object-contain"
                src={productData.product.imageUrl}
                alt=""
              />
              <div className="flex flex-col space-y-3">
                <h1 className="text-[25px] font-bold">
                  {productData.product.title}
                </h1>
                <div className="flex flex-col  border-b-2">
                  <h2 className="opacity-[40%]">Product Specifications</h2>
                  <div className="flex gap-5">
                    <div className="flex gap-2">
                      <h3 className="font-bold ">Category:</h3>
                      <span>{productData.category.title}</span>
                    </div>
                    <div className="flex gap-2">
                      <h3 className="font-bold ">Colour:</h3>
                      <span>{productData.colour.title}</span>
                    </div>
                    <div className="flex gap-2">
                      <h3 className="font-bold ">Size:</h3>
                      <span>{productData.size.title}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  border-b-2">
                  <h2 className="opacity-[40%]">Customer</h2>
                  <div className="flex gap-5 flex-wrap">
                    <div className="flex gap-2">
                      <h3 className="font-bold ">Customer's Name:</h3>
                      <span>{orderData.customer.name}</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <h3 className="font-bold ">Customer's Phone Number:</h3>
                      <span>{orderData.customer.phoneNumber}</span>
                    </div>
                    <div className="flex gap-2">
                      <h3 className="font-bold ">Customer's Email:</h3>
                      <span>{orderData.customer.email}</span>
                    </div>
                  </div>
                </div>
                {orderData?.address?._id && (
                  <>
                    <div className="flex flex-col  border-b-2">
                      <h2 className="opacity-[40%]">Delivery Address</h2>
                      <div className="flex gap-5 flex-wrap">
                        <div className="flex gap-2">
                          <h3 className="font-bold ">Full Address:</h3>
                          <span>{orderData.address.fullAddress}</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <h3 className="font-bold ">Town:</h3>
                          <span>{orderData.address.town}</span>
                        </div>
                        <div className="flex gap-2">
                          <h3 className="font-bold ">City:</h3>
                          <span>{orderData.address.city}</span>
                        </div>
                        <div className="flex gap-2">
                          <h3 className="font-bold ">State:</h3>
                          <span>{orderData.address.state}</span>
                        </div>
                        <div className="flex gap-2">
                          <h3 className="font-bold ">PinCode:</h3>
                          <span>{orderData.address.pinCode}</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex flex-col  border-b-2">
                  <h2 className="opacity-[40%]">Addition Information</h2>
                  <div className="flex gap-5">
                    <div className="flex gap-2">
                      <h3 className="font-bold ">Delivery Mode:</h3>
                      <span>{orderData.deliveryMode}</span>
                    </div>
                    <div className="flex gap-2">
                      <h3 className="font-bold ">Payment Mode:</h3>
                      <span>{orderData.paymentMode}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <h1 className="text-center text-[19px] font-bold">
                Order Details
              </h1>
              <div className="">
                <div className="flex justify-between">
                  <h3>Product:</h3>
                  <span>₹ {orderData.productPrice}</span>
                </div>
                <div className="flex justify-between">
                  <h3>Quantity:</h3>
                  <span>{orderData?.QUANTITY}2</span>
                </div>
                <div className="flex justify-between">
                  <h3>CGST (9%):</h3>
                  <span>₹ {orderData.cgst}</span>
                </div>
                <div className="flex justify-between">
                  <h3>SGST (9%):</h3>
                  <span>₹ {orderData.sgst}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <label htmlFor="coupon">
                      <h3>Coupon:</h3>
                    </label>
                  </div>
                  <span>{orderData?.coupon?.coupon}</span>
                </div>
                <div className="flex justify-between">
                  <div className="flex space-x-2">
                    <h3>Points:</h3>
                  </div>
                  <span>{orderData?.points}</span>
                </div>
                <div className="flex justify-between">
                  <h3>Total:</h3>
                  <span className="font-semibold">₹ {orderData.total}</span>
                </div>
              </div>
            </div>
          </div>
        </OrderLayout>
      )}
    </>
  );
};

export default Order;
