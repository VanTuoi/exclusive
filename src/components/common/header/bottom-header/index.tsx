import { Box } from "@mui/material";
import { memo } from "react";

import { styles } from "~/style/common/header/bottom-header";

import { Logo } from "../../logo";

import { AvatarUser } from "./avatar";
import { CartUser } from "./cart";
import { Nav } from "./nav";
import { Search } from "./search";
import { WishList } from "./wish-list";

export const BottomHeader = memo(() => {
    return (
        <Box sx={styles.headerStyle()}>
            <Logo />
            <Nav />
            <Box sx={styles.boxStyle()}>
                <Search />
                <WishList />
                <CartUser />
                <AvatarUser />
            </Box>
        </Box>
    );
});
