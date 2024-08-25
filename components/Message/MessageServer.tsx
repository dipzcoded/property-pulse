import prisma from "@/config/prismadb.config";
import MessageClient from "./MessageClient";

type Props = {
  userId: string;
};

export default async function MessageServer({ userId }: Props) {
  const data = await prisma.message.findMany({
    where: {
      recipientUserId: userId,
    },
    orderBy: [
      {
        read: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
    
    include: {
      property: {
        select: {
          name: true,
        },
      },
      senderUser: {
        select: {
          userName: true,
        },
      },
    },
  });

  return <MessageClient messages={data} />;
}
