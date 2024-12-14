import { Box, IconButton, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";

import { CallIcon } from "~/assets/icons";

export const ItemPhone = memo(({ dataPhone }: { dataPhone?: string[] }) => {
    const { t } = useTranslation();

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"} gap={3}>
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"flex-start"} gap={2}>
                <IconButton variant="contained" size="large" sx={{ height: "40px", width: " 40px" }}>
                    <CallIcon />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 500, fontSize: "16px" }}>
                    {t("contact.info.phone.title")}
                </Typography>
            </Box>
            <Typography variant="h5"> {t("contact.info.phone.content")}</Typography>
            {dataPhone?.map((item) => (
                <Typography key={item} variant="h5">
                    {t("contact.info.phone.text")}: +{item}
                </Typography>
            ))}
        </Box>
    );
});
