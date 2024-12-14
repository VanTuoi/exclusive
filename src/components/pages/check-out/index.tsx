import { useRouter } from "next/router";

import { Box, Button, Grid2, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { memo, useEffect, useMemo, useState } from "react";

import { useCustomSnackbar } from "~/hooks";
import { useAuthStore, useCartStore } from "~/stores";
import { DeliveryFormData } from "~/types";

import { PromoCodeInput } from "../cart/input-promotion";
import { Total } from "../cart/total";

import { ControlledCheckbox } from "./check-box-save";
import { DeliveryForm } from "./deliver-form";
import { ItemProduct } from "./item-product";
import { PayMethod } from "./pay-method";

export const CheckOutComponents = memo(() => {
    const { items, removeAllInCart } = useCartStore();

    const { showSnackbar } = useCustomSnackbar();

    const { userData } = useAuthStore();

    const router = useRouter();

    const { t } = useTranslation();

    const [isSaveFormToLocal, setIsSaveFormToLocal] = useState<boolean>(false);

    const [typePayMethod, setTypePayMethod] = useState<"bank" | "cash">("cash");

    const [isValidCard, setIsValidCard] = useState<boolean>(false);
    const [isValidForm, setIsValidForm] = useState<boolean>(false);

    const [dataForm, setDataForm] = useState<DeliveryFormData | null>(null);
    const [dataFormSaveSession, setDataFormSaveSession] = useState<DeliveryFormData | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const subtotal = useMemo(() => {
        return Object.values(items).reduce((acc, { product, quantity }) => acc + product.finalPrice * quantity, 0);
    }, [items]);

    const handleSubmit = () => {
        if (userData && localStorage.getItem("isLogin") === "true") {
            setIsSubmitting(true);
            sessionStorage.removeItem("checkoutData");
            removeAllInCart();
            showSnackbar("Payment successful", "success");
        } else {
            if (isSaveFormToLocal) {
                localStorage.setItem("checkoutData", JSON.stringify(dataForm));
            } else {
                sessionStorage.setItem("checkoutData", JSON.stringify(dataForm));
            }
            router.push("/auth/login?urlCallBack=/checkout");
        }
    };

    useEffect(() => {
        const savedData = sessionStorage.getItem("checkoutData") || localStorage.getItem("checkoutData");
        if (savedData) {
            setDataFormSaveSession(JSON.parse(savedData));
            setIsValidForm(true);
        }
    }, []);

    return (
        <Grid2 container sx={{ width: "100%" }} spacing={1}>
            {Object.values(items).length > 0 ? (
                <>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        <Box>
                            <DeliveryForm
                                setIsValidForm={setIsValidForm}
                                dataForm={dataFormSaveSession}
                                isSubmitting={isSubmitting}
                                handleChange={setDataForm}
                            />
                            <ControlledCheckbox
                                isSaveFormToLocal={isSaveFormToLocal}
                                setIsSaveFormToLocal={setIsSaveFormToLocal}
                            />
                        </Box>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 6 }}>
                        {Object.keys(items).length > 0 && (
                            <Grid2 container size={{ xs: 12 }} spacing={1}>
                                <Grid2 size={{ xs: 12, md: 12 }} alignItems={"flex-start"}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 3,
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            minHeight: "324px",
                                            width: { xs: "100%", md: "470px" },
                                            padding: { xs: 0, md: 5 },
                                            paddingLeft: 0
                                        }}
                                    >
                                        {Object.values(items).map((item) => (
                                            <ItemProduct key={item.product.id} item={item} />
                                        ))}
                                        <Total subtotal={subtotal} shipping={t("checkout.shipping")} />
                                        <Box sx={{ width: "100%" }}>
                                            <PayMethod
                                                isSubmitting={isSubmitting}
                                                typePayMethod={typePayMethod}
                                                changeTypePayMethod={setTypePayMethod}
                                                setIsValidCard={setIsValidCard}
                                            />
                                        </Box>
                                    </Box>
                                </Grid2>
                                <Grid2 size={{ xs: 12, md: 12 }} gap={1}>
                                    <PromoCodeInput />
                                    <Box sx={{ paddingY: 4 }}>
                                        <Button
                                            onClick={() => handleSubmit()}
                                            variant="contained"
                                            size="large"
                                            type="submit"
                                            disabled={!isValidForm || (typePayMethod === "bank" && !isValidCard)}
                                        >
                                            {t("checkout.button")}
                                        </Button>
                                    </Box>
                                </Grid2>
                            </Grid2>
                        )}
                    </Grid2>
                </>
            ) : (
                <Grid2 size={{ xs: 12, md: 12 }}>
                    <Box sx={{ padding: 2 }}>
                        <Typography variant="h4" textAlign={"center"}>
                            {t("checkout.emptyCart")}
                        </Typography>
                    </Box>
                </Grid2>
            )}
        </Grid2>
    );
});
