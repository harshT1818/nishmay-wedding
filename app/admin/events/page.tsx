import { redirect } from "next/navigation";

import { getAdminUser } from "@/lib/auth/getAdminUser";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import EventAdmin from "@/components/admin/EventAdmin";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function EventsAdminPage() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/login");
  }

  const supabase = createServerSupabaseClient();

  const { data: events, error } = await supabase
    .from("events")
    .select(`
      id,
      name,
      slug,
      date,
      start_time,
      end_time,
      location_name,
      venue_name,
      address,
      maps_url,
      description,
      dress_code,
      instructions,
      is_active,
      sort_order
    `)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] px-6 py-10 text-[#321f24]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-start justify-between gap-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8b646d]">
              NishMay Admin
            </p>

            <h1 className="mt-3 text-4xl font-semibold">
              Events
            </h1>

            <p className="mt-3 max-w-2xl text-[#6f6265]">
              Update wedding timings, venues, directions and guest
              information.
            </p>

            {admin.email && (
              <p className="mt-2 text-xs text-[#8b7b7e]">
                Signed in as {admin.email}
              </p>
            )}
          </div>

          <LogoutButton />
        </div>

        <div className="mb-8 flex gap-3">
          <a
            href="/admin/guests"
            className="rounded-xl border border-[#d8cbc5] bg-white px-4 py-2 text-sm"
          >
            Guests
          </a>

          <a
            href="/admin/events"
            className="rounded-xl bg-[#321f24] px-4 py-2 text-sm text-white"
          >
            Events
          </a>
        </div>

        <EventAdmin events={events ?? []} />
      </div>
    </main>
  );
}