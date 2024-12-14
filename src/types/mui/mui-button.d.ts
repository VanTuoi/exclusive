import "@mui/material/Button";

declare module "@mui/material/Button" {
    interface ButtonPropsVariantOverrides {
        outlined_custom: true;
    }
}
