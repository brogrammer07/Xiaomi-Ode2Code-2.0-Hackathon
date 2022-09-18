import React, { createRef } from "react";
import ReactToPdf from "react-to-pdf";
import { useRecoilValue } from "recoil";
import {
  basicDetailsState,
  orderSummaryState,
  paymentState,
  productDetailsState,
  storeDetailsState,
} from "../atoms/orderModal";
import { format } from "date-fns";
import { Button } from "antd";
import ReactToPrint from "react-to-print";
import OrderLayout from "./OrderLayout";
const Invoice = () => {
  const ref = createRef();
  const storeDetails = useRecoilValue(storeDetailsState);
  const productDetails = useRecoilValue(productDetailsState);
  const orderSummary = useRecoilValue(orderSummaryState);
  const basicDetails = useRecoilValue(basicDetailsState);
  const paymentDetails = useRecoilValue(paymentState);

  return (
    <OrderLayout>
      <div className="flex flex-col items-center w-full overflow-y-scroll h-[35rem]">
        <div className="flex items-center w-full justify-center mt-[2rem] mb-[2rem]">
          <ReactToPrint
            trigger={() => (
              <Button type="primary" size="large">
                Print Invoice
              </Button>
            )}
            content={() => ref?.current}
          />
        </div>
        <div ref={ref} class="invoice-box">
          <table cellpadding="0" cellspacing="0">
            <tr class="top">
              <td colspan="7">
                <table>
                  <tr>
                    <td class="title">
                      <img
                        src="/Assets/mi_logo.png"
                        alt=""
                        style={{
                          width: "100px",
                          maxWidth: "300px",
                          height: "100px",
                        }}
                      />
                    </td>

                    <td>
                      Invoice
                      <br />
                      Created: {format(new Date(), "d LLLL, uuuu")}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="information">
              <td colspan="7">
                <table>
                  <tr>
                    <td>
                      {storeDetails.STORE_TYPE}
                      <br />
                      {storeDetails.STORE_NAME}
                    </td>

                    <td>
                      {basicDetails.NAME}
                      <br />
                      {basicDetails.PHONE}
                      <br />
                      {basicDetails.EMAIL}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr class="heading">
              <td>Payment Method</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Status #</td>
            </tr>

            <tr class="details">
              <td>{paymentDetails.PAYMENT_TYPE}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>Paid</td>
            </tr>

            <tr class="heading">
              <td>Product</td>
              <td>Product Price</td>
              <td>CGST</td>
              <td>SGST</td>
              <td>Coupon</td>
              <td>Points</td>
              <td>Total</td>
            </tr>

            <tr class="item">
              <td>
                {productDetails.PRODUCT}
                {", "}
                {productDetails.COLOUR} colour{", "}
                {productDetails.SIZE}
              </td>
              <td>{orderSummary.PRODUCT_PRICE}</td>
              <td>{orderSummary.CGST}</td>
              <td>{orderSummary.SGST}</td>
              <td>{orderSummary.COUPON}</td>
              <td>{orderSummary.POINTS}</td>
              <td>{orderSummary.TOTAL}</td>
            </tr>
          </table>
        </div>{" "}
      </div>
    </OrderLayout>
  );
};

export default Invoice;
