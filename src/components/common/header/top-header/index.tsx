import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";

import { CustomLink } from "~/components/ui";

import { styles } from "~/style/common/header/top-header";

import { LanguageSelect } from "./language";

export const TopHeader = memo(() => {
    const theme = useTheme();

    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const { t } = useTranslation("common");

    return (
        <Box sx={styles.boxStyle(theme)}>
            <Box sx={styles.topHeaderStyle(theme)}>
                <Box sx={styles.linkStyle}>
                    <Typography
                        component="h5"
                        variant={isMobile ? "h6" : "h5"}
                        sx={{ wordBreak: "break-word", display: "inline" }}
                    >
                        {t("topHeader.saleContent")}
                        <CustomLink
                            variant={isMobile ? "h6" : "h5"}
                            href="/"
                            underline={true}
                            lineHeight={21}
                            underlineThickness={1.1}
                            fontWeight={600}
                            marginLeft={5}
                        >
                            {t("topHeader.saleLink")}
                        </CustomLink>
                    </Typography>
                </Box>
                <Box sx={styles.languageStyle()}>
                    <LanguageSelect />
                </Box>
            </Box>
        </Box>
    );
});
