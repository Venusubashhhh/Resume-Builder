import { z } from "zod";

import { defaultItem, itemSchema } from "../shared";

// Schema
export const strengthsSchema = itemSchema.extend({
  name: z.string().min(1),
  keywords: z.array(z.string()).default([]),
});

// Type
export type Strengths = z.infer<typeof strengthsSchema>;

// Defaults
export const defaultStrengths: Strengths = {
  ...defaultItem,
  name: "",
  keywords: [],
};
