
import { fetchUserBookmarkProperties } from "@/fetchers/bookmarks.fetcher";
import getCurrentUser from "@/utils/getCurrentUser";
import { redirect } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
export default async function SavedPropertiesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/");
  }

  const bookmarkedProperties = await fetchUserBookmarkProperties(user.id);
 

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">Your Saved Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bookmarkedProperties.length === 0 && <p>No saved properties</p>}
          {bookmarkedProperties.length > 0 &&
            bookmarkedProperties.map((property) => (
              <PropertyCard property={property} key={property.id} />
            ))}
        </div>
      </div>
    </section>
  );
}
