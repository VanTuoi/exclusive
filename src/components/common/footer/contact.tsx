import Image from "next/image";

import { Box, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";

import { PHONE_NUMBER, SOCIALS } from "~/constants";
import { SocialItem } from "~/types";

export const Contact = memo(() => {
    const { t } = useTranslation("common");

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography gutterBottom sx={{ marginBottom: 2 }} variant="h4">
                {t("footer.contact")}
            </Typography>
            <Typography variant="h5">{PHONE_NUMBER}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                {SOCIALS.map((item: SocialItem, index: number) => (
                    <Image
                        alt={item.imgAlt}
                        height={22}
                        width={22}
                        key={index}
                        src={item.imgSrc}
                        style={{
                            filter: "brightness(0) saturate(100%) invert(76%) sepia(1%) saturate(76%) hue-rotate(343deg) brightness(88%) contrast(85%);",
                            margin: "5px",
                            marginTop: "20px"
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
});
