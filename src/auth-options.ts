import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email dan password wajib diisi.");
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("Akun tidak ditemukan. Silakan daftar terlebih dahulu.");
          }

          if (!user.password) {
            throw new Error(
              "Akun ini terdaftar via Google. Silakan login menggunakan Google."
            );
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Password yang kamu masukkan salah.");
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error: any) {
          throw new Error(error.message || "Terjadi kesalahan saat login.");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = (user as any).role;
      }
      return token;
    },

    async signIn({ user, account }) {
      if (!user.email) return false;

      if (account?.provider === "google") {
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.name ?? undefined,
          },
          create: {
            email: user.email,
            name: user.name ?? "",
            password: null,
          },
        });
      }

      return true;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};