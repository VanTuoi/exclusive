import Image from "next/image";

import { Box } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { MainLayout } from "~/layout";

import { RegisterForm } from "~/components/ui";

import type { NextPageWithLayout } from "~/pages/_app";

const RegisterPage: NextPageWithLayout = () => {
    return (
        <Box
            sx={{
                paddingTop: {
                    xs: "0",
                    sm: "58px"
                },
                marginTop: {
                    xs: "-112px",
                    sm: "0px"
                },
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
                <RegisterForm />
            </Box>
        </Box>
    );
};

RegisterPage.Layout = MainLayout;

export default RegisterPage;

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["common"]))
        }
    };
};
