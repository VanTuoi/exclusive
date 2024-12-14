import Image from "next/image";
import { useRouter } from "next/router";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Dialog, DialogContent, IconButton, Stack, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "next-i18next";
import { memo, useEffect } from "react";

import { useCartStore, useDialogStore, useWishList } from "~/stores";

import { HeartIcon } from "~/assets/icons";

import { ColorSelect } from "../product/colors-select";
import { ProductPrice } from "../product/product-prices";
import { ProductRating } from "../product/product-rating";
import { SizeSelect } from "../product/size-product";

export const ViewMore = memo(() => {
    const { t } = useTranslation();

    const theme = useTheme();

    const router = useRouter();
    const { locale, pathname } = router;

    const {
        isViewDetailOpen,
        product,
        selectedOptions,
        setSelectedColor,
        setSelectedSize,
        closeViewDetail,
        openAddToCart
    } = useDialogStore();

    const { updateItem } = useCartStore();

    const { toggleWishList, isProductInWishList } = useWishList();

    useEffect(() => {
        closeViewDetail();
    }, [pathname]);

    if (!product) return null;

    const selectedColor = selectedOptions[product.id]?.color || "";
    const selectedSize = selectedOptions[product.id]?.size || "";

    return (
        <Dialog
            open={isViewDetailOpen}
            keepMounted
            onClose={closeViewDetail}
            aria-describedby="alert-dialog-slide-description"
            maxWidth="md"
            fullWidth
            PaperProps={{
                style: {
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.grey[100],
                    boxShadow: "none"
                }
            }}
        >
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Box sx={{ width: "100%", height: "100%", minHeight: "250px", position: "relative" }}>
                            <Image
                                fill
                                sizes="100%"
                                style={{ objectFit: "contain" }}
                                alt={
                                    product?.image?.find((img) => img.colorCode === selectedColor)?.alt || "img product"
                                }
                                src={product?.image?.find((img) => img.colorCode === selectedColor)?.url || "/"}
                            />
                            <Box sx={{ position: "absolute", bottom: 10 }}>
                                <ColorSelect
                                    isLabel={false}
                                    imgs={product.image || []}
                                    selectedColor={selectedColor}
                                    handleColorChange={(color) => setSelectedColor(color, product.id)}
                                />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid
                        gap={1}
                        size={{ xs: 12, md: 7 }}
                        sx={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            justifyItems: "center"
                        }}
                    >
                        <Typography variant="h3">{product.title}</Typography>
                        <ProductRating rating={product.rating} />
                        {product.sizes && (
                            <SizeSelect
                                sizes={product.sizes}
                                selectedSize={selectedSize}
                                handleSizeChange={(size: string) => setSelectedSize(size, product.id)}
                            />
                        )}
                        <ProductPrice price={product.price} finalPrice={product.finalPrice} locale={locale || "en"} />
                        <Typography variant="body1" sx={{ marginY: 2 }}>
                            {product.description}
                        </Typography>
                        <Stack direction={"row"} gap={1} alignItems={"center"}>
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={() => {
                                    updateItem(product, 1, { color: selectedColor, size: selectedSize });
                                    closeViewDetail();
                                    openAddToCart(product);
                                }}
                            >
                                {t("home.addToCart")}
                            </Button>
                            <IconButton
                                onClick={() => toggleWishList(product, { color: selectedColor, size: selectedSize })}
                                variant={isProductInWishList(product.id) ? "contained" : "default"}
                                size="large"
                                sx={{ height: "56px", width: "56px", borderRadius: "4px" }}
                            >
                                <HeartIcon />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>
            <IconButton
                onClick={closeViewDetail}
                variant="text"
                size="large"
                sx={{ position: "absolute", borderRadius: "4px", top: 0, right: 0 }}
            >
                <CloseIcon />
            </IconButton>
        </Dialog>
    );
});
