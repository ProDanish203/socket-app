"use client";
import { getAllUsers } from "@/API/users.api";
import { useQuery } from "@tanstack/react-query";
import { UserAvatar } from "./UserAvatar";

// interface SearchParams {
//   searchParams: {
//     page: number;
//     limit: number;
//     search: string;
//     filter: string;
//   };
// }

const UserCard = ({ user }: { user: any }) => {
  return (
    <div className="flex items-start gap-x-4 py-4 pl-5 border-b hover:bg-gray-200/10 transition-all duration-150">
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

  const { data, isLoading } = useQuery({
    queryKey: ["users", page, limit, search, filter],
    queryFn: () => getAllUsers({ page, limit, search, filter }),
  });
  
  return (
    <div className="grid w-full items-start gap-6">
      <div className="flex flex-col gap-y-1">
        {data &&
          data.success &&
          data.response.data.length > 0 &&
          data.response.data.map((user: any) => (
            <UserCard key={user._id} user={user} />
          ))}
      </div>
    </div>
  );
};
