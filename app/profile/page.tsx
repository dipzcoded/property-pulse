import { Suspense } from "react";
import Image from "next/image";
import getCurrentUser from "@/utils/getCurrentUser";
import profileDefault from "@/asset/images/profile.png";
import UserListingServer from "@/components/Profile/UserListingServer";
import LoadingPage from "../loading";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  const profileImage = user?.image;
  const profileName = user?.userName ? user.userName : "";
  const profileEmail = user?.email ? user.email : "";

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImage || profileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>
                {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span> {profileEmail}
              </h2>
            </div>
            <Suspense fallback={<LoadingPage loading />}>
              <UserListingServer />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
