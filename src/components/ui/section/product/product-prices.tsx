import { Stack, Typography, useTheme } from "@mui/material";

import { formatCurrency } from "~/utils";

interface ProductPriceProps {
    price?: number;
    finalPrice?: number;
    locale: string;
    showOldPrice?: boolean;
    sx?: object;
}

export const ProductPrice = ({
    price = 0,
    finalPrice = 0,
    locale,
    showOldPrice = true,
    sx = { fontSize: "16px", lineHeight: "24px", fontWeight: 500 }
}: ProductPriceProps) => {
    const theme = useTheme();

    return (
        <Stack direction={"row"} gap={2} sx={{ color: theme.palette.text.secondary, ...sx }}>
            <Typography sx={{ ...sx }} color={showOldPrice ? "secondary" : "primary"}>
                {formatCurrency(finalPrice, locale)}
            </Typography>
            {showOldPrice && (
                <Typography sx={{ textDecoration: "line-through", ...sx }}>{formatCurrency(price, locale)}</Typography>
            )}
        </Stack>
    );
};
