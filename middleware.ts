// @ts-ignore

import { auth } from "@/auth";
import type { NextRequest } from "next/server";

export default auth((req: NextRequest & { auth?: any }) => {
  if (!req.auth) {
    const url = new URL("/login", req.url);
    return Response.redirect(url);
  }
});