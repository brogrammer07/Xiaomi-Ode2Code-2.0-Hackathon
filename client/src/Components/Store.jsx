import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { storeDetailsState } from "../atoms/orderModal";
import { storeSchema } from "../Utils/OrderSchema";
import {
  productDetailsStatusState,
  storeDetailsStatusState,
} from "../atoms/orderStatusModal";
import { useNavigate } from "react-router-dom";
import OrderLayout from "./OrderLayout";
import Card from "./Card";
import { progressState } from "../atoms/progressModal";
const { Option } = Select;
const Store = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useRecoilState(progressState);
  const [storeDetailsStatus, setStoreDetailsStatus] = useRecoilState(
    storeDetailsStatusState
  );
  const [storeDetails, setStoreDetails] = useRecoilState(storeDetailsState);
  const [storeNames, setStoreNames] = useState([]);
  const productDetailsStatus = useRecoilValue(productDetailsStatusState);
  useEffect(() => {
    setProgress(16.66);
  }, []);
  const handleChange = (value, type) => {
    if (type === "storeType") {
      setStoreDetailsStatus(false);
      setStoreDetails({
        ...storeDetails,
        STORE_TYPE: value,
        STORE_NAME: "",
        POS_ID: "",
      });
      setStoreNames(
        storeSchema.storeTypes.find((data) => data.title === value).storeNames
      );
    } else if (type === "storeName") {
      setStoreDetails({
        ...storeDetails,
        STORE_NAME: value,
        POS_ID: storeNames.find((data) => data.title === value).POS_ID,
      });
      setStoreDetailsStatus(true);
    } else {
      return;
    }
  };
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
              <button disabled={true}></button>
              <h1 className="text-center text-[24px] font-bold ">
                Store Details
              </h1>
              <button
                disabled={!productDetailsStatus}
                onClick={() => navigate("/product")}
                className={`hover:underline ${
                  productDetailsStatus ? "text-blue-600" : "text-gray-400"
                }`}>
                Next
              </button>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col space-y-2">
                <label htmlFor="storeType">Store Type</label>
                <Select
                  id="storeType"
                  showSearch
                  placeholder="Select a store type"
                  optionFilterProp="children"
                  value={storeDetails.STORE_TYPE || null}
                  onChange={(value) => handleChange(value, "storeType")}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }>
                  {storeSchema.storeTypes.map((data) => (
                    <Option key={data.title} value={data.title}>
                      {data.title}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="storeName">Store Name</label>
                <Select
                  id="storeName"
                  disabled={storeDetails.STORE_TYPE === ""}
                  showSearch
                  placeholder="Select a store name"
                  optionFilterProp="children"
                  value={storeDetails.STORE_NAME || null}
                  onChange={(value) => handleChange(value, "storeName")}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }>
                  {storeNames.map((data) => (
                    <Option key={data.title} value={data.title}>
                      {data.title}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="posID">POS ID</label>
                <Input
                  disabled={storeDetails.STORE_NAME === ""}
                  id="posID"
                  placeholder="None"
                  onChange={(e) => handleChange(e.target.value, "posID")}
                  value={storeDetails.POS_ID}
                />
              </div>
            </div>
          </div>
          <Button
            disabled={storeDetails.POS_ID === ""}
            onClick={() => navigate("/product")}
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

export default Store;
