import { useMediaQuery, useTheme } from "@mui/material";
import { memo, useEffect, useState } from "react";

import { NavCategoriesDesktop } from "./nav-desktop";
import { NavCategoriesMobile } from "./nav-mobile";

export const NavCategoriesWrapper = memo(() => {
    const theme = useTheme();
    const isSmallDisplay = useMediaQuery(theme.breakpoints.down("lg"));
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return isSmallDisplay ? <NavCategoriesMobile /> : <NavCategoriesDesktop />;
});
