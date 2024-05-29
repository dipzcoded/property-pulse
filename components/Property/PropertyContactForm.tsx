"use client";

import { Property } from "@prisma/client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import ContactFormButton from "./ContactFormButton";
import { sendMesssage } from "@/actions";

type Props = {
  property: Property;
};

export default function PropertyContactForm({ property }: Props) {
  const { data } = useSession();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [wasSubmitted, setWasSubmitted] = useState<boolean>(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      {!data ? (
        <p>You must be logged in to send a message</p>
      ) : (
        <>
          {wasSubmitted ? (
            <p className="text-green-200 mb-4">
              Your message have been sent successfully!
            </p>
          ) : (
            <>
              <form
                action={async (formData) => {
                  formData.append("propertyId", property.id);
                  formData.append("ownerId", property.userId);
                  const response = await sendMesssage(formData);

                  if (response?.error) {
                    toast.error(response.error);
                  } else {
                    toast.success("Message sent successfully!");
                    setWasSubmitted(true);
                  }
                }}
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="message"
                  >
                    Message:
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <ContactFormButton />
              </form>
            </>
          )}
        </>
      )}
    </div>
  );
}
