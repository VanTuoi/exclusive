import Image from "next/image";
import { useRouter } from "next/router";

import { Box, Container, Typography, useTheme } from "@mui/material";
import { memo } from "react";

import { FOOTER_ITEMS } from "~/constants";
import { useHome } from "~/hooks";
import { FooterItem } from "~/types";

import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "~/assets/icons";

import { styles } from "~/style/common/footer";

import { Logo } from "../logo";

import { CopyRight } from "./copy-right";
import { SendMailComponent } from "./send-mail";

export const Footer = memo(() => {
    const { dataSupport, dataSocial } = useHome();

    const theme = useTheme();

    const renderIcon = (title: string) => {
        switch (title) {
            case "Facebook":
                return <FacebookIcon />;
            case "Twitter":
                return <TwitterIcon />;
            case "Instagram":
                return <InstagramIcon />;
            case "Linkedin":
                return <LinkedinIcon />;
            default:
                return null;
        }
    };

    const handleClick = (url: string) => {
        window.open(url, "_blank");
    };

    return (
        <Box sx={styles.footerBoxStyles(theme)}>
            <Container maxWidth="lg">
                <Box
                    sx={{
                        marginButton: "0",
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                            md: "row"
                        },
                        justifyContent: "space-between",
                        alignContent: {
                            xs: "center",
                            sm: "flex-start"
                        },
                        paddingTop: 10
                    }}
                    gap={"52px"}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "24px"
                        }}
                    >
                        <Logo justifyContent="flex-start" />
                        <Typography variant="h3">Subscribe</Typography>
                        <Box display="flex" flexDirection={"column"} gap={2}>
                            <Typography variant="h4">Get 10% off your first order</Typography>
                            <SendMailComponent />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "25px",
                            maxWidth: "175px"
                        }}
                    >
                        <Typography variant="h3">Support</Typography>
                        <Box display="flex" flexDirection={"column"} gap={2}>
                            {dataSupport?.map((item) => {
                                return (
                                    <Typography variant="h4" key={item.title}>
                                        {item.value}
                                    </Typography>
                                );
                            })}
                        </Box>
                    </Box>
                    {FOOTER_ITEMS.map((column, index) => (
                        <FooterColumn key={index} title={column.title} items={column.items} />
                    ))}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "16px"
                        }}
                    >
                        <Typography variant="h3" sx={{ marginBottom: "7px" }}>
                            Download App
                        </Typography>
                        <Box display="flex" flexDirection={"column"} gap={1}>
                            <Typography variant="h5" sx={{ fontSize: "12px", fontWeight: 500 }} color="text.secondary">
                                Save $3 with App New User Only
                            </Typography>
                            <Box display="flex" flexDirection={"row"} gap={"8px"}>
                                <Image src={"/assets/imgs/qr-code.webp"} height={80} width={80} alt="qrcode"></Image>
                                <Box display="flex" flexDirection={"column"} gap={"4px"}>
                                    <Image
                                        src={"/assets/imgs/google-play.webp"}
                                        height={40}
                                        width={110}
                                        alt="google play icon"
                                    ></Image>
                                    <Image
                                        src={"/assets/imgs/app-store.webp"}
                                        height={40}
                                        width={110}
                                        alt="appstore icon"
                                    ></Image>
                                </Box>
                            </Box>
                            <Box display="flex" gap={3} mt={"14px"} sx={{ marginLeft: "1px" }}>
                                {dataSocial?.map((item) => (
                                    <Box
                                        key={item.title}
                                        aria-label={item.title}
                                        onClick={() => handleClick(item.value)}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        {renderIcon(item.title)}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    <CopyRight />
                </Box>
            </Container>
        </Box>
    );
});

const FooterColumn: React.FC<{ title: string; items: FooterItem[] }> = ({ title, items }) => {
    const router = useRouter();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "17px",
                maxWidth: "175px"
            }}
        >
            <Typography variant="h3" gutterBottom sx={{ marginBottom: "8px" }}>
                {title}
            </Typography>
            <Box display="flex" flexDirection={"column"} gap={2}>
                {items.map(({ name, url }, index) => (
                    <Typography
                        key={index}
                        variant="h4"
                        onClick={() => {
                            router.push(url);
                        }}
                        sx={{ cursor: "pointer" }}
                    >
                        {name}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
};
