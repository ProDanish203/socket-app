import React from "react";
import { UserAvatar } from "./UserAvatar";
import { Chat } from "@/types/types";
import { format } from "date-fns";

export const Message = ({
  isUser,
  message,
}: {
  isUser: boolean;
  message: Chat;
}) => {
  return (
    <>
      {isUser ? (
        <div className="flex flex-col items-end">
          <div className="flex items-start justify-end gap-x-2 w-full ml-auto">
            <div className="rounded-[10px] bg-secondaryCol text-bg text-sm p-2 lg:max-w-[600px] md:max-w-[80%] max-w-[90%] w-full">
              {message.message}
            </div>
            <UserAvatar size="size-8" src={message.sender.avatar} />
          </div>
          <p className="text-[12px] text-gray-500 mr-11 mt-1">
            {format(message.createdAt, "h:mm a")}
          </p>
        </div>
      ) : (
        <div>
          <div className="flex items-start gap-x-2 w-full ml-auto">
            <UserAvatar size="size-8" src={message.sender.avatar} />
            <div className="rounded-[10px] bg-gray-100 text-bg text-sm p-2 max-w-[400px] w-full">
              {message.message}
            </div>
          </div>
          <p className="text-[12px] text-gray-500 ml-11 mt-1">
            {format(message.createdAt, "h:mm a")}
          </p>
        </div>
      )}
    </>
  );
};
