"use client";

import { Property } from "@prisma/client";
import { FaShare } from "react-icons/fa";

type Props = {
  property: Property;
};

export default function ShareButton({ property }: Props) {
  return (
    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
      <FaShare className="mr-2" /> Share Property
    </button>
  );
}
