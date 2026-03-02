"use client";

import { Menu, Search } from "lucide-react";
import { useAdminAuth } from "@/components/admin/auth/AdminAuthProvider";
import { AdminBreadcrumb } from "@/components/admin/layout/AdminBreadcrumb";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const { user } = useAdminAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white/80 px-4 backdrop-blur-sm lg:px-6">
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 lg:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Breadcrumb */}
      <div className="flex-1">
        <AdminBreadcrumb />
      </div>

      {/* Search */}
      <div className="hidden items-center md:flex">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-[#d55d25]/50 focus:bg-white focus:ring-1 focus:ring-[#d55d25]/50"
          />
        </div>
      </div>

      {/* User avatar */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#02182B] text-xs font-semibold text-white">
        {user?.email?.charAt(0).toUpperCase() ?? "?"}
      </div>
    </header>
  );
}
