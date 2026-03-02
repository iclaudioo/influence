"use client";

import { useState } from "react";
import ContactTable from "@/components/admin/contacts/ContactTable";
import BulkActionsBar from "@/components/admin/contacts/BulkActionsBar";

interface Contact extends Record<string, unknown> {
  id: string;
  name: string;
  email: string;
  company: string | null;
  service: string | null;
  status: string;
  last_activity_at: string | null;
}

interface ContactsPageClientProps {
  contacts: Contact[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
}

export default function ContactsPageClient({
  contacts,
  totalCount,
  currentPage,
  pageSize,
}: ContactsPageClientProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <>
      <ContactTable
        contacts={contacts}
        totalCount={totalCount}
        currentPage={currentPage}
        pageSize={pageSize}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />
      <BulkActionsBar
        selectedIds={selectedIds}
        onClear={() => setSelectedIds([])}
      />
    </>
  );
}
