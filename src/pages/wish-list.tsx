import { Box, Container } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { MainLayout } from "~/layout";

import { WishList } from "~/components/pages";

import type { NextPageWithLayout } from "~/pages/_app";

const CartPage: NextPageWithLayout = () => {
    return (
        <Container maxWidth="lg">
            <Box paddingBottom={2}>
                <WishList />
            </Box>
        </Container>
    );
};

CartPage.Layout = MainLayout;

export default CartPage;

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["common"]))
        }
    };
};
