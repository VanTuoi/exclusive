import { Divider, Rating, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";
interface ProductRatingProps {
    rating?: {
        rate: number;
        count: number;
    };
    moreText?: string;
    inStock?: boolean;
}

export const ProductRatingExtend = memo(({ rating, moreText = "", inStock = true }: ProductRatingProps) => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Stack direction={"row"} gap={1} alignItems={"center"} sx={{ color: theme.palette.text.secondary }}>
            <Rating readOnly precision={0.1} name="size-medium" value={rating?.rate} sx={{ borderRadius: "4px" }} />
            <Typography variant="h4" fontWeight={600} sx={{ display: "inline" }}>
                ({rating?.count}
            </Typography>
            <Typography variant="h4" fontWeight={600} sx={{ display: "inline" }}>
                {moreText})
            </Typography>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="h4" sx={{ color: inStock ? theme.palette.success.main : theme.palette.error.main }}>
                {inStock ? t("productDetail.inStock") : t("productDetail.outStock")}
            </Typography>
        </Stack>
    );
});
