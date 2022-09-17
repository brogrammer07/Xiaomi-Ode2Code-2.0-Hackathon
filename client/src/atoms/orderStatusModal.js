import { atom } from "recoil";

export const storeDetailsStatusState = atom({
  key: "storeDetailsStatusState",
  default: false,
});
export const productDetailsStatusState = atom({
  key: "productDetailsStatusState",
  default: false,
});
export const basicDetailsStatusState = atom({
  key: "basicDetailsStatusState",
  default: false,
});
export const summaryDetailsStatusState = atom({
  key: "summaryDetailsStatusState",
  default: false,
});
export const paymentDetailsStatusState = atom({
  key: "paymentDetailsStatusState",
  default: false,
});
