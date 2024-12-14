import { useRouter } from "next/router";

import { Box, Divider, Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useMemo } from "react";

import { useCustomSnackbar } from "~/hooks";
import { usePromotionStore } from "~/stores";
import { formatCurrency } from "~/utils";

interface TotalProps {
    subtotal: number;
    shipping: number | string;
}

export const Total = memo(({ subtotal, shipping = "Free" }: TotalProps) => {
    const router = useRouter();
    const { locale } = router;

    const { t } = useTranslation();
    const { showSnackbar } = useCustomSnackbar();

    const { promotions, removePromotion } = usePromotionStore();

    const costReduction = useMemo(() => {
        return promotions.reduce((sum, item) => sum + item.price, 0);
    }, [promotions]);

    return (
        <Stack direction="column" gap={2} sx={{ width: "100%" }}>
            <Stack direction="row" justifyContent="space-between" width="100%">
                <Typography variant="h4">{t("cart.pay.subtotal")}</Typography>
                <Typography variant="h4">{formatCurrency(subtotal, locale || "en")}</Typography>
            </Stack>
            <Divider />
            <Stack direction="row" justifyContent="space-between" width="100%">
                <Typography variant="h4">{t("cart.pay.shipping")}</Typography>
                <Typography variant="h4">
                    {typeof shipping === "string" ? shipping : formatCurrency(shipping, locale || "en")}
                </Typography>
            </Stack>
            {promotions.length > 0 &&
                promotions.map((promotion) => {
                    return (
                        <>
                            <Divider />
                            <Stack direction="row" justifyContent="space-between" width="100%">
                                <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-start"}>
                                    <Typography variant="h4">
                                        {t("cart.pay.discount")} ({promotion.promoCode})
                                    </Typography>
                                    <Typography variant="body1">({promotion.description})</Typography>
                                    <Typography variant="body1">
                                        {t("cart.pay.expirationDate")}: {promotion.expiryDate}
                                    </Typography>
                                    <Typography
                                        color="error"
                                        sx={{ cursor: "pointer" }}
                                        onClick={() => {
                                            removePromotion(promotion.promoCode);
                                            showSnackbar("Promotion removed successfully", "success");
                                        }}
                                    >
                                        {t("cart.pay.removeDiscount")}
                                    </Typography>
                                </Box>
                                <Typography variant="h4">-{formatCurrency(promotion.price, locale || "en")}</Typography>
                            </Stack>
                        </>
                    );
                })}
            <Divider />
            <Stack direction="row" justifyContent="space-between" width="100%">
                <Typography variant="h4">{t("cart.pay.total")}</Typography>
                <Typography variant="h4">
                    {formatCurrency(Math.max(subtotal - costReduction, 0), locale || "en")}
                </Typography>
            </Stack>
        </Stack>
    );
});
