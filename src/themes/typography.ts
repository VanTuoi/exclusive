import { Inter, Poppins } from "next/font/google";

import { TypographyOptions } from "@mui/material/styles/createTypography";

import { ThemeOption } from "~/types";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

const inter = Inter({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export default function themeTypography(theme: ThemeOption): TypographyOptions {
    return {
        fontFamily: `${poppins.style.fontFamily}, ${inter.style.fontFamily}`,
        h6: {
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.03em"
        },
        h5: {
            fontSize: "14px",
            lineHeight: "21px",
            fontWeight: 400,
            letterSpacing: "0.03em"
        },
        h4: {
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: 400,
            letterSpacing: "0.03em"
        },
        h3: {
            fontSize: "20px",
            lineHeight: "28px",
            fontWeight: 500,
            letterSpacing: "0.03em"
        },
        h2: {
            fontSize: "24px",
            fontWeight: 700,
            letterSpacing: "0.03em"
        },
        h1: {
            fontSize: "34px",
            fontWeight: 700,
            fontFamily: inter.style.fontFamily,
            letterSpacing: "0.03em"
        },
        subtitle1: {
            fontSize: "14px",
            fontWeight: 500,
            letterSpacing: "0.03em"
        },
        subtitle2: {
            fontSize: "12px",
            fontWeight: 400,
            color: theme.textPrimary,
            letterSpacing: "0.03em"
        },
        caption: {
            fontSize: "12px",
            fontWeight: 400,
            color: theme.textPrimary,
            letterSpacing: "0.03em"
        },
        body1: {
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "21px",
            letterSpacing: "0.03em"
        },
        body2: {
            fontWeight: 400,
            lineHeight: "16px",
            color: theme.textPrimary,
            letterSpacing: "0.03em"
        },
        button: {
            fontWeight: "normal",
            textTransform: "capitalize",
            lineHeight: "24px",
            color: theme.textSecondary,
            letterSpacing: "0.03em"
        }
    };
}
