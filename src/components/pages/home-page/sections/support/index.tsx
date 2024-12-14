import { useRouter } from "next/router";

import { Box, Container } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";

import { formatCurrency } from "~/utils";

import { CustomerServicesIcon, DeliverIcon, SecureIcon } from "~/assets/icons";

import { SupportItem } from "./item";

export const Support = memo(() => {
    const { t } = useTranslation();

    const router = useRouter();
    const { locale } = router;

    const formattedCurrency = formatCurrency(140, locale || "en");

    return (
        <Container maxWidth={"lg"}>
            <Box
                display={"flex"}
                flexDirection={{ xs: "column", lg: "row" }}
                alignItems={"center"}
                justifyContent={"center"}
                gap={{
                    xs: 2,
                    lg: 10
                }}
            >
                <SupportItem
                    title={t("home.support.0.title")}
                    content={t("home.support.0.content", { objectName: formattedCurrency })}
                    icon={<DeliverIcon />}
                />
                <SupportItem
                    title={t("home.support.1.title")}
                    content={t("home.support.1.content")}
                    icon={<CustomerServicesIcon />}
                />
                <SupportItem
                    title={t("home.support.2.title")}
                    content={t("home.support.2.content")}
                    icon={<SecureIcon />}
                />
            </Box>
        </Container>
    );
});
