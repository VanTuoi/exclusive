import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useTranslation } from "next-i18next";

import { GoogleIcon } from "~/assets/icons";

import { useAuth } from "~/hooks/auth";

import { auth } from "~/libs/firebase/firebase-config";

import { CusTomButton } from "./button";

interface LoginWithGoogleProps {
    isLoading: boolean;
}

export const LoginWithGoogle = ({ isLoading }: LoginWithGoogleProps) => {
    const { handleLoginWithGoogle } = useAuth();

    const { t } = useTranslation("common");

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (user) {
                const token = await user.getIdToken();
                await handleLoginWithGoogle(token);
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    return (
        <CusTomButton
            disabled={isLoading}
            onClick={loginWithGoogle}
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{
                fontSize: "16px",
                height: "56px",
                fontWeight: 500,
                display: "flex",
                flexDirection: "row",
                textTransform: "none"
            }}
        >
            {t("loginWithGoogle")}
        </CusTomButton>
    );
};
