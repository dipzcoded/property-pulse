"use server";
import prisma from "@/config/prismadb.config";
import { getSession } from "@/utils/getCurrentUser";
import { revalidatePath } from "next/cache";

export async function sendMesssage(formData: FormData) {
  const ownerId = formData.get("ownerId") as string;
  const propertyId = formData.get("propertyId") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const phone = formData.get("phone") as string;

  try {
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("session not avaliable");
    }

    // @ts-ignore
    const userId = session.user.id;

    if (userId === ownerId) {
      throw new Error("You cannot message a property you own");
    }

    await prisma.message.create({
      data: {
        senderUserId: userId,
        recipientUserId: ownerId,
        body: message,
        email,
        name,
        propertyId,
        phone,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Error sending message" };
    }
  } finally {
    revalidatePath("/messages");
  }
}

export async function updateMessageReadStatus(messageId: string) {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("session not avaliable");
    }

    // @ts-ignore
    const userId = session.user.id;

    const message = await prisma.message.findFirst({
      where: {
        id: messageId,
      },
    });

    if (!message) {
      throw new Error("Message not found");
    }

    if (message.recipientUserId !== userId) {
      throw new Error("Unauthorized");
    }

    await prisma.message.update({
      where: {
        id: message.id,
      },
      data: {
        read: !message.read,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Error updating message as read" };
    }
  } finally {
    revalidatePath("/messages");
  }
}

export async function deleteMessageById(messageId: string) {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      throw new Error("session not avaliable");
    }

    // @ts-ignore
    const userId = session.user.id;

    const message = await prisma.message.findFirst({
      where: {
        id: messageId,
      },
    });

    if (!message) {
      throw new Error("Message not found");
    }

    if (message.recipientUserId !== userId) {
      throw new Error("Unauthorized");
    }

    await prisma.message.delete({
      where: {
        id: messageId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Error deleting a message" };
    }
  } finally {
    revalidatePath("/messages");
  }
}
