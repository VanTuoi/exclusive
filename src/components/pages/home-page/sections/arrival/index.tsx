import { Container, useMediaQuery, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "next-i18next";
import { memo } from "react";

import { Section } from "~/components/ui";

import { ArrivalItem } from "./item";

export const Arrival = memo(() => {
    const { t } = useTranslation();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Container maxWidth={"lg"}>
            <Section title={t("home.arrival.title")} content={t("home.arrival.content")} borderless={false}>
                <Grid container spacing={{ xs: 1, md: 3 }} sx={{ width: "100%" }}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <ArrivalItem
                            bottom={-44}
                            isBlur={false}
                            heightBox={600}
                            heightImg={511}
                            widthImg={511}
                            img={"/assets/imgs/bottom-banner/img1.webp"}
                            title={t("home.arrival.item.0.title")}
                            content={t("home.arrival.item.0.content")}
                            link="#"
                        />
                    </Grid>
                    <Grid container size={{ xs: 12, md: 6 }}>
                        <Grid size={12}>
                            <ArrivalItem
                                right={isSmallScreen ? 0 : -69}
                                rotate={true}
                                isBlur={true}
                                heightBox={284}
                                heightImg={284}
                                widthImg={432}
                                img={"/assets/imgs/bottom-banner/img2.webp"}
                                title={t("home.arrival.item.1.title")}
                                content={t("home.arrival.item.1.content")}
                                link="#"
                            />
                        </Grid>
                        <Grid container size={12}>
                            <Grid size={6}>
                                <ArrivalItem
                                    right={20}
                                    rotate={true}
                                    isBlur={true}
                                    heightBox={284}
                                    heightImg={203}
                                    widthImg={201}
                                    img={"/assets/imgs/bottom-banner/img3.webp"}
                                    title={t("home.arrival.item.2.title")}
                                    content={t("home.arrival.item.2.content")}
                                    link="#"
                                />
                            </Grid>
                            <Grid size={6}>
                                <ArrivalItem
                                    rotate={true}
                                    isBlur={true}
                                    heightBox={284}
                                    heightImg={221}
                                    widthImg={190}
                                    img={"/assets/imgs/bottom-banner/img4.webp"}
                                    title={t("home.arrival.item.3.title")}
                                    content={t("home.arrival.item.3.content")}
                                    link="#"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Section>
        </Container>
    );
});
