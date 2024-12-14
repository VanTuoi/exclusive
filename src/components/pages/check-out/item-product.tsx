import Image from "next/image";
import { useRouter } from "next/router";

import { Box, Typography } from "@mui/material";
import { memo } from "react";

import { CartItem } from "~/stores";
import { formatCurrency } from "~/utils";

interface CartItemRowProps {
    item: CartItem;
}

export const ItemProduct: React.FC<CartItemRowProps> = memo(({ item }) => {
    const { product, quantity } = item;

    const router = useRouter();
    const { locale } = router;

    return (
        <>
            <Box
                display="flex"
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                width={"100%"}
            >
                <Box display="flex" alignItems="center" position={"relative"}>
                    <Image
                        src={product.image[0].url}
                        alt={product.image[0].alt}
                        width={50}
                        height={50}
                        style={{ objectFit: "contain" }}
                    />
                    <Typography variant="h4" ml={2}>
                        {product.title}
                    </Typography>
                </Box>
                <Typography variant="h4">{formatCurrency(product.finalPrice * quantity, locale || "en")}</Typography>
            </Box>
        </>
    );
});
