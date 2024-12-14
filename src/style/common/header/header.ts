import { SxProps, Theme } from "@mui/material/styles";

export const styles = {
    appBarStyles: (theme: Theme): SxProps<Theme> => ({
        color: "inherit",
        height: {
            md: "auto",
            sm: 40
        },
        transition: theme.transitions.create(["height", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        bgcolor: theme.palette.background.paper
    })
} satisfies Record<string, SxProps<Theme> | ((theme: Theme) => SxProps<Theme>)>;
