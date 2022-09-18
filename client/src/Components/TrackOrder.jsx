import { Input, Menu, Table } from "antd";
import React, { useEffect, useState } from "react";
import OrderLayout from "./OrderLayout";
import { SettingOutlined } from "@ant-design/icons";
import API from "../API";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const TrackOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [filter, setFilter] = useState(false);
  const [filterOption, setFilterOption] = useState("0");
  const items = [
    getItem("Filter by", "filter", <SettingOutlined hidden />, [
      getItem("Customer", "1"),
      getItem("Product SN", "2"),
    ]),
  ];
  const onClick = (e) => {
    console.log(e);
    setFilterOption(e.key);
  };

  useEffect(() => {
    const getOrders = async () => {
      try {
        console.log("yes");
        const { data } = await API.get("/order/getall");
        console.log(data);
        data.forEach((order, i) => {
          setOrders((prevOrders) => [
            ...prevOrders,
            {
              key: i,
              orderId: order.orderId,
              productSN: order.productSN,
              customerName: order.customer.name,
              customerPhone: order.customer.phoneNumber,
              customerEmail: order.customer.email,
              total: order.total,
              payment: order.paymentMode,
            },
          ]);
          setAllOrders((prevOrders) => [
            ...prevOrders,
            {
              key: i,
              orderId: order.orderId,
              productSN: order.productSN,
              customerName: order.customer.name,
              customerPhone: order.customer.phoneNumber,
              customerEmail: order.customer.email,
              total: order.total,
              payment: order.paymentMode,
            },
          ]);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);
  console.log(orders);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Product SN",
      dataIndex: "productSN",
      key: "productSN",
    },
    {
      title: "Customer's Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Customer's Phone",
      dataIndex: "customerPhone",
      key: "customerPhone",
    },
    {
      title: "Customer's Email",
      dataIndex: "customerEmail",
      key: "customerEmail",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
    },
  ];

  const handleFilter = (value, type) => {
    if (type === "SN") {
      let result = [];
      result = allOrders.filter((data) => {
        return data.productSN.search(value) !== -1;
      });
      setOrders(result);
    } else if (type === "phoneNumber") {
      let result = [];

      result = allOrders.filter((data) => {
        return data.customerPhone.toString().search(value) !== -1;
      });
      setOrders(result);
    }
  };

  return (
    <OrderLayout>
      <div className="flex flex-col w-[95%] mx-auto mt-[2rem] ">
        <h1 className="justify-self-center text-center font-bold text-[24px]">
          Track Order
        </h1>
        <div className="w-[90%] mx-auto border-[1px] border-gray-300 h-[30rem] rounded-md py-7 px-8 overflow-y-auto">
          <h2 className="font-bold text-[20px]">Order History</h2>
          <div className="flex items-center">
            <span
              onClick={() => {
                setFilter(true);
                setOrders(allOrders);
              }}
              className="cursor-pointer">
              All Order
            </span>
            <Menu
              onClick={onClick}
              style={{
                border: "none",
                width: 120,
              }}
              mode="vertical"
              items={items}
            />
            {filterOption === "1" && (
              <Input
                size="small"
                onChange={(e) => handleFilter(e.target.value, "phoneNumber")}
                placeholder="Enter Customer's Phone Number"
                style={{ width: "230px" }}
              />
            )}
            {filterOption === "2" && (
              <Input
                size="small"
                onChange={(e) => handleFilter(e.target.value, "SN")}
                placeholder="Enter Product SN"
                style={{ width: "230px" }}
              />
            )}
          </div>

          <div className="overflow-x-auto">
            <Table
              pagination={{ pageSize: 4 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: () =>
                    navigate(`/track-order/order/${record.orderId}`),
                };
              }}
              columns={columns}
              dataSource={orders}
            />
          </div>
        </div>
      </div>
    </OrderLayout>
  );
};

export default TrackOrder;
