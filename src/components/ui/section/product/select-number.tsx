import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, TextField } from "@mui/material";
import React, { memo } from "react";

interface NumberProductProps {
    quantity: number;
    onQuantityChange: (value: number) => void;
}

export const NumberProduct = memo(({ quantity = 1, onQuantityChange }: NumberProductProps) => {
    const handleIncrease = () => {
        onQuantityChange(quantity + 1);
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (value >= 1) {
            onQuantityChange(value);
        }
    };

    return (
        <Box display="flex" alignItems="center" sx={{ border: "1px solid", borderRadius: "4px" }}>
            <IconButton
                onClick={handleDecrease}
                color="primary"
                aria-label="decrease quantity"
                sx={{
                    borderRight: "1px solid",
                    borderColor: "primary",
                    borderRadius: "4px 0 0 4px",
                    ":hover": {
                        borderColor: "secondary.main",
                        backgroundColor: "secondary.main",
                        color: "primary.light"
                    }
                }}
            >
                <RemoveIcon />
            </IconButton>
            <TextField
                value={quantity}
                onChange={handleChange}
                inputProps={{
                    min: 1,
                    style: { textAlign: "center", width: "40px" }
                }}
                size="small"
                variant="outlined"
                sx={{
                    mx: -1,
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            border: "none"
                        }
                    }
                }}
            />
            <IconButton
                onClick={handleIncrease}
                color="primary"
                aria-label="increase quantity"
                sx={{
                    borderLeft: "1px solid",
                    borderColor: "primary",
                    borderRadius: "0 4px 4px 0",
                    boxSizing: "border-box",
                    ":hover": {
                        borderColor: "secondary.main",
                        backgroundColor: "secondary.main",
                        color: "primary.light"
                    }
                }}
            >
                <AddIcon />
            </IconButton>
        </Box>
    );
});
