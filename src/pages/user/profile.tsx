import dynamic from "next/dynamic";

import { Box, Container } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { MainLayout } from "~/layout";
import { Path } from "~/types";

import { BreadcrumbsComponent, ProfileForm } from "~/components/ui";

import type { NextPageWithLayout } from "~/pages/_app";

interface NestedTab {
    [sectionTitle: string]: string[];
}

const VerticalTabs = dynamic(() => import("~/components/ui/tabs"), {
    ssr: false
});

const Profile: NextPageWithLayout = () => {
    const paths: Path[] = [
        { title: "Home", link: "/" },
        { title: "My Account", link: "/my-account" }
    ];
    const tabs: NestedTab[] = [
        { "Manage My Account": ["My Profile", "Address Book", "My Payment Options"] },
        { "My Orders": ["My Returns", "My Cancellations"] },
        { "My WishList": ["My WishList"] }
    ];

    return (
        <Container maxWidth="lg">
            <BreadcrumbsComponent paths={paths} />
            <Box>
                <VerticalTabs tabs={tabs}>
                    <ProfileForm />
                    <Box></Box>
                </VerticalTabs>
            </Box>
        </Container>
    );
};

Profile.Layout = MainLayout;

export default Profile;

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale as string, ["common"]))
        }
    };
};
