import Order from "../models/order.js";
import Payment from "../models/payment.js";
import Customer from "../models/customer.js";
import Coupon from "../models/coupon.js";
import { sendMail } from "../services/sendgrid.js";
import { format } from "date-fns";
import Category from "../models/category.js";
import Product from "../models/product.js";
import Colour from "../models/colour.js";
import Size from "../models/size.js";
export const createOrder = async (req, res) => {
  const {
    productSN,
    productPrice,
    cgst,
    sgst,
    coupon,
    points,
    total,
    referenceNumber,
    phoneNumber,
    paymentMode,
    address,
    productName,
    productColour,
    productSize,
    storeType,
    storeName,
    quantity,
  } = req.body;

  const totalOrders = await Order.countDocuments();
  const orderId = `${
    productSN +
    (totalOrders === 0
      ? "01"
      : totalOrders < 9
      ? `0${totalOrders + 1}`
      : totalOrders + 1)
  }`;
  console.log(orderId);
  const exisitngOrder = await Order.findOne({ orderId });
  if (exisitngOrder) {
    return res.status();
  }
  let deliveryMode;
  const customer = await Customer.findOne({ phoneNumber }).populate(
    "addresses"
  );
  if (address === null) {
    deliveryMode = "Pickup";
  } else {
    deliveryMode = "Home Delivery";
  }

  const newOrder = await Order.create({
    orderId,
    productSN,
    productPrice,
    cgst,
    sgst,
    total,
    paymentMode,
    deliveryMode,
    quantity,
  });
  if (paymentMode === "online") {
    const payment = await Payment.findOne({
      razorpay_payment_id: referenceNumber,
    });
    newOrder.payment = payment._id;
    await newOrder.save();
  }
  if (coupon.coupon !== 0) {
    const existingCoupon = await Coupon.findOne({
      couponCode: coupon.couponCode,
    });
    existingCoupon.valid = false;
    await existingCoupon.save();
    newOrder.coupon = coupon;
    await newOrder.save();
  }
  if (address !== null) {
    newOrder.address = customer.addresses.find(
      (add) => add.fullAddress === address
    )._id;
  }

  newOrder.customer = customer;
  await newOrder.save();
  if (points !== 0) {
    customer.points -= points * 10;
    newOrder.points = points;
    await newOrder.save();
  }

  customer.orders.push(newOrder._id);
  const pointsEarned = Math.round(Number(total / 100));
  customer.points += pointsEarned;
  await customer.save();
  console.log("ORDER CREATED");

  sendMail({
    to: customer.email,
    from: "at7129652@gmail.com",
    subject: "MI Shopping Invoice",
    text: `Your Invoice is here`,
    html: `<html>
            <head>
                <meta charset="utf-8" />
                <title>Order Invoice</title>
        
                <style>
                    .invoice-box {
                        max-width: 800px;
                        margin: auto;
                        padding: 30px;
                        border: 1px solid #eee;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                        font-size: 16px;
                        line-height: 24px;
                        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                        color: #555;
                    }
        
                    .invoice-box table {
                        width: 100%;
                        line-height: inherit;
                        text-align: left;
                    }
        
                    .invoice-box table td {
                        padding: 5px;
                        vertical-align: top;
                    }
        
                    .invoice-box table tr td:nth-child(2) {
                        text-align: right;
                    }
        
                    .invoice-box table tr.top table td {
                        padding-bottom: 20px;
                    }
        
                    .invoice-box table tr.top table td.title {
                        font-size: 45px;
                        line-height: 45px;
                        color: #333;
                    }
        
                    .invoice-box table tr.information table td {
                        padding-bottom: 40px;
                    }
        
                    .invoice-box table tr.heading td {
                        background: #eee;
                        border-bottom: 1px solid #ddd;
                        font-weight: bold;
                    }
        
                    .invoice-box table tr.details td {
                        padding-bottom: 20px;
                    }
        
                    .invoice-box table tr.item td {
                        border-bottom: 1px solid #eee;
                    }
        
                    .invoice-box table tr.item.last td {
                        border-bottom: none;
                    }
        
                    .invoice-box table tr.total td:nth-child(2) {
                        border-top: 2px solid #eee;
                        font-weight: bold;
                    }
        
                    @media only screen and (max-width: 600px) {
                        .invoice-box table tr.top table td {
                            width: 100%;
                            display: block;
                            text-align: center;
                        }
        
                        .invoice-box table tr.information table td {
                            width: 100%;
                            display: block;
                            text-align: center;
                        }
                    }
        
                    /** RTL **/
                    .invoice-box.rtl {
                        direction: rtl;
                        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                    }
        
                    .invoice-box.rtl table {
                        text-align: right;
                    }
        
                    .invoice-box.rtl table tr td:nth-child(2) {
                        text-align: left;
                    }
                    .image{
                      width: 100px;
                      objectFit:contain;
                    }
                </style>
            </head>
        
            <body>
            <div class="invoice-box mt-[5rem]">
            <table cellpadding="0" cellspacing="0">
              <tr class="top">
                <td colspan="7">
                  <table>
                    <tr>
                      <td class="title">
                        <img
                          src="https://res.cloudinary.com/dccsijvqq/image/upload/v1663479993/Xiaomi%20Hackathon/mi_logo_pu5tsk.png"
                          alt=""
                          class="image"
                        />
                      </td>
  
                      <td>
                        Invoice
                        <br />
                        Created: ${format(new Date(), "d LLLL, uuuu")}
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
                        ${storeType}
                        <br />
                        ${storeName}
                      </td>
  
                      <td>
                        ${customer.name}
                        <br />
                        ${customer.phoneNumber}
                        <br />
                        ${customer.email}
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
                <td>${paymentMode}</td>
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
                ${productName}, 
                  ${productColour} colour, 
                  ${productSize}
                </td>
                <td>${productPrice}</td>
                <td>${cgst}</td>
                <td>${sgst}</td>
                <td>${coupon.coupon}</td>
                <td>${Math.round(points / 100)}</td>
                <td>${total}</td>
              </tr>
            </table>
          </div>
            </body>
        </html>`,
  });

  res.status(200).json({ pointsEarned, orderId: newOrder.orderId });
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate(
    "customer",
    "name phoneNumber email"
  );
  console.log(orders.length);
  if (!orders) {
    return res.status(400).json("No Order Found");
  }
  return res.status(200).json(orders);
};
export const getOrder = async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findOne({ orderId })
    .populate({
      path: "customer",
      select: "name phoneNumber email",
    })
    .populate({ path: "address" });

  const SN = order.productSN;
  const categoryId = SN.slice(0, 2);
  const productSN = SN.slice(2, 6);
  const colourId = SN.slice(6, 8);
  const sizeId = SN.slice(8, 10);
  const categoryData = await Category.findOne({ id: categoryId })
    .populate({ path: "products" })
    .populate({ path: "colours" })
    .populate({ path: "sizes" });
  let category = {
    _id: categoryData._id,
    id: categoryData.id,
    title: categoryData.title,
  };
  let product = categoryData.products.find((data) => data.SN === productSN);
  let colour = categoryData.colours.find((data) => data.id === colourId);
  let size = categoryData.sizes.find((data) => data.id === sizeId);
  let orderData = {
    orderData: order,
    productData: { category, product, colour, size },
  };
  if (!order) {
    return res.status(400).json("No Order Found");
  }
  return res.status(200).json(orderData);
};
