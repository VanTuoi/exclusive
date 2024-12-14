import { Button, ButtonProps, SxProps, Theme, useTheme } from "@mui/material";
import React, { memo } from "react";

interface CustomButtonProps extends ButtonProps {
    width?: number | string;
    sx?: SxProps<Theme>;
}

export const CategoriesButton: React.FC<CustomButtonProps> = memo(({ sx = {}, children, ...rest }) => {
    const theme = useTheme();

    return (
        <Button
            sx={{
                border: `1px solid ${theme.palette.grey[300]}`,
                backgroundColor: theme.palette.background.paper,
                fontWeight: 400,
                height: 145,
                width: 170,
                gap: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                "& > *": {
                    filter: "brightness(0) saturate(100%)",
                    transition: "filter 0.3s ease"
                },
                ":hover": {
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.background.paper,
                    "& > *": {
                        filter: "brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(0%) hue-rotate(79deg) brightness(105%) contrast(102%)" // New filter on hover
                    }
                },
                ...sx
            }}
            {...rest}
        >
            {children}
        </Button>
    );
});
