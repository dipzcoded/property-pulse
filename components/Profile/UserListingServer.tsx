import { fetchUserListings } from "@/fetchers/properties.fetcher";
import getCurrentUser from "@/utils/getCurrentUser";
import UserListing from "./UserListing";

type Props = {
  userId: string;
};

export default async function UserListingServer({ userId }: Props) {
  const userListings = await fetchUserListings(userId);
  return <UserListing listings={userListings} />;
}
