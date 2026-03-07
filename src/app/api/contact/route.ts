import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectDB from "@/lib/mongodb";
import { Contact, OTP } from "@/models/Contact";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "mail.skycart.xyz",
  port: Number(process.env.EMAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER || "portfolio@skycart.xyz",
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { action, email, otp, message } = body;

    if (action === "send_otp") {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      
      // Upsert OTP
      await OTP.findOneAndUpdate({ email }, { otp: code, email }, { upsert: true, new: true });

      await transporter.sendMail({
        from: '"Skycart Portfolio" <portfolio@skycart.xyz>',
        to: email,
        subject: "Your Contact Verification Code",
        html: `<p>Your verification code is: <strong>${code}</strong></p><p>This code expires in 5 minutes.</p>`,
      });

      return NextResponse.json({ success: true, message: "OTP sent" });
    }

    if (action === "verify_otp") {
      const record = await OTP.findOne({ email, otp });
      if (!record) {
        return NextResponse.json({ success: false, error: "Invalid or expired OTP" }, { status: 400 });
      }
      return NextResponse.json({ success: true, message: "OTP verified" });
    }

    if (action === "submit_message") {
      // Create new contact entry
      const newContact = await Contact.create({
        email,
        message,
        isVerified: true
      });

      // Notify the owner
      await transporter.sendMail({
        from: '"Skycart Portfolio" <portfolio@skycart.xyz>',
        to: "portfolio@skycart.xyz", // Send to the portfolio email or specify another admin
        subject: `New Portfolio Inquiry from ${email}`,
        text: `You have a new message from ${email}:\n\n${message}`,
      });

      return NextResponse.json({ success: true, message: "Message sent", contactId: newContact._id });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
