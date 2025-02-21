import Image from "next/image";
import { useRouter } from "next/router";

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
import { memo, useState } from "react";

import { useSearch } from "~/hooks";

import { SearchIcon } from "~/assets/icons";

export const Search = memo(() => {
    const { dataProductByName, handleGetProductByName } = useSearch();
    const theme = useTheme();
    const router = useRouter();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const { t } = useTranslation("");

    const [open, setOpen] = useState(false);

    return (
        <Autocomplete
            id="location-search"
            size="small"
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
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
            noOptionsText={t("header.noResult")}
            options={dataProductByName}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
                <TextField
                    {...params}
                    sx={{ fontSize: "12px", lineHeight: "18px" }}
                    placeholder={t("header.searchTitle")}
                    variant="outlined"
                    fullWidth
                    onChange={(e) => {
                        handleGetProductByName(e.target.value);
                        setOpen(true);
                    }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <InputAdornment position="end" sx={{ marginRight: "-28px", marginBottom: "-7px" }}>
                                <Box>
                                    <SearchIcon />
                                </Box>
                            </InputAdornment>
                        )
                    }}
                />
            )}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    {...props}
                    sx={{ borderRadius: "4px" }}
                    onClick={() => {
                        router.push(`/${option.category}/${option.id}/${option.title}`);
                        setOpen(false);
                    }}
                >
                    <Grid2 container alignItems="center" gap={1}>
                        <Grid2>
                            <Image src={option.image[0].url} height={50} width={50} alt="" />
                        </Grid2>
                        <Grid2>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {option.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {option.category}
                            </Typography>
                        </Grid2>
                    </Grid2>
                </Box>
            )}
        />
    );
});
