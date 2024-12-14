import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { memo } from "react";

import { ImageProduct } from "~/types/product";

interface ColorSelectProps {
    isLabel?: boolean;
    imgs: ImageProduct[];
    selectedColor: string;
    handleColorChange: (color: string) => void;
}

export const ColorSelect = memo(({ isLabel = false, imgs, selectedColor, handleColorChange }: ColorSelectProps) => {
    return (
        imgs.length > 1 && (
            <Box>
                <RadioGroup value={selectedColor} onChange={(e) => handleColorChange(e.target.value)} row>
                    {imgs
                        .filter((img) => !img.isIllustration)
                        .map((img) => (
                            <FormControlLabel
                                key={img.colorCode}
                                value={img.colorCode}
                                control={
                                    <Radio
                                        icon={<RadioButton checked color={img.colorCode} />}
                                        checkedIcon={<RadioButton color={img.colorCode} />}
                                        sx={{
                                            padding: 0,
                                            "& .MuiSvgIcon-root": {
                                                fontSize: "inherit"
                                            }
                                        }}
                                    />
                                }
                                label={isLabel ? img.colorText.charAt(0).toUpperCase() + img.colorText.slice(1) : ""}
                                sx={{ marginLeft: 1, marginRight: 1 }}
                            />
                        ))}
                </RadioGroup>
            </Box>
        )
    );
});

const RadioButton = ({ checked, color }: { checked?: boolean; color: string }) => (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fontSize="24px">
        <circle
            cx="12"
            cy="12"
            r="10"
            stroke={checked ? color : "#000"}
            strokeWidth="2"
            fill={checked ? color : "none"}
        />
        {<circle cx="12" cy="12" r="6" fill={color} />}
    </svg>
);
