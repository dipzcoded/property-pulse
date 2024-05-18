"use server";

import { getSession } from "@/utils/getCurrentUser";
import prisma from "@/config/prismadb.config";
import { revalidatePath } from "next/cache";

export async function userBookmarkProperty(propertyId: string) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("session not avaliable");
    }

    // @ts-ignore
    const userId = session.user.id;

    const propertyBookmarked = await prisma.userPropertyBookmarks.findFirst({
      where: {
        userId,
        propertyId,
      },
    });

    if (propertyBookmarked) {
      throw new Error("Property already bookmarked");
    }

    await prisma.userPropertyBookmarks.create({
      data: {
        userId,
        propertyId,
      },
    });

    revalidatePath(`/properties/${propertyId}`);
    revalidatePath("/properties/saved");
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Error bookmarking property" };
    }
  }
}
export async function userUnBookmarkProperty(propertyId: string) {
  try {
    const session = await getSession();

    if (!session) {
      throw new Error("session not avaliable");
    }

    // @ts-ignore
    const userId = session.user.id;

    const propertyBookmarked = await prisma.userPropertyBookmarks.findFirst({
      where: {
        userId,
        propertyId,
      },
    });

    if (!propertyBookmarked) {
      throw new Error("Property has not been bookmark");
    }

    await prisma.userPropertyBookmarks.delete({
      where: {
        id: propertyBookmarked.id,
      },
    });

    revalidatePath(`/properties/${propertyId}`);
    revalidatePath("/properties/saved");
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Error bookmarking property" };
    }
  }
}
