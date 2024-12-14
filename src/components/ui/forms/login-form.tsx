import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Card, Divider, FormControl, FormHelperText, Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { maxLength, minLength, regexSchema, validateString } from "~/utils";

import { PasswordInput } from "~/components/ui/inputs";

import { useAuth } from "~/hooks/auth";

import { LoginWithGoogle } from "../buttons/login-with-google";

export const LoginForm = memo(() => {
    const router = useRouter();

    const { t } = useTranslation();

    const formSchema = z.object({
        contactField: validateString("Contact"),

        password: validateString("Password")
            .and(minLength(6, t("validate.minLength", { objectName: t("validate.password"), minimumValue: 6 })))
            .and(maxLength(50, t("validate.maxLength", { objectName: t("validate.password"), maximumValue: 50 })))
            .and(
                regexSchema(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                    t("validate.regexSchema", { objectName: t("validate.password"), minimumValue: 1 })
                )
            )
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
            contactField: "example@gmail.com",
            password: "1234a@"
        }
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const message = await handleLogin(data.contactField, data.password);

        if (!message) return;
        switch (message) {
            case "1":
                setError("contactField", { type: "manual", message: "User contactField not found" });
                break;
            case "2":
                setError("password", { type: "manual", message: "Incorrect password" });
                break;
            default:
                setError("contactField", { type: "manual", message: "An unknown error occurred" });
                break;
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
                        {t("loginPage.title")}
                    </Typography>
                    <Typography variant="h4" component="h1" textAlign="left">
                        {t("loginPage.content")}
                    </Typography>
                    <Box
                        sx={{
                            gap: "8px",
                            marginTop: "18px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "stretch"
                        }}
                    >
                        <FormControl error={Boolean(errors.contactField)}>
                            <TextField
                                disabled={isSubmitting}
                                label={t("loginPage.form.contact.label")}
                                type="text"
                                placeholder={t("loginPage.form.contact.placeholder")}
                                variant="standard"
                                required
                                fullWidth
                                {...register("contactField")}
                                error={Boolean(errors.contactField)}
                            />
                            <FormHelperText>{errors.contactField?.message}</FormHelperText>
                        </FormControl>
                        <PasswordInput
                            disabled={isSubmitting}
                            label={t("loginPage.form.password.label")}
                            placeholder={t("loginPage.form.password.placeholder")}
                            variant="standard"
                            register={register}
                            errors={errors}
                            name="password"
                        />
                    </Box>
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                        <LoadingButton
                            sx={{ width: "143px", fontSize: "16px", height: "56px", fontWeight: 500 }}
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            loading={isSubmitting}
                            disabled={isSubmitting || !isValid}
                        >
                            {t("loginPage.button")}
                        </LoadingButton>
                        <Button
                            variant="text"
                            sx={{ fontWeight: 400 }}
                            onClick={() => {
                                router.push("forget-password");
                            }}
                        >
                            {t("loginPage.forgetPassword")}
                        </Button>
                    </Box>
                    <Divider />
                    <LoginWithGoogle isLoading={isSubmitting} />
                </Stack>
            </Card>
        </Box>
    );
});
