"use client";
import { getAllUsers } from "@/API/users.api";
import { useQuery } from "@tanstack/react-query";
import { UserAvatar } from "./UserAvatar";
import { useEffect } from "react";
import { User } from "@/types/types";
import useConversation from "@/store/useConversation";
import { getChats } from "@/API/chats.api";

// interface SearchParams {
//   searchParams: {
//     page: number;
//     limit: number;
//     search: string;
//     filter: string;
//   };
// }

const UserCard = ({ user, border }: { user: User; border: boolean }) => {
  const {
    selectedConversation,
    setSelectedConversation,
    setMessages,
    messages,
  } = useConversation();
  const isSelected = selectedConversation?._id === user._id;

  const {
    data: chat,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", selectedConversation?._id, selectedConversation],
    queryFn: () => getChats(selectedConversation?._id),
    enabled: !!selectedConversation?._id,
  });

  useEffect(() => {
    if (chat && chat.success && chat.response) {
      setMessages(chat.response);
    }
  }, [chat, selectedConversation]);

  return (
    <div
      className={`flex items-start gap-x-4 py-4 pl-5 ${border && "border-b"} ${
        isSelected && "bg-gray-200/10"
      } hover:bg-gray-200/10  transition-all duration-150`}
      onClick={() => {
        setSelectedConversation(user);
        refetch();
      }}
    >
      <UserAvatar src={user.avatar} size="16" />
      <div>
        <h2 className="text-lg font-semibold">{user.fullName}</h2>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  //   const { page, limit, search, filter } = searchParams;
  const page = 1;
  const limit = 15;
  const search = "";
  const filter = "";

  const { data: users, isLoading } = useQuery({
    queryKey: ["users", page, limit, search, filter],
    queryFn: () => getAllUsers({ page, limit, search, filter }),
  });

  useEffect(() => {}, [users]);

  return (
    <div className="grid w-full items-start gap-6">
      <div className="flex flex-col gap-y-1">
        {users &&
          users.success &&
          users.response.data.length > 0 &&
          users.response.data.map((user: User, idx: number) => (
            <UserCard
              key={user._id}
              user={user}
              border={idx !== users.response.data.length - 1}
            />
          ))}
      </div>
    </div>
  );
};
