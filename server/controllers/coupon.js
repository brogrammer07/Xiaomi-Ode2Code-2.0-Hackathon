import Coupon from "../models/coupon.js";

export const getCouponData = async (req, res) => {
  const { couponCode } = req.body;
  const coupon = await Coupon.findOne({ couponCode });
  if (!coupon) {
    return res.status(400).json("Invalid Coupon");
  }
  if (coupon.valid === false) {
    return res.status(400).json("Coupon Expired");
  }
  return res.status(200).json(coupon);
};
export const createCoupon = async (req, res) => {
  const { couponCode, price } = req.body;
  await Coupon.create({
    couponCode,
    price,
  });
  return res.status(200).json("Coupon Created");
};
