import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Home = () => {
  const operator = JSON.parse(sessionStorage.getItem("operator"));
  const navigate = useNavigate();
  console.log(operator);
  useEffect(() => {
    if (operator === null) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {operator !== null && (
        <div className="flex flex-col  overflow-y-hidden">
          <Header />
          <div className="flex items-center justify-center space-x-10 mt-[9rem]">
            <div
              onClick={() => navigate("/store")}
              className="bg-gray-100 w-[20rem] h-[20rem] flex items-center justify-center shadow-md rounded-md cursor-pointer  text-gray-400 hover:text-gray-600 text-[24px] font-bold">
              New Order
            </div>
            <div className="bg-gray-100 w-[20rem] h-[20rem] flex items-center justify-center shadow-md rounded-md cursor-pointer  text-gray-400 hover:text-gray-600 text-[24px] font-bold">
              Track Order
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
