import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Card, Grid2 } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCustomSnackbar } from "~/hooks";
import { Contact } from "~/types";
import { minLength, validateString } from "~/utils";

import { BorderlessInput } from "~/components/pages/check-out/borderless-text-field";

import { CusTomButton } from "../buttons";

export const ContactForm = memo(() => {
    const { t } = useTranslation();

    const { showSnackbar } = useCustomSnackbar();

    const formSchema = z.object({
        name: validateString("Name").and(minLength(1, t("contact.form.name.validate.required"))),
        email: validateString("Email").and(minLength(1, t("contact.form.email.validate.required"))),
        phone: validateString("Phone").and(minLength(1, t("contact.form.phone.validate.required"))),
        message: validateString("Message").and(minLength(1, t("contact.form.message.validate.required")))
    });

    const {
        register,
        formState: { errors, isValid, isSubmitting },
        setValue,
        trigger,
        handleSubmit
    } = useForm<z.infer<typeof formSchema>>({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {}
    });

    const onChange = (name: keyof Contact, value: string) => {
        setValue(name, value);
        trigger(name);
    };

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log("Data form", data);
        showSnackbar("Your form has been submitted.", "success");
    };

    return (
        <Card
            component="form"
            variant="outlined"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            elevation={4}
            sx={{ p: 1, height: "457px" }}
        >
            <Grid2 container spacing={4} p={"35px"}>
                <Grid2 container spacing={2} width={"100%"}>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <BorderlessInput
                            placeholder={t("contact.form.name.label")}
                            required={false}
                            register={register}
                            errors={errors}
                            name="name"
                            variant="outlined"
                            onChange={(value) => onChange("name", value)}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <BorderlessInput
                            placeholder={t("contact.form.email.label")}
                            required={false}
                            register={register}
                            errors={errors}
                            name="email"
                            variant="outlined"
                            onChange={(value) => onChange("email", value)}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <BorderlessInput
                            placeholder={t("contact.form.phone.label")}
                            required={false}
                            register={register}
                            errors={errors}
                            name="phone"
                            variant="outlined"
                            onChange={(value) => onChange("phone", value)}
                        />
                    </Grid2>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <BorderlessInput
                        placeholder={t("contact.form.message.label")}
                        required={false}
                        register={register}
                        errors={errors}
                        name="message"
                        variant="outlined"
                        multiline
                        rows={8}
                        onChange={(value) => onChange("message", value)}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                        <CusTomButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            disabled={!isValid || isSubmitting}
                        >
                            {t("contact.form.submit")}
                        </CusTomButton>
                    </Box>
                </Grid2>
            </Grid2>
        </Card>
    );
});
