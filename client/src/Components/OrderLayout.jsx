import React from "react";
import { useRecoilValue } from "recoil";
import { progressState } from "../atoms/progressModal";
import ProgressBar from "../Utils/ProgressBar";
import Header from "./Header";

const OrderLayout = ({ children }) => {
  const progress = useRecoilValue(progressState);
  return (
    <div>
      <Header />
      <ProgressBar size={progress} />
      <div className="flex">{children}</div>
    </div>
  );
};

export default OrderLayout;
