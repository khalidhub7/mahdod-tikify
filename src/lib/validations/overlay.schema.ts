import { z } from "zod";

const overlaySchema = z
  .object({
    name: z.string().trim().min(1, "Name is required").max(50),
    tiktok_username: z
      .string()
      .trim()
      .min(5, "Username must be at least 5 characters")
      .max(50)
      .regex(/^@/, "Username must start with @"),
  })
  .strict();

export type OverlayInput = z.infer<typeof overlaySchema>;

export { overlaySchema };
