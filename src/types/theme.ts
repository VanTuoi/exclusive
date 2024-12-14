interface Customization {
    type: "light" | "dark";
}

interface Colors {
    paper: string;
    darkPaper?: string;
    background?: string;

    primaryLight: string;
    primary200: string;
    primaryMain: string;
    primaryDark: string;
    primary800: string;
    textPrimaryLight: string;
    textPrimaryMain: string;
    buttonPrimaryLight: string;
    buttonPrimaryMain: string;

    secondaryLight: string;
    secondary200: string;
    secondaryMain: string;
    secondaryDark: string;
    secondary800: string;
    textSecondaryLight: string;
    textSecondaryMain: string;
    buttonSecondaryLight: string;
    buttonSecondaryMain: string;

    success50: string;
    success100: string;
    success200: string;
    success300: string;
    success400: string;
    success500: string;
    success600: string;
    success700: string;
    success800: string;
    success900: string;

    warning50: string;
    warning100: string;
    warning200: string;
    warning300: string;
    warning400: string;
    warning500: string;
    warning600: string;
    warning700: string;
    warning800: string;
    warning900: string;

    error50: string;
    error100: string;
    error200: string;
    error300: string;
    error400: string;
    error500: string;
    error600: string;
    error700: string;
    error800: string;
    error900: string;

    neutral0: string;
    neutral50: string;
    neutral100: string;
    neutral200: string;
    neutral300: string;
    neutral400?: string;
    neutral500?: string;
    neutral600: string;

    blue100: string;
    blue200: string;
    blue300: string;
    blue400: string;
    blue500: string;
    blue600: string;
    blue700: string;

    purple100: string;
    purple200: string;
    purple300: string;
    purple400: string;
    purple500: string;
    purple600: string;

    magenta100: string;
    magenta200: string;
    magenta300: string;
    magenta400: string;
    magenta500: string;
    magenta600: string;

    green100: string;
    green200: string;
    green300: string;
    green400: string;
    green500: string;
    green600: string;

    red100: string;
    red200: string;
    red300: string;
    red400: string;
    red500: string;
    red600: string;

    yellow100: string;
    yellow200: string;
    yellow300: string;
    yellow400: string;
    yellow500: string;
    yellow600: string;

    grey50: string;
    grey100: string;
    grey200: string;
    grey300: string;
    grey500: string;
    grey600: string;
    grey700: string;
    grey900: string;
}

interface ThemeOption {
    colors: Colors;
    heading: string;
    borderRadius: number;
    paper: string;
    background: string;
    backgroundDefault?: string;
    textPrimary: string;
    textSecondary: string;
    divider: string;
    customization?: Customization;
}

export type { Colors, Customization, ThemeOption };
