import Image from "next/image";

import { Box } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { MainLayout } from "~/layout";

import { ForgetpasswordForm } from "~/components/ui";

import type { NextPageWithLayout } from "~/pages/_app";

const ForgetPasswordPage: NextPageWithLayout = () => {
    return (
        <Box
            sx={{
                paddingTop: "58px",
                paddingBottom: "140px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start"
            }}
        >
            <Box sx={{ height: "781px", width: "805px", marginLeft: "-4px", position: "relative" }}>
                <Image src={"/assets/imgs/login.webp"} fill sizes="100%" alt="login img" />
            </Box>
            <Box sx={{ width: "auto" }}>
                <ForgetpasswordForm />
            </Box>
        </Box>
    );
};

ForgetPasswordPage.Layout = MainLayout;

export default ForgetPasswordPage;

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["common"]))
        }
    };
};
