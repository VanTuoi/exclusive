import Image from "next/image";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, Fade, IconButton, MobileStepper, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import React, { memo, useEffect, useRef, useState } from "react";
import { Lightbox } from "yet-another-react-lightbox";

import "yet-another-react-lightbox/styles.css";
import { ImageProduct } from "~/types/product";

import { NextJsImage } from "./image-lightbox";
import { ThumbnailList } from "./thumbnail-list";

interface SliderProps {
    images?: ImageProduct[] | [];
    width?: string;
    selectedColor?: string;
}

export const Slider = memo(({ images = [], width = "500px", selectedColor }: SliderProps) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const [isHover, setIsHover] = useState<boolean>(false);

    const [activeStep, setActiveStep] = useState<number>(0);
    const [openLightbox, setOpenLightbox] = useState<boolean>(false);
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    const maxSteps = images.length;

    const slides = images.map((image) => ({
        src: image.url,
        width: 1920,
        height: 1080,
        alt: image.alt
    }));

    const handleThumbnailClick = (index: number) => {
        setActiveStep(index);
    };

    const handleCloseLightbox = () => {
        setOpenLightbox(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        touchEndX.current = e.changedTouches[0].screenX;
        handleSwipe();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        touchStartX.current = e.screenX;
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        touchEndX.current = e.screenX;
        handleSwipe();
    };

    const handleSwipe = () => {
        if (touchStartX.current !== null && touchEndX.current !== null) {
            const distance = touchStartX.current - touchEndX.current;
            const threshold = 50;

            if (distance > threshold && activeStep < maxSteps - 1) {
                setActiveStep((prev) => prev + 1);
            } else if (distance < -threshold && activeStep > 0) {
                setActiveStep((prev) => prev - 1);
            }

            touchStartX.current = null;
            touchEndX.current = null;
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => {
                const nextStep = (prev + 1) % maxSteps;
                return nextStep;
            });
        }, 5000);

        return () => clearInterval(timer);
    }, [maxSteps]);

    useEffect(() => {
        if (selectedColor) {
            images
                .filter((image) => !image.isIllustration)
                .map((item, index) => {
                    if (item.colorCode === selectedColor) setActiveStep(index);
                });
        }
    }, [selectedColor]);

    return images.length > 0 ? (
        <Box
            display={"flex"}
            flexDirection={{
                xs: "column-reverse",
                md: "row"
            }}
            justifyContent={{
                xs: "center",
                lg: "flex-start"
            }}
            gap={{
                xs: "10px",
                md: "30px"
            }}
        >
            <Box>
                <ThumbnailList
                    imgHeight={138}
                    imgWidth={170}
                    width={width}
                    images={images}
                    activeStep={activeStep}
                    onThumbnailClick={handleThumbnailClick}
                    spacing={!isSmallScreen ? 16 : 8}
                />
            </Box>
            <Box sx={{ borderRadius: "4px", position: "relative" }}>
                <Box
                    sx={{
                        aspectRatio: 5 / 6,
                        width: width,
                        position: "relative",
                        borderRadius: "4px",
                        backgroundColor: theme.palette.grey[100]
                    }}
                >
                    {images.map((image, index) => (
                        <Fade in={activeStep === index} timeout={500} key={index} unmountOnExit mountOnEnter>
                            <Box
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                                sx={{
                                    position: "absolute",
                                    cursor: "zoom-out",
                                    zIndex: 3,
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Image
                                    src={image.url}
                                    alt={`Banner ${index + 1}`}
                                    fill
                                    sizes="100%"
                                    style={{ objectFit: "contain" }}
                                    draggable={false}
                                />
                            </Box>
                        </Fade>
                    ))}
                </Box>

                <MobileStepper
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    steps={maxSteps}
                    activeStep={activeStep}
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    onClick={() => setOpenLightbox(true)}
                    sx={{
                        position: "absolute",
                        opacity: isHover ? 1 : 0,
                        top: 0,
                        left: 0,
                        zIndex: isHover ? 4 : 0,
                        width: width,
                        aspectRatio: 5 / 6,
                        backgroundColor: "transparent",
                        padding: 0,
                        "& .MuiMobileStepper-dots": {
                            display: "none"
                        }
                    }}
                    nextButton={
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveStep((prev) => Math.min(prev + 1, maxSteps - 1));
                            }}
                            disabled={activeStep === maxSteps - 1}
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.3)",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.9)"
                                },
                                display: {
                                    xs: "none",
                                    md: "block"
                                },
                                height: "50px",
                                width: "50px",
                                borderRadius: "50%",
                                position: "absolute",
                                top: "50%",
                                right: 10,
                                transform: "translateY(-50%)"
                            }}
                            aria-label="Next Image"
                        >
                            {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </IconButton>
                    }
                    backButton={
                        <IconButton
                            size="small"
                            onClick={(e) => {
                                setActiveStep((prev) => Math.max(prev - 1, 0));
                                e.stopPropagation();
                            }}
                            disabled={activeStep === 0}
                            sx={{
                                backgroundColor: "rgba(255, 255, 255, 0.3)",
                                "&:hover": {
                                    backgroundColor: "rgba(255, 255, 255, 0.9)"
                                },
                                display: {
                                    xs: "none",
                                    md: "block"
                                },
                                height: "50px",
                                width: "50px",
                                borderRadius: "50%",
                                position: "absolute",
                                top: "50%",
                                left: 10,
                                transform: "translateY(-50%)"
                            }}
                            aria-label="Previous Image"
                        >
                            {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        </IconButton>
                    }
                />

                <Lightbox
                    open={openLightbox}
                    close={handleCloseLightbox}
                    index={activeStep}
                    slides={slides}
                    on={{
                        view: ({ index }) => setActiveStep(index)
                    }}
                    render={{ slide: (props) => <NextJsImage {...props} /> }}
                />
            </Box>
        </Box>
    ) : (
        <Skeleton variant="rectangular" width={width} height="auto" sx={{ borderRadius: "8px" }} />
    );
});
