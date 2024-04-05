import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import { fetchPropertyById } from "@/fetchers/properties.fetcher";

type Props = {
  params: {
    id: string;
  };
};

export default async function PropertyPage({ params }: Props) {
  // const { id } = useParams<{ id: string }>();
  const property = await fetchPropertyById(params.id);

  if (!property)
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Property not found
      </h1>
    );
  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
    </>
  );
}
