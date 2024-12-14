import { SnackbarProvider, SnackbarProviderProps } from "notistack";
import React, { ReactNode } from "react";

interface CustomSnackbarProps extends SnackbarProviderProps {
    children: ReactNode;
}

export const CustomSnackbar: React.FC<CustomSnackbarProps> = ({ children, ...snackbarProps }) => {
    const anchorOrigin = {
        vertical: "top" as const,
        horizontal: "right" as const
    };

    return (
        <SnackbarProvider autoHideDuration={2000} maxSnack={3} anchorOrigin={anchorOrigin} {...snackbarProps}>
            {children}
        </SnackbarProvider>
    );
};
