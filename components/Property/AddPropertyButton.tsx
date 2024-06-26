"use client";
import React from "react";
import { useFormStatus } from "react-dom";

type Props = {
  isEdit?: boolean;
};

export default function AddPropertyButton({ isEdit = false }: Props) {
  const { pending } = useFormStatus();
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
        type="submit"
        disabled={pending}
      >
        {isEdit ? "Edit" : "Add"} Property
      </button>
    </div>
  );
}
