"use client";
import React from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/store/AuthProvider";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logoutUser } from "@/API/auth.api";
import { useMutation } from "@tanstack/react-query";

export const LogoutBtn = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: logoutUser,
  });

  const handleLogout = async () => {
    const { success, response } = await mutateAsync();
    if (!success) return toast.error(response);
    setUser(undefined);
    localStorage.removeItem("access-token");
    toast.success("Logged out successfully");
    router.push("/login");
  };
  return (
    <Button
      disabled={isPending}
      variant="ghost"
      onClick={handleLogout}
      className="rounded-lg"
    >
      <LogOut />
    </Button>
  );
};
