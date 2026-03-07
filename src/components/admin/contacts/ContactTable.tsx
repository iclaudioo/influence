"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import DataTable from "@/components/admin/ui/DataTable";
import Badge from "@/components/admin/ui/Badge";

interface Contact extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  status: string;
  lead_source: string | null;
  last_activity_at: string | null;
}

interface ContactTableProps {
  contacts: Contact[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

const statusVariant = (status: string) => {
  switch (status) {
    case "active":
      return "success" as const;
    case "unsubscribed":
      return "warning" as const;
    case "bounced":
    case "complained":
    case "suppressed":
      return "error" as const;
    default:
      return "default" as const;
  }
};

export default function ContactTable({
  contacts,
  totalCount,
  currentPage,
  pageSize,
  selectedIds,
  onSelectionChange,
}: ContactTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? ""
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") ?? ""
  );

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  function applyFilters(overrides: { search?: string; status?: string; page?: number } = {}) {
    const params = new URLSearchParams(searchParams.toString());
    const search = overrides.search ?? searchValue;
    const status = overrides.status ?? statusFilter;
    const page = overrides.page ?? 1;

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }
    params.set("page", String(page));

    router.push(`/admin/contacts?${params.toString()}`);
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    applyFilters({ search: searchValue, page: 1 });
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setStatusFilter(value);
    applyFilters({ status: value, page: 1 });
  }

  function toggleSelection(id: string) {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((sid) => sid !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  }

  function toggleSelectAll() {
    if (selectedIds.length === contacts.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(contacts.map((c) => c.id));
    }
  }

  const columns = [
    {
      key: "id" as const,
      label: "",
      render: (_value: Contact[keyof Contact], row: Contact) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.id)}
          onChange={(e) => {
            e.stopPropagation();
            toggleSelection(row.id);
          }}
          className="h-4 w-4 rounded border-gray-300 text-[#02182B] focus:ring-[#02182B]"
        />
      ),
    },
    {
      key: "name" as const,
      label: "Name",
      render: (_value: Contact[keyof Contact], row: Contact) => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">{row.email}</p>
        </div>
      ),
    },
    {
      key: "email" as const,
      label: "Email",
      render: (_value: Contact[keyof Contact], row: Contact) => (
        <span className="text-gray-600">{row.email}</span>
      ),
    },
    {
      key: "company" as const,
      label: "Company",
      render: (_value: Contact[keyof Contact], row: Contact) => (
        <span className="text-gray-600">{row.company ?? "—"}</span>
      ),
    },
    {
      key: "service" as const,
      label: "Service",
      render: (_value: Contact[keyof Contact], row: Contact) => (
        <span className="text-gray-600 capitalize">{row.service ?? "—"}</span>
      ),
    },
    {
      key: "lead_source" as const,
      label: "Source",
      render: (_value: Contact[keyof Contact], row: Contact) => (
        <span className="text-gray-600 capitalize">{row.lead_source ?? "\u2014"}</span>
      ),
    },
    {
      key: "status" as const,
      label: "Status",
      render: (_value: Contact[keyof Contact], row: Contact) => (
        <Badge variant={statusVariant(row.status)}>{row.status}</Badge>
      ),
    },
    {
      key: "last_activity_at" as const,
      label: "Last Activity",
      render: (_value: Contact[keyof Contact], row: Contact) =>
        row.last_activity_at
          ? new Date(row.last_activity_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "—",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search contacts..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-[#02182B] focus:outline-none focus:ring-1 focus:ring-[#02182B]"
          />
        </form>
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-[#02182B] focus:outline-none focus:ring-1 focus:ring-[#02182B]"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="unsubscribed">Unsubscribed</option>
            <option value="bounced">Bounced</option>
            <option value="complained">Complained</option>
            <option value="suppressed">Suppressed</option>
          </select>
        </div>
      </div>

      {/* Select All */}
      {contacts.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input
            type="checkbox"
            checked={
              selectedIds.length === contacts.length && contacts.length > 0
            }
            onChange={toggleSelectAll}
            className="h-4 w-4 rounded border-gray-300 text-[#02182B] focus:ring-[#02182B]"
          />
          <span>
            {selectedIds.length > 0
              ? `${selectedIds.length} selected`
              : "Select all"}
          </span>
        </div>
      )}

      {/* Table */}
      <DataTable<Contact>
        data={contacts}
        columns={columns}
        onRowClick={(row) => router.push(`/admin/contacts/${row.id}`)}
        emptyMessage="No contacts found."
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, totalCount)} of {totalCount}{" "}
            contacts
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => applyFilters({ page: currentPage - 1 })}
              disabled={currentPage <= 1}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => applyFilters({ page: currentPage + 1 })}
              disabled={currentPage >= totalPages}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
