import { Property } from "@prisma/client";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties(): Promise<Property[]> {
  try {
    // Handle a case where the domainis not avaliable yet.
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`, {
      next: { tags: ["properties"] },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
    // Re-throw the error to propagate it to the caller
  }
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  try {
    // Handle a case where the domainis not avaliable yet.
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Error fetching property");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
    // Re-throw the error to propagate it to the caller
  }
}

export async function fetchUserListings(userId: string): Promise<Property[]> {
  try {
    // Handle a case where the domainis not avaliable yet.
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties/user/${userId}`, {
      next: { tags: ["user-listings"] },
    });

    if (!res.ok) {
      throw new Error("Error fetching property");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
