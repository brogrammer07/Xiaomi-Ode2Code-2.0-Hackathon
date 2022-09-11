import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { message } from "antd";
import API from "../API";
import CircularProgress from "@mui/material/CircularProgress";
const Login = () => {
  const navigate = useNavigate();
  const [isOperator, setIsOperator] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    MI_ID: "MIOP742210",
    Password: "12345",
  });

  // Asynchronouse Local Storage Left
  const logIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await API.post("/login", loginCredentials);
      sessionStorage.setItem("operator", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen space-x-10">
      {!isOperator ? (
        <>
          <div
            onClick={() => setIsOperator(true)}
            className="w-[20rem] h-[20rem] flex items-center text-gray-400 cursor-pointer hover:text-gray-800 duration-200 transition-all justify-center shadow-xl backdrop-blur-lg bg-gray-100 border-[1px] border-gray-200 rounded-md font-bold text-[25px]">
            Operator Login
          </div>
          <div
            onClick={() => navigate("/")}
            className="w-[20rem] h-[20rem] flex items-center text-gray-400 cursor-pointer hover:text-gray-800 duration-200 transition-all justify-center shadow-xl backdrop-blur-lg bg-gray-100 border-[1px] border-gray-200 rounded-md font-bold text-[25px] ">
            Self Checkout
          </div>
        </>
      ) : (
        <div className="">
          <div className="w-[20rem] flex flex-col space-y-6 items-center text-gray-800  shadow-xl backdrop-blur-lg bg-gray-100 border-[1px] border-gray-200 rounded-md py-5">
            <h1 className="font-extrabold text-[25px] ">Operator Login</h1>
            <form onSubmit={logIn} className="space-y-5">
              <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="operator_id">
                  MI ID
                </label>
                <input
                  required
                  className="px-2 py-1 outline-none border-[1px] border-gray-300 focus:border-blue-400 transition-all duration-200"
                  id="operator_id"
                  type="text"
                  value={loginCredentials.MI_ID}
                  onChange={(e) =>
                    setLoginCredentials({
                      ...loginCredentials,
                      MI_ID: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="password">
                  Password
                </label>
                <div className="border-[1px] border-gray-300 bg-white px-2 py-1 flex items-center space-x-2 focus:border-blue-400 transition-all duration-200">
                  <input
                    required
                    className="outline-none  "
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={loginCredentials.Password}
                    onChange={(e) =>
                      setLoginCredentials({
                        ...loginCredentials,
                        Password: e.target.value,
                      })
                    }
                  />
                  {!showPassword ? (
                    <EyeOutlined
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <EyeInvisibleOutlined
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>
              <button
                className="flex font-bold bg-blue-700 text-white w-full justify-center py-2 rounded-md hover:bg-blue-800 duration-200 transition-all"
                type="submit">
                {loading ? "Logging In" : "Login"}
              </button>
              {loading && (
                <div className="flex items-center justify-center">
                  <CircularProgress />
                </div>
              )}
              <p
                onClick={() => setIsOperator(false)}
                className="underline text-blue-700 cursor-pointer text-center">
                Go back
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
