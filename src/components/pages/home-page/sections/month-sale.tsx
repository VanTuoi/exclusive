import { Container } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useRef } from "react";
import { SwiperSlide } from "swiper/react";

import { useHome } from "~/hooks";

import { ProductComponent, Section, SliderProducts } from "~/components/ui";

type SliderProductsRef = {
    slideNext: () => void;
    slidePrev: () => void;
};

export const MonthSale = memo(() => {
    const { t } = useTranslation();

    const { dataFlashSafe } = useHome();

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
                viewAll="top-right"
                title={t("home.monthSale.title")}
                content={t("home.monthSale.content")}
                timePromotion=""
                multiRow={1}
                borderless={false}
                nextItem={false}
                handleChangeStep={handleChangeStep}
            >
                <SliderProducts ref={sliderRef}>
                    {dataFlashSafe.map((item) => (
                        <SwiperSlide key={item.title} style={{ width: "250px", height: "auto" }}>
                            <ProductComponent product={item} />
                        </SwiperSlide>
                    ))}
                </SliderProducts>
            </Section>
        </Container>
    );
});
