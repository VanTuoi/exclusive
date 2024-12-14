import Image from "next/image";

import { Box, Container, Typography } from "@mui/material";
import { memo } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { MANAGER } from "~/constants";

import { InstagramIcon, LinkedinIcon, TwitterIcon } from "~/assets/icons";

export const SliderManager = memo(() => {
    const renderIcon = (title: string) => {
        switch (title) {
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

    return (
        <Container maxWidth={"xl"}>
            <Box height={"564px"}>
                <Swiper
                    style={{ width: "auto" }}
                    pagination={{
                        clickable: true,
                        renderBullet: (index: number, className: string) => {
                            return `<span class="${className}" style="border: 2px solid #fff; border-radius: 50%; width: 15px; height: 15px; display: inline-block; margin: 0 5px; background: ${index >= 0 ? "#ff0000" : "#ccc"};"></span>`;
                        }
                    }}
                    slidesPerView={3}
                    spaceBetween={"30px"}
                    loop={true}
                    modules={[Pagination]}
                >
                    {MANAGER.map((member, index) => (
                        <SwiperSlide key={index}>
                            <Box sx={{ height: "564px", width: "370px" }}>
                                <Box sx={{ height: "430px", width: "370px", position: "relative" }}>
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        sizes="100%"
                                        style={{ objectFit: "contain", cursor: "pointer" }}
                                    />
                                </Box>
                                <Typography variant="h3" mt={3}>
                                    {member.name}
                                </Typography>
                                <Typography variant="h4">{member.title}</Typography>
                                <Box display="flex" gap={2} mt={2}>
                                    {["Twitter", "Instagram", "Linkedin"]?.map((item) => (
                                        <Box key={item} aria-label={item} sx={{ cursor: "pointer" }}>
                                            {renderIcon(item)}
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
        </Container>
    );
});
