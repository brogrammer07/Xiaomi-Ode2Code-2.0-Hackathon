import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Input, message } from "antd";
import API from "../API";
import CircularProgress from "@mui/material/CircularProgress";
const Login = () => {
  const navigate = useNavigate();
  const [isOperator, setIsOperator] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    MI_ID: "MIOP742210",
    Password: "12345",
    type: "operator",
  });

  // Asynchronouse Local Storage Left
  const logIn = async () => {
    try {
      setLoading(true);
      const res = await API.post("/login", loginCredentials);
      sessionStorage.setItem("operator", JSON.stringify(res.data));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.message);
    }
  };

  const selfCheckout = async () => {
    try {
      setLoading(true);
      const res = await API.post("/login", { type: "selfCheckout" });
      sessionStorage.setItem("operator", JSON.stringify(res.data));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center h-screen gap-10 py-[4rem] bg-gradient-to-t from-slate-100 to-blue-100">
      {!isOperator ? (
        <>
          <div
            onClick={() => setIsOperator(true)}
            className="w-[20rem] h-[20rem] flex flex-col items-center text-gray-400 cursor-pointer hover:text-gray-800 duration-200 transition-all  space-y-8 shadow-xl backdrop-blur-lg bg-white border-[1px] border-gray-200 rounded-2xl font-bold hover:border-[1px] hover:border-gray-400 ">
            <UserOutlined className="text-[35px] mt-[5.3rem]" />
            <span className="text-[25px]">Operator Login</span>
          </div>
          <div
            onClick={() => selfCheckout()}
            className="w-[20rem] h-[20rem] flex flex-col items-center text-gray-400 cursor-pointer hover:text-gray-800 duration-200 transition-all  space-y-8 shadow-xl backdrop-blur-lg bg-white border-[1px] border-gray-200 rounded-2xl font-bold hover:border-[1px] hover:border-gray-400 ">
            <ShoppingCartOutlined className="text-[35px] mt-[5.3rem]" />
            <span className="text-[25px]">Self Checkout</span>
            {loading && (
              <div className="flex items-center justify-center">
                <CircularProgress />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="">
          <div className="w-[20rem] flex flex-col space-y-6 items-center text-gray-800  shadow-xl backdrop-blur-lg bg-white border-[1px] border-gray-200 rounded-md py-5 rounded-2xl">
            <h1 className="font-bold text-[25px] ">Operator Login</h1>
            <form className="space-y-5">
              <div className="flex flex-col space-y-2">
                <label className="font-semibold" htmlFor="operator_id">
                  MI ID
                </label>
                <Input
                  required
                  size="large"
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

                <Input.Password
                  required
                  size="large"
                  placeholder="Enter Password"
                  id="password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  value={loginCredentials.Password}
                  onChange={(e) =>
                    setLoginCredentials({
                      ...loginCredentials,
                      Password: e.target.value,
                    })
                  }
                />
              </div>
              <Button
                disabled={
                  loginCredentials.MI_ID === "" ||
                  loginCredentials.Password === ""
                }
                onClick={() => logIn()}
                size="large"
                style={{ width: "100%" }}
                type="primary">
                {loading ? "Logging In" : "Login"}
              </Button>
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
