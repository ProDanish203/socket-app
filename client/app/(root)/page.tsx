import { LogOut, Triangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Chat } from "@/components/Chat";
import { LogoutBtn } from "@/components/LogoutBtn";

const HomePage = () => {
  return (
    <div className="grid h-screen w-full lg:pl-[45px]">
      <aside className="max-lg:hidden inset-y fixed left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="mt-auto pb-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <LogoutBtn />
            </TooltipTrigger>
            <TooltipContent side="right">Logout</TooltipContent>
          </Tooltip>
        </nav>
      </aside>
      <div className="flex flex-col">
        <Header />

        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <Sidebar />
          </div>
          <Chat />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
