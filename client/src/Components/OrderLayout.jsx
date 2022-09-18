import React from "react";
import { useRecoilValue } from "recoil";
import { progressState } from "../atoms/progressModal";
import ProgressBar from "../Utils/ProgressBar";
import Header from "./Header";

const OrderLayout = ({ children }) => {
  const progress = useRecoilValue(progressState);
  return (
    <div className="sm:overflow-y-hidden flex flex-col h-screen relative ">
      <Header />
      <ProgressBar size={progress} />
      <div className="flex sm:overflow-y-hidden h-full ">{children}</div>
    </div>
  );
};

export default OrderLayout;
