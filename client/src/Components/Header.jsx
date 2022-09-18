import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
const isNotActiveStyle = "cursor-pointer hover:underline text-black";
const isActiveStyle = "cursor-pointer hover:underline font-bold text-black";
const Header = () => {
  const navigate = useNavigate();
  const operator = JSON.parse(sessionStorage.getItem("operator")).result;
  // useResetRecoilStates();
  const location = useLocation();
  const logOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex items-center px-14 py-5 bg-[#f4f4f4] justify-between ">
      <div className="flex space-x-[5rem]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }>
          Home
        </NavLink>
        <button
          onClick={logOut}
          className="cursor-pointer hover:underline text-black">
          Log Out
        </button>
      </div>
      <div className="flex flex-col">
        <h3>
          <span className="font-bold">Operator ID:</span>{" "}
          {operator && operator.MI_ID}
        </h3>
        <h3>
          <span className="font-bold">Operator Name:</span>{" "}
          {operator && operator.operator_name}
        </h3>
      </div>
    </div>
  );
};

export default Header;
