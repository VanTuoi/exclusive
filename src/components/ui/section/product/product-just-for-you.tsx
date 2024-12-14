import Image from "next/image";
import { useRouter } from "next/router";

import { Box, Button, IconButton, Stack, useTheme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useEffect } from "react";

import { useCartStore, useDialogStore } from "~/stores";
import { Product } from "~/types";

import { CartIcon, EyeIcon } from "~/assets/icons";

import { CustomLink } from "../../links";

import { ColorSelect } from "./colors-select";
import { Discount } from "./discount";
import { ProductPrice } from "./product-prices";
import { ProductRating } from "./product-rating";
import { SizeSelect } from "./size-product";

interface ProductComponentProps {
    product: Product;
}

export const ProductJustForYouComponent = memo(({ product }: ProductComponentProps) => {
    const { t } = useTranslation();

    const theme = useTheme();

    const router = useRouter();

    const { locale } = router;

    const { selectedOptions, setSelectedColor, setSelectedSize, openViewDetail, openAddToCart } = useDialogStore();

    const { updateItem } = useCartStore();

    const selectedColor = selectedOptions[product.id]?.color || "";
    const selectedSize = selectedOptions[product.id]?.size || "";

    useEffect(() => {
        if (selectedColor === "" && product?.image?.[0]?.colorCode) {
            setSelectedColor(product?.image?.[0]?.colorCode, product.id);
        }
        if (selectedSize === "" && product?.sizes?.[0]) {
            setSelectedSize(product?.sizes?.[0], product.id);
        }
    }, [product]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 1 }}>
            <Box
                sx={{
                    height: "250px",
                    width: "270px",
                    position: "relative",
                    backgroundColor: theme.palette.grey[100],
                    borderRadius: "4px",
                    overflow: "hidden",
                    "&:hover .hover-button": {
                        opacity: 1
                    }
                }}
            >
                <Image
                    onClick={() => {
                        router.push("/" + product.category + "/" + product.id + "/" + product.title);
                    }}
                    alt={product?.image?.find((img) => img.colorCode === selectedColor)?.alt || "img product"}
                    src={
                        product?.image?.find((img) => img.colorCode === selectedColor)?.url ||
                        "/assets/imgs/product-image-not-available.webp"
                    }
                    fill
                    sizes="100%"
                    style={{ top: 0, objectFit: "cover", cursor: "pointer" }}
                />
                <Discount locale={locale || "en"} promotions={product.promotions} />
                <Stack direction={"column"} gap={1} sx={{ position: "absolute", top: "10px", right: "10px" }}>
                    <IconButton
                        onClick={() => openViewDetail(product)}
                        variant="default"
                        aria-label="fingerprint"
                        color="inherit"
                        sx={{ backgroundColor: theme.palette.grey[50], height: "40px", width: "40px" }}
                    >
                        <EyeIcon />
                    </IconButton>
                </Stack>
                <Button
                    fullWidth
                    variant="contained"
                    size="medium"
                    className="hover-button"
                    onClick={() => {
                        openAddToCart(product);
                        updateItem(product, 1, { color: selectedColor, size: selectedSize });
                    }}
                    sx={{
                        height: "41px",
                        position: "absolute",
                        opacity: 0,
                        bottom: 0,
                        borderRadius: "0px",
                        backgroundColor: theme.palette.background.default,
                        transition: "opacity 0.35s ease"
                    }}
                    startIcon={<CartIcon />}
                >
                    {t("home.addToCart")}
                </Button>
            </Box>
            <CustomLink
                href={"/" + product.category + "/" + product.id + "/" + product.title}
                variant="h4"
                maxLength={250}
                sx={{ fontWeight: 600 }}
            >
                {product?.title}
            </CustomLink>
            <ProductPrice
                showOldPrice={true}
                price={product?.price}
                finalPrice={product?.finalPrice}
                locale={locale || "en"}
            />
            <ProductRating rating={product?.rating} />
            <ColorSelect
                isLabel={false}
                imgs={product?.image || []}
                selectedColor={selectedColor}
                handleColorChange={(color) => setSelectedColor(color, product.id)}
            />
            <SizeSelect
                variant="small"
                sizes={product.sizes || []}
                selectedSize={selectedSize}
                handleSizeChange={(size: string) => setSelectedSize(size, product.id)}
            />
        </Box>
    );
});
