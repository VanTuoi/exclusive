import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { memo } from "react";

import { useThemeStore } from "~/stores";

export const ThemeToggle = memo(() => {
    const { type, setType } = useThemeStore();

    const toggleTheme = () => {
        setType(type === "light" ? "dark" : "light");
    };

    return (
        <IconButton onClick={toggleTheme} color="inherit">
            {type === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
    );
});
