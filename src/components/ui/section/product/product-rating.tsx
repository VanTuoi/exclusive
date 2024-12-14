import { Rating, Stack, Typography, useTheme } from "@mui/material";

interface ProductRatingProps {
    rating: {
        rate: number;
        count: number;
    };
    moreText?: string;
}

export const ProductRating = ({ rating, moreText = "" }: ProductRatingProps) => {
    const theme = useTheme();

    return (
        <Stack direction={"row"} gap={1} alignItems={"center"} sx={{ color: theme.palette.text.secondary }}>
            <Rating readOnly precision={0.1} name="size-medium" value={rating?.rate} sx={{ borderRadius: "4px" }} />
            <Typography variant="h4" fontWeight={600}>
                ({rating?.count}
                {moreText})
            </Typography>
        </Stack>
    );
};
