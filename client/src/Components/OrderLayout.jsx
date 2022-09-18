import React from "react";
import { useRecoilValue } from "recoil";
import { progressState } from "../atoms/progressModal";
import ProgressBar from "../Utils/ProgressBar";
import Header from "./Header";

const OrderLayout = ({ children }) => {
  const progress = useRecoilValue(progressState);
  return (
    <div className="overflow-y-hidden">
      <Header />
      <ProgressBar size={progress} />
      <div className="flex overflow-y-hidden">{children}</div>
    </div>
  );
};

export default OrderLayout;
