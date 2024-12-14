import { Box, Container, Grid2 } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { MainLayout } from "~/layout";
import { Path } from "~/types";

import { Prices, SliderManager, Support, TopBanner } from "~/components/pages";
import { BreadcrumbsComponent } from "~/components/ui";

import type { NextPageWithLayout } from "~/pages/_app";

const CartPage: NextPageWithLayout = () => {
    const paths: Path[] = [
        { title: "Home", link: "/" },
        { title: "About", link: "/about" }
    ];

    return (
        <Container maxWidth="lg">
            <Box paddingBottom={2}>
                <BreadcrumbsComponent paths={paths} />
                <Grid2 container spacing={{ xs: 2, md: 5, lg: 17.5 }}>
                    <Grid2 size={{ xs: 12 }}>
                        <TopBanner />
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <Prices />
                    </Grid2>
                    <Grid2 size={{ xs: 12 }}>
                        <SliderManager />
                    </Grid2>
                    <Grid2 size={{ xs: 12 }} mb={15}>
                        <Support />
                    </Grid2>
                </Grid2>
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
