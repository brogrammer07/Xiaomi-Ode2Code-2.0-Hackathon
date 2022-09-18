import { Tag } from "antd";
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
          <div className="px-[2rem] md:px-[10rem] items-center mt-[5rem] flex flex-col space-y-10 overflow-y-scroll h-[35rem] pb-[3rem]">
            <div className="flex xl:flex-row flex-col gap-[10rem]">
              <img
                className="w-[18rem] h-[30rem] object-cover self-center"
                src={productData.product.imageUrl}
                alt=""
              />
              <div className="flex flex-col space-y-3">
                <h1 className="text-[25px] font-bold">
                  {productData.product.title}
                </h1>
                <div className="flex flex-col  border-b-2 pb-[1rem]">
                  <h2 className="opacity-[60%]">Product Specifications</h2>
                  <div className="flex flex-wrap  gap-5">
                    <div className="">
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                        color="#108ee9">
                        Category
                      </Tag>
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          marginLeft: "-0.5rem",
                        }}
                        color="blue">
                        {productData.category.title}
                      </Tag>
                    </div>
                    <div className="">
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                        color="#108ee9">
                        Colour
                      </Tag>
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          marginLeft: "-0.5rem",
                        }}
                        color="blue">
                        {productData.colour.title}
                      </Tag>
                    </div>
                    <div className="">
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                        color="#108ee9">
                        Size
                      </Tag>
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          marginLeft: "-0.5rem",
                        }}
                        color="blue">
                        {productData.size.title}
                      </Tag>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  border-b-2 pb-[1rem]">
                  <h2 className="opacity-[60%]">Customer</h2>
                  <div className="flex gap-5 flex-wrap">
                    <div className="">
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                        color="#108ee9">
                        Name
                      </Tag>
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          marginLeft: "-0.5rem",
                        }}
                        color="blue">
                        {orderData.customer.name}
                      </Tag>
                    </div>
                    <div className=" flex-wrap">
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                        color="#108ee9">
                        Phone No:
                      </Tag>
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          marginLeft: "-0.5rem",
                        }}
                        color="blue">
                        {orderData.customer.phoneNumber}
                      </Tag>
                    </div>
                    <div className="">
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                        color="#108ee9">
                        Email:
                      </Tag>
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          marginLeft: "-0.5rem",
                        }}
                        color="blue">
                        {orderData.customer.email}
                      </Tag>
                    </div>
                  </div>
                </div>
                {orderData?.address?._id && (
                  <>
                    <div className="flex flex-col  border-b-2 pb-[1rem]">
                      <h2 className="opacity-[60%]">Delivery Address</h2>
                      <div className="flex gap-5 flex-wrap">
                        <div className="">
                          <Tag
                            style={{
                              padding: "10px 15px",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                            color="#108ee9">
                            Full Address:
                          </Tag>
                          <Tag
                            style={{
                              padding: "10px 15px",
                              fontSize: "14px",
                              marginLeft: "-0.5rem",
                            }}
                            color="blue">
                            {orderData.address.fullAddress}
                          </Tag>
                        </div>
                        <div className=" flex-wrap">
                          <Tag
                            style={{
                              padding: "10px 15px",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                            color="#108ee9">
                            Town:
                          </Tag>
                          <Tag
                            style={{
                              padding: "10px 15px",
                              fontSize: "14px",
                              marginLeft: "-0.5rem",
                            }}
                            color="blue">
                            {orderData.address.town}
                          </Tag>
                        </div>
                        <div className="">
                          <Tag
                            style={{
                              padding: "10px 15px",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                            color="#108ee9">
                            City:
                          </Tag>
                          <Tag
                            style={{
                              padding: "10px 15px",
                              fontSize: "14px",
                              marginLeft: "-0.5rem",
                            }}
                            color="blue">
                            {orderData.address.city}
                          </Tag>
                        </div>
                        <div className="">
                          <Tag
                            style={{
                              padding: "10px 15px",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                            color="#108ee9">
                            State:
                          </Tag>
                          <Tag
                            style={{
                              padding: "10px 15px",
                              fontSize: "14px",
                              marginLeft: "-0.5rem",
                            }}
                            color="blue">
                            {orderData.address.state}
                          </Tag>
                        </div>
                        <div className="">
                          <Tag
                            style={{
                              padding: "10px 15px",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                            color="#108ee9">
                            PinCode:
                          </Tag>
                          <Tag
                            style={{
                              padding: "10px 15px",
                              fontSize: "14px",
                              marginLeft: "-0.5rem",
                            }}
                            color="blue">
                            {orderData.address.pinCode}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="flex flex-col  border-b-2 pb-[1rem]">
                  <h2 className="opacity-[60%]">Addition Information</h2>
                  <div className="flex gap-5">
                    <div className="">
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                        color="#108ee9">
                        Delivery Mode:
                      </Tag>
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          marginLeft: "-0.5rem",
                        }}
                        color="blue">
                        {orderData.deliveryMode}
                      </Tag>
                    </div>
                    <div className="">
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                        color="#108ee9">
                        Payment Mode:
                      </Tag>
                      <Tag
                        style={{
                          padding: "10px 15px",
                          fontSize: "14px",
                          marginLeft: "-0.5rem",
                        }}
                        color="blue">
                        {orderData.paymentMode}
                      </Tag>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <h1 className="text-center text-[20px] underline mb-6 font-bold">
                Order Details
              </h1>
              <div className="">
                <div className="flex justify-between bg-gray-100 items-center px-5 py-2  text-[16px] border-[1px] border-gray-300">
                  <h3 className=" text-[16px]">Product:</h3>
                  <span>₹ {orderData.productPrice}</span>
                </div>
                <div className="flex justify-between bg-gray-100 items-center px-5 py-2 text-[16px] border-[1px] border-gray-300">
                  <h3 className="text-[16px]">Quantity:</h3>
                  <span>{orderData?.QUANTITY}2</span>
                </div>
                <div className="flex justify-between bg-gray-100 items-center px-5 py-2  text-[16px] border-[1px] border-gray-300">
                  <h3 className=" text-[16px]">CGST (9%):</h3>
                  <span>₹ {orderData.cgst}</span>
                </div>
                <div className="flex justify-between bg-gray-100 items-center px-5 py-2  text-[16px] border-[1px] border-gray-300">
                  <h3 className=" text-[16px]">SGST (9%):</h3>
                  <span>₹ {orderData.sgst}</span>
                </div>
                <div className="flex justify-between bg-gray-100 items-center px-5 py-2  text-[16px] border-[1px] border-gray-300">
                  <h3 className=" text-[16px]">Coupon:</h3>

                  <span>{orderData?.coupon?.coupon}</span>
                </div>
                <div className="flex justify-between bg-gray-100 items-center px-5 py-2  text-[16px] border-[1px] border-gray-300">
                  <h3 className="text-[16px]">Points:</h3>

                  <span>{orderData?.points}</span>
                </div>
                <div className="flex justify-between bg-gray-500 items-center px-5 py-2  text-white text-[16px]">
                  <h3 className=" text-white text-[16px]">Total:</h3>
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
