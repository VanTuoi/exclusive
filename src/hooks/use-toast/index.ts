import { useSnackbar, VariantType } from "notistack";

export const useCustomSnackbar = () => {
    const { enqueueSnackbar } = useSnackbar();

    const showSnackbar = (message?: string, variant: VariantType = "default") => {
        if (message) {
            enqueueSnackbar(message, { variant });
        }
    };

    return { showSnackbar };
};
