import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Card, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { validateString } from "~/utils";

import { PasswordInput } from "../inputs";

const changePasswordSchema = z
    .object({
        password: validateString("Password"),

        newPassword: validateString("New password"),

        reNewPassword: validateString("Confirm new password")
    })
    .refine((data) => data.newPassword === data.reNewPassword, {
        message: "Passwords do not match",
        path: ["repassword"]
    });

export const ChangePasswordForm: React.FC = memo(() => {
    const theme = useTheme();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset
    } = useForm<z.infer<typeof changePasswordSchema>>({
        mode: "onChange",
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            password: "",
            newPassword: "",
            reNewPassword: ""
        }
    });

    const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
        try {
            console.log(data);
            reset();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2
            }}
        >
            <Card
                component="form"
                variant="elevation"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                    width: { xs: "auto", sm: 500 },
                    padding: 4,
                    backgroundColor: theme.palette.background.paper
                }}
            >
                <Grid container spacing={3}>
                    <Grid size={12}>
                        <PasswordInput
                            disabled={isSubmitting}
                            placeholder=""
                            label="Curent password"
                            register={register}
                            errors={errors}
                            name="password"
                        />
                    </Grid>
                    <Grid size={12}>
                        <PasswordInput
                            disabled={isSubmitting}
                            placeholder=""
                            label="New Password"
                            register={register}
                            errors={errors}
                            name="newPassword"
                        />
                    </Grid>
                    <Grid size={12}>
                        <PasswordInput
                            disabled={isSubmitting}
                            placeholder=""
                            label="Confim Password"
                            register={register}
                            errors={errors}
                            name="reNewPassword"
                        />
                    </Grid>
                    <Grid size={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            disabled={isSubmitting || !isValid}
                            sx={{
                                paddingY: 2
                            }}
                        >
                            {isSubmitting ? "Updating..." : "Update Password"}
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
});
