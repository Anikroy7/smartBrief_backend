import { z } from "zod";

export const createUserValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        name: z.string(),
        email: z.string().email(),
    }),
});

export const UserValidation = {
    createUserValidationSchema,
};