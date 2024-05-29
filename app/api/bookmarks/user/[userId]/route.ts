import prisma from "@/config/prismadb.config";
type Params = { params: { userId: string } };



export async function GET(request: Request, { params }: Params) {
  try {
    // get user bookmarks
    const bookmarks = await prisma.userPropertyBookmarks.findMany({
      where: {
        userId: params.userId,
      },
      select: {
        propertyId: true,
      },
    });

    const propertyIds = bookmarks.map((bk) => bk.propertyId);

    const properties = await prisma.property.findMany({
      where: {
        id: {
          in: propertyIds,
        },
      },
    });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
