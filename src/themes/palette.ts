import { PaletteOptions } from "@mui/material/styles/createPalette";

import { ThemeOption } from "~/types";

export default function themePalette(theme: ThemeOption): PaletteOptions {
    return {
        primary: {
            light: theme.colors?.primaryLight,
            main: theme.colors?.primaryMain,
            dark: theme.colors?.primaryDark,
            "200": theme.colors?.primary200,
            "800": theme.colors?.primary800
        },
        secondary: {
            light: theme.colors?.secondaryLight,
            main: theme.colors?.secondaryMain,
            dark: theme.colors?.secondaryDark,
            "200": theme.colors?.secondary200,
            "800": theme.colors?.secondary800
        },
        error: {
            light: theme.colors?.error50,
            main: theme.colors?.error600,
            dark: theme.colors?.error900
        },
        warning: {
            light: theme.colors?.warning100,
            main: theme.colors?.warning500,
            dark: theme.colors?.warning900
        },
        success: {
            light: theme.colors?.success50,
            "200": theme.colors?.success200,
            main: theme.colors?.success500,
            dark: theme.colors?.success900
        },
        grey: {
            "50": theme.colors?.neutral50,
            "100": theme.colors?.neutral100,
            "500": theme.colors?.neutral500,
            "600": theme.heading,
            "700": theme.heading,
            "900": theme.heading
        },
        text: {
            primary: theme.textPrimary,
            secondary: theme.textSecondary,
            disabled: theme.colors?.neutral300
        },
        background: {
            paper: theme.background,
            default: theme.backgroundDefault
        }
    };
}
