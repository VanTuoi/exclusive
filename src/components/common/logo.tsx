import { useRouter } from "next/router";

import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface LogoProps {
    justifyContent?: "flex-start" | "center" | "flex-end" | "space-between";
}

export const Logo = memo(({ justifyContent = "center" }: LogoProps) => {
    const router = useRouter();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: justifyContent,
                cursor: "pointer"
            }}
            onClick={() => {
                router.push("/");
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    color: "currentcolor",
                    fontFamily: "Inter",
                    lineHeight: "24px",
                    letterSpacing: "0.03em"
                }}
            >
                Exclusive
            </Typography>
        </Box>
    );
});
