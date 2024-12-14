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
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} gap={1}>
            <Box
                sx={{
                    padding: "10px",
                    borderRadius: "50%",
                    backgroundColor: theme.palette.grey[300],
                    color: theme.palette.background.paper,
                    "&:hover": {
                        backgroundColor: alpha(theme.palette.grey[300], 0.5),
                        "> :first-child": {
                            backgroundColor: alpha(theme.palette.background.default, 0.8)
                        }
                    }
                }}
            >
                <Box
                    sx={{
                        padding: "10px",
                        borderRadius: "50%",
                        backgroundColor: theme.palette.background.default,
                        height: "60px",
                        width: "60px"
                    }}
                >
                    {icon}
                </Box>
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 600, mt: 1, textAlign: "center" }}>
                {title}
            </Typography>
            <Typography variant="h5" sx={{ textAlign: "center" }}>
                {content}
            </Typography>
        </Box>
    );
});
