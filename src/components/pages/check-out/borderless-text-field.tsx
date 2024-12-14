import { FormControl, FormHelperText, FormLabel, TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    type?: string;
    placeholder?: string;
    multiline?: boolean;
    rows?: number;
    register: UseFormRegister<T>;
    errors: Partial<Record<keyof T, { message?: string }>>;
    name: Path<T>;
    variant?: TextFieldProps["variant"];
    onChange?: (value: string) => void;
}

const BorderlessTextField = styled(TextField)(({ theme }) => ({
    backgroundColor: theme.palette.grey[50],
    borderRadius: "4px",
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "none",
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: 400
        }
    }
}));

export const BorderlessInput = <T extends FieldValues>({
    label,
    required = false,
    disabled,
    type,
    multiline,
    rows,
    placeholder,
    register,
    errors,
    name,
    variant = "outlined",
    onChange
}: InputProps<T>) => {
    return (
        <FormControl fullWidth error={Boolean(errors[name])}>
            <FormLabel required={required} sx={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>
                {label}
            </FormLabel>
            <BorderlessTextField
                multiline={multiline}
                rows={rows}
                disabled={disabled}
                type={type}
                placeholder={placeholder}
                variant={variant}
                required
                {...register(name)}
                error={Boolean(errors[name])}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e.target.value);
                    }
                }}
            />
            <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
    );
};
