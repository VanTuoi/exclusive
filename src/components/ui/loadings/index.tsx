import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { memo } from "react";

export const Loading = memo(() => {
    return (
        <Stack direction={"column"} alignItems={"center"} justifyContent={"center"} marginTop={"20%"}>
            <CircularProgress />
        </Stack>
    );
});
