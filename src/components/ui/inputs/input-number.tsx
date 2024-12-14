import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton, InputAdornment, Stack, SxProps, TextField, Theme } from "@mui/material";
import React, { memo, useState } from "react";

interface CustomInputNumberProps {
    initialQuantity: number;
    onChange: (quantity: number) => void;
    sx?: SxProps<Theme>;
}

export const CustomInputNumber: React.FC<CustomInputNumberProps> = memo(
    ({ initialQuantity, onChange, sx, ...rest }) => {
        const [value, setValue] = useState<number>(initialQuantity);

        const handleQuantityChange = (delta: number) => {
            const newValue = Math.max(1, Math.min(199, value + delta));
            setValue(newValue);
            onChange(newValue - initialQuantity);
        };

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const numericValue = Number(event.target.value);
            if (numericValue >= 1 && numericValue <= 999) {
                setValue(numericValue);
                onChange(numericValue - initialQuantity);
            }
        };

        return (
            <TextField
                value={value}
                onChange={handleChange}
                size="small"
                type="text"
                sx={{
                    width: "80px",
                    padding: "5px 0",
                    ...sx
                }}
                InputProps={{
                    style: {
                        appearance: "none",
                        margin: 0,
                        padding: 0
                    },
                    endAdornment: (
                        <InputAdornment position="end" sx={{ marginRight: "0px", paddingY: "25px" }}>
                            <Stack direction="column">
                                <IconButton
                                    variant="text"
                                    size="small"
                                    onClick={() => handleQuantityChange(1)}
                                    sx={{ marginBottom: "-5px" }}
                                >
                                    <KeyboardArrowUpIcon />
                                </IconButton>
                                <IconButton
                                    variant="text"
                                    size="small"
                                    onClick={() => handleQuantityChange(-1)}
                                    sx={{ marginTop: "-5px" }}
                                >
                                    <KeyboardArrowDownIcon />
                                </IconButton>
                            </Stack>
                        </InputAdornment>
                    )
                }}
                {...rest}
            />
        );
    }
);
