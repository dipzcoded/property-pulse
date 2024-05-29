"use client";

import { useState, useTransition } from "react";
import { MessageWithPropertyName } from "@/types";
import { MessageOptimisticUpdate } from "./MessageClient";
import {
  deleteMessageById,
  updateMessageReadStatus,
} from "@/actions/message.action";
import { toast } from "react-toastify";

type Props = {
  message: MessageWithPropertyName;
  optimisticUpdate: MessageOptimisticUpdate;
};

export default function MessageItem({ message, optimisticUpdate }: Props) {
  const [_, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isRead = message.read;

  async function updateMessageRead() {
    setIsLoading(true);
    optimisticUpdate({ action: "update-message-read", message });
    const res = await updateMessageReadStatus(message.id);
    if (res?.error) {
      toast.error(res.error);
    } else {
      if (message.read) {
        toast.success("Marked as read");
      } else {
        toast.success("Marked as new");
      }
    }
    setIsLoading(false);
  }

  async function deleteMessage() {
    setIsLoading(true);
    optimisticUpdate({ action: "delete", message });
    const res = await deleteMessageById(message.id);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Message deleted successfully!");
    }
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.senderUser.userName}
        </li>

        <li>
          <strong>Reply Email:</strong>{" "}
          <a href="mailto:recipient@example.com" className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={() => startTransition(() => updateMessageRead())}
        disabled={isLoading}
        className={`mt-4 mr-3 ${
          isRead ? "bg-gray-300" : "bg-blue-500 text-white"
        } py-1 px-3 rounded-md opacity-80`}
      >
        {isRead ? "Mark As New" : "Mark As Read"}
      </button>
      <button
        onClick={() => startTransition(() => deleteMessage())}
        disabled={isLoading}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md disabled:opacity-80"
      >
        Delete
      </button>
    </div>
  );
}
