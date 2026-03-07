import type { ReactNode } from "react";
import type { Metadata } from "next";
import { vastagoGrotesk, libreCaslon } from "@/lib/fonts";
import { AdminAuthProvider } from "@/components/admin/auth/AdminAuthProvider";
import "@/app/globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin | Influence Circle",
  description: "Influence Circle admin dashboard",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${vastagoGrotesk.variable} ${libreCaslon.variable}`}
    >
      <body className="admin-body font-sans antialiased bg-gray-50 text-gray-900">
        <AdminAuthProvider>{children}</AdminAuthProvider>
      </body>
    </html>
  );
}
