import React from "react";
import { UserAvatar } from "./UserAvatar";

export const Message = ({ isUser }: { isUser?: boolean }) => {
  return (
    <>
      {isUser ? (
        <div className="flex items-start justify-end gap-x-2 w-full ml-auto">
          <div className="rounded-[10px] bg-secondaryCol text-bg text-sm p-2 lg:max-w-[600px] md:max-w-[80%] max-w-[90%] w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
            accusamus?
          </div>
          <UserAvatar size="size-7" />
        </div>
      ) : (
        <div className="flex items-start gap-x-2 w-full ml-auto">
          <UserAvatar size="size-7" />
          <div className="rounded-[10px] bg-gray-200 text-bg text-sm p-2 max-w-[400px] w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
            accusamus?
          </div>
        </div>
      )}
    </>
  );
};
