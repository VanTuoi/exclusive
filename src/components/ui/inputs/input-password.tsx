import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, FormHelperText, IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface PasswordInputProps<T extends FieldValues> {
    label: string;
    placeholder?: string;
    disabled: boolean;
    register: UseFormRegister<T>;
    errors: Partial<Record<keyof T, { message?: string }>>;
    name: Path<T>;
    variant?: TextFieldProps["variant"];
}

export const PasswordInput = <T extends FieldValues>({
    label,
    placeholder,
    disabled,
    register,
    errors,
    name,
    variant = "outlined"
}: PasswordInputProps<T>) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (
        <FormControl fullWidth error={Boolean(errors[name])}>
            <TextField
                label={label}
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
            />
            <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
    );
};
// ---> Using memo here will not get the error
// export const PasswordInput = memo(PasswordInputComponent) as typeof PasswordInputComponent;
