import prisma from "@/config/prismadb.config";

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      where: {},
    });
    return new Response(JSON.stringify(properties), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
