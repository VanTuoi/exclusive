import { useTheme } from "@mui/material/styles";
import NextNProgress from "nextjs-progressbar";
import { memo } from "react";

export const CustomNextNProgress = memo(() => {
    const theme = useTheme();

    return (
        <NextNProgress
            color={theme.palette.secondary.main}
            startPosition={0.3}
            stopDelayMs={200}
            height={3}
            showOnShallow={true}
        />
    );
});
