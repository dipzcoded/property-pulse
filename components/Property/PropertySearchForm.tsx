import { redirect } from "next/navigation";
export default function PropertySearchForm() {
  return (
    <form
      action={async (formData) => {
        "use server";
        const location = formData.get("location");
        const propertyType = formData.get("propertyType");
        if (location === "" && propertyType === "All") {
          redirect("/properties");
        } else {
          const query = `?location=${location}&propertyType=${propertyType}`;
          redirect(`/properties/search-result${query}`);
        }
      }}
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <input
          name="location"
          type="text"
          id="location"
          placeholder="Enter Keywords or Location"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div className="w-full md:w-2/5 md:pl-2">
        <label htmlFor="property-type" className="sr-only">
          Property Type
        </label>
        <select
          name="propertyType"
          id="property-type"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="All">All</option>
          <option value="Apartment">Apartment</option>
          <option value="Studio">Studio</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Loft">Loft</option>
          <option value="Room">Room</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
}
