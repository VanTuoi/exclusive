import { Box, Typography } from "@mui/material";
import { memo } from "react";

import { formatCurrency } from "~/utils";

import { Promotion } from "~/types/product";

interface DiscountProps {
    locale: string;
    promotions?: Promotion[];
}

export const Discount = memo(({ locale = "en", promotions = [] }: DiscountProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: "10px",
                left: "10px",
                gap: "8px"
            }}
        >
            {promotions.map((promo, index) => {
                let discountDisplay: string | null = null;
                if (promo.type === "percentage" && promo.value) {
                    discountDisplay = `-${promo.value}%`;
                } else if (promo.type === "fixed_amount" && promo.value) {
                    discountDisplay = `-${formatCurrency(promo.value, locale)}`;
                } else if (promo.type === "buy_one_get_one_free") {
                    discountDisplay = "BOGO";
                } else if (promo.type === "new_product") {
                    discountDisplay = "New!";
                }

                return (
                    discountDisplay && (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "4px",
                                minWidth: "55px",
                                color: "background.paper",
                                backgroundColor: "secondary.main",
                                height: "26px",
                                paddingX: "8px"
                            }}
                        >
                            <Typography sx={{ fontSize: "12px", fontWeight: 400, lineHeight: "18px" }}>
                                {discountDisplay}
                            </Typography>
                        </Box>
                    )
                );
            })}
        </Box>
    );
});
