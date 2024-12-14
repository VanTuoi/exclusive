import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";

export const CopyRight = memo(() => {
    const { t } = useTranslation("common");

    const currentYear = new Date().getFullYear();

    return (
        <Box sx={{ height: "64px", paddingY: 3, width: "100%" }}>
            <Typography color="text.secondary" sx={{ padding: 0, textAlign: "center", width: "100%" }} variant="h4">
                &copy; {t("footer.copy", { currentYear })}
            </Typography>
        </Box>
    );
});
