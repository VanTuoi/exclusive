// eslint-disable-next-line check-file/filename-naming-convention
import { useRouter } from "next/router";

import { Box, Typography } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { memo } from "react";

import { MainLayout } from "~/layout";

import { CusTomButton } from "~/components/ui";

import { NextPageWithLayout } from "./_app";

const Custom404: NextPageWithLayout = memo(() => {
    const router = useRouter();

    const { t } = useTranslation();

    return (
        <Box display="flex" flexDirection={"column"} justifyContent="center" alignItems="center" height="100vh">
            <Typography
                variant="h3"
                sx={{ fontFamily: "Inter", fontSize: "110px", fontWeight: 500, lineHeight: "115px" }}
            >
                {t("404.title")}
            </Typography>
            <Typography mt={"40px"} variant="h4">
                {t("404.content")}
            </Typography>
            <CusTomButton
                sx={{ marginTop: "80px" }}
                variant="contained"
                sizeVariant="large"
                onClick={() => {
                    router.push("/");
                }}
            >
                {t("404.button")}
            </CusTomButton>
        </Box>
    );
});

Custom404.Layout = MainLayout;

export default Custom404;

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["common"]))
        }
    };
};
