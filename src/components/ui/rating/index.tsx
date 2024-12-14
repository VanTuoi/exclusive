import { Box, Rating, Typography } from "@mui/material";
import { memo } from "react";

interface Rating {
    rate: number;
    count: number;
}

interface RatingDisplayProps {
    rating?: Rating;
}

export const Review = memo(({ rating = { rate: 0, count: 0 } }: RatingDisplayProps) => {
    const { rate, count } = rating;
    return (
        <Box display="flex" alignItems="center">
            <Rating readOnly value={rate} precision={0.1} />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
                {count} reviews
            </Typography>
        </Box>
    );
});
