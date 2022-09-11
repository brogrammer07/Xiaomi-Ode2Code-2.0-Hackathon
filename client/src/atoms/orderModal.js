import { atom } from "recoil";
export const storeDetailsState = atom({
  key: "storeDetailsState",
  default: {
    STORE_TYPE: "",
    STORE_NAME: "",
    POS_ID: "",
  },
});
export const productDetailsState = atom({
  key: "productDetailsState",
  default: {
    CATEGORY: "",
    PRODUCT: "",
    COLOUR: "",
    SIZE: "",
    QUANTITY: 0,
  },
});
export const basicDetailsState = atom({
  key: "basicDetailsState",
  default: {},
});
export const orderSummaryState = atom({
  key: "orderSummaryState",
  default: {},
});
export const paymentState = atom({
  key: "paymentState",
  default: {},
});
