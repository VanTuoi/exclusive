import { useRouter } from "next/router";

import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useMemo } from "react";

import { useCartStore } from "~/stores";

import { CusTomButton } from "~/components/ui";

import { CartTable } from "./cart-table";
import { PromoCodeInput } from "./input-promotion";
import { Total } from "./total";

export const CartComponents = memo(() => {
    const { items } = useCartStore();

    const router = useRouter();

    const { t } = useTranslation();

    const subtotal = useMemo(() => {
        return Object.values(items).reduce((acc, { product, quantity }) => acc + product.finalPrice * quantity, 0);
    }, [items]);

    return (
        <Stack spacing={2} sx={{ pb: { xs: 2, md: 5, lg: 17.5 } }}>
            <Grid2 container sx={{ width: "100%" }} gap={5}>
                <Grid2 size={{ xs: 12 }}>
                    <CartTable items={items} />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <CusTomButton link="/" size="large" variant="outlined">
                        {t("cart.titleButton")}
                    </CusTomButton>
                </Grid2>
                {Object.keys(items).length > 0 && (
                    <Grid2 container size={{ xs: 12 }} spacing={1}>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <PromoCodeInput />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 3,
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    border: "1.5px solid",
                                    borderColor: "primary.main",
                                    minHeight: "324px",
                                    width: { xs: "100%", md: "470px" },
                                    borderRadius: "4px",
                                    margin: "0 auto",
                                    padding: 5
                                }}
                            >
                                <Typography variant="h3" textAlign={"left"} width={"100%"}>
                                    {t("cart.pay.title")}
                                </Typography>
                                <Total subtotal={subtotal} shipping={t("cart.shipping")} />
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={() => {
                                        router.push("/checkout");
                                    }}
                                >
                                    {t("cart.pay.button")}
                                </Button>
                            </Box>
                        </Grid2>
                    </Grid2>
                )}
            </Grid2>
        </Stack>
    );
});
