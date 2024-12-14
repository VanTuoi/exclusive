import { Box, Container } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";

import { BagIcon, DollarIcon, PurseIcon, StoreIcon } from "~/assets/icons";

import { SupportItem } from "./item";

export const Prices = memo(() => {
    const { t } = useTranslation();

    return (
        <Container maxWidth={"lg"}>
            <Box
                display={"flex"}
                flexDirection={{ xs: "column", lg: "row" }}
                alignItems={"center"}
                justifyContent={"center"}
                gap={{
                    xs: 2,
                    lg: 4
                }}
            >
                <SupportItem
                    title={t("about.section2.0.title")}
                    content={t("about.section2.0.content")}
                    icon={<StoreIcon />}
                />
                <SupportItem
                    title={t("about.section2.1.title")}
                    content={t("about.section2.1.content")}
                    icon={<DollarIcon />}
                />
                <SupportItem
                    title={t("about.section2.2.title")}
                    content={t("about.section2.2.content")}
                    icon={<BagIcon />}
                />
                <SupportItem
                    title={t("about.section2.3.title")}
                    content={t("about.section2.3.content")}
                    icon={<PurseIcon />}
                />
            </Box>
        </Container>
    );
});
