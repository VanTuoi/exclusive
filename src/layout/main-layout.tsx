import { Box, useTheme } from "@mui/material";
import { memo, ReactNode } from "react";

import { Footer, Header } from "~/components/common";
import { AddToCart, ScrollToTopButton, ViewMore } from "~/components/ui";

import { styles } from "~/style/common/main-layout";

interface RootLayoutProps {
    children: ReactNode;
}

export const MainLayout = memo(({ children }: RootLayoutProps) => {
    const theme = useTheme();

    return (
        <>
            <Box sx={styles.boxContainerStyles}>
                <Header />
                <Box component="main" sx={styles.mainBoxStyles(theme)}>
                    {children}
                </Box>
                <Footer />
                <ScrollToTopButton />
            </Box>
            <ViewMore />
            <AddToCart />
        </>
    );
});
