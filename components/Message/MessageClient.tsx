"use client";
import { MessageWithPropertyName } from "@/types";
import MessageItem from "./MessageItem";
import { useOptimistic } from "react";

export type Action = "update-message-read" | "delete";

export type MessageOptimisticUpdate = (action: {
  action: Action;
  message: MessageWithPropertyName;
}) => void;

type Props = {
  messages: MessageWithPropertyName[];
};

export function messageReducer(
  state: Array<MessageWithPropertyName>,
  { action, message }: { action: Action; message: MessageWithPropertyName }
) {
  switch (action) {
    case "delete":
      return state.filter((state) => state.id !== message.id);

    case "update-message-read":
      return state.map((state) =>
        state.id === message.id ? { ...state, read: !state.read } : state
      );

    default:
      return state;
  }
}

export default function MessageClient({ messages }: Props) {
  const [optimisticMessages, optimisticMessageUpdate] = useOptimistic(
    messages,
    messageReducer
  );

  return (
    <div className="space-y-4">
      {optimisticMessages.length === 0 ? (
        <p>You have no messages </p>
      ) : (
        optimisticMessages.map((msg) => (
          <MessageItem
            message={msg}
            key={msg.id}
            optimisticUpdate={optimisticMessageUpdate}
          />
        ))
      )}
    </div>
  );
}
