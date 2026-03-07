import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Admin } from "@/models/Admin";
import { auth } from "@/auth";

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectDB();
    const body = await req.json();
    const { newPassword } = body;
    
    if (!newPassword || newPassword.length < 6) {
        return NextResponse.json({ success: false, error: "Password must be at least 6 characters." }, { status: 400 });
    }

    await Admin.findOneAndUpdate({ email: session.user?.email }, { passwordHash: newPassword });
    
    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
