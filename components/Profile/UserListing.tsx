"use client";
import { Property } from "@prisma/client";
import UserListingItem from "./UserListingItem";
import { useOptimistic } from "react";

type Props = {
  listings: Property[];
};

export type Action = "delete";

export type PropertyOptimisticUpdate = (action: {
  action: Action;
  property: Property;
}) => void;

export function profileListingReducer(
  state: Array<Property>,
  { action, property }: { action: Action; property: Property }
) {
  switch (action) {
    case "delete":
      return state.filter((state) => state.id !== property.id);

    default:
      return state;
  }
}

export default function UserListing({ listings }: Props) {
  const [optimisticProperties, optimisticPropertyUpdate] = useOptimistic(
    listings,
    profileListingReducer
  );

  return (
    <div className="md:w-3/4 md:pl-4">
      <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
      {optimisticProperties.length === 0 && (
        <p>You have no property listings</p>
      )}
      {optimisticProperties.length &&
        optimisticProperties.map((listing) => (
          <UserListingItem
            listing={listing}
            key={listing.id}
            optimisticUpdate={optimisticPropertyUpdate}
          />
        ))}
    </div>
  );
}
