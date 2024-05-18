import { Property, UserPropertyBookmarks } from "@prisma/client";
import ShareButton from "../ShareButton";
import BookmarkPropertyButton from "./BookmarkPropertyButton";
import PropertyContactForm from "./PropertyContactForm";

type Props = {
  property: Property;
  userBookmarks: UserPropertyBookmarks[];
};

export default function ContactProperty({ property, userBookmarks }: Props) {
  return (
    <aside className="space-y-4">
      <BookmarkPropertyButton
        property={property}
        userBookmarks={userBookmarks}
      />
      <ShareButton property={property} />

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        <PropertyContactForm property={property} />
      </div>
    </aside>
  );
}
