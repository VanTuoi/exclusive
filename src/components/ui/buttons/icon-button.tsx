import Image from "next/image";

import { ButtonProps, IconButton as MuiIconButton, SxProps, Theme } from "@mui/material";
import React from "react";

type SizeVariant = "large" | "medium" | "small";

interface IconButtonProps extends Omit<ButtonProps, "size" | "variant"> {
    sizeVariant?: SizeVariant;
    iconSrc: string;
    alt: string;
    sx?: SxProps<Theme>;
}

const sizeMap: Record<SizeVariant, { size: number }> = {
    large: { size: 30 },
    medium: { size: 25 },
    small: { size: 20 }
};

export const IconButton: React.FC<IconButtonProps> = ({ sizeVariant = "medium", iconSrc, alt, sx, ...rest }) => {
    const { size } = sizeMap[sizeVariant];

    return (
        <MuiIconButton sx={{ height: `${size + 20}px`, width: `${size + 20}px`, ...sx }} {...rest}>
            <Image style={{ padding: "0px" }} src={iconSrc} height={size} width={size} alt={alt} />
        </MuiIconButton>
    );
};

export default IconButton;
