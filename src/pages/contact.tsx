import { Box, Container, Grid2 } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { MainLayout } from "~/layout";
import { Path } from "~/types";

import { InfoContact } from "~/components/pages";
import { BreadcrumbsComponent } from "~/components/ui";
import { ContactForm } from "~/components/ui/forms/contact-form";

import type { NextPageWithLayout } from "~/pages/_app";

const CartPage: NextPageWithLayout = () => {
    const paths: Path[] = [
        { title: "Home", link: "/" },
        { title: "Contact", link: "/contact" }
    ];

    return (
        <Container maxWidth="lg">
            <Box paddingBottom={2}>
                <BreadcrumbsComponent paths={paths} />
                <Grid2 container spacing={5}>
                    <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
                        <InfoContact />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6, lg: 8 }}>
                        <ContactForm />
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
