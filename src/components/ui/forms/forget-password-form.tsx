import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Card, FormControl, FormHelperText, Stack, TextField, Typography } from "@mui/material";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { validateString } from "~/utils";

import { useAuth } from "~/hooks/auth";

export const ForgetpasswordForm = memo(() => {
    const formSchema = z.object({
        contactField: validateString("Contact")
    });

    const { handleLogin } = useAuth();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isValid }
    } = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        reValidateMode: "onSubmit",
        resolver: zodResolver(formSchema),
        defaultValues: {
            contactField: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const message = await handleLogin(data.contactField, "");
            switch (message) {
                case "1":
                    setError("contactField", { type: "manual", message: "User contactField not found" });
                    break;
                default:
                    setError("contactField", { type: "manual", message: "An unknown error occurred" });
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Card
                component="form"
                variant="elevation"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    padding: 1,
                    width: {
                        sx: "auto"
                    },
                    minWidth: "371px",
                    marginLeft: {
                        sx: "10px",
                        sm: "120px"
                    }
                }}
            >
                <Stack spacing={3}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontSize: "36px",
                            lineHeight: "30px",
                            fontFamily: "Inter",
                            fontWeight: 500,
                            letterSpacing: "0.04em"
                        }}
                    >
                        Forget password
                    </Typography>
                    <Typography variant="h4" component="h1" textAlign="left">
                        Enter your contact info
                    </Typography>
                    <FormControl error={Boolean(errors.contactField)}>
                        <TextField
                            label="Email or Phones Number"
                            type="text"
                            placeholder="Email or Phones Number"
                            variant="standard"
                            required
                            fullWidth
                            {...register("contactField")}
                            error={Boolean(errors.contactField)}
                        />
                        <FormHelperText>{errors.contactField?.message}</FormHelperText>
                    </FormControl>
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                        <LoadingButton
                            sx={{ fontSize: "16px", height: "56px", fontWeight: 500 }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            loading={isSubmitting}
                            disabled={isSubmitting || !isValid}
                        >
                            Forget Password
                        </LoadingButton>
                    </Box>
                </Stack>
            </Card>
        </Box>
    );
});
