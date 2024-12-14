import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Card, Grid2, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUpdateInfo } from "~/hooks";
import { useAuthStore } from "~/stores";
import { UpdateUserData } from "~/types";
import { minLength, validateString } from "~/utils";

import { BorderlessPassword } from "~/components/pages/check-out/borderless-password";
import { BorderlessInput } from "~/components/pages/check-out/borderless-text-field";

export const ProfileForm = memo(() => {
    const theme = useTheme();

    const { t } = useTranslation();

    const { userData } = useAuthStore();

    const { handleUpdateInfo } = useUpdateInfo();

    const formSchema = z
        .object({
            firstName: validateString("First Name").and(minLength(1, t("checkout.form.validate.required"))),
            lastName: z.string().optional(),
            streetAddress: validateString("Street Address").and(minLength(1, t("checkout.form.validate.required"))),
            emailAddress: validateString("Email Address").and(minLength(1, t("checkout.form.validate.required"))),
            currentPassword: z.string().optional(),
            newPassword: z.string().optional(),
            confirmNewPassword: z.string().optional()
        })
        .refine((data) => data.newPassword === data.confirmNewPassword, {
            message: t("profile.form.confirmNewPassword.validate.match"),
            path: ["confirmNewPassword"]
        });

    const {
        register,
        formState: { errors, isValid, isSubmitting, isDirty },
        setValue,
        trigger,
        handleSubmit
    } = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {}
    });

    const onChange = (name: keyof Omit<UpdateUserData, "id">, value: string) => {
        setValue(name, value);
        trigger(name);
    };

    useEffect(() => {
        if (userData) {
            setValue("firstName", userData?.firstName ?? "");
            setValue("lastName", userData?.lastName ?? "");
            setValue("streetAddress", userData?.streetAddress ?? "");
            setValue("emailAddress", userData?.emailAddress ?? "");
        }
    }, [userData, setValue]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isDirty) {
                event.preventDefault();
                event.returnValue = t("profile.form.unsavedChangesWarning");
                alert("");
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isDirty, t]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        await handleUpdateInfo(data);
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <Card component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ p: 1 }}>
                <Stack spacing={3}>
                    <Typography
                        textAlign="left"
                        variant="h3"
                        sx={{
                            width: "100%",
                            lineHeight: "28px",
                            fontFamily: "Inter",
                            fontWeight: 500,
                            color: theme.palette.secondary.main,
                            letterSpacing: "0.04em"
                        }}
                    >
                        {t("profile.title")}
                    </Typography>
                    <Grid2 container spacing={3}>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Typography variant="h4">{t("profile.form.firstName.label")}</Typography>
                            <BorderlessInput
                                required={false}
                                register={register}
                                errors={errors}
                                name="firstName"
                                variant="outlined"
                                onChange={(value) => onChange("firstName", value)}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Typography variant="h4">{t("profile.form.lastName.label")}</Typography>
                            <BorderlessInput
                                required={false}
                                register={register}
                                errors={errors}
                                name="lastName"
                                variant="outlined"
                                onChange={(value) => onChange("lastName", value)}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Typography variant="h4">{t("checkout.form.emailAddress.label")}</Typography>
                            <BorderlessInput
                                required={false}
                                register={register}
                                errors={errors}
                                name="emailAddress"
                                variant="outlined"
                                onChange={(value) => onChange("emailAddress", value)}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Typography variant="h4">{t("checkout.form.streetAddress.label")}</Typography>
                            <BorderlessInput
                                required={false}
                                register={register}
                                errors={errors}
                                name="streetAddress"
                                variant="outlined"
                                onChange={(value) => onChange("streetAddress", value)}
                            />
                        </Grid2>
                        <Grid2 container size={{ xs: 12 }} spacing={1.5}>
                            <Grid2 size={{ xs: 12 }}>
                                <Typography variant="h4">{t("profile.form.currentPassword.label")}</Typography>
                                <BorderlessPassword
                                    placeholder={t("profile.form.currentPassword.label")}
                                    required={false}
                                    register={register}
                                    errors={errors}
                                    name="currentPassword"
                                    variant="outlined"
                                    onChange={(value) => onChange("currentPassword", value)}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12 }}>
                                <BorderlessPassword
                                    placeholder={t("profile.form.newPassword.label")}
                                    required={false}
                                    register={register}
                                    errors={errors}
                                    name="newPassword"
                                    variant="outlined"
                                    onChange={(value) => onChange("newPassword", value)}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12 }}>
                                <BorderlessPassword
                                    placeholder={t("profile.form.confirmNewPassword.label")}
                                    required={false}
                                    register={register}
                                    errors={errors}
                                    name="confirmNewPassword"
                                    variant="outlined"
                                    onChange={(value) => onChange("confirmNewPassword", value)}
                                />
                            </Grid2>
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }} gap={1}>
                                <Button
                                    type="button"
                                    variant="text"
                                    color="primary"
                                    size="large"
                                    disabled={isSubmitting}
                                >
                                    {t("profile.form.cancel")}
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    disabled={!isValid || isSubmitting}
                                >
                                    {t("profile.form.submit")}
                                </Button>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Stack>
            </Card>
        </Box>
    );
});
