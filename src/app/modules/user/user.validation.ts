import { z } from "zod";

export const createUserValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        name: z.string(),
        email: z.string().email(),
    }),
});
export const updateUserValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20).optional(),
        name: z.string().optional(),
        email: z.string().email().optional(),
    }),
});

export const UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
};