"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Send,
  Workflow,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { useAdminAuth } from "@/components/admin/auth/AdminAuthProvider";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/contacts", label: "Contacts", icon: Users },
  { href: "/admin/campaigns", label: "Campaigns", icon: Send },
  { href: "/admin/automations", label: "Automations", icon: Workflow },
  { href: "/admin/templates", label: "Templates", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
] as const;

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, signOut } = useAdminAuth();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#02182B] transition-transform duration-200 ease-in-out
          lg:static lg:translate-x-0
          md:w-64
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-16 items-center px-6">
          <Link href="/admin" className="flex items-center gap-1">
            <span className="text-xl font-bold tracking-tight text-white">
              INFLUENCE
            </span>
            <span className="text-xl font-bold text-[#d55d25]">.</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                  ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 ${
                    active
                      ? "text-[#d55d25]"
                      : "text-gray-500 group-hover:text-gray-300"
                  }`}
                />
                <span className="md:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User card */}
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d55d25] text-xs font-semibold text-white">
              {user?.email?.charAt(0).toUpperCase() ?? "?"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user?.email ?? "Unknown"}
              </p>
            </div>
            <button
              onClick={signOut}
              title="Sign out"
              className="shrink-0 rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
