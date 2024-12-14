// eslint-disable-next-line check-file/filename-naming-convention
import { useRouter } from "next/router";

import { Box, Typography } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { memo } from "react";

import { MainLayout } from "~/layout";

import { CusTomButton } from "~/components/ui";

import { NextPageWithLayout } from "../_app";

const Category: NextPageWithLayout = memo(() => {
    const router = useRouter();

    const { t } = useTranslation();

    return (
        <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems="center"
            sx={{ height: { xs: "90vh", md: "100vh" } }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontFamily: "Inter",
                    fontSize: { xs: "24px", md: "40px" },
                    mt: { xs: "20px", md: "10px" },
                    fontWeight: 500,
                    lineHeight: "45px"
                }}
            >
                {t("develop.title")}
            </Typography>
            <Typography mt={"20px"} variant="h4">
                {t("develop.content")}
            </Typography>
            <CusTomButton
                sx={{ marginTop: "20px" }}
                variant="contained"
                sizeVariant="large"
                onClick={() => {
                    router.push("/");
                }}
            >
                {t("develop.button")}
            </CusTomButton>
        </Box>
    );
});

Category.Layout = MainLayout;

export default Category;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["common"]))
        }
    };
};
