import { useRouter } from "next/router";

import { Box, IconButton, Menu, MenuItem, Skeleton, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, MouseEvent, useEffect, useState } from "react";

import { useAuthStore } from "~/stores";
import { isOlderThanMinutes } from "~/utils";

import { CancellationIcon, LogOutIcon, OrderIcon, StarIcon, UserIcon } from "~/assets/icons";

import { useAuth, useGetMe } from "~/hooks/auth";

export const AvatarUser = memo(() => {
    const { userData, timeUpdate } = useAuthStore();

    const { t } = useTranslation();

    const router = useRouter();
    const { pathname } = router;

    const { handleLogout } = useAuth();
    const { handleGetMe } = useGetMe();

    const menuItems = [
        {
            icon: <UserIcon />,
            text: t("header.user.manageMyAccount"),
            action: () => router.push("/user/profile")
        },
        {
            icon: <OrderIcon />,
            text: t("header.user.myOrder"),
            action: () => router.push("/user/orders")
        },
        {
            icon: <CancellationIcon />,
            text: t("header.user.myCancellations"),
            action: () => router.push("/user/cancellations")
        },
        {
            icon: <StarIcon />,
            text: t("header.user.myReviews"),
            action: () => router.push("/user/reviews")
        },
        {
            icon: <LogOutIcon />,
            text: t("header.user.logout"),
            action: handleLogout
        }
    ];

    const [loading, setLoading] = useState<boolean>(true);
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if ((isOlderThanMinutes(timeUpdate, 30) || !userData) && localStorage.getItem("isLogin") === "true") {
                setIsLogin(true);
                await handleGetMe().finally(() => setLoading(false));
            } else {
                setLoading(false);
            }
        };
        fetchData();
    }, [userData, router.pathname]);

    useEffect(() => {
        handleCloseUserMenu();
    }, [router.pathname]);

    return !loading ? (
        <Box sx={{ flexGrow: 0 }}>
            {!isLogin || !userData ? null : (
                <>
                    <Tooltip title={t("header.user.title")}>
                        <IconButton
                            variant={!pathname.includes("/user/profile") ? "default" : "contained"}
                            onClick={handleOpenUserMenu}
                        >
                            <UserIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{
                            mt: "45px",
                            "& .MuiPaper-root": {
                                color: "inherit",
                                backgroundColor: "rgba(0, 0, 0, 0.35)",
                                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                                backdropFilter: "blur(15px)",
                                WebkitBackdropFilter: "blur(10px)",
                                borderRadius: "10px",
                                border: "1px solid rgba(255, 255, 255, 0.18)"
                            }
                        }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        keepMounted={false}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {menuItems.map((item, index) => (
                            <MenuItem key={index} onClick={item.action} sx={{ paddingX: 3, paddingY: 1 }}>
                                <Box sx={{ display: "flex", alignItems: "center", color: "secondary.light" }}>
                                    {item.icon}
                                    <Typography variant="h4" sx={{ ml: 2, textAlign: "center" }}>
                                        {item.text}
                                    </Typography>
                                </Box>
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            )}
        </Box>
    ) : (
        <Skeleton variant="circular" width={40} height={40} />
    );
});
