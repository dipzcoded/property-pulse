import Goback from "@/components/Goback";
import PropertyImages from "@/components/Property/PropertyImages";
import PropertyInfo from "@/components/Property/PropertyInfo";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import { fetchPropertyById } from "@/fetchers/properties.fetcher";
import getCurrentUser from "@/utils/getCurrentUser";

type Props = {
  params: {
    id: string;
  };
};

export default async function PropertyPage({ params }: Props) {
  // const { id } = useParams<{ id: string }>();
  const property = await fetchPropertyById(params.id);
  const user = await getCurrentUser();

  if (!property)
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    );
  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <Goback path="/properties" />
      <PropertyInfo property={property} userBookmarks={user?.bookmarks ?? []} />
      <PropertyImages images={property.images} />
    </>
  );
}
