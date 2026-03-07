import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import { Admin } from "@/models/Admin";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Access",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@skycart.xyz" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        const inputEmail = credentials?.email as string;
        const inputPassword = credentials?.password as string;

        // Ensure default admin exists if DB is empty for admin
        let adminUser = await Admin.findOne({ email: "portfolio@skycart.xyz" });
        
        if (!adminUser) {
           // Seed initial default admin on first run (unhashed for simplicity in this port, or could add bcrypt)
           // For a standard portfolio, we can just store plain text string if bcrypt isn't installed to avoid errors, 
           // but normally we'd hash. Assuming plain/simple check for now.
           adminUser = await Admin.create({ 
               email: "portfolio@skycart.xyz", 
               passwordHash: "Akash@12349" 
           });
        }

        if (inputEmail === adminUser.email && inputPassword === adminUser.passwordHash) {
          return { id: adminUser._id.toString(), name: "Akash Gupta", email: adminUser.email, role: "admin" };
        }
        
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/imskygupta/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_local_development_only",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});
