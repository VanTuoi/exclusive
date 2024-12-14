// eslint-disable-next-line check-file/filename-naming-convention
import { AppProps } from "next/app";
import Head from "next/head";

// eslint-disable-next-line import/order
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { NextPage } from "next";
import { appWithTranslation, UserConfig } from "next-i18next";
import { ElementType, useMemo } from "react";

import { EmptyLayout } from "~/layout";
import theme from "~/themes";

import { CustomNextNProgress, CustomSnackbar } from "~/components/common";

import { useThemeStore } from "~/stores/theme";

import nextI18NextConfig from "../../next-i18next.config.js";
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    Layout?: ElementType;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

const emptyInitialI18NextConfig: UserConfig = {
    i18n: {
        defaultLocale: nextI18NextConfig.i18n.defaultLocale,
        locales: nextI18NextConfig.i18n.locales
    }
};

function MyApp({ Component, pageProps, ...props }: AppPropsWithLayout) {
    const { type } = useThemeStore();
    const muiTheme = useMemo(() => theme({ type }), [type]);

    const Layout = Component.Layout ?? EmptyLayout;

    return (
        <AppCacheProvider {...props}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={muiTheme}>
                <CssBaseline />
                <CustomNextNProgress />
                <CustomSnackbar>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </CustomSnackbar>
            </ThemeProvider>
        </AppCacheProvider>
    );
}
export default appWithTranslation(MyApp, emptyInitialI18NextConfig);
