import prisma from "@/config/prismadb.config";
import { Property } from "@prisma/client";

// GET /api/properties/search
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location") as string;
    const propertyType = searchParams.get("propertyType");

    console.log(location, propertyType);

    let properties: Property[] = [];

    if (propertyType && propertyType.toLowerCase() !== "all") {
      properties = await prisma.property.findMany({
        where: {
          type: {
            contains: propertyType,
            mode: "insensitive",
          },
          OR: [
            {
              name: {
                contains: location,
                mode: "insensitive", // Case-insensitive search
              },
            },
            {
              description: {
                contains: location,
                mode: "insensitive", // Case-insensitive search
              },
            },
            {
              location: {
                is: {
                  city: {
                    contains: location,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              location: {
                is: {
                  state: {
                    contains: location,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              location: {
                is: {
                  street: {
                    contains: location,
                    mode: "insensitive",
                  },
                },
              },
            },

            {
              location: {
                is: {
                  zipCode: {
                    contains: location,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        },
      });
    } else {
      properties = await prisma.property.findMany({
        where: {
          OR: [
            {
              name: {
                contains: location,
                mode: "insensitive", // Case-insensitive search
              },
            },
            {
              description: {
                contains: location,
                mode: "insensitive", // Case-insensitive search
              },
            },
            {
              location: {
                is: {
                  city: {
                    contains: location,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              location: {
                is: {
                  state: {
                    contains: location,
                    mode: "insensitive",
                  },
                },
              },
            },
            {
              location: {
                is: {
                  street: {
                    contains: location,
                    mode: "insensitive",
                  },
                },
              },
            },

            {
              location: {
                is: {
                  zipCode: {
                    contains: location,
                    mode: "insensitive",
                  },
                },
              },
            },
          ],
        },
      });
    }

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
