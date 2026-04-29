import { auth } from "@/auth";

export default auth((req: { nextUrl: { pathname: any; }; auth: any; url: string | URL | undefined; }) => {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/_next") ||
    pathname === "/"
  ) {
    return;
  }

  if (!req.auth) {
    const url = new URL("/login", req.url);
    return Response.redirect(url);
  }
});

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};