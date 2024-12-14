import { Box, IconButton, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";

import { MailIcon } from "~/assets/icons";

export const ItemMail = memo(({ dataEmail }: { dataEmail?: string[] }) => {
    const { t } = useTranslation();

    return (
        <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"} gap={3}>
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"flex-start"} gap={2}>
                <IconButton variant="contained" size="large" sx={{ height: "40px", width: " 40px" }}>
                    <MailIcon />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 500, fontSize: "16px" }}>
                    {t("contact.info.mail.title")}
                </Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"} gap={2}>
                <Typography variant="h5"> {t("contact.info.mail.content")}</Typography>
                {dataEmail?.map((item) => (
                    <Typography key={item} variant="h5">
                        {t("contact.info.mail.text")}: {item}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
});
