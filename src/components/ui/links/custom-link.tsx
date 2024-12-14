import Link from "next/link";

import { SxProps, Theme, Tooltip, Typography, useTheme } from "@mui/material";
import { memo } from "react";

interface CustomLinkProps {
    href: string;
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "inherit";
    children: React.ReactNode;
    maxLength?: number;
    underline?: boolean;
    underlineThickness?: number;
    fontWeight?: number | string;
    lineHeight?: number;
    marginLeft?: number;
    sx?: SxProps<Theme>;
}

export const CustomLink = memo(
    ({
        href,
        variant = "h5",
        children,
        maxLength = 20,
        underline = false,
        underlineThickness = 1,
        fontWeight = "normal",
        lineHeight = 24,
        marginLeft = 0,
        sx
    }: CustomLinkProps) => {
        const theme = useTheme();

        const text = typeof children === "string" ? children : "";

        const truncatedText = maxLength && text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

        return (
            <Link href={href} passHref legacyBehavior style={{ display: "inline" }}>
                <Tooltip title={text.length > (maxLength || 0) ? text : ""}>
                    <Typography
                        component="a"
                        variant={variant}
                        sx={{
                            lineHeight: `${lineHeight}px`,
                            textUnderlineOffset: 1,
                            textAlign: "center",
                            textTransform: "capitalize",
                            textDecoration: underline ? "underline" : "none",
                            textDecorationThickness: underline ? underlineThickness : undefined,
                            textDecorationColor: theme.palette.text.secondary,
                            fontWeight: fontWeight,
                            color: "inherit",
                            transition: "color 0.35s ease",
                            ":hover": {
                                color: theme.palette.secondary.main,
                                textDecorationColor: theme.palette.secondary.main
                            },
                            cursor: "pointer",
                            display: "inline",
                            marginLeft: `${marginLeft}px`,
                            ...sx
                        }}
                    >
                        {truncatedText}
                    </Typography>
                </Tooltip>
            </Link>
        );
    }
);
