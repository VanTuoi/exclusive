import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import { Box, CircularProgress, CircularProgressProps, IconButton } from "@mui/material";
import { memo, useEffect, useState } from "react";

export const ScrollToTopButton = memo(() => {
    const [scrollY, setScrollY] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [totalHeight, setTotalHeight] = useState(0);

    const handleScroll = () => {
        setTotalHeight(document.body.scrollHeight - window.innerHeight);
        setScrollY(window.scrollY);

        if (window.scrollY > 200) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        showButton && (
            <IconButton
                aria-label="scroll to top"
                sx={{
                    position: "fixed",
                    bottom: { xs: 5, md: 25 },
                    right: { xs: 5, md: 25 },
                    zIndex: 100
                }}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
                <CircularProgressWithLabel value={Math.round((scrollY / totalHeight) * 100)} />
            </IconButton>
        )
    );
});

const CircularProgressWithLabel = memo((props: CircularProgressProps & { value: number }) => {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress size={"45px"} variant="determinate" {...props} color="secondary" />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <VerticalAlignTopIcon sx={{ fontSize: { xs: "15", sm: "30px" } }} color="secondary" />
            </Box>
        </Box>
    );
});
