import { z } from "zod";

const eulerTokenSchema = z.object({
  overlayId: z.uuid(),
  key: z.string().min(32).max(128),
});

export { eulerTokenSchema };
