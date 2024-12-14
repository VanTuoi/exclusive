import { useRouter } from "next/router";

import { Badge, Box, IconButton } from "@mui/material";
import { memo, useMemo } from "react";

import { useCartStore } from "~/stores";

import { CartIcon } from "~/assets/icons";

export const CartUser = memo(() => {
    const { items } = useCartStore();

    const router = useRouter();
    const { pathname } = router;

    const totalItems = useMemo(() => {
        return Object.values(items).reduce((sum, item) => sum + item.quantity, 0);
    }, [items]);

    return (
        <Box
            onClick={() => {
                router.push("/cart");
            }}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                padding: "2px 3px"
            }}
        >
            <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                color="secondary"
                badgeContent={totalItems}
            >
                <IconButton variant={!pathname.includes("/cart") ? "default" : "contained"}>
                    <CartIcon />
                </IconButton>
            </Badge>
        </Box>
    );
});
