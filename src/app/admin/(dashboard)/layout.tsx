import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/layout/AdminShell";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
