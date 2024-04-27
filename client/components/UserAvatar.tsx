import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserAvatar = ({ src, size }: { src?: string; size: string }) => {
  return (
    <Avatar className={size}>
      <AvatarImage src={src || "/user.webp"} className="object-cover" />
      <AvatarFallback>...</AvatarFallback>
    </Avatar>
  );
};
