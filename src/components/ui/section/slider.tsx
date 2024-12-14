import { Container, useMediaQuery, useTheme } from "@mui/material";
import { forwardRef, ReactNode, useImperativeHandle, useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";

interface SliderProductsProps {
    borderless?: boolean;
    multiRow?: number;
    children: ReactNode;
}

export const SliderProducts = forwardRef(({ multiRow, borderless, children }: SliderProductsProps, ref) => {
    const swiperRef = useRef<SwiperType | null>(null);

    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

    useImperativeHandle(ref, () => ({
        slideNext() {
            if (swiperRef.current) {
                swiperRef.current.slideNext();
            }
        },
        slidePrev() {
            if (swiperRef.current) {
                swiperRef.current.slidePrev();
            }
        }
    }));

    return (
        <Container maxWidth={"xl"} sx={{ overflow: { xs: "hidden", lg: "visible" } }}>
            <Swiper
                style={{
                    overflow: borderless && !isSmallScreen ? "visible" : "hidden"
                }}
                grid={{
                    rows: multiRow,
                    fill: "row"
                }}
                loop={false}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={"auto"}
                spaceBetween={isSmallScreen ? 5 : 30}
                pagination={false}
                modules={[Pagination, Grid]}
                className="mySwiper"
            >
                {children}
            </Swiper>
        </Container>
    );
});
