import { Stack } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { MainLayout } from "~/layout";

import {
    Arrival,
    BottomBanner,
    BrowseByCategory,
    ExploreProducts,
    FlashSales,
    HomeNavCategories,
    MonthSale,
    Support
} from "~/components/pages";

import type { NextPageWithLayout } from "~/pages/_app";

const HomePage: NextPageWithLayout = () => {
    return (
        <Stack
            direction={"column"}
            gap={{
                xs: 2,
                md: 5,
                lg: 10
            }}
            paddingBottom={10}
        >
            <HomeNavCategories />
            <FlashSales />
            <BrowseByCategory />
            <MonthSale />
            <BottomBanner />
            <ExploreProducts />
            <Arrival />
            <Support />
        </Stack>
    );
};

HomePage.Layout = MainLayout;

export default HomePage;

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["common"]))
        }
    };
};
