import React from "react";
import { useRecoilValue } from "recoil";
import {
  basicDetailsState,
  orderSummaryState,
  productDetailsState,
  storeDetailsState,
} from "../atoms/orderModal";
import {
  basicDetailsStatusState,
  productDetailsStatusState,
  storeDetailsStatusState,
  summaryDetailsStatusState,
} from "../atoms/orderStatusModal";
import CardFields from "./CardFields";
const Card = () => {
  const storeDetails = useRecoilValue(storeDetailsState);
  const storeDetailsStatus = useRecoilValue(storeDetailsStatusState);
  const productDetails = useRecoilValue(productDetailsState);
  const productDetailsStatus = useRecoilValue(productDetailsStatusState);
  const basicDetails = useRecoilValue(basicDetailsState);
  const basicDetailsStatus = useRecoilValue(basicDetailsStatusState);
  const summaryDetailsStatus = useRecoilValue(summaryDetailsStatusState);
  const orderSummary = useRecoilValue(orderSummaryState);
  return (
    <div className="flex-[0.4] shadow-lg h-[35rem] my-4 mx-4 md:flex flex-col py-2 hidden">
      <h1 className="text-center text-[24px] font-bold">Order Details</h1>
      <div className="w-[90%] mx-auto space-y-2  overflow-y-auto pb-2 px-2">
        <CardFields
          title={"Store Details"}
          status={storeDetailsStatus}
          details={storeDetails}
        />
        <CardFields
          title={"Product Details"}
          status={productDetailsStatus}
          details={productDetails}
        />
        <CardFields
          title={"Basic Details"}
          status={basicDetailsStatus}
          details={basicDetails}
        />
        <CardFields
          title={"Order Summary"}
          status={summaryDetailsStatus}
          details={orderSummary}
        />
      </div>
    </div>
  );
};

export default Card;
