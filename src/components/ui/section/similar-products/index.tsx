import { Box, Skeleton } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useRef } from "react";

import { useFlashSales } from "~/hooks";

import { ProductComponent, Section } from "~/components/ui";

type SliderProductsRef = {
    slideNext: () => void;
    slidePrev: () => void;
};

export const SimilarProducts = memo(() => {
    const { t } = useTranslation();

    const { dataFlashSafe, isLoading } = useFlashSales();

    const sliderRef = useRef<SliderProductsRef | null>(null);

    const handleChangeStep = ({ step }: { step: "next" | "previous" }) => {
        if (sliderRef.current) {
            if (step === "next") sliderRef.current.slideNext();
            else sliderRef.current.slidePrev();
        }
    };

    return !isLoading ? (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            paddingY={3}
            paddingLeft={6}
        >
            <Section
                viewAll="none"
                title={t("home.addToCartDialog.similarProduct")}
                content=""
                timePromotion=""
                multiRow={1}
                nextItem={false}
                borderless={false}
                handleChangeStep={handleChangeStep}
            >
                <Box
                    margin={"0 auto"}
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    flexWrap={"wrap"}
                    gap={1}
                >
                    {dataFlashSafe.map((item) => (
                        <Box key={item.title} sx={{ width: "250px", height: "auto" }}>
                            <ProductComponent product={item} />
                        </Box>
                    ))}
                </Box>
            </Section>
        </Box>
    ) : (
        <>
            <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                flexWrap={"wrap"}
                justifyContent={"center"}
                paddingY={3}
                paddingLeft={6}
                gap={1}
            >
                <Skeleton variant="rounded" width={"240px"} height={"300px"}></Skeleton>
                <Skeleton variant="rounded" width={"240px"} height={"300px"}></Skeleton>
            </Box>
        </>
    );
});
