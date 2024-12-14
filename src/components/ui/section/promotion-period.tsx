import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useEffect, useState } from "react";

import { formatTimeToArray } from "~/utils";

interface TimeItemProps {
    time: number;
    title: string;
    type: "outlined" | "contained";
}

interface PromotionPeriodProps {
    time: string;
    type?: "outlined" | "contained";
}

export const PromotionPeriod = memo(({ time, type = "outlined" }: PromotionPeriodProps) => {
    const { t } = useTranslation();

    const theme = useTheme();

    const isSmallDisplay = useMediaQuery(theme.breakpoints.down("lg"));

    const isOutlined = type === "outlined";

    const initialTimeArray: number[] = formatTimeToArray(time);

    const [currentTime, setCurrentTime] = useState<number[]>([0, 0, 0, 0]);

    useEffect(() => {
        setCurrentTime(initialTimeArray);

        const interval = setInterval(() => {
            setCurrentTime((prevTime) => {
                let [days, hours, minutes, seconds] = prevTime;

                if (seconds > 0) {
                    seconds--;
                } else {
                    seconds = 59;
                    if (minutes > 0) {
                        minutes--;
                    } else {
                        minutes = 59;
                        if (hours > 0) {
                            hours--;
                        } else {
                            hours = 23;
                            if (days > 0) {
                                days--;
                            }
                        }
                    }
                }

                return [days, hours, minutes, seconds];
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const titles = [
        t("home.countingTime.days"),
        t("home.countingTime.hours"),
        t("home.countingTime.minutes"),
        t("home.countingTime.seconds")
    ];

    return (
        <Stack direction="row" gap={isOutlined ? 0 : 2}>
            {currentTime.map((item, index) => (
                <Box key={index} display="flex" flexDirection={"row"} alignItems="flex-end">
                    <TimeItem time={item} title={titles[index]} type={type} />
                    {isOutlined && index < currentTime.length - 1 && (
                        <Typography
                            variant={!isSmallDisplay ? "h2" : "h5"}
                            mb={isOutlined ? 1 : 2}
                            sx={{ color: theme.palette.secondary.main, paddingX: 1.5 }}
                        >
                            :
                        </Typography>
                    )}
                </Box>
            ))}
        </Stack>
    );
});

const TimeItem: React.FC<TimeItemProps> = ({ time, title, type }) => {
    const theme = useTheme();
    const isSmallDisplay = useMediaQuery(theme.breakpoints.down("lg"));

    const formattedTime = String(time).padStart(2, "0");
    const isOutlined = type === "outlined";

    return (
        <Box
            bgcolor={isOutlined ? "inherit" : "background.paper"}
            borderRadius="50%"
            display="flex"
            flexDirection={isOutlined ? "column" : "column-reverse"}
            alignItems={isOutlined ? "flex-start" : "center"}
            gap={isOutlined ? 0.5 : 0}
            sx={{
                width: isSmallDisplay ? (isOutlined ? "25px" : "60px") : "60px",
                height: isSmallDisplay ? (isOutlined ? "35px" : "60px") : "60px",
                padding: isSmallDisplay ? (isOutlined ? "5px" : "10px") : "15px"
            }}
        >
            <Typography
                sx={{
                    fontSize: isSmallDisplay ? "10px" : isOutlined ? "12px" : "11px",
                    lineHeight: isSmallDisplay ? "10px" : "18px",
                    fontWeight: isOutlined ? 500 : 400
                }}
            >
                {title}
            </Typography>
            <Typography
                sx={{
                    fontSize: isSmallDisplay ? "20px" : isOutlined ? "32px" : "16px",
                    lineHeight: isSmallDisplay ? "24px" : isOutlined ? "30px" : "20px",
                    fontWeight: isOutlined ? 700 : 600
                }}
            >
                {formattedTime}
            </Typography>
        </Box>
    );
};
