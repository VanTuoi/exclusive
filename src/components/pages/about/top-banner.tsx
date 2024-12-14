import Image from "next/image";

import { Box, Container, Typography, useTheme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";

export const TopBanner = memo(() => {
    const { t } = useTranslation();

    const theme = useTheme();

    return (
        <Container
            maxWidth="xl"
            sx={{
                ml: 0,
                mr: "auto",
                overflow: "visible",
                width: {
                    lg: `calc(100% + (${theme.breakpoints.values.xl}px - ${theme.breakpoints.values.lg}px) / 2)`,
                    xs: "100%"
                }
            }}
        >
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"center"} gap={4}>
                <Box display={"flex"} flexDirection={"column"} sx={{ maxWidth: { xs: "100%", md: "570px" } }} gap={4}>
                    <Typography
                        variant="h2"
                        sx={{ fontSize: "54px", lineHeight: "64px", letterSpacing: "0.06em", fontWeight: 600 }}
                    >
                        {t("about.section1.title")}
                    </Typography>
                    <Typography sx={{ fontSize: "16px", lineHeight: "26px", fontWeight: 400 }}>
                        {t("about.section1.content1")}
                    </Typography>
                    <Typography sx={{ fontSize: "16px", lineHeight: "26px", fontWeight: 400 }}>
                        {t("about.section1.content2")}
                    </Typography>
                </Box>
                <Image alt="img banner" height={609} width={837} src={"/assets/imgs/about-banner.webp"}></Image>
            </Box>
        </Container>
    );
});
