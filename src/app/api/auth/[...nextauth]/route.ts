import NextAuth from "next-auth";
import { authOptions } from "@/auth-options";
import { handlers } from "@/auth";

export const { GET, POST } = handlers;