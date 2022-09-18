import { useEffect } from "react";
import { useResetRecoilState } from "recoil";
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

export const useResetRecoilStates = () => {
  const resetStoreDetails = useResetRecoilState(storeDetailsState);
  const resetStoreDetailsStatus = useResetRecoilState(storeDetailsStatusState);
  const resetProductDetails = useResetRecoilState(productDetailsState);
  const resetProductDetailsStatus = useResetRecoilState(
    productDetailsStatusState
  );
  const resetBasicDetails = useResetRecoilState(basicDetailsState);
  const resetBasicDetailsStatus = useResetRecoilState(basicDetailsStatusState);
  const resetOrderSummary = useResetRecoilState(orderSummaryState);
  const resetSummaryDetailsStatus = useResetRecoilState(
    summaryDetailsStatusState
  );
  const resetPaymentDetails = useResetRecoilState(paymentState);
  const resetPaymentDetailsStatus = useResetRecoilState(
    paymentDetailsStatusState
  );
  useEffect(() => {
    console.log("YESS");
    resetStoreDetails();
    resetStoreDetailsStatus();
    resetProductDetails();
    resetProductDetailsStatus();
    resetBasicDetails();
    resetBasicDetailsStatus();
    resetOrderSummary();
    resetSummaryDetailsStatus();
    resetPaymentDetails();
    resetPaymentDetailsStatus();
  }, []);
};
