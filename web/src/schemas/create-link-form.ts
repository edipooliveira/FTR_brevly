import { z } from "zod";

export const createLinkFormSchema = z.object({
  originalUrl: z.string().url("Informe uma url válida."),
  shortUrl: z
    .string()
    .regex(
      /^[a-z0-9-]{3,32}$/,
      "Informe uma url minúscula e sem espaço/caracter especial."
    ),
});

export type CreateLinkFormData = z.infer<typeof createLinkFormSchema>;
