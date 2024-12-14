import Image from "next/image";
import { useRouter } from "next/router";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { memo, useEffect } from "react";

import { useDialogStore } from "~/stores";
import { formatCurrency } from "~/utils";

import { CartIcon } from "~/assets/icons";

import { SimilarProducts } from "../similar-products";

export const AddToCart = memo(() => {
    const { t } = useTranslation();

    const router = useRouter();
    const { locale, pathname } = router;

    const theme = useTheme();
    const isSmallDisplay = useMediaQuery(theme.breakpoints.down("md"));

    const { product, isAddToCartOpen, selectedOptions, closeAddToCart } = useDialogStore();

    useEffect(() => {
        closeAddToCart();
    }, [pathname]);

    if (!product) return null;

    const selectedColor = selectedOptions[product?.id]?.color || "";
    const selectedSize = selectedOptions[product.id]?.size || "";

    return (
        <SwipeableDrawer
            anchor={isSmallDisplay ? "bottom" : "right"}
            open={isAddToCartOpen}
            onClose={closeAddToCart}
            onOpen={closeAddToCart}
        >
            <Box sx={{ width: isSmallDisplay ? "100%" : "600px" }} role="presentation" onKeyDown={closeAddToCart}>
                <Box
                    sx={{
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                    gap={1}
                >
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            color: theme.palette.success.main
                        }}
                        gap={2}
                    >
                        <CheckCircleOutlineIcon fontSize="large" />
                        <Typography variant="h3" fontSize="28px" textAlign={"left"}>
                            {t("home.addToCartDialog.title")}
                        </Typography>
                    </Box>
                    <Image
                        height={250}
                        width={250}
                        style={{ objectFit: "contain" }}
                        alt={product?.image?.find((img) => img.colorCode === selectedColor)?.alt || "img product"}
                        src={product?.image?.find((img) => img.colorCode === selectedColor)?.url || "/"}
                    />
                    <Stack direction={"column"} alignItems={"flex-start"} width={"100%"} gap={1}>
                        <Typography variant="h3">{product.title}</Typography>
                        <Stack direction={"row"} gap={2}>
                            <Typography variant="h3"> {t("home.addToCartDialog.price")}:</Typography>
                            <Typography variant="h3" color="secondary">
                                {formatCurrency(product?.finalPrice, locale || "en")}
                            </Typography>
                        </Stack>
                        <Box display={"flex"} flexDirection={"row"} gap={2}>
                            <Typography variant="h3"> {t("home.addToCartDialog.colors")}:</Typography>
                            <Box
                                sx={{
                                    height: "30px",
                                    width: "30px",
                                    borderRadius: "8px",
                                    backgroundColor: selectedColor
                                }}
                            ></Box>
                        </Box>

                        {product.sizes && (
                            <Typography variant="h3">
                                {" "}
                                {t("home.addToCartDialog.size")}: {selectedSize}
                            </Typography>
                        )}
                    </Stack>

                    <Typography variant="body2">{product?.description}</Typography>
                    <Stack direction={"row"} gap={1} width={"100%"}>
                        <Button
                            variant="text"
                            size="large"
                            startIcon={<ArrowBackIcon />}
                            fullWidth
                            onClick={closeAddToCart}
                        >
                            {t("home.addToCartDialog.buttonBack")}
                        </Button>
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            endIcon={<CartIcon />}
                            onClick={() => router.push("/cart")}
                        >
                            {t("home.addToCartDialog.buttonCheckout")}
                        </Button>
                    </Stack>
                </Box>
                <Divider />
                <SimilarProducts />
            </Box>
        </SwipeableDrawer>
    );
});
