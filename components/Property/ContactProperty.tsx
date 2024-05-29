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

      <PropertyContactForm property={property} />
    </aside>
  );
}
