/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const response = await res.json();
          console.log("Backend login response:", response);

          // ✅ FIX 1: use response.status instead of success
          if (!res.ok || !response?.status) {
            throw new Error(response?.message || "Login failed");
          }

          const user = response?.data?.user;
          const accessToken = response?.data?.accessToken;

          if (!user || !accessToken) {
            throw new Error("Invalid login response from server");
          }

          // ✅ FIX 2: role check (match your API: USER)
          if (user.role !== "ADMIN") {
            throw new Error("Only admin are allowed to login here");
          }

          return {
            id: user._id,
            name: user.email, // ✅ FIX 3: no firstName/lastName in API
            email: user.email,
            role: user.role,
            accessToken: accessToken,
          };
        } catch (error) {
          console.error("Authentication error:", error);

          const message =
            error instanceof Error ? error.message : "Authentication failed";

          throw new Error(message);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }

      return token;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
        accessToken: token.accessToken,
      };

      return session;
    },
  },
};