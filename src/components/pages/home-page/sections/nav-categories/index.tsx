import { Box, Container, Divider } from "@mui/material";
import { memo } from "react";

import { NavCategoriesWrapper } from "./nav";
import { Slider } from "./slider";

export const HomeNavCategories = memo(() => {
    return (
        <Container maxWidth={"lg"}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        lg: "row"
                    },
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <NavCategoriesWrapper />
                <Divider orientation="vertical" variant="middle" flexItem />
                <Slider />
            </Box>
        </Container>
    );
});
