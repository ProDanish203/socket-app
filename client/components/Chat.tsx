"use client";
import { Message } from "@/components/Message";
import useConversation from "@/store/useConversation";
import { useAuth } from "@/store/AuthProvider";
import SendMessage from "./SendMessage";
import { useEffect, useRef } from "react";
import { useListenMessages } from "@/hooks/useListenMessages";

export const Chat = () => {
  const { messages } = useConversation();
  const { user } = useAuth();
  useListenMessages();
  
  const lastMessageRef = useRef<HTMLDivElement>();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]);

  return (
    <div className="relative flex h-full max-h-[90vh] min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2 overflow-y-auto">
      {/* chats section */}
      <div className="flex flex-col gap-y-3 mb-5">
        {user &&
          messages &&
          messages.length > 0 &&
          messages.map((message) => (
            <div key={message._id} ref={lastMessageRef}>
              <Message
                isUser={message.sender._id === user._id}
                message={message}
              />
            </div>
          ))}
      </div>
      <div className="flex-1 sticky bottom-2" />
      {/* Input form */}
      <SendMessage />
    </div>
  );
};
