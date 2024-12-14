import Image from "next/image";

import {
    Autocomplete,
    Box,
    Grid2,
    InputAdornment,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";

import { SearchIcon } from "~/assets/icons";

export const Search = memo(() => {
    const options = [
        { name: "IPS LCD", location: "Samsung" },
        { name: "IPS LCD", location: "LG" },
        { name: "IPS LCD", location: "Dell" }
    ];

    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const { t } = useTranslation("common");

    return (
        <Autocomplete
            id="location-search"
            size="small"
            sx={{
                fontSize: "12px",
                borderRadius: "4px",
                height: "38px",
                width: "243px",
                display: isSmallScreen ? "none" : "flex",
                margin: "0 12px",
                backgroundColor: theme.palette.grey[100],
                "& .MuiOutlinedInput-root": {
                    borderRadius: "4px",
                    padding: "0"
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #eee",
                    paddingTop: "8px",
                    paddingLeft: "12px"
                }
            }}
            options={options}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
                <TextField
                    {...params}
                    sx={{
                        fontSize: "12px",
                        lineHeight: "18px"
                    }}
                    placeholder={t("header.searchTitle")}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <InputAdornment position="end" sx={{ marginRight: "-28px", marginBottom: "-7px" }}>
                                <Box sx={{}}>
                                    <SearchIcon />
                                </Box>
                            </InputAdornment>
                        )
                    }}
                />
            )}
            renderOption={(props, option) => (
                <Box component="li" {...props} sx={{ borderRadius: "4px" }}>
                    <Grid2 container alignItems="center" gap={1}>
                        <Grid2>
                            <Image src="" height={50} width={50} alt="" />
                        </Grid2>
                        <Grid2>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {option.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {option.location}
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Box>
            )}
        />
    );
});
