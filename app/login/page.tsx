"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createAuthBrowserClient } from "@/lib/supabase/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setLoading(true);
    setError(null);

    const supabase = createAuthBrowserClient();

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    router.push("/admin/guests");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f4ef] px-6 text-[#321f24]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl border border-[#ddd1c8] bg-white p-8 shadow-sm"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-[#8b646d]">
          NishMay
        </p>

        <h1 className="mt-3 text-3xl font-semibold">
          Admin Login
        </h1>

        <p className="mt-2 text-sm text-[#75686b]">
          Wedding management access
        </p>

        <div className="mt-8">
          <label
            htmlFor="email"
            className="text-sm font-medium"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            className="mt-2 w-full rounded-xl border border-[#d8cbc5] px-4 py-3 outline-none focus:border-[#321f24]"
          />
        </div>

        <div className="mt-5">
          <label
            htmlFor="password"
            className="text-sm font-medium"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            className="mt-2 w-full rounded-xl border border-[#d8cbc5] px-4 py-3 outline-none focus:border-[#321f24]"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-7 w-full rounded-xl bg-[#321f24] px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}