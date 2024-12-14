import Image from "next/image";
import { useRouter } from "next/router";

import { Box, Button, IconButton, Stack, useTheme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";

import { useCartStore, useWishList } from "~/stores";
import { Product } from "~/types";

import { CartIcon, DeleteIcon } from "~/assets/icons";

import { CustomLink } from "../../links";

import { ColorSelect } from "./colors-select";
import { Discount } from "./discount";
import { ProductPrice } from "./product-prices";
import { ProductRating } from "./product-rating";
import { SizeSelect } from "./size-product";

interface ProductComponentProps {
    product: Product;
}

export const ProductWishListComponent = memo(({ product }: ProductComponentProps) => {
    const { t } = useTranslation();

    const theme = useTheme();

    const router = useRouter();

    const { locale } = router;

    const { updateItem } = useCartStore();

    const { items, toggleWishList, isProductInWishList } = useWishList();

    const selectedColor = items[product.id].selectedOptions?.color || "";
    const selectedSize = items[product.id].selectedOptions?.size || "";

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
                        onClick={() => toggleWishList(product, { color: selectedColor, size: selectedSize })}
                        variant={isProductInWishList(product.id) ? "contained" : "default"}
                        aria-label="fingerprint"
                        color="inherit"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Stack>
                <Button
                    fullWidth
                    variant="contained"
                    size="medium"
                    className="hover-button"
                    onClick={() => {
                        toggleWishList(product, { color: selectedColor, size: selectedSize });
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
                handleColorChange={(color) => toggleWishList(product, { color: color, size: selectedSize })}
            />
            <SizeSelect
                variant="small"
                sizes={product.sizes || []}
                selectedSize={selectedSize}
                handleSizeChange={(size) => toggleWishList(product, { color: selectedColor, size: size })}
            />
        </Box>
    );
});
