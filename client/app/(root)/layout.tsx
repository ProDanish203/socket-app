import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/store/ReactQueryProvider";
import { AuthProvider } from "@/store/AuthProvider";
import { SocketProvider } from "@/store/SocketContext";
import { TooltipProvider } from "@/components/ui/tooltip";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Application",
  description:
    "A basic chat application with one-on-one chatting functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReactQueryProvider>
          <AuthProvider>
            <SocketProvider>
              <TooltipProvider>
                <main className="bg-bg min-h-screen w-full">
                  <Toaster position="top-right" richColors />
                  {children}
                </main>
              </TooltipProvider>
            </SocketProvider>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
