"use client";
import { Inter } from "next/font/google";
import "./ui/globals.css";
import { AuthContextProvider } from "./ui/Context/Authcontext";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
