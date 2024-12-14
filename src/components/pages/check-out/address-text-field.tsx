import { FormControl, FormHelperText, FormLabel, TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef } from "react";
import Autocomplete from "react-google-autocomplete";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface AddressInputProps<T extends FieldValues> {
    label: string;
    placeholder?: string;
    required?: boolean;
    disabled: boolean;
    register: UseFormRegister<T>;
    errors: Partial<Record<keyof T, { message?: string }>>;
    name: Path<T>;
    cityName: Path<T>;
    variant?: TextFieldProps["variant"];
    setValue: (name: Path<T>, value: string) => void;
}

const BorderlessTextField = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.grey[50],
    borderRadius: "4px",
    "& input": {
        width: "100%",
        border: "none",
        outline: "none",
        fontSize: "16px",
        lineHeight: "24px",
        fontWeight: 400,
        padding: "10px",
        backgroundColor: "transparent"
    },
    "& input:disabled": {
        backgroundColor: theme.palette.grey[200]
    }
}));

interface AddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
}

interface Geometry {
    location: {
        lat: number;
        lng: number;
    };
}

interface Place {
    address_components: AddressComponent[];
    formatted_address: string;
    geometry: Geometry;
    place_id: string;
    name?: string;
    html_attributions?: string[];
}

export const AddressInput = <T extends FieldValues>({
    label,
    required,
    disabled,
    register,
    errors,
    name,
    cityName,
    setValue
}: AddressInputProps<T>) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handlePlaceSelected = (place: Place) => {
        if (place) {
            const address = place.formatted_address || "";
            setValue(name, address);

            if (place.address_components) {
                const cityComponent = place.address_components.find(
                    (component) =>
                        component.types.includes("locality") || component.types.includes("administrative_area_level_1")
                );
                const city = cityComponent ? cityComponent.long_name : "";
                setValue(cityName, city);
            }
        }
    };

    return (
        <FormControl fullWidth error={Boolean(errors[name])}>
            <FormLabel
                required={required}
                sx={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400, paddingY: "10px" }}
            >
                {label}
            </FormLabel>
            <BorderlessTextField>
                <Autocomplete
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_AUTOCOMPLETE_KEY}
                    onPlaceSelected={(place) => {
                        handlePlaceSelected(place);
                    }}
                    onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setValue(name, e.target.value);
                    }}
                    disabled={disabled}
                    placeholder="Enter address"
                    inputAutocompleteValue=""
                    ref={(ref) => {
                        inputRef.current = ref;
                        register(name, { required });
                    }}
                    options={{
                        types: ["address"]
                    }}
                    className="autocomplete-input"
                    style={{
                        width: "100%",
                        border: "none",
                        outline: "none",
                        padding: "16px 14px",
                        fontSize: "16px"
                    }}
                />
            </BorderlessTextField>
            <FormHelperText>{errors[name]?.message}</FormHelperText>
        </FormControl>
    );
};
