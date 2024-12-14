import { SxProps, Theme } from "@mui/material/styles";

export const styles = {
    mainBoxStyles: (theme: Theme): SxProps<Theme> => ({
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        minHeight: "100vh",
        flexGrow: 1,
        p: 0
    })
} satisfies Record<string, SxProps<Theme> | ((theme: Theme) => SxProps<Theme>)>;
