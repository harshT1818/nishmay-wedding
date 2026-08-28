"use client";

import { useRouter } from "next/navigation";

import { createAuthBrowserClient } from "@/lib/supabase/auth-client";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    const supabase =
      createAuthBrowserClient();

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="rounded-xl border border-[#d8cbc5] px-4 py-2 text-sm"
    >
      Sign out
    </button>
  );
}