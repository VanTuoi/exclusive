import { useRouter } from "next/router";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, IconButton, Menu, MenuItem, Skeleton, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import React, { memo, useEffect, useState } from "react";

import { LANGUAGES } from "~/constants";

export const LanguageSelect = memo(() => {
    const { t } = useTranslation();

    const router = useRouter();
    const { pathname, query, asPath, locale } = router;

    const [language, setLanguage] = useState<string>("en");
    const [loading, setLoading] = useState<boolean>(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        setLanguage(locale || "en");
        setLoading(false);
    }, [locale]);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleLocaleChange = (newLocale: string) => {
        handleCloseMenu();
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    return loading ? (
        <Skeleton variant="rectangular" width={80} height={30} />
    ) : (
        <Box>
            <Tooltip title={t("topHeader.selectLanguage")}>
                <Box
                    sx={{ display: "flex", flexDirection: "row", alignItems: "center", cursor: "pointer" }}
                    onClick={handleOpenMenu}
                >
                    <Typography>{LANGUAGES.find((lang) => lang.key === language)?.title}</Typography>
                    <IconButton onClick={handleOpenMenu} sx={{ p: 0, color: "inherit" }}>
                        <KeyboardArrowDownIcon />
                    </IconButton>
                </Box>
            </Tooltip>
            <Menu
                sx={{
                    gap: "8px",
                    mt: "25px",
                    "& .MuiPaper-root": {
                        color: "inherit",
                        backgroundColor: "rgba(0, 0, 0, 0.35)",
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                        backdropFilter: "blur(15px)",
                        WebkitBackdropFilter: "blur(10px)",
                        borderRadius: "10px",
                        border: "1px solid rgba(255, 255, 255, 0.18)"
                    }
                }}
                id="menu-language"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                {LANGUAGES.map((item) => (
                    <MenuItem
                        key={item.key}
                        onClick={() => handleLocaleChange(item.key)}
                        sx={{
                            paddingX: 3,
                            paddingTop: 1,
                            marginX: 1,
                            backgroundColor: item.key === language ? "rgba(0, 0, 0, 0.4)" : "inherit",
                            borderRadius: "8px",
                            ":hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.5)"
                            }
                        }}
                    >
                        <Typography variant="h4" sx={{ textAlign: "center", color: "secondary.light" }}>
                            {item.title}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
});
