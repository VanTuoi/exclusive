import { Box, Card } from "@mui/material";
import Divider from "@mui/material/Divider";
import { memo } from "react";

import { useInfoContact } from "~/hooks";

import { ItemMail } from "./item-mail";
import { ItemPhone } from "./item-phone";

export const InfoContact = memo(() => {
    const { dataContact } = useInfoContact();
    return (
        <Card sx={{ padding: "35px", height: "457px" }} elevation={4} variant="outlined">
            <Box display={"flex"} flexDirection={"column"} gap={4} maxWidth={"300px"}>
                <ItemPhone dataPhone={dataContact?.phone} />
                <Divider />
                <ItemMail dataEmail={dataContact?.email} />
            </Box>
        </Card>
    );
});
