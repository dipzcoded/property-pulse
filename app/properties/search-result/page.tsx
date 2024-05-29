import { fetchSearchProperties } from "@/fetchers/properties.fetcher";
import React from "react";
import Link from "next/link";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import PropertyCard from "@/components/PropertyCard";
import PropertySearchForm from "@/components/Property/PropertySearchForm";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function SearchResultPage({ searchParams }: Props) {
  let query = "";
  if (searchParams.location !== undefined) {
    query += `location=${searchParams.location}`;
  } else {
    query += `location=`;
  }

  if (searchParams.propertyType !== undefined) {
    query += `&propertyType=${searchParams.propertyType}`;
  } else {
    query += `&propertyType='All'`;
  }

  const properties = await fetchSearchProperties(query);

  return (
    <>
      <section className="bg-blue-700 py-4 ">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back To Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>no search results found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}