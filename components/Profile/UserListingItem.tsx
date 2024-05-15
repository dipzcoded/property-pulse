"use client";
import { useState, useTransition } from "react";
import { Property } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { deleteUserListing } from "@/actions";

import { PropertyOptimisticUpdate } from "./UserListing";
import { toast } from "react-toastify";

type Props = {
  listing: Property;
  optimisticUpdate: PropertyOptimisticUpdate;
};

export default function UserListingItem({ listing, optimisticUpdate }: Props) {
  const [_, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  async function handleDeleteSubmit() {
    const confirm = window.confirm(
      "Are you sure you wanna delete this property"
    );
    if (!confirm) return;

    setIsDeleting(true);
    optimisticUpdate({ action: "delete", property: listing });
    const response = await deleteUserListing(listing.id);
    if (response?.error) {
      toast.error(response.error);
    } else {
      toast.success("Property deleted successfully!");
    }
    setIsDeleting(false);
  }

  return (
    <form className="mb-10">
      <Link href={`/properties/${listing.id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={listing.images[0]}
          alt=""
          width={500}
          height={100}
          priority={true}
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{listing.name}</p>
        <p className="text-gray-600">
          Address: {listing.location.street} {listing.location.city}{" "}
          {listing.location.state}
        </p>
      </div>
      <div className="mt-2">
        <Link
          href={`/properties/${listing.id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-80"
          type="submit"
          disabled={isDeleting}
          onClick={(e) => startTransition(() => handleDeleteSubmit())}
        >
          Delete
        </button>
      </div>
    </form>
  );
}
