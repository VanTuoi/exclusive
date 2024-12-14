import Image from "next/image";
import { useRouter } from "next/router";

import ClearIcon from "@mui/icons-material/Clear";
import { Box, TableCell, TableRow, Typography, useTheme } from "@mui/material";
import { memo } from "react";

import { CartItem, useCartStore } from "~/stores";
import { createUrl, formatCurrency } from "~/utils";

import { CustomInputNumber, CustomLink } from "~/components/ui";

interface CartItemRowProps {
    item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = memo(({ item }) => {
    const { product, quantity, selectedOptions } = item;

    const { updateItem, removeFromCart } = useCartStore();

    const theme = useTheme();

    const router = useRouter();
    const { locale } = router;

    const handleQuantityChange = (newQuantity: number) => {
        updateItem(product, newQuantity, selectedOptions);
    };

    return (
        <TableRow>
            <TableCell align="left" sx={{ width: "25%" }}>
                <Box
                    display="flex"
                    alignItems="center"
                    position={"relative"}
                    sx={{
                        "&:hover": {
                            "& > .hover-image": {
                                display: "block",
                                opacity: 1,
                                transition: "opacity 0.3s ease"
                            }
                        }
                    }}
                >
                    <Image
                        src={product.image[0].url}
                        alt={product.image[0].alt}
                        width={50}
                        height={50}
                        style={{ objectFit: "contain" }}
                    />
                    <Box
                        position={"absolute"}
                        className="hover-image"
                        onClick={() => removeFromCart(product.id)}
                        sx={{
                            cursor: "pointer",
                            display: "none",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            top: 0,
                            left: 0,
                            height: "20px",
                            width: "20px",
                            padding: "0px",
                            backgroundColor: theme.palette.error.main,
                            borderRadius: "999px"
                        }}
                    >
                        <ClearIcon fontSize="small" style={{ color: theme.palette.background.paper }} />
                    </Box>
                    <Typography variant="body1" ml={2}>
                        <CustomLink href={createUrl(product.category, product.id, product.title)}>
                            {product.title}
                        </CustomLink>
                    </Typography>
                </Box>
            </TableCell>
            <TableCell align="center" sx={{ width: "25%" }}>
                <Typography variant="body1">{formatCurrency(product.finalPrice, locale || "en")}</Typography>
            </TableCell>
            <TableCell align="center" sx={{ width: "25%" }}>
                <CustomInputNumber initialQuantity={quantity} onChange={handleQuantityChange}></CustomInputNumber>
            </TableCell>
            <TableCell align="right" sx={{ width: "25%" }}>
                <Typography variant="body1">{formatCurrency(product.finalPrice * quantity, locale || "en")}</Typography>
            </TableCell>
        </TableRow>
    );
});
