"use client";
import { Menu } from "lucide-react";
import { UserAvatar } from "./UserAvatar";
import { useAuth } from "@/store/AuthProvider";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/API/auth.api";
// import Cookies from "js-cookie";
import { toast } from "sonner";
import { useEffect } from "react";

export const Header = () => {
  const { user, setUser } = useAuth();
  const router = useRouter();

  // Fetching current User
  const { data, isLoading } = useQuery({
    queryKey: ["current-user"],
    queryFn: () => getCurrentUser(),
    initialData: user ? { success: true, response: user } : undefined,
  });
  if (!isLoading && data && !data.success) {
    localStorage.removeItem("accessToken");
    // Cookies.remove("accessToken");
    toast.error("Session expired");
    router.push("/login");
  }
  useEffect(() => {
    if (!isLoading && data && data.success && data.response) {
      setUser(data.response);
    }
  }, [data]);
  
  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold max-md:hidden">Chat App</h1>
      <Menu className="size-6 cursor-pointer md:hidden" />
      <div className="ml-auto">
        <UserAvatar src={user && user.avatar} size="size-10" />
      </div>
    </header>
  );
};
