import Navbar from "@/components/Navbar";
import { getSession } from "@/utils/getCurrentUser";
import prisma from "@/config/prismadb.config";

export default async function NavbarServer() {
  const session = await getSession();

  let count;
  if (session && session.user) {
    // @ts-ignore
    const userId = session.user.id;
    const unreadMessagesCount = await prisma.message.count({
      where: {
        recipientUserId: userId,
        read: false,
      },
    });

    count = unreadMessagesCount;
  } else {
    count = 0;
  }

  console.log(count);

  return <Navbar unreadCount={count} />;
}
