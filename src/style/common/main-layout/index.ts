import { SxProps, Theme } from "@mui/material/styles";

export const styles = {
    boxContainerStyles: {
        paddingTop: "146px",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        scrollBehavior: "smooth"
    } satisfies SxProps<Theme>,

    mainBoxStyles: (theme: Theme): SxProps<Theme> => ({
        overflowX: "hidden",
        minHeight: {
            lg: "100vh"
        },
        bgcolor: theme.palette.background.paper,
        flexGrow: 1,
        p: {
            xs: "6px",
            sm: "6px",
            md: 5,
            lg: 0
        },
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    })
} satisfies Record<string, SxProps<Theme> | ((theme: Theme) => SxProps<Theme>)>;
