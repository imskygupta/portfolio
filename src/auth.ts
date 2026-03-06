import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Access",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@skycart.xyz" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Securely check environment vars or the user provided login
        const adminEmail = process.env.ADMIN_EMAIL || "products@skycart.xyz";
        const adminPassword = process.env.ADMIN_PASSWORD || "Akash@98890";

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return { id: "1", name: "Akash Gupta", email: adminEmail, role: "admin" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
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
