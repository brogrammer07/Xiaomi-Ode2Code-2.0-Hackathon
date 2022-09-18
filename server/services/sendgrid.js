import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async (msg) => {
  try {
    await sgMail.send(msg);
  } catch (err) {
    console.log(err);

    if (err.resposne) {
      console.log(err.response.body);
    }
  }
};
