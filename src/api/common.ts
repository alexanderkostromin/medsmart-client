import { z } from "zod";

export const APIError = z.object({
  detail: z.string(),
});

export type APIError = z.infer<typeof APIError>;

export const Prediction = z.object({ prediction: z.number() });

export type Prediction = z.infer<typeof Prediction>;
