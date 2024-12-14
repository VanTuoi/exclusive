import { SxProps, Theme } from "@mui/material/styles";

export const styles = {
    boxStyle: (theme: Theme): SxProps<Theme> => ({
        margin: "0 auto",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.background.paper,
        height: {
            xs: "88px",
            sm: "48px"
        },
        width: "100%"
    }),
    topHeaderStyle: (theme: Theme): SxProps<Theme> => ({
        padding: {
            xs: 1,
            sm: 0
        },
        margin: "0 auto",
        position: "relative",
        maxWidth: theme.breakpoints.values.lg,
        gap: "3px",
        display: "flex",
        flexDirection: {
            xs: "column",
            sm: "row"
        },
        justifyContent: {
            sm: "space-between"
        },
        height: "100%",
        width: "100%",
        alignItems: {
            xs: "flex-end",
            sm: "center"
        }
    }),

    linkStyle: () => ({
        margin: "0 auto",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: "2px"
    }),

    languageStyle: (): SxProps<Theme> => ({
        width: "100",
        display: {
            xs: "flex",
            md: "flex"
        },
        flexDirection: "row",
        gap: 4,
        alignItems: "flex-end"
    })
} satisfies Record<string, (theme: Theme) => SxProps<Theme>>;
