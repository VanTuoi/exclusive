import Image from "next/image";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useEffect, useState } from "react";

import { CustomLink } from "~/components/ui";

interface ArrivalItemProps {
    img: string;
    title: string;
    content: string;
    link: string;
    heightBox: number;
    heightImg: number;
    widthImg: number;
    isBlur: boolean;
    rotate?: boolean;
    right?: number;
    bottom?: number;
}

export const ArrivalItem = memo(
    ({
        img,
        title,
        content,
        link,
        heightBox,
        heightImg,
        widthImg,
        isBlur = false,
        rotate = false,
        right = 0,
        bottom = 0
    }: ArrivalItemProps) => {
        const { t } = useTranslation();

        const theme = useTheme();
        const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

        const [adjustedWidth, setAdjustedWidth] = useState(widthImg);
        const [adjustedHeight, setAdjustedHeight] = useState(heightImg);

        useEffect(() => {
            if (isMobile && window.innerWidth < widthImg) {
                const newWidth = window.innerWidth;
                const aspectRatio = heightImg / widthImg;
                setAdjustedWidth(newWidth);
                setAdjustedHeight(newWidth * aspectRatio);
            } else {
                setAdjustedWidth(widthImg);
                setAdjustedHeight(heightImg);
            }
        }, [isMobile, widthImg, heightImg]);

        return (
            <Box
                sx={{
                    width: "100%",
                    height: `${heightBox}px`,
                    borderRadius: "4px",
                    background: theme.palette.background.default,
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        height: `${adjustedHeight}px`,
                        width: `${adjustedWidth}px`,
                        position: "relative",
                        right: right,
                        bottom: bottom,
                        transform: rotate ? "scaleX(-1)" : "scaleX(1)",
                        transition: "transform 0.3s ease"
                    }}
                >
                    <Image alt={title} fill sizes="100%" src={img} style={{ zIndex: 1, objectFit: "cover" }} />
                    {isBlur && (
                        <Box
                            sx={{
                                borderRadius: "50%",
                                zIndex: 0,
                                padding: `${adjustedHeight / 2}px`,
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                backgroundColor: "rgba(113, 124, 124, 0.55)",
                                filter: "blur(70px)"
                            }}
                        ></Box>
                    )}
                </Box>
                <Box
                    sx={{
                        gap: 1,
                        color: theme.palette.background.paper,
                        position: "absolute",
                        left: 30,
                        bottom: 20,
                        zIndex: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start"
                    }}
                >
                    <Typography variant="h2" sx={{ fontWeight: 600 }}>
                        {title}
                    </Typography>
                    <Typography variant="h4" sx={{ maxWidth: "300px" }}>
                        {content}
                    </Typography>
                    <CustomLink variant="h4" href={link} underline={true} underlineThickness={1.5}>
                        {t("home.arrival.button")}
                    </CustomLink>
                </Box>
            </Box>
        );
    }
);
