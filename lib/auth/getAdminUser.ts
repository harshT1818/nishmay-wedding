import "server-only";

import { createAuthServerClient } from "@/lib/supabase/auth-server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getAdminUser() {
  const authSupabase =
    await createAuthServerClient();

  const {
    data,
    error,
  } = await authSupabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    return null;
  }

  const userId = data.claims.sub;

  const adminSupabase =
    createServerSupabaseClient();

  const {
    data: admin,
    error: adminError,
  } = await adminSupabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (adminError || !admin) {
    return null;
  }

  return {
    id: userId,
    email:
      typeof data.claims.email === "string"
        ? data.claims.email
        : null,
  };
}