import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  const signInURL = new URL("/", req.url);
  const calendarioInURL = new URL("/calendario", req.url);

  if (!token) {
    if (req.nextUrl.pathname === "/") {
      return NextResponse.next();
    }

    return NextResponse.redirect(signInURL);
  }

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(calendarioInURL);
  }
}

export const config = {
  matcher: ["/", "/calendario", "/solicitante", "/relatorio"],
};