import { Property } from "@prisma/client";

export type PropertyFormState = Omit<
  Property,
  "userId" | "id" | "isFeatured" | "createdAt" | "updatedAt"
>;
