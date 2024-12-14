import Image from "next/image";

import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useMemo, useRef } from "react";
import { SwiperSlide } from "swiper/react";

import { useCartStore, useWishList } from "~/stores";

import { CusTomButton, ProductWishListComponent, SliderProducts } from "~/components/ui";

import { JustForYou } from "./just-for-you";

type SliderProductsRef = {
    slideNext: () => void;
    slidePrev: () => void;
};

export const WishList = memo(() => {
    const { t } = useTranslation();

    const { items, toggleWishList } = useWishList();

    const { updateItem } = useCartStore();

    const totalItems = useMemo(() => {
        return Object.values(items).reduce((sum) => sum + 1, 0);
    }, [items]);

    const sliderRef = useRef<SliderProductsRef | null>(null);

    const moveAllToCart = () => {
        Object.values(items).map((item) => {
            const product = item.product;
            const selectedOptions = item.selectedOptions;

            const selectedColor = selectedOptions.color || "";
            const selectedSize = selectedOptions.size || "";

            updateItem(product, 1, { color: selectedColor, size: selectedSize });
            toggleWishList(product, { color: selectedColor, size: selectedSize });
        });
    };

    return (
        <Stack direction={"column"} spacing={{ xs: 2, md: 5 }}>
            <Box
                display={"flex"}
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Typography variant="h3" paddingY={{ xs: 1, md: 5 }}>
                    {t("wishList.title")} ({totalItems})
                </Typography>
                {totalItems > 0 && (
                    <CusTomButton variant="outlined" size="large" onClick={() => moveAllToCart()}>
                        {t("wishList.button")}
                    </CusTomButton>
                )}
            </Box>
            {totalItems === 0 && (
                <Box
                    width={"100%"}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Box
                        sx={{
                            height: { xs: "50vw", md: "250px" },
                            width: { xs: "50vw", md: "200px" },
                            position: "relative"
                        }}
                    >
                        <Image
                            src={"/assets/imgs/empty-wish-list.webp"}
                            alt="empty-cart"
                            fill
                            sizes="100%"
                            style={{ objectFit: "cover" }}
                        />
                    </Box>
                </Box>
            )}
            <Box width={"100%"}>
                <SliderProducts multiRow={1} ref={sliderRef}>
                    {Object.values(items).map((item) => {
                        const product = item.product;
                        return (
                            <SwiperSlide key={product.id} style={{ width: "270px", height: "auto" }}>
                                <ProductWishListComponent product={product} />
                            </SwiperSlide>
                        );
                    })}
                </SliderProducts>
            </Box>
            <JustForYou />
        </Stack>
    );
});
