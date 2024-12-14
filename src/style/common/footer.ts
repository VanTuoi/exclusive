import { SxProps, Theme } from "@mui/material/styles";

export const styles = {
    footerBoxStyles: (theme: Theme): SxProps<Theme> => ({
        width: "100%",
        p: {
            xs: "6px",
            md: 5,
            lg: 0
        },
        color: theme.palette.background.paper,
        bgcolor: "background.default"
    })
} satisfies Record<string, SxProps<Theme> | ((theme: Theme) => SxProps<Theme>)>;
