import { useRouter } from "next/router";

import { Badge, Box, IconButton } from "@mui/material";
import { memo, useMemo } from "react";

import { useWishList } from "~/stores";

import { HeartIcon } from "~/assets/icons";

export const WishList = memo(() => {
    const { items } = useWishList();

    const router = useRouter();
    const { pathname } = router;

    const totalItems = useMemo(() => {
        return Object.values(items).reduce((sum) => sum + 1, 0);
    }, [items]);

    return (
        <Box
            onClick={() => {
                router.push("/wish-list");
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
                <IconButton variant={!pathname.includes("/wish-list") ? "default" : "contained"}>
                    <HeartIcon />
                </IconButton>
            </Badge>
        </Box>
    );
});
