"use server";

import { signIn, signOut } from "@/auth";

export async function login(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/imskygupta",
    });
    return undefined;
  } catch (error: any) {
    if (error.type === "CredentialsSignin") {
      return "Invalid credentials.";
    }
    // Next.js redirects throw an error which must be re-thrown
    if (error.message && error.message.includes("NEXT_REDIRECT")) {
      throw error;
    }
    return "Something went wrong.";
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
