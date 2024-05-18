import { Property } from "@prisma/client";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchUserBookmarkProperties(
  userId: string
): Promise<Property[]> {
  try {
    // Handle a case where the domainis not avaliable yet.
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/bookmarks/user/${userId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
    // Re-throw the error to propagate it to the caller
  }
}
