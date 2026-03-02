import { createClient } from "@/lib/supabase/server";
import ContactsPageClient from "./ContactsPageClient";

export const metadata = {
  title: "Contacts — Influence Circle Admin",
};

interface ContactsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 25;

export default async function ContactsPage({ searchParams }: ContactsPageProps) {
  const params = await searchParams;
  const search = params.search ?? "";
  const status = params.status ?? "";
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  const supabase = await createClient();

  // Build the query
  let query = supabase
    .from("contacts")
    .select(
      "id, name, email, company, status, last_activity_at, contact_service_interests(service)",
      { count: "exact" }
    );

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`
    );
  }

  if (status) {
    query = query.eq("status", status);
  }

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data: rawContacts, count } = await query
    .order("created_at", { ascending: false })
    .range(from, to);

  // Transform to flat structure for the table
  const contacts = (rawContacts ?? []).map((c) => {
    const interests = c.contact_service_interests as
      | { service: string }[]
      | null;
    return {
      id: c.id,
      name: c.name,
      email: c.email,
      company: c.company,
      service: interests && interests.length > 0 ? interests[0].service : null,
      status: c.status,
      last_activity_at: c.last_activity_at,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your audience and subscriber base.
        </p>
      </div>

      <ContactsPageClient
        contacts={contacts}
        totalCount={count ?? 0}
        currentPage={page}
        pageSize={PAGE_SIZE}
      />
    </div>
  );
}
