"use server";
import { Rate } from "@prisma/client";
import prisma from "@/config/prismadb.config";
import { PropertyFormState } from "@/types";
import getCurrentUser from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";
import cloudinary from "@/config/cloudinary.config";

export async function createProperty(formData: FormData) {
  const amenities = formData.getAll("amenities") as string[];
  const images = formData
    .getAll("images")
    .filter((image: any) => image.name !== "");

  let rate: Rate = {
    weekly:
      formData.get("rate.weekly") &&
      Number(formData.get("rate.weekly") as string) !== 0
        ? Number(formData.get("rate.weekly"))
        : null,
    nightly:
      formData.get("rate.nightly") &&
      Number(formData.get("rate.nightly") as string) !== 0
        ? Number(formData.get("rate.nightly"))
        : null,
    monthly:
      formData.get("rate.monthly") &&
      Number(formData.get("rate.monthly") as string) !== 0
        ? Number(formData.get("rate.monthly"))
        : null,
  };

  try {
    const user = await getCurrentUser();

    // upload images to cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      // @ts-ignore
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // convert the image data to base64;
      const imageBase64 = imageData.toString("base64");

      // Upload to cloudinary
      const results = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "property-pulse",
        }
      );

      imageUploadPromises.push(results.secure_url);
    }

    const uploadImages = await Promise.all(imageUploadPromises);

    const propertyData: PropertyFormState = {
      type: formData.get("type") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      location: {
        street: formData.get("location.street") as string,
        city: formData.get("location.city") as string,
        state: formData.get("location.state") as string,
        zipCode: formData.get("location.zipCode") as string,
      },
      amenities,
      baths: Number(formData.get("baths") as string),
      beds: Number(formData.get("beds") as string),
      rate,
      sellerInfo: {
        name: formData.get("sellerInfo.name") as string,
        email: formData.get("sellerInfo.email") as string,
        phone: formData.get("sellerInfo.phone") as string,
      },
      squareFeet: Number(formData.get("squareFeet") as string),
      images: uploadImages,
    };

    const newProperty = await prisma.property.create({
      data: {
        ...propertyData,
        // @ts-ignore
        userId: user!.id,
      },
    });

    revalidateTag("properties");
    revalidateTag("user-listings");
    return { newProperty };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: "Property could not be created" };
    }
  }
}

export async function deleteUserListing(listingId: string) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("session not avaliable");
    }

    const property = await prisma.property.findUnique({
      where: {
        id: listingId,
      },
    });

    if (!property) {
      // return { message: "Properties not found" };
      throw new Error("Properties not found");
    }

    if (property.userId !== user.id) {
      // return { message: "Unauthorized" };
      throw new Error("Unauthorized");
    }

    await prisma.property.delete({
      where: {
        id: listingId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
  } finally {
    revalidatePath("/profile");
    revalidateTag("properties");
  }
}