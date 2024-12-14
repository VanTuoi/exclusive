import { Container, Skeleton } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useRef } from "react";
import { SwiperSlide } from "swiper/react";

import { useFlashSales } from "~/hooks";

import { ProductComponent, Section, SliderProducts } from "~/components/ui";

import { getDatePlusNDays } from "~/utils/time";

type SliderProductsRef = {
    slideNext: () => void;
    slidePrev: () => void;
};

export const FlashSales = memo(() => {
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
                nextItem={true}
                viewAll="bottom"
                title={t("home.flashSale.title")}
                content={t("home.flashSale.content")}
                timePromotion={getDatePlusNDays(20)}
                multiRow={1}
                borderless={true}
                handleChangeStep={handleChangeStep}
            >
                {!isLoading ? (
                    <SliderProducts ref={sliderRef}>
                        {dataFlashSafe.map((item) => (
                            <SwiperSlide key={item.title} style={{ width: "250px", height: "auto" }}>
                                <ProductComponent product={item} key={item.id} />
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
