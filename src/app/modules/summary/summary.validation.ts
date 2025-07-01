import { z } from "zod";

const summaryValidationSchema = z.object({
    body: z.object({
        originalText: z.string().optional(),
        prompt: z.string({ required_error: "Prompt is required." }),
    }).refine(data => data.originalText || true, {
        message: "Either originalText or file must be provided.",
    }),
});


export const SummaryValidation = {
    summaryValidationSchema,
};
