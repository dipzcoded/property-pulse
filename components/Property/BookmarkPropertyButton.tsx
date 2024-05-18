"use client";
import { useTransition } from "react";
import { useSession } from "next-auth/react";
import { Property, UserPropertyBookmarks } from "@prisma/client";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { userBookmarkProperty, userUnBookmarkProperty } from "@/actions";

type Props = {
  property: Property;
  userBookmarks: UserPropertyBookmarks[];
};
export default function BookmarkPropertyButton({
  property,
  userBookmarks,
}: Props) {
  const { data } = useSession();
  const [isPending, startTransition] = useTransition();

  const isAlreadyBookmarked = userBookmarks.find(
    (bk) => bk.propertyId === property.id
  );
  async function onClick() {
    const isAlreadyBookmarked = userBookmarks.find(
      (bk) => bk.propertyId === property.id
    );

    if (isAlreadyBookmarked) {
      const res = await userUnBookmarkProperty(property.id);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Property removed from bookmark successfully!");
      }
    } else {
      const res = await userBookmarkProperty(property.id);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Property bookmark successfully!");
      }
    }
  }

  if (!data) {
    return null;
  }

  // @ts-ignore
  const isUserLoggedinProperty = data.user.id! === property.userId;
  if (isUserLoggedinProperty) {
    return null;
  }

  return (
    <button
      onClick={() => startTransition(() => onClick())}
      disabled={isPending}
      className={`${
        isAlreadyBookmarked
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      } text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-80`}
    >
      <FaBookmark className="mr-2" />{" "}
      {isAlreadyBookmarked ? "Remove" : "Bookmark"} Property
    </button>
  );
}
