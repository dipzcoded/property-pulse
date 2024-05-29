"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";

export default function ContactFormButton() {
  const { pending } = useFormStatus();
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
        type="submit"
        disabled={pending}
      >
        <FaPaperPlane className="mr-2" /> Send Message
      </button>
    </div>
  );
}
