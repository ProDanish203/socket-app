import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import Image from "next/image";
// import ReactQueryProvider from "@/store/ReactQueryProvider";
// import { AuthProvider } from "@/store/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Github",
  description:
    "A version control system for managing projects and defining user acces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ReactQueryProvider>
          <AuthProvider> */}
            <main className="flex flex-col md:flex-row md:min-h-screen">
              <Toaster position="top-right" richColors />
              {/* Left Section */}
              <div className="flex-1 relative hidden md:block">
                <Image
                  src="/auth.jpg"
                  alt="Authentication"
                  width={1500}
                  height={1500}
                  priority
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* Right Section */}
              <div className="flex-1 flex items-center justify-center bg-bg p-4 sm:p-8 md:p-16 min-h-screen">
                {children}
              </div>
            </main>
          {/* </AuthProvider>
        </ReactQueryProvider> */}
      </body>
    </html>
  );
}