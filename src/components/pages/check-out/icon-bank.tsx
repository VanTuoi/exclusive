import Image from "next/image";

import { Box } from "@mui/material";
import { memo } from "react";

export const IconBank = memo(() => {
    return (
        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"flex-start"} gap={1}>
            <Image
                height={40}
                width={50}
                style={{ objectFit: "contain" }}
                alt="bank"
                src={"/assets/imgs/banks/bkash.webp"}
            ></Image>
            <Image
                height={25}
                width={40}
                style={{ objectFit: "contain" }}
                alt="bank"
                src={"/assets/imgs/banks/visa.webp"}
            ></Image>
            <Image
                height={25}
                width={40}
                style={{ objectFit: "contain" }}
                alt="bank"
                src={"/assets/imgs/banks/master-card.webp"}
            ></Image>
            <Image
                height={40}
                width={50}
                style={{ objectFit: "contain" }}
                alt="bank"
                src={"/assets/imgs/banks/bank1.webp"}
            ></Image>
        </Box>
    );
});
