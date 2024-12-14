import Image from "next/image";

import { memo } from "react";

interface NextJsImageProps {
    slide: {
        src: string;
        width: number;
        height: number;
    };
}
export const NextJsImage = memo(({ slide }: NextJsImageProps) => {
    return (
        <Image
            src={slide.src}
            alt="Lightbox Image"
            width={slide.width}
            height={slide.height}
            style={{ objectFit: "contain" }}
            draggable={false}
        />
    );
});
