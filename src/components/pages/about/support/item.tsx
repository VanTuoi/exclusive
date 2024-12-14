import { alpha, Box, Typography, useTheme } from "@mui/material";
import { memo, ReactNode } from "react";

interface SupportItemProps {
    icon: ReactNode;
    title: string;
    content: string;
}

export const SupportItem = memo(({ icon, title, content }: SupportItemProps) => {
    const theme = useTheme();

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            borderRadius={"4px"}
            border={"1px solid"}
            borderColor={theme.palette.grey[400]}
            sx={{
                height: "230px",
                width: "270px",
                transition: "0.3s",
                "&:hover": {
                    color: theme.palette.background.paper,
                    backgroundColor: theme.palette.secondary.main,
                    "> :first-child": {
                        color: theme.palette.background.default,
                        backgroundColor: alpha(theme.palette.grey[300], 0.5),
                        "> *": {
                            color: theme.palette.background.default,
                            backgroundColor: theme.palette.background.paper
                        }
                    }
                }
            }}
        >
            <Box
                sx={{
                    padding: "10px",
                    borderRadius: "50%",
                    backgroundColor: alpha(theme.palette.grey[300], 1),
                    color: theme.palette.background.paper,
                    transition: "0.3s"
                }}
            >
                <Box
                    sx={{
                        padding: "10px",
                        height: "60px",
                        width: "60px",
                        borderRadius: "50%",
                        transition: "0.2s",
                        backgroundColor: theme.palette.background.default
                    }}
                >
                    {icon}
                </Box>
            </Box>
            <Typography
                variant="h3"
                sx={{ fontWeight: 700, fontFamily: "Inter", fontSize: "32px", lineHeight: "30px", textAlign: "center" }}
            >
                {title}
            </Typography>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
                {content}
            </Typography>
        </Box>
    );
});
