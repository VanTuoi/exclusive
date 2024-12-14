import Image from "next/image";

import { Box, useTheme } from "@mui/material";
import { memo } from "react";

import { Category } from "~/types/product";

import { CategoriesButton } from "../../buttons/svg-button";

interface ProductComponentProps {
    categories: Category;
}

export const CategoriesComponent = memo(({ categories }: ProductComponentProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                height: "145px",
                width: "170px",
                position: "relative",
                backgroundColor: theme.palette.grey[100],
                borderRadius: "4px",
                overflow: "hidden",
                "&:hover .hover-button": {
                    opacity: 1
                }
            }}
        >
            <CategoriesButton variant="outlined">
                <Image src={categories.img} height={56} width={56} alt="icon"></Image>
                {categories.title}
            </CategoriesButton>
        </Box>
    );
});
