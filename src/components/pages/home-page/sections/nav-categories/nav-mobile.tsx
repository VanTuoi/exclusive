import { useRouter } from "next/router";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { Accordion, AccordionDetails, AccordionSummary, Box, Skeleton, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useEffect, useState } from "react";

import { useHome } from "~/hooks";

import { CustomLink } from "~/components/ui";

import { CategoryNav } from "~/types/product";

export const NavCategoriesMobile = memo(() => {
    const router = useRouter();
    const { locale } = router;

    const { dataNavCategories } = useHome();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { t } = useTranslation("common");

    useEffect(() => {
        if (dataNavCategories) setIsLoading(false);
    }, [dataNavCategories]);

    return !isLoading ? (
        <Accordion sx={{ width: "100%" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"flex-start"} gap={1}>
                    <WidgetsIcon />
                    <Typography variant="h4">{t("home.categoriesNav")}</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"} gap={1}>
                    {dataNavCategories.map((item) => {
                        const displayLocale = (locale as keyof CategoryNav["name"]) || "en";
                        return (
                            <CustomLink variant="body1" href={item.url} key={item.url}>
                                {item.name[displayLocale]}
                            </CustomLink>
                        );
                    })}
                </Box>
            </AccordionDetails>
        </Accordion>
    ) : (
        <Skeleton variant="rounded" width="100%" height={40} />
    );
});
