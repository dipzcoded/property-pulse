import { fetchUserListings } from "@/fetchers/properties.fetcher";
import getCurrentUser from "@/utils/getCurrentUser";
import UserListing from "./UserListing";


export default async function UserListingServer() {
    const user = await getCurrentUser();
    const userListings = await fetchUserListings(user?.id as string);
  return (
  <UserListing listings={userListings} />
  )
}
