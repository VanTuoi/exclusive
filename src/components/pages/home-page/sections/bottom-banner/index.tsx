import Image from "next/image";

import { Box, Button, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";

import { PromotionPeriod } from "~/components/ui";

import { getDatePlusNDays } from "~/utils/time";

export const BottomBanner = memo(() => {
    const { t } = useTranslation();

    const theme = useTheme();
    const isSmallDisplay = useMediaQuery(theme.breakpoints.down("lg"));

    const bannerWidth = isSmallDisplay ? "100%" : "1170px";
    const bannerHeight = isSmallDisplay ? `${(533 / 1170) * 185}vw` : "533px";

    const imageWidth = isSmallDisplay ? "50%" : "533px";
    const imageHeight = isSmallDisplay ? `${(350 / 533) * 50}vw` : "350px";

    return (
        <Container maxWidth={"lg"}>
            <Box
                sx={{
                    height: bannerHeight,
                    width: bannerWidth,
                    backgroundColor: "background.default",
                    position: "relative"
                }}
            >
                <Box
                    sx={{
                        height: imageHeight,
                        width: imageWidth,
                        position: "absolute",
                        top: "5%",
                        right: "6%",
                        zIndex: 1,
                        transition: "transform 0.3s ease-in-out",
                        ":hover": {
                            transform: "scale(1.03)"
                        }
                    }}
                >
                    <Image
                        src={"/assets/imgs/bottom-banner.webp"}
                        alt=""
                        style={{ transform: "scaleX(-1)" }}
                        fill
                        sizes="100%"
                    />
                </Box>
                <Box
                    sx={{
                        borderRadius: "50%",
                        zIndex: 0,
                        padding: isSmallDisplay ? `${(260 / 533) * 50}vw` : "260px",
                        position: "absolute",
                        right: "6%",
                        backgroundColor: "rgba(113, 124, 124, 0.55)",
                        filter: "blur(70px)"
                    }}
                ></Box>
                <Box
                    sx={{
                        height: "auto",
                        width: isSmallDisplay ? `${(400 / 1170) * 100}vw` : "400px",
                        position: "absolute",
                        top: isSmallDisplay ? `${(70 / 533) * 100}vw` : "70px",
                        gap: isSmallDisplay ? `${(32 / 533) * 100}vw` : "32px",
                        left: isSmallDisplay ? `${(56 / 1170) * 100}vw` : "56px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start"
                    }}
                >
                    <Typography variant="h4" sx={{ color: "#00FF66" }}>
                        {t("home.bottomBanner.title")}
                    </Typography>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: {
                                xs: "18px",
                                md: "48px"
                            },
                            fontWeight: "600",
                            lineHeight: {
                                xs: "22px",
                                md: "60px"
                            },
                            width: isSmallDisplay ? `${(450 / 1170) * 100}vw` : "450px",
                            color: "background.paper"
                        }}
                    >
                        {t("home.bottomBanner.content")}
                    </Typography>
                    <PromotionPeriod time={getDatePlusNDays(30)} type="contained" />
                    <Box
                        width={isSmallDisplay ? "90vw" : "171px"}
                        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
                    >
                        <Button
                            variant="contained"
                            size={!isSmallDisplay ? "large" : "medium"}
                            sx={{
                                width: "171px",
                                backgroundColor: "#00FF66",
                                ":hover": {
                                    backgroundColor: "#00FF55"
                                }
                            }}
                        >
                            {t("home.bottomBanner.button")}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
});
