import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { NextRequest } from "next/server";

//any isliye likha hai ki ye teeno parameter apna type maang rhe the to ise chup karne ke liye hack lagake hamne 'any' use kar liya
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifytokenExpiry: new Date( Date.now() + 3600000),
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,{
          $set : {  //✨✨
            forgotPasswordToken: hashedToken ,
         forgotPasswordTokenExpiry: new Date( Date.now() + 3600000)
          }
        });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6d9c1e7aee37e0",
        pass: "0b46d027a62e9c",
      },
    });

    const mailOptions = {
      from: '"Mukul Aggarwal 👻" <mukulaggarwal21@gmail.com>',
      to: email,
      subject:
        emailType === "VERIFY" ? "VERIFY YOUR EMAIL" : "Reset your Password",
      html: `<p>Click<a href ="${
        process.env.DOMAIN
      }/ verifyemail?token=${hashedToken} ">Here </a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } 
      or copy and paste the link below in the browser
      <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

