import { Box, Breadcrumbs, Typography } from "@mui/material";
import { memo } from "react";

import { Path } from "~/types";

import { CustomLink } from "../links/custom-link";

interface BreadcrumbsComponentProps {
    paths: Path[];
}

export const BreadcrumbsComponent = memo(({ paths }: BreadcrumbsComponentProps) => {
    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{ paddingY: { xs: "8px", md: "24px", lg: "80px" } }}>
            {paths.map((b, index) =>
                index !== paths.length - 1 ? (
                    <Box key={`${b.title}-${index}`}>
                        <CustomLink variant="h4" href={b.link}>
                            {b.title}
                        </CustomLink>
                    </Box>
                ) : (
                    <Typography
                        variant="h4"
                        sx={{ textTransform: "capitalize" }}
                        key={`${b.title}-${index}`}
                        color="text.primary"
                    >
                        {b.title}
                    </Typography>
                )
            )}
        </Breadcrumbs>
    );
});
