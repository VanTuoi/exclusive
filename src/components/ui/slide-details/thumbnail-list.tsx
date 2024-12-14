import Image from "next/image";

import { Box, IconButton, useTheme } from "@mui/material";
import { memo } from "react";

import { ImageProduct } from "~/types/product";

interface ThumbnailListProps {
    width?: string;
    images: ImageProduct[];
    activeStep: number;
    onThumbnailClick?: (index: number) => void;
    spacing?: number;
    imgHeight?: number;
    imgWidth?: number;
}

export const ThumbnailList = memo(
    ({
        width,
        images,
        activeStep,
        onThumbnailClick,
        spacing = 8,
        imgHeight = 138,
        imgWidth = 170
    }: ThumbnailListProps) => {
        const theme = useTheme();
        return (
            <Box
                sx={{
                    height: {
                        xs: "138px",
                        md: "600px"
                    },
                    display: "flex",
                    flexDirection: {
                        xs: "row",
                        md: "column"
                    },
                    maxWidth: width,
                    justifyContent: "flex-start",
                    gap: `${spacing}px`,
                    overflowY: {
                        xs: "hidden",
                        md: "auto"
                    },
                    overflowX: {
                        xs: "auto",
                        md: "hidden"
                    },
                    "&::-webkit-scrollbar": {
                        display: "none"
                    },
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none"
                }}
            >
                {images.map((image, index) => (
                    <IconButton
                        key={index}
                        onClick={() => onThumbnailClick && onThumbnailClick(index)}
                        sx={{
                            backgroundColor: theme.palette.grey[100],
                            border:
                                activeStep === index
                                    ? `2px solid ${theme.palette.secondary.main}`
                                    : "2px solid transparent",
                            borderRadius: "4px",
                            padding: 0,
                            width: `${imgWidth}px`,
                            height: `${imgHeight}px`,
                            transition: "border 0.3s, transform 0.3s",
                            flex: "0 0 auto",
                            "&:hover": {
                                transform: activeStep !== index ? "scale(1.05)" : "scale(1)"
                            }
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                height: "100%",
                                borderRadius: "4px",
                                overflow: "hidden"
                            }}
                        >
                            <Image
                                src={image.url}
                                alt={`Thumbnail ${index + 1}`}
                                layout="fill"
                                sizes="100%"
                                style={{
                                    objectFit: "cover"
                                }}
                                draggable={false}
                            />
                        </Box>
                    </IconButton>
                ))}
            </Box>
        );
    }
);
