import { Container, Skeleton } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useRef } from "react";
import { SwiperSlide } from "swiper/react";

import { useFlashSales } from "~/hooks";

import { ProductJustForYouComponent, Section, SliderProducts } from "~/components/ui";

type SliderProductsRef = {
    slideNext: () => void;
    slidePrev: () => void;
};

export const JustForYou = memo(() => {
    const { t } = useTranslation();
    const { dataFlashSafe, isLoading } = useFlashSales();

    const sliderRef = useRef<SliderProductsRef | null>(null);

    const handleChangeStep = ({ step }: { step: "next" | "previous" }) => {
        if (sliderRef.current) {
            if (step === "next") sliderRef.current.slideNext();
            else sliderRef.current.slidePrev();
        }
    };

    return (
        <Container maxWidth={"lg"}>
            <Section
                nextItem={false}
                viewAll="top-right"
                variantButton="outlined"
                title={t("wishList.justForYou.title")}
                content=""
                timePromotion=""
                multiRow={1}
                borderless={false}
                handleChangeStep={handleChangeStep}
            >
                {!isLoading ? (
                    <SliderProducts ref={sliderRef}>
                        {dataFlashSafe.map((item) => (
                            <SwiperSlide key={item.title} style={{ width: "270px", height: "auto" }}>
                                <ProductJustForYouComponent product={item} key={item.id} />
                            </SwiperSlide>
                        ))}
                    </SliderProducts>
                ) : (
                    <Skeleton variant="rounded" width={"244px"} height={"244px"}></Skeleton>
                )}
            </Section>
        </Container>
    );
});
