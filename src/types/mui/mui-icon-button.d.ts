import "@mui/material/IconButton";

declare module "@mui/material/IconButton" {
    interface IconButtonOwnProps {
        variant?: "contained" | "outlined" | "text" | "default";
    }
}
