import { Container, Skeleton } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useRef } from "react";
import { SwiperSlide } from "swiper/react";

import { ProductComponent, Section, SliderProducts } from "~/components/ui";

import { useFlashSales } from "~/hooks/homes/use-flash-sales";

type SliderProductsRef = {
    slideNext: () => void;
    slidePrev: () => void;
};

interface RelatedProductProps {
    id?: number;
}

export const RelatedProduct = memo(({ id }: RelatedProductProps) => {
    const { t } = useTranslation();

    console.log("Get related product with id ", id);
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
                viewAll="none"
                title={t("productDetail.relatedItem")}
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
