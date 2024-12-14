import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    FormControl,
    FormHelperText,
    FormLabel,
    IconButton,
    InputAdornment,
    TextField,
    TextFieldProps
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> {
    label?: string;
    required?: boolean;
    disabled?: boolean;
    placeholder?: string;
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

export const BorderlessPassword = <T extends FieldValues>({
    label,
    required = false,
    disabled,
    placeholder,
    register,
    errors,
    name,
    variant = "outlined",
    onChange
}: InputProps<T>) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (
        <FormControl fullWidth error={Boolean(errors[name])}>
            <FormLabel required={required} sx={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400 }}>
                {label}
            </FormLabel>
            <BorderlessTextField
                disabled={disabled}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                variant={variant}
                required
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
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
