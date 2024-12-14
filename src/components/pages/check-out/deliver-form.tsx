import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Card, Stack, Typography, useTheme } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAuthStore } from "~/stores";
import { DeliveryFormData } from "~/types";
import { minLength, regexSchema, validateString } from "~/utils";

import { AddressInput } from "./address-text-field";
import { BorderlessInput } from "./borderless-text-field";

interface DeliveryFormProps {
    dataForm?: DeliveryFormData | null;
    isSubmitting: boolean;
    setIsValidForm: (status: boolean) => void;
    handleChange: (data: DeliveryFormData) => void;
}

export const DeliveryForm = memo(({ dataForm, isSubmitting, setIsValidForm, handleChange }: DeliveryFormProps) => {
    const theme = useTheme();

    const { t } = useTranslation();

    const { userData } = useAuthStore();

    const formSchema = z.object({
        firstName: validateString("First Name").and(minLength(1, t("checkout.form.validate.required"))),
        companyName: z.string().optional(),
        streetAddress: z.string().optional(),
        apartment: z.string().optional(),
        city: validateString("Town/City").and(minLength(1, t("checkout.form.validate.required"))),
        phoneNumber: z
            .string()
            .and(minLength(1, t("checkout.form.validate.required")))
            .and(regexSchema(/^[0-9]{10,15}$/, t("checkout.form.validate.phoneNumber"))),
        emailAddress: validateString("Email Address").and(minLength(1, t("checkout.form.validate.required")))
    });

    const {
        register,
        formState: { errors, isValid },
        setValue,
        getValues,
        trigger,
        watch
    } = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {}
    });

    const onChange = (name: keyof DeliveryFormData, value: string) => {
        setValue(name, value);
        trigger(name);
        const updatedValues = {
            firstName: getValues("firstName"),
            companyName: getValues("companyName"),
            streetAddress: getValues("streetAddress") || "",
            apartment: getValues("apartment"),
            city: getValues("city"),
            phoneNumber: getValues("phoneNumber"),
            emailAddress: getValues("emailAddress")
        };
        handleChange(updatedValues);

        if (name === "streetAddress" && value) {
            const addressParts = value.split(", ");
            if (addressParts.length > 1) {
                const city = addressParts[addressParts.length - 2];
                setValue("city", city);
            }
        }
        setIsValidForm(isValid);
    };

    const handleSetValue = (name: keyof DeliveryFormData, value: string) => {
        onChange(name, value);
    };

    const formValues = watch();

    useEffect(() => {
        setIsValidForm(isValid);
    }, [formValues, isValid]);

    useEffect(() => {
        if (userData ?? dataForm) {
            setValue("firstName", userData?.firstName ?? dataForm?.firstName ?? "");
            setValue("companyName", dataForm?.companyName ?? "");
            setValue("streetAddress", dataForm?.streetAddress ?? "");
            setValue("apartment", dataForm?.apartment ?? "");
            setValue("city", dataForm?.city ?? "");
            setValue("phoneNumber", userData?.phone ?? dataForm?.phoneNumber ?? "");
            setValue("emailAddress", userData?.emailAddress ?? dataForm?.emailAddress ?? "");
            handleChange({
                firstName: userData?.firstName ?? "",
                companyName: "",
                streetAddress: "",
                apartment: "",
                city: "",
                phoneNumber: userData?.phone ?? "",
                emailAddress: userData?.emailAddress ?? ""
            });
        } else {
            setValue("firstName", "no login name");
            setValue("streetAddress", "Ninh Kieu");
            setValue("companyName", "");
            setValue("city", "Can Tho");
            setValue("phoneNumber", "0123456789");
            setValue("emailAddress", "text@gmail.com");
            handleChange({
                firstName: "no login name",
                companyName: "",
                streetAddress: "Ninh Kieu",
                apartment: "",
                city: "Can Tho",
                phoneNumber: "0123456789",
                emailAddress: "text@gmail.com"
            });
        }
    }, [userData, dataForm]);

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center"
            }}
        >
            <Card
                component="form"
                noValidate
                sx={{
                    width: { xs: "100%", md: "470px" }
                }}
            >
                <Stack spacing={3}>
                    <Typography
                        textAlign={"left"}
                        variant="h3"
                        sx={{
                            width: "100%",
                            fontSize: "2rem",
                            fontFamily: "Inter",
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                            letterSpacing: "0.04em"
                        }}
                    >
                        {t("checkout.title")}
                    </Typography>
                    <Box sx={{ gap: 3, mt: 2, display: "flex", flexDirection: "column" }}>
                        <BorderlessInput
                            label={t("checkout.form.firstName.label")}
                            required={true}
                            disabled={isSubmitting}
                            register={register}
                            errors={errors}
                            name={"firstName"}
                            variant="outlined"
                            onChange={(value) => handleSetValue("firstName", value)}
                        />
                        <BorderlessInput
                            label={t("checkout.form.companyName.label")}
                            required={false}
                            disabled={isSubmitting}
                            register={register}
                            errors={errors}
                            name={"companyName"}
                            variant="outlined"
                            onChange={(value) => handleSetValue("companyName", value)}
                        />
                        <AddressInput
                            cityName="city"
                            setValue={handleSetValue}
                            label={t("checkout.form.streetAddress.label")}
                            required={false}
                            disabled={isSubmitting}
                            register={register}
                            errors={errors}
                            name={"streetAddress"}
                            variant="outlined"
                        />
                        <BorderlessInput
                            label={t("checkout.form.apartment.label")}
                            required={false}
                            disabled={isSubmitting}
                            register={register}
                            errors={errors}
                            name={"apartment"}
                            variant="outlined"
                            onChange={(value) => handleSetValue("apartment", value)}
                        />
                        <BorderlessInput
                            label={t("checkout.form.city.label")}
                            required={true}
                            disabled={isSubmitting}
                            register={register}
                            errors={errors}
                            name={"city"}
                            variant="outlined"
                            onChange={(value) => handleSetValue("city", value)}
                        />
                        <BorderlessInput
                            label={t("checkout.form.phoneNumber.label")}
                            required={true}
                            disabled={isSubmitting}
                            register={register}
                            errors={errors}
                            name={"phoneNumber"}
                            variant="outlined"
                            onChange={(value) => handleSetValue("phoneNumber", value)}
                        />
                        <BorderlessInput
                            label={t("checkout.form.emailAddress.label")}
                            required={true}
                            disabled={isSubmitting}
                            register={register}
                            errors={errors}
                            name={"emailAddress"}
                            variant="outlined"
                            onChange={(value) => handleSetValue("emailAddress", value)}
                        />
                    </Box>
                </Stack>
            </Card>
        </Box>
    );
});
