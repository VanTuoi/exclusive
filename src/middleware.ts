import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
    // const accessToken = request.cookies.get("accessToken");

    const response = NextResponse.next();
    if (
        request.nextUrl.pathname.startsWith("/_next") ||
        request.nextUrl.pathname.includes("/api/") ||
        PUBLIC_FILE.test(request.nextUrl.pathname)
    ) {
        return;
    }

    const currentLocale = request.cookies.get("NEXT_LOCALE")?.value || "en";
    if (request.nextUrl.locale === "default") {
        const locale = request.cookies.get("NEXT_LOCALE")?.value || "en";

        const newResponse = NextResponse.redirect(
            new URL(`/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`, request.url)
        );

        newResponse.cookies.set("NEXT_LOCALE", locale, {
            path: "/",
            maxAge: 365 * 24 * 60 * 60
        });

        return newResponse;
    }

    if (request.nextUrl.locale !== currentLocale) {
        response.cookies.set("NEXT_LOCALE", request.nextUrl.locale, {
            path: "/",
            maxAge: 365 * 24 * 60 * 60
        });
    }

    if (request.nextUrl.pathname.startsWith("/api")) {
        response.headers.set("Accept-Language", request.nextUrl.locale || currentLocale);
    }

    // if (accessToken && request.nextUrl.pathname.startsWith("/auth")) {
    //     return NextResponse.redirect(new URL("/", request.url));
    // } else if (!accessToken && request.nextUrl.pathname.startsWith("/user")) {
    //     return NextResponse.redirect(new URL("/", request.url));
    // } else if (request.nextUrl.pathname.startsWith("/api")) {
    //     response.headers.set("Content-Type", "application/json");

    //     if (!accessToken && request.nextUrl.pathname.startsWith("/api/user")) {
    //         return NextResponse.json({ message: "Unauthorized access" }, { status: 403 });
    //     }
    // }

    return response;
}

export const config = {
    // matcher: ["/api/user/:path*", "/auth/:path*", "/user/:path*"]
    matcher: ["/:path*"]
};
