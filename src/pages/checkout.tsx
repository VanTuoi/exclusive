import { Container } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { MainLayout } from "~/layout";
import { Path } from "~/types";

import { CheckOutComponents } from "~/components/pages";
import { BreadcrumbsComponent } from "~/components/ui";

import type { NextPageWithLayout } from "~/pages/_app";

const CheckOutPage: NextPageWithLayout = () => {
    const paths: Path[] = [
        { title: "Account", link: "/account" },
        { title: "My Account", link: "/my-account" },
        { title: "Product", link: "/product" },
        { title: "View Cart", link: "/view-cart" },
        { title: "CheckOut", link: "/checkout" }
    ];

    return (
        <Container maxWidth="lg">
            <BreadcrumbsComponent paths={paths} />
            <CheckOutComponents />
        </Container>
    );
};

CheckOutPage.Layout = MainLayout;

export default CheckOutPage;

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["common"]))
        }
    };
};
