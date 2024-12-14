import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface SizeSelectProps {
    variant?: "small" | "medium";
    sizes: string[];
    selectedSize: string;
    handleSizeChange?: (size: string) => void;
}

export const SizeSelect = memo(({ sizes, selectedSize, handleSizeChange, variant = "medium" }: SizeSelectProps) => {
    const handleSizeSelect = (size: string) => {
        if (handleSizeChange) {
            handleSizeChange(size);
        }
    };

    return (
        <Box display="flex" gap={1}>
            {sizes.map((size) => (
                <Box
                    key={size}
                    sx={{
                        padding: variant === "medium" ? "8px 12px" : "6px 8px",
                        border: "1px solid",
                        color: selectedSize === size ? "primary.light" : "",
                        borderColor: selectedSize === size ? "secondary.main" : "grey.400",
                        borderRadius: "4px",
                        cursor: "pointer",
                        backgroundColor: selectedSize === size ? "secondary.main" : "transparent",
                        transition: "background-color 0.3s ease, border-color 0.3s ease",
                        "&:hover": {
                            borderColor: "secondary.main"
                        }
                    }}
                    onClick={() => handleSizeSelect(size)}
                >
                    <Typography variant="body1" sx={{ fontWeight: selectedSize === size ? 600 : 400 }}>
                        {size}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
});
