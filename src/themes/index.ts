import { createTheme, ThemeOptions } from "@mui/material/styles";

import { Colors, Customization, ThemeOption } from "~/types";

import OverrideStyles from "./override-style";
import themePalette from "./palette";
import themeTypography from "./typography";

const theme = (customization: Customization): ReturnType<typeof createTheme> => {
    const color: Colors = {
        paper: "#FFFFFF",
        success50: "#ECFDF5",
        success100: "#D1FAE5",
        success200: "#A7F3D0",
        success300: "#6EE7B7",
        success400: "#34D399",
        success500: "#10B981",
        success600: "#059669",
        success700: "#047857",
        success800: "#065F46",
        success900: "#064E3B",
        warning50: "#FFFBEB",
        warning100: "#FEF3C7",
        warning200: "#FDE68A",
        warning300: "#FCD34D",
        warning400: "#FBBF24",
        warning500: "#F59E0B",
        warning600: "#D97706",
        warning700: "#B45309",
        warning800: "#92400E",
        warning900: "#78350F",
        error50: "#FFF1F2",
        error100: "#FFE4E6",
        error200: "#FECDD3",
        error300: "#FDA4AF",
        error400: "#FB7185",
        error500: "#F43F5E",
        error600: "#E11D48",
        error700: "#BE123C",
        error800: "#9F1239",
        error900: "#881337",
        neutral0: "#FFFFFF",
        neutral50: "#F4F4F6",
        neutral100: "#E9EAEC",
        neutral200: "#D1D4DB",
        neutral300: "#9096A2",
        neutral400: "#4D566B",
        neutral500: "#202C46",
        neutral600: "#1B253C",
        blue100: "#F5F7FE",
        blue200: "#EAEFFD",
        blue300: "#ADBEF7",
        blue400: "#5A7DEE",
        blue500: "#315CEA",
        blue600: "#2A4EC7",
        blue700: "#2240A4",
        purple100: "#F8F5FE",
        purple200: "#F1ECFC",
        purple300: "#C9B2F3",
        purple400: "#9265E8",
        purple500: "#773FE2",
        purple600: "#6436BF",
        magenta100: "#FEF6F8",
        magenta200: "#FCEEF1",
        magenta300: "#F4BAC8",
        magenta400: "#E97591",
        magenta500: "#E35275",
        magenta600: "#C24764",
        green100: "#F4FDF7",
        green200: "#E9FAEF",
        green300: "#A9EBBF",
        green400: "#52D880",
        green500: "#27CE60",
        green600: "#21AF52",
        red100: "#FCE9EC",
        red200: "#F9D2D9",
        red300: "#F2A6B4",
        red400: "#E9677F",
        red500: "#DF2648",
        red600: "#B71F3B",
        yellow100: "#FEF3E6",
        yellow200: "#FDE7CD",
        yellow300: "#FCCF9C",
        yellow400: "#FAB261",
        yellow500: "#F89118",
        yellow600: "#C77414",
        grey50: "#F8FAFC",
        grey100: "#EEF2F6",
        grey200: "#E3E8EF",
        grey300: "#00000080",
        grey500: "#697586",
        grey600: "#4B5565",
        grey700: "#364152",
        grey900: "#121926",
        primaryLight: "#FFFFFF",
        primaryMain: "#363738",
        primaryDark: "#000000",
        primary200: "#FFFFFF",
        primary800: "#000000",
        secondaryLight: "#FAFEF1",
        secondaryMain: "#DB4444",
        secondaryDark: "#D31515",
        secondary200: "#F5F5F5",
        secondary800: "#D31515",
        textPrimaryLight: "#7D8184",
        textPrimaryMain: "#000000",
        textSecondaryLight: "#FAFAFA",
        textSecondaryMain: "#7D8184",
        buttonPrimaryLight: "#E07575",
        buttonPrimaryMain: "#DB4444",
        buttonSecondaryLight: "#60FFA0",
        buttonSecondaryMain: "#00FF66"
    };

    // const isLight = customization.type === "light";

    const themeOption: ThemeOption = {
        colors: color,
        borderRadius: 4,
        heading: color.textPrimaryMain,
        paper: color.paper,
        background: color.paper,
        backgroundDefault: color.primaryDark,
        textPrimary: color.textPrimaryMain,
        textSecondary: color.textSecondaryMain,
        divider: color.neutral100,
        customization
    };

    const themeOptions: ThemeOptions = {
        direction: "ltr",
        palette: themePalette(themeOption),
        typography: themeTypography(themeOption),
        components: OverrideStyles(themeOption),
        breakpoints: {
            values: {
                xs: 0,
                sm: 480,
                md: 768,
                lg: 1170,
                xl: 1440
            }
        }
    };

    const muiTheme = createTheme(themeOptions);

    return muiTheme;
};

export default theme;
