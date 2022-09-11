import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Operator from "../models/operator.js";

export const login = async (req, res) => {
  const { MI_ID, Password } = req.body;

  try {
    const existingOperator = await Operator.findOne({ MI_ID });
    if (!existingOperator)
      return res.status(404).json({ message: "Operator doesn't exist." });
    const isPasswordCorrect = await bcrypt.compare(
      Password,
      existingOperator.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });
    const token = jwt.sign(
      { MI_ID: existingOperator.MI_ID, id: existingOperator._id },
      "Mi_Operator",
      { expiresIn: "5h" }
    );
    res.status(200).json({
      result: {
        MI_ID: existingOperator.MI_ID,
        operator_name: existingOperator.operator_name,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

// export const signin = async (req, res) => {
//   const { MI_ID, Password, operator_name } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(Password, 12);
//     const result = await Operator.create({
//       MI_ID,
//       password: hashedPassword,
//       operator_name,
//     });

//     res.status(200).json({ message: "Successfully Signed Up" });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong." });
//   }
// };
