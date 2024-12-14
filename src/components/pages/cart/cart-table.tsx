import Image from "next/image";

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";

import { CartItem } from "~/stores";

import { CartItemRow } from "./cart-row";
interface CartTableProps {
    items: { [key: number]: CartItem };
}

export const CartTable = memo(({ items }: CartTableProps) => {
    const theme = useTheme();

    const { t } = useTranslation();

    return Object.keys(items).length > 0 ? (
        <TableContainer component={Paper}>
            <Table sx={{ borderColor: theme.palette.grey[50] }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left" sx={{ width: "25%" }}>
                            {t("cart.table.products")}
                        </TableCell>
                        <TableCell align="center" sx={{ width: "25%" }}>
                            {t("cart.table.price")}
                        </TableCell>
                        <TableCell align="center" sx={{ width: "25%" }}>
                            {t("cart.table.quantity")}
                        </TableCell>
                        <TableCell align="right" sx={{ width: "25%" }}>
                            {t("cart.table.subtotal")}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(items).map((item) => (
                        <CartItemRow key={item.product.id} item={item} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    ) : (
        <Box
            width={"100%"}
            sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}
        >
            <Box
                sx={{
                    height: { xs: "100vw", md: "400px" },
                    width: { xs: "100vw", md: "400px" },
                    position: "relative"
                }}
            >
                <Image
                    src={"/assets/imgs/empty-cart.webp"}
                    alt="empty-cart"
                    fill
                    sizes="100%"
                    style={{ objectFit: "cover" }}
                />
            </Box>
        </Box>
    );
});
