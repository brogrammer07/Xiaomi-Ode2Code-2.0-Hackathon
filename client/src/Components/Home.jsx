import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useResetRecoilStates } from "../Utils/UseResetRecoilStates";
import { PlusCircleOutlined, HistoryOutlined } from "@ant-design/icons";
import Header from "./Header";

const Home = () => {
  const operator = JSON.parse(sessionStorage.getItem("operator"));
  const navigate = useNavigate();
  useResetRecoilStates();

  useEffect(() => {
    if (operator === null) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {operator !== null && (
        <div className="flex flex-col  overflow-y-hidden h-screen">
          <Header />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 py-[5rem] sm:py-0 sm:mt-0 overflow-y-auto h-full">
            <div
              onClick={() => navigate("/store")}
              className="w-[20rem] h-[20rem] flex flex-col items-center text-gray-400 cursor-pointer hover:text-gray-800 duration-200 transition-all  space-y-8 shadow-xl backdrop-blur-lg bg-gray-100 border-[1px] border-gray-200 rounded-md font-bold hover:border-[1px] hover:border-gray-400 ">
              <PlusCircleOutlined className="text-[35px] mt-[2.7rem] sm:mt-[5.3rem]" />
              <span className="text-[25px]">New Order</span>
            </div>
            <div
              onClick={() => navigate("/track-order")}
              className="w-[20rem] h-[20rem] flex flex-col items-center text-gray-400 cursor-pointer hover:text-gray-800 duration-200 transition-all  space-y-8 shadow-xl backdrop-blur-lg bg-gray-100 border-[1px] border-gray-200 rounded-md font-bold hover:border-[1px] hover:border-gray-400 ">
              <HistoryOutlined className="text-[35px] mt-[2.7rem] sm:mt-[5.3rem]" />
              <span className="text-[25px]">Track Order</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
