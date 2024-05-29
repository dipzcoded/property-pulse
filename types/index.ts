import { Property } from "@prisma/client";

export type PropertyFormState = Omit<
  Property,
  "userId" | "id" | "isFeatured" | "createdAt" | "updatedAt"
>;

export type MessageWithPropertyName = {
  property: {
    name: string;
  };
  senderUser: {
    userName: string;
  };
} & {
  id: string;
  senderUserId: string;
  recipientUserId: string;
  propertyId: string;
  name: string;
  email: string;
  phone: string | null;
  body: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
};
