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
    PRODUCT_SN: "",
    CATEGORY: "",
    PRODUCT: "",
    COLOUR: "",
    SIZE: "",
    QUANTITY: 0,
    DELIVERY_MODE: "",
  },
});
export const basicDetailsState = atom({
  key: "basicDetailsState",
  default: {
    OPERATOR_ID: "",
    NAME: "",
    PHONE: "",
    EMAIL: "",
    COC: "",
    ADDRESS: {},
  },
});
export const orderSummaryState = atom({
  key: "orderSummaryState",
  default: {
    PRODUCT_PRICE: 0,
    QUANTITY: 0,
    CGST: 0,
    SGST: 0,
    COUPON: null,
    POINTS: null,
    TOTAL: 0,
  },
});
export const paymentState = atom({
  key: "paymentState",
  default: {},
});
