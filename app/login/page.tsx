"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);

  async function onLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

if (error) {
  console.log("SUPABASE LOGIN ERROR:", error);
  setMsg(error.message);
  return;
}

    router.push("/dashboard");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 text-slate-100">
      {/* fondo con glow suave */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-fuchsia-400/10 blur-3xl" />

      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* header */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold text-slate-200 shadow-[0_18px_55px_rgba(0,0,0,0.35)]">
              <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
              Acceso privado
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight">
              DM <span className="text-slate-300">Streaming</span>
            </h1>
            <p className="mt-2 text-sm font-semibold text-slate-400">
              Inicia sesión para entrar al panel.
            </p>
          </div>

          {/* card */}
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-extrabold text-white">Login</div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-extrabold text-slate-200 ring-1 ring-white/10">
                  🔒 Seguro
                </div>
              </div>
              <div className="mt-1 text-xs font-semibold text-slate-400">
                Usa el correo y clave creados en Supabase.
              </div>
            </div>

            <form onSubmit={onLogin} className="px-6 py-6">
              {/* email */}
              <label className="text-xs font-extrabold text-slate-300">
                Correo
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@gmail.com"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm font-semibold text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-sky-400/20"
                />
              </div>

              {/* password */}
              <label className="mt-4 block text-xs font-extrabold text-slate-300">
                Contraseña
              </label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type={showPass ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm font-semibold text-white placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-sky-400/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-extrabold text-slate-200 hover:bg-white/8"
                  title={showPass ? "Ocultar" : "Mostrar"}
                >
                  {showPass ? "Ocultar" : "Ver"}
                </button>
              </div>

              {/* msg */}
              {msg && (
                <div className="mt-4 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-200">
                  {msg}
                </div>
              )}

              {/* button */}
              <button
                disabled={loading}
                className={cn(
                  "mt-5 w-full rounded-2xl px-4 py-3 text-sm font-extrabold transition",
                  "bg-white text-slate-900 hover:bg-slate-100",
                  "disabled:opacity-60 disabled:hover:bg-white"
                )}
              >
                {loading ? "Entrando..." : "Iniciar sesión"}
              </button>

              {/* footer help */}
              <div className="mt-4 text-center text-xs font-semibold text-slate-500">
                Tip: si estás en directo, activa{" "}
                <span className="font-extrabold text-slate-300">Modo LIVE</span>{" "}
                dentro del panel.
              </div>
            </form>
          </div>

          {/* mini footer */}
          <div className="mt-6 text-center text-[11px] font-semibold text-slate-600">
            DM Panel • Privado
          </div>
        </div>
      </div>
    </div>
  );
}
