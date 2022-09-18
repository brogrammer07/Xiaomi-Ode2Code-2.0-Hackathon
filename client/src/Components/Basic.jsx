import { CircularProgress } from "@mui/material";
import { Alert, Button, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import API from "../API";
import { basicDetailsState, productDetailsState } from "../atoms/orderModal";
import {
  basicDetailsStatusState,
  productDetailsStatusState,
  summaryDetailsStatusState,
} from "../atoms/orderStatusModal";
import { progressState } from "../atoms/progressModal";
import Card from "./Card";
import OrderLayout from "./OrderLayout";
import { BsPlusCircle } from "react-icons/bs";
const { Option } = Select;
const { TextArea } = Input;
const Basic = () => {
  const navigate = useNavigate();
  const [showAddressModal, setShowAddressModal] = useState(false);
  const operator = JSON.parse(sessionStorage.getItem("operator")).result;
  const [addresses, setAddresses] = useState([]);
  const [customerFound, setCustomerFound] = useState("");
  const [progress, setProgress] = useRecoilState(progressState);
  const [basicDetails, setBasicDetails] = useRecoilState(basicDetailsState);
  const productDetails = useRecoilValue(productDetailsState);
  const productDetailsStatus = useRecoilValue(productDetailsStatusState);
  const [dataChanged, setDataChanged] = useState(false);
  const summaryDetailsStatus = useRecoilValue(summaryDetailsStatusState);
  const [basicDetailsStatus, setBasicDetailsStatus] = useRecoilState(
    basicDetailsStatusState
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [dataPopulateLoading, setDataPopulateLoading] = useState(false);

  const handleChange = async (value, type, option) => {
    if (type === "phoneNumber") {
      setBasicDetails({
        ...basicDetails,
        PHONE: value,
        NAME: "",
        EMAIL: "",
        COC: "",
        ADDRESS: {},
      });
      setAddresses([]);
      setBasicDetailsStatus(false);
      if (value.length > 9) {
        try {
          const res = await API.post("/customer/getCustomerDetail", {
            phoneNumber: value,
          });
          setCustomerFound("Found");
          message.info("Customer Found");

          setDataPopulateLoading(true);
          setBasicDetails({
            ...basicDetails,
            PHONE: value,
            NAME: res.data.name,
            EMAIL: res.data.email,
            COC: res.data.coc,
            ADDRESS: res.data.addresses[0],
          });
          setAddresses(res.data.addresses);
          setDataPopulateLoading(false);
          setBasicDetailsStatus(true);
        } catch (error) {
          setCustomerFound("Not Found");
          message.info("Customer not found");
          setBasicDetails({
            ...basicDetails,
            PHONE: value,
            NAME: "",
            EMAIL: "",
            COC: "",
          });
          setAddresses([]);
        }
      } else {
        setCustomerFound("");
        setDataChanged(false);
      }
    } else if (type === "name") {
      setDataChanged(true);
      setBasicDetails({ ...basicDetails, NAME: value });
    } else if (type === "email") {
      setDataChanged(true);
      setBasicDetails({ ...basicDetails, EMAIL: value });
    } else if (type === "coc") {
      setDataChanged(true);
      setBasicDetails({ ...basicDetails, COC: value });
      if (productDetails.DELIVERY_MODE === "Pickup") {
        setBasicDetailsStatus(true);
      }
    } else if (type === "address") {
      setBasicDetails({
        ...basicDetails,
        ADDRESS: addresses.find((data) => data.fullAddress === option.value),
      });
      setBasicDetailsStatus(true);
    } else return;
  };

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setAddresses([...addresses, newAddress]);
    setBasicDetails({ ...basicDetails, ADDRESS: newAddress });
    setBasicDetailsStatus(true);
    setDataChanged(true);
    setTimeout(() => {
      setShowAddressModal(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const [newAddress, setNewAddress] = useState({
    fullAddress: "",
    town: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const updateCustomer = async () => {
    try {
      setIsUpdating(true);
      await API.post("/customer/update", {
        name: basicDetails.NAME,
        email: basicDetails.EMAIL,
        phoneNumber: basicDetails.PHONE,
        coc: basicDetails.COC,
        addresses,
      });
      setIsUpdating(false);
      setDataChanged(false);
      message.success("Customer Details Updated");
    } catch (error) {
      message.error("An Error Occured. Please try again later");
    }
  };

  const handleContinue = async () => {
    if (customerFound === "Not Found") {
      await API.post("/customer/create", {
        name: basicDetails.NAME,
        email: basicDetails.EMAIL,
        phoneNumber: basicDetails.PHONE,
        coc: basicDetails.COC,
        addresses,
      });
    }
    navigate("/order-summary");
  };

  useEffect(() => {
    if (!productDetailsStatus) {
      navigate("/product");
    }
    setProgress(16.66 * 3);
    setBasicDetails({ ...basicDetails, OPERATOR_ID: operator.MI_ID });
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
        <div className="w-[95%] mx-auto flex flex-col justify-between h-full overflow-y-auto pt-5 md:pt-0">
          <div className="">
            <div className="flex justify-between">
              <button
                onClick={() => navigate("/product")}
                className="hover:underline
                 text-blue-600">
                Back
              </button>
              <h1 className="text-center text-[24px] font-bold ">
                Basic Details
              </h1>
              <button
                disabled={!summaryDetailsStatus}
                onClick={() => navigate("/order-summary")}
                className={`hover:underline ${
                  summaryDetailsStatus ? "text-blue-600" : "text-gray-400"
                }`}>
                Next
              </button>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col space-y-2">
                <label htmlFor="operatorID">Operator ID</label>
                <Input
                  disabled={true}
                  id="operatorID"
                  placeholder="None"
                  value={operator.MI_ID}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Input
                  maxLength={10}
                  id="phoneNumber"
                  placeholder="Enter Phone Number"
                  value={basicDetails.PHONE}
                  onChange={(e) => handleChange(e.target.value, "phoneNumber")}
                />
              </div>
            </div>
            {customerFound !== "" && (
              <div className="mt-5 flex flex-col justify-center items-center space-x-4">
                <Alert
                  message={`Customer ${customerFound}`}
                  style={{ marginBottom: "20px" }}
                  type={`${customerFound === "Found" ? "success" : "error"}`}
                  showIcon
                />

                {customerFound === "Found" ? (
                  <>
                    {dataPopulateLoading && (
                      <>
                        <h2 className="text-[16px]">
                          Filling Data Automatically
                        </h2>
                        <div className="flex items-center justify-center">
                          <CircularProgress />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className="h-[0.2px] w-full  border-t-[0.5px] border-gray-300 border-dashed pt-[5px]"></div>
                    <h2 className="text-[18px] underline ">Register</h2>
                  </>
                )}
              </div>
            )}
            <div className="grid grid-cols-2 gap-10 mt-5">
              <div className="flex flex-col space-y-2">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  disabled={basicDetails.PHONE === ""}
                  placeholder="Enter Name"
                  value={basicDetails.NAME}
                  onChange={(e) => handleChange(e.target.value, "name")}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  disabled={
                    basicDetails.PHONE === "" || basicDetails.NAME === ""
                  }
                  placeholder="Enter Email"
                  value={basicDetails.EMAIL}
                  onChange={(e) => handleChange(e.target.value, "email")}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="coc">Choice of Communication</label>
                <Select
                  id="coc"
                  disabled={
                    basicDetails.EMAIL === "" ||
                    basicDetails.PHONE === "" ||
                    basicDetails.NAME === ""
                  }
                  showSearch
                  placeholder="Select Choice of Communication"
                  optionFilterProp="children"
                  value={basicDetails.COC || null}
                  onChange={(value) => handleChange(value, "coc")}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }>
                  <Option value={"Email"}>Emaill</Option>
                </Select>
              </div>
              {productDetails.DELIVERY_MODE !== "Pickup" &&
                productDetails.DELIVERY_MODE !== "" && (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center gap-3 md:gap-0">
                      <label htmlFor="coc">Address</label>
                      <div className="cursor-pointer hover:text-blue-600 duration-200 transition-all md:hidden flex">
                        <BsPlusCircle
                          onClick={() => setShowAddressModal(true)}
                          size={20}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Select
                        id="address"
                        style={{ width: "100%" }}
                        disabled={
                          basicDetails.PHONE === "" || basicDetails.COC === ""
                        }
                        showSearch
                        placeholder="Select an Address"
                        optionFilterProp="children"
                        value={basicDetails.ADDRESS?.fullAddress}
                        onChange={(value, option) =>
                          handleChange(value, "address", option)
                        }
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }>
                        {addresses?.map((address) => (
                          <Option key={address._id} value={address.fullAddress}>
                            {address.fullAddress}
                          </Option>
                        ))}
                      </Select>
                      <div className="cursor-pointer hover:text-blue-600 duration-200 transition-all hidden md:flex">
                        <BsPlusCircle
                          onClick={() => setShowAddressModal(true)}
                          size={20}
                        />
                      </div>
                    </div>
                  </div>
                )}
              <Modal
                title="Add Address"
                open={showAddressModal}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={() => setShowAddressModal(false)}>
                <div className="">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="fullAddress">Full Address</label>
                    <TextArea
                      rows={2}
                      id="fullAddress"
                      placeholder="Full Address"
                      value={newAddress.fullAddress}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          fullAddress: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-10 mt-10">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="town">Town</label>
                      <Input
                        id="town"
                        placeholder="Town"
                        value={newAddress.town}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            town: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="city">City</label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="state">State</label>
                      <Input
                        id="state"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            state: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="pinCode">Pincode</label>
                      <Input
                        id="pinCode"
                        placeholder="Pincode"
                        value={newAddress.pinCode}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            pinCode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
            {customerFound === "Found" && dataChanged && (
              <div className="mt-10 text-center">
                <Button onClick={() => updateCustomer()} type="primary">
                  {isUpdating ? "Updating" : "Update"}
                </Button>
              </div>
            )}
          </div>
          <Button
            disabled={
              (dataChanged && customerFound === "Found") ||
              basicDetails.PHONE === "" ||
              basicDetails.NAME === "" ||
              basicDetails.COC === "" ||
              (productDetails.DELIVERY_MODE !== "Pickup" &&
                basicDetails.ADDRESS?.fullAddress)
            }
            onClick={() => handleContinue()}
            type="primary"
            size="large">
            View Order Summary
          </Button>
        </div>
      </div>
      <Card />
    </OrderLayout>
  );
};

export default Basic;
