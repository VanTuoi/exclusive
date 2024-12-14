import { Container, Stack } from "@mui/material";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { MainLayout } from "~/layout";
import { NextPageWithLayout } from "~/pages/_app";
import { Product } from "~/types";

import { ProductDetails, RelatedProduct } from "~/components/pages";

type ProductPageProps = {
    product?: Product;
};

const ProductPage: NextPageWithLayout<ProductPageProps> = ({ product }) => {
    return (
        <Container maxWidth="lg" sx={{ paddingTop: { xs: 0, lg: 5 } }}>
            <Stack direction="column" gap={{ xs: 3, lg: 10 }} paddingBottom={10}>
                <ProductDetails product={product} />
                <RelatedProduct id={product?.id} />
            </Stack>
        </Container>
    );
};

ProductPage.Layout = MainLayout;

export default ProductPage;

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (context: GetServerSidePropsContext) => {
    const { params, locale } = context;
    const id = params?.id as string | undefined;

    if (!id) {
        return {
            notFound: true
        };
    }

    try {
        const response = await fetch(`http://localhost:3000/api/product/${id}`);
        if (!response.ok) {
            return {
                notFound: true
            };
        }

        const product = await response.json();

        return {
            props: {
                ...(await serverSideTranslations(locale as string, ["common"])),
                product: product.data as Product
            }
        };
    } catch (error) {
        console.error("Error fetching product:", error);
        return {
            notFound: true
        };
    }
};
