import { Container } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { MainLayout } from "~/layout";
import { Path } from "~/types";

import { CartComponents } from "~/components/pages";
import { BreadcrumbsComponent } from "~/components/ui";

import type { NextPageWithLayout } from "~/pages/_app";

const CartPage: NextPageWithLayout = () => {
    const paths: Path[] = [
        { title: "Home", link: "/" },
        { title: "Cart", link: "/cart" }
    ];

    return (
        <Container maxWidth="lg">
            <BreadcrumbsComponent paths={paths} />
            <CartComponents />
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
