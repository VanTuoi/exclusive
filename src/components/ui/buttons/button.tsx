import { useRouter } from "next/router";

import { Button, ButtonProps, SxProps, Theme } from "@mui/material";
import React, { memo } from "react";

type SizeVariant = "large" | "medium" | "small";

interface CustomButtonProps extends ButtonProps {
    sizeVariant?: SizeVariant;
    width?: number | string;
    sx?: SxProps<Theme>;
    link?: string | null;
}

const sizeStyles: Record<SizeVariant, { height: string; padding: string }> = {
    large: { height: "56px", padding: "16px 48px" },
    medium: { height: "44px", padding: "10px 48px" },
    small: { height: "30px", padding: "5px 20px" }
};

export const CusTomButton: React.FC<CustomButtonProps> = memo(
    ({ sizeVariant = "medium", width, link = null, sx = {}, children, ...rest }) => {
        const router = useRouter();

        const { height, padding } = sizeStyles[sizeVariant];
        const resolvedWidth = typeof width === "number" ? `${width}px` : width;

        return (
            <Button
                onClick={() => {
                    if (link) {
                        router.push(link);
                    }
                }}
                sx={{
                    height,
                    width: resolvedWidth || "auto",
                    padding,
                    ...sx
                }}
                {...rest}
            >
                {children}
            </Button>
        );
    }
);
