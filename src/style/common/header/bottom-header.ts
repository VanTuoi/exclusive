import { SxProps, Theme } from "@mui/material/styles";

export const styles = {
    headerStyle: (): SxProps<Theme> => ({
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        margin: {
            xs: "0 0",
            md: "0 0"
        },
        height: {
            xs: "62px",
            md: "92px"
        },
        paddingBottom: {
            xs: "9px",
            md: "14px"
        },
        paddingTop: {
            xs: "9px",
            md: "38px"
        },
        paddingRight: {
            xs: "6px",
            md: 0
        },
        alignItems: "center"
    }),

    boxStyle: (): SxProps<Theme> => ({
        display: "flex",
        gap: "10px",
        alignItems: "center"
    })
} satisfies Record<string, SxProps<Theme> | (() => SxProps<Theme>)>;
