import { Container, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useRef } from "react";
import { SwiperSlide } from "swiper/react";

import { useHome } from "~/hooks";

import { ProductComponent, Section, SliderProducts } from "~/components/ui";

type SliderProductsRef = {
    slideNext: () => void;
    slidePrev: () => void;
};

export const ExploreProducts = memo(() => {
    const { dataFlashSafe } = useHome();

    const { t } = useTranslation();

    const theme = useTheme();

    const isSmallDisplay = useMediaQuery(theme.breakpoints.down("lg"));

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
                viewAll="bottom"
                title={t("home.explore.title")}
                content={t("home.explore.content")}
                timePromotion=""
                multiRow={isSmallDisplay ? 1 : 2}
                borderless={false}
                nextItem={true}
                handleChangeStep={handleChangeStep}
            >
                <SliderProducts ref={sliderRef}>
                    {[...dataFlashSafe, ...dataFlashSafe].map((item) => (
                        <SwiperSlide key={item.title} style={{ width: "250px", height: "auto" }}>
                            <ProductComponent product={item} />
                        </SwiperSlide>
                    ))}
                </SliderProducts>
            </Section>
        </Container>
    );
});
