import prisma from "@/config/prismadb.config";

type Params = { params: { id: string } };

export async function GET(request: Request, { params }: Params) {
  const propertyId = params.id;

  if (!propertyId) {
    return new Response(JSON.stringify({ message: "Property Id not passed" }), {
      status: 404,
    });
  }

  try {
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });

    if (!property) {
      return new Response(JSON.stringify({ message: "Property not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(property), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
