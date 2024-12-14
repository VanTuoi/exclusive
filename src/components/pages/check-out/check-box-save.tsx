import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "next-i18next";
import { memo } from "react";

interface ControlledCheckboxProps {
    isSaveFormToLocal: boolean;
    setIsSaveFormToLocal: (status: boolean) => void;
}

export const ControlledCheckbox = memo(({ isSaveFormToLocal, setIsSaveFormToLocal }: ControlledCheckboxProps) => {
    const { t } = useTranslation();

    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={isSaveFormToLocal}
                    size="small"
                    onChange={(e) => setIsSaveFormToLocal(e.target.checked)}
                />
            }
            label={t("checkout.saveInfo")}
        />
    );
});
