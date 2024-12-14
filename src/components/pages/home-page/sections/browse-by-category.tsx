import { Container } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useRef } from "react";
import { SwiperSlide } from "swiper/react";

import { useHome } from "~/hooks";

import { CategoriesComponent, Section, SliderProducts } from "~/components/ui";

type SliderProductsRef = {
    slideNext: () => void;
    slidePrev: () => void;
};

export const BrowseByCategory = memo(() => {
    const { t } = useTranslation();

    const { dataCategories } = useHome();

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
                viewAll="none"
                title={t("home.categories.title")}
                content={t("home.categories.content")}
                timePromotion=""
                multiRow={1}
                nextItem={true}
                borderless={false}
                handleChangeStep={handleChangeStep}
            >
                <SliderProducts ref={sliderRef}>
                    {dataCategories.map((item) => (
                        <SwiperSlide key={item.title} style={{ width: "170px", height: "auto" }}>
                            <CategoriesComponent categories={item} />
                        </SwiperSlide>
                    ))}
                </SliderProducts>
            </Section>
        </Container>
    );
});
