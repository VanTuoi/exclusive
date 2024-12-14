import { useRouter } from "next/router";

import { Box, useMediaQuery, useTheme } from "@mui/material";

import { NAV } from "~/constants";
import { useAuthStore } from "~/stores";

import { CustomLink } from "~/components/ui";

interface NavTitle {
    en: string;
    vi: string;
}

interface NavItem {
    title: NavTitle;
    link: string;
}

export const Nav = () => {
    const { userData } = useAuthStore();

    const router = useRouter();
    const { locale } = router;

    const currentLocale = locale === "vi" || locale === "en" ? locale : "en";

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box
            sx={{
                display: isSmallScreen ? "none" : "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "48px",
                marginLeft: "54px"
            }}
        >
            {NAV.filter((item: NavItem) => {
                return item.link !== "/auth/sign-up" || !userData;
            }).map((item: NavItem) => {
                return (
                    <CustomLink fontWeight={500} key={item.link} variant="h4" href={item.link}>
                        {item.title[currentLocale]}
                    </CustomLink>
                );
            })}
        </Box>
    );
};
