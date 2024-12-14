import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";

import { ReturnIcon } from "~/assets/icons";
import { DeliverIcon } from "~/assets/icons/deliver";

import { CustomLink } from "~/components/ui";

export const Support = memo(() => {
    const { t } = useTranslation();

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            gap={1}
            sx={{ border: "1px solid", borderRadius: "4px" }}
        >
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2} padding={1} paddingY={2}>
                <DeliverIcon />
                <Box display={"flex"} flexDirection={"column"}>
                    <Typography variant="h3" sx={{ fontWeight: 500, fontSize: "16px", lineHeight: "24px" }}>
                        {t("productDetail.support.deliver.title")}:
                    </Typography>
                    <CustomLink
                        href="#"
                        variant="h5"
                        maxLength={200}
                        underline={true}
                        underlineThickness={1}
                        sx={{ fontWeight: 500, fontSize: "12px", lineHeight: "18px" }}
                    >
                        {t("productDetail.support.deliver.content")}
                    </CustomLink>
                </Box>
            </Box>
            <Divider orientation="horizontal" variant="fullWidth" flexItem />
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={2} padding={1} paddingY={2}>
                <ReturnIcon />
                <Box display={"flex"} flexDirection={"column"}>
                    <Typography variant="h3" sx={{ fontWeight: 500, fontSize: "16px", lineHeight: "24px" }}>
                        {t("productDetail.support.return.title")}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 500, fontSize: "12px", lineHeight: "18px", display: "inline-block" }}
                    >
                        {t("productDetail.support.return.content")}
                    </Typography>
                    <Typography>
                        <CustomLink
                            href="#"
                            variant="h5"
                            underline={true}
                            underlineThickness={1}
                            sx={{ fontWeight: 500, fontSize: "12px", lineHeight: "18px" }}
                        >
                            {t("productDetail.support.return.details")}
                        </CustomLink>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
});
