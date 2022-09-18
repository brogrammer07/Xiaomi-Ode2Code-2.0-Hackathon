import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
const isNotActiveStyle =
  "cursor-pointer hover:underline text-white text-[16px] border-b-2 pb-2 sm:border-none sm:pb-0";
const isActiveStyle =
  "cursor-pointer hover:underline font-bold text-white text-[16px] border-b-2 pb-2 sm:border-none sm:pb-0";
const Header = () => {
  const navigate = useNavigate();
  const [sidebarShow, setSidebarShow] = useState(false);
  const operator = JSON.parse(sessionStorage.getItem("operator")).result;
  const location = useLocation();
  const logOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div
        className={`absolute h-full w-[10rem] bg-black opacity-90 z-[100] flex flex-col py-3 px-3 transition-all duration-150 ${
          sidebarShow ? "translate-x-[0rem]" : "-translate-x-[10rem]"
        }`}>
        <div
          onClick={() => setSidebarShow(false)}
          className="flex justify-end cursor-pointer">
          <AiOutlineClose size={20} color="white" />
        </div>
        <div className="flex flex-col justify-center space-y-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            Home
          </NavLink>
          <div
            onClick={() => logOut}
            className="cursor-pointer hover:underline text-white text-[16px] border-b-2 pb-2">
            Log Out
          </div>
          <h3 className="text-white text-[16px] font-normal  border-b-2 pb-2">
            <span className="text-[#4595CF] font-bold">Operator ID:</span>{" "}
            {operator && operator.MI_ID}
          </h3>
          <h3 className="text-white text-[16px] font-normal  border-b-2 pb-2">
            <span className="text-[#4595CF] font-bold">Operator Name:</span>{" "}
            {operator && operator.operator_name}
          </h3>
        </div>
      </div>

      <div className="flex items-center sm:px-14 px-4 py-5 bg-[#2f2f2f] justify-between">
        <div
          onClick={() => setSidebarShow(true)}
          className={`sm:hidden cursor-pointer ${sidebarShow && "opacity-0"}`}>
          <AiOutlineMenu size={20} color="#ffffff" />
        </div>

        <div className="sm:flex-row sm:flex flex-col hidden gap-2 sm:gap-[5rem]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
            Home
          </NavLink>
          <button
            onClick={logOut}
            className="cursor-pointer hover:underline text-white text-[16px]">
            Log Out
          </button>
        </div>
        <div className="sm:flex hidden flex-col">
          <h3 className="text-white text-[16px] font-normal">
            <span className="text-[#4595CF] font-bold">Operator ID:</span>{" "}
            {operator && operator.MI_ID}
          </h3>
          <h3 className="text-white text-[16px] font-normal">
            <span className="text-[#4595CF] font-bold">Operator Name:</span>{" "}
            {operator && operator.operator_name}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Header;
