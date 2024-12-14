import { Box, InputAdornment, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "next-i18next";
import { memo, useState } from "react";

import { SendMail } from "~/assets/icons";

export const SendMailComponent = memo(() => {
    const theme = useTheme();

    const { t } = useTranslation("common");

    const [email, setEmail] = useState("");

    return (
        <Box>
            <TextField
                id="input-with-icon-textfield"
                size="small"
                type="email"
                required
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                placeholder={t("footer.email.placeholder")}
                sx={{
                    color: theme.palette.text.primary,
                    paddingY: "4px",
                    width: "217px",
                    height: "48px",
                    border: `1.5px solid ${theme.palette.background.paper}`,
                    borderRadius: "4px",
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            border: "none"
                        },
                        "& input": {
                            color: theme.palette.text.secondary
                        }
                    },
                    "& .MuiInputAdornment-root": {
                        position: "absolute",
                        cursor: "pointer",
                        right: "5px"
                    },
                    "& input::placeholder": {
                        color: theme.palette.text.secondary,
                        opacity: 1
                    }
                }}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment
                                position="start"
                                onClick={() => {
                                    alert("Send mail to: " + email);
                                }}
                            >
                                <SendMail />
                            </InputAdornment>
                        )
                    }
                }}
                variant="outlined"
            />
        </Box>
    );
});
