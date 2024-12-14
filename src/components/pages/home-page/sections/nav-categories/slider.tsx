import Image from "next/image";
import { useRouter } from "next/router";

import { Box, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { memo, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useHome } from "~/hooks";

export const Slider = memo(() => {
    const { dataBanner } = useHome();
    const router = useRouter();

    const theme = useTheme();
    const isSmallDisplay = useMediaQuery(theme.breakpoints.down("lg"));

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [width, setWidth] = useState<number>(0);

    useEffect(() => {
        if (dataBanner) setIsLoading(false);
    }, [dataBanner]);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const height = isSmallDisplay ? width * (463 / 1200) : 344;

    return !isLoading ? (
        <Box width={isSmallDisplay ? "100%" : "892px"} height={height}>
            <Swiper
                pagination={{
                    clickable: true,
                    renderBullet: (index: number, className: string) => {
                        return `<span class="${className}" style="border: 2px solid #fff; border-radius: 50%; width: 15px; height: 15px; display: inline-block; margin: 0 5px; background: ${index >= 0 ? "#ff0000" : "#ccc"};"></span>`;
                    }
                }}
                loop={true}
                modules={[Pagination]}
                style={{
                    height: "100%",
                    width: "100%"
                }}
            >
                {dataBanner?.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <Image
                            src={slide.url}
                            alt={slide.alt}
                            fill
                            sizes="100%"
                            style={{ objectFit: "cover", cursor: "pointer" }}
                            onClick={() => router.push(slide.link)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    ) : (
        <Skeleton variant="rounded" width={isSmallDisplay ? "100%" : "892px"} height={height} />
    );
});
