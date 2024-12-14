import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Card, FormControl, FormHelperText, Stack, TextField, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { maxLength, minLength, regexSchema, validateString } from "~/utils";

import { PasswordInput } from "~/components/ui/inputs";

import { useAuth } from "~/hooks/auth";

import { LoginWithGoogle } from "../buttons/login-with-google";
import { CustomLink } from "../links";

export const RegisterForm = memo(() => {
    const { t } = useTranslation("common");

    const formSchema = z.object({
        name: validateString("Name")
            .and(minLength(1, t("validate.minLength", { objectName: t("validate.name"), minimumValue: 1 })))
            .and(maxLength(50, t("validate.maxLength", { objectName: t("validate.name"), maximumValue: 50 }))),

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

    const { handleRegister } = useAuth();

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
            name: "Mr Alan",
            contactField: "example@gmail.com",
            password: "1234a@"
        }
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const message = await handleRegister(data);

        if (!message) return;
        switch (message) {
            case "phone":
                setError("contactField", { type: "manual", message: "User contactField not found" });
                break;
            case "password":
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
                    margin: {
                        sx: "10px",
                        sm: "130px"
                    },
                    minWidth: "371px"
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
                            letterSpacing: "0.04rem"
                        }}
                    >
                        {t("signUpPage.title")}
                    </Typography>
                    <Typography variant="h4" component="h1" textAlign="left">
                        {t("signUpPage.content")}
                    </Typography>
                    <FormControl error={Boolean(errors.name)}>
                        <TextField
                            disabled={isSubmitting}
                            label={t("signUpPage.form.name.label")}
                            type="text"
                            placeholder={t("signUpPage.form.name.placeholder")}
                            variant="standard"
                            required
                            fullWidth
                            {...register("name")}
                            error={Boolean(errors.name)}
                        />
                        <FormHelperText>{errors.name?.message}</FormHelperText>
                    </FormControl>
                    <FormControl error={Boolean(errors.contactField)}>
                        <TextField
                            disabled={isSubmitting}
                            label={t("signUpPage.form.contact.label")}
                            type="text"
                            placeholder={t("signUpPage.form.contact.placeholder")}
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
                        variant="standard"
                        label={t("signUpPage.form.password.label")}
                        placeholder={t("signUpPage.form.password.placeholder")}
                        register={register}
                        errors={errors}
                        name="password"
                    />
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
                        {t("signUpPage.button")}
                    </LoadingButton>
                    <LoginWithGoogle isLoading={isSubmitting} />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "baseline"
                        }}
                    >
                        <Typography variant="h5" sx={{ marginRight: 1 }}>
                            {t("signUpPage.haveAccount")}
                        </Typography>
                        <CustomLink href="/auth/login" variant="h5">
                            {t("signUpPage.linkLogin")}
                        </CustomLink>
                    </Box>
                </Stack>
            </Card>
        </Box>
    );
});
