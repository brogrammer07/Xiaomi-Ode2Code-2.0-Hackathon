import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import {
  basicDetailsState,
  orderSummaryState,
  paymentState,
  productDetailsState,
  storeDetailsState,
} from "../atoms/orderModal";
import {
  basicDetailsStatusState,
  paymentDetailsStatusState,
  productDetailsStatusState,
  storeDetailsStatusState,
  summaryDetailsStatusState,
} from "../atoms/orderStatusModal";
import CardFields from "./CardFields";
const Card = () => {
  const [showCards, setShowCards] = useState(false);
  const storeDetails = useRecoilValue(storeDetailsState);
  const storeDetailsStatus = useRecoilValue(storeDetailsStatusState);
  const productDetails = useRecoilValue(productDetailsState);
  const productDetailsStatus = useRecoilValue(productDetailsStatusState);
  const basicDetails = useRecoilValue(basicDetailsState);
  const basicDetailsStatus = useRecoilValue(basicDetailsStatusState);
  const summaryDetailsStatus = useRecoilValue(summaryDetailsStatusState);
  const orderSummary = useRecoilValue(orderSummaryState);
  const paymentDetailsStatus = useRecoilValue(paymentDetailsStatusState);
  const paymentDetails = useRecoilValue(paymentState);
  return (
    <>
      <div
        className={`w-[30rem] h-full sm:flex hidden absolute bg-black opacity-80 right-0 md:hidden z-[100] transition-all duration-150 ${
          showCards ? "translate-x-0" : "translate-x-[30rem]"
        }`}>
        <div
          onClick={() => setShowCards(!showCards)}
          className="w-[10%] flex items-center cursor-pointer">
          {showCards ? (
            <BiChevronRight color="white" size={40} />
          ) : (
            <BiChevronLeft color="white" size={40} />
          )}
        </div>
        <div className="w-[90%]">
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
            <CardFields
              title={"Payment"}
              status={paymentDetailsStatus}
              details={paymentDetails}
            />
          </div>
        </div>
      </div>
      <div className="md:flex-[0.4] hidden shadow-lg my-4 mx-4 md:flex flex-col py-2">
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
          <CardFields
            title={"Payment"}
            status={paymentDetailsStatus}
            details={paymentDetails}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
