import { Property } from "@prisma/client";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarker,
} from "react-icons/fa";
import ContactPorperty from "./ContactPorperty";
import PropertyMap from "./PropertyMap";

type PropertyInfoProps = {
  property: Property;
};

export default function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
              <div className="text-gray-500 mb-4">{property.type}</div>
              <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
              <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                <FaMapMarker className="fa-solid fa-location-dot text-lg text-orange-700 mr-2" />
                <p className="text-orange-700">
                  {property.location.street}, {property.location.city}{" "}
                  {property.location.state}
                </p>
              </div>

              <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                Rates & Options
              </h3>
              <div className="flex flex-col md:flex-row justify-around">
                {Object.entries(property.rate).map(([key, val]) => (
                  <div
                    key={`${key}-${val}`}
                    className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0"
                  >
                    <div className="text-gray-500 mr-2 font-bold capitalize">
                      {key}
                    </div>
                    {!val ? (
                      <div className="text-2xl font-bold">
                        <FaTimes className="fa fa-xmark text-red-700" />
                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-blue-500">
                        ${val.toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-bold mb-6">Description & Details</h3>
              <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
                <p>
                  <FaBed className="inline-block mr-2" /> {property.beds}{" "}
                  <span className="hidden sm:inline">Beds</span>
                </p>
                <p>
                  <FaBath className="inline-block mr-2" /> {property.baths}{" "}
                  <span className="hidden sm:inline">Baths</span>
                </p>
                <p>
                  <FaRulerCombined className="inline-block mr-2" />
                  {property.squareFeet}{" "}
                  <span className="hidden sm:inline">sqft</span>
                </p>
              </div>
              <p className="text-gray-500 mb-4 text-center">
                {property.description}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-bold mb-6">Amenities</h3>

              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2">
                {property.amenities.map((item, i) => (
                  <li key={i}>
                    <FaCheck className="inline-block text-green-600 mr-2 " />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <PropertyMap property={property} />
            </div>
          </main>

          <ContactPorperty />
        </div>
      </div>
    </section>
  );
}
