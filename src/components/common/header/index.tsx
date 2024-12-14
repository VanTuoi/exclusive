import { Container, Divider, Toolbar, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { memo } from "react";

import { styles } from "~/style/common/header/header";

import { BottomHeader } from "./bottom-header";
import { TopHeader } from "./top-header";

export const Header = memo(() => {
    const theme = useTheme();

    return (
        <AppBar elevation={0} sx={styles.appBarStyles(theme)}>
            <TopHeader />
            <Toolbar sx={{ paddingX: 0 }}>
                <Container maxWidth="lg" sx={{ padding: "0px" }}>
                    <BottomHeader />
                </Container>
            </Toolbar>
            <Divider />
        </AppBar>
    );
});
