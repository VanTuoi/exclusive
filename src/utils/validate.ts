import { z } from "zod";

export const validateString = (message: string) => {
    return z.string().refine((value) => typeof value === "string", { message: message });
};

export const minLength = (min: number, message: string) => {
    return z.string().min(min, { message });
};

export const maxLength = (max: number, message: string) => {
    return z.string().max(max, { message });
};

export const regexSchema = (regex: RegExp, message: string) => {
    return z.string().regex(regex, message);
};

export const validateEmail = (value: string) => {
    return z.string().email().safeParse(value).success;
};

export const validatePhone = (value: string) => {
    return /^\d{10,15}$/.test(value);
};
