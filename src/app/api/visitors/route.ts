import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Visitor } from "@/models/Visitor";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    await connectDB();

    // Get IP address from headers (works on Vercel)
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";

    // Hash the IP to maintain privacy while allowing unique counting
    const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

    // Try to find the visitor or create a new one
    await Visitor.findOneAndUpdate(
      { ipHash },
      { $inc: { visits: 1 }, $set: { lastVisit: new Date() } },
      { upsert: true, new: true }
    );

    // Get total unique visitors
    const totalVisitors = await Visitor.countDocuments();

    return NextResponse.json(
      { success: true, totalVisitors },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating visitor:", error);
    return NextResponse.json(
      { error: "Error tracking visitor" },
      { status: 500 }
    );
  }
}
