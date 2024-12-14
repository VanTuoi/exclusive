import Image from "next/image";

import { Box } from "@mui/material";
import { memo } from "react";
import {
    isImageFitCover,
    isImageSlide,
    SlideImage,
    useLightboxProps,
    useLightboxState
} from "yet-another-react-lightbox";

function isNextJsImage(slide: SlideImage): boolean {
    return isImageSlide(slide) && typeof slide.width === "number" && typeof slide.height === "number";
}

interface NextJsImageProps {
    slide: SlideImage;
    offset: number;
    rect: { width: number; height: number };
}

export const NextJsImage = memo(({ slide, offset, rect }: NextJsImageProps): JSX.Element | null => {
    const {
        on: { click },
        carousel: { imageFit }
    } = useLightboxProps();

    const { currentIndex } = useLightboxState();

    const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

    if (!isNextJsImage(slide) || !slide.height || !slide.width) return null;

    const width = !cover ? Math.round(Math.min(rect.width, (rect.height / slide.height) * slide.width)) : rect.width;

    const height = !cover ? Math.round(Math.min(rect.height, (rect.width / slide.width) * slide.height)) : rect.height;

    return (
        <Box
            sx={{
                position: "relative",
                width: width,
                height: height
            }}
        >
            <Image
                fill
                alt=""
                src={slide.src}
                loading="eager"
                draggable={false}
                placeholder={"blurDataURL" in slide && slide.blurDataURL ? "blur" : undefined}
                style={{
                    objectFit: cover ? "cover" : "contain",
                    cursor: click ? "pointer" : undefined
                }}
                sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
                onClick={offset === 0 ? () => click?.({ index: currentIndex }) : undefined}
            />
        </Box>
    );
});
