import prisma from "@/config/prismadb.config";

type Params = { params: { userId: string } };

export async function GET(request: Request, { params }: Params) {
  const userId = params.userId;

  if (!userId) {
    return new Response(JSON.stringify({ message: "Property Id not passed" }), {
      status: 404,
    });
  }

  try {
    const properties = await prisma.property.findMany({
      where: {
        userId,
      },
    });

    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
