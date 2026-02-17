"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type ItemType = "platform" | "method";

type Item = {
  id: string;
  type: ItemType;
  title: string;
  subtitle?: string;
  tags: string[];
  details?: string;
  isActive: boolean;

  image?: string; // ej: "/previews/adobe.jpg"
  categoryIcon?: "ai" | "design" | "video" | "course" | "tools";
};

const CONTACT = "903 // 477 // 698";

const ITEMS: Item[] = [
  // PLATAFORMAS
  {
    id: "1",
    type: "platform",
    title: "AutoD 1 año",
    subtitle: "Acceso anual",
    tags: ["Diseño", "Pro"],
    details: "Disponible por DM",
    isActive: true,
    image: "/previews/autodesk.jpg",
    categoryIcon: "design",
  },
  {
    id: "2",
    type: "platform",
    title: "C4NV4 P4N (500 US)",
    subtitle: "Multi-usuarios",
    tags: ["Diseño", "Equipo"],
    details: "Disponible por DM",
    isActive: true,
    image: "/previews/canva.jpg",
    categoryIcon: "design",
  },
  {
    id: "3",
    type: "platform",
    title: "IA GPT",
    subtitle: "Plus / Business",
    tags: ["IA"],
    details: "Disponible por DM",
    isActive: true,
    image: "/previews/chatgpt.jpg",
    categoryIcon: "ai",
  },
  {
    id: "4",
    type: "platform",
    title: "G3M1N1 PRO 1 AÑO",
    subtitle: "Plan Pro",
    tags: ["IA"],
    details: "Disponible por DM",
    isActive: true,
    image: "/previews/gemini.jpg",
    categoryIcon: "ai",
  },
  {
    id: "5",
    type: "platform",
    title: "B34T1FUL 1A 1 AÑO",
    subtitle: "Presentaciones",
    tags: ["IA", "Diseño"],
    details: "Disponible por DM",
    isActive: true,
    image: "/previews/beautifulai.jpg",
    categoryIcon: "tools",
  },
  {
    id: "6",
    type: "platform",
    title: "AD0B3 CL0",
    subtitle: "Suite",
    tags: ["Diseño"],
    details: "Disponible por DM",
    isActive: true,
    image: "/previews/adobe.jpg",
    categoryIcon: "design",
  },
  {
    id: "7",
    type: "platform",
    title: "PERPL3X",
    subtitle: "IA",
    tags: ["IA"],
    details: "Disponible por DM",
    isActive: true,
    image: "/previews/perplexity.jpg",
    categoryIcon: "ai",
  },

  // Streaming agregadas
  {
    id: "8p",
    type: "platform",
    title: "DisN+",
    subtitle: "Streaming",
    tags: ["Series", "Películas"],
    details: "Disponible por DM",
    isActive: true,
    image: "/previews/disney.jpg",
    categoryIcon: "video",
  },
  {
    id: "9p",
    type: "platform",
    title: "Crunch",
    subtitle: "Anime",
    tags: ["Anime", "Series"],
    details: "Disponible por DM",
    isActive: true,
    image: "/previews/crunchyroll.jpg",
    categoryIcon: "video",
  },
  {
    id: "10p",
    type: "platform",
    title: "M4XIT0",
    subtitle: "Streaming",
    tags: ["Series", "Películas"],
    details: "Disponible por DM",
    isActive: true,
    image: "/previews/hbo.jpg",
    categoryIcon: "video",
  },
  {
    id: "11p",
    type: "platform",
    title: "Spot1",
    subtitle: "Música",
    tags: ["Música", "Premium"],
    details: "Disponible por DM",
    isActive: true,
    image: "/previews/spotify.jpg",
    categoryIcon: "tools",
  },

  // MÉTODOS
  {
    id: "m1",
    type: "method",
    title: "M3t0d0s V4ri4d0s",
    subtitle: "Accesos + herramientas",
    tags: ["Variado", "Soporte", "Actualizado"],
    details: "Acceso a varias opciones. Disponible por DM.",
    isActive: true,
    image: "/previews/variados.jpg",
    categoryIcon: "tools",
  },
  {
    id: "m2",
    type: "method",
    title: "M3t0d0 V1N0",
    subtitle: "Básico a avanzado",
    tags: ["Guía", "Soporte"],
    details: "Aprende desde cero, resuelve dudas, práctica guiada.",
    isActive: true,
    image: "/previews/vino.jpg",
    categoryIcon: "course",
  },
  {
    id: "m3",
    type: "method",
    title: "B0T 1PTV",
    subtitle: "Acceso 1 mes",
    tags: ["TV", "Series", "Películas"],
    details: "Disponible por DM",
    isActive: true,
    image: "/previews/iptv.jpg",
    categoryIcon: "video",
  },
];

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function maskSensitive(text: string) {
  return text
    .replace(/\b\d{3,}\b/g, (m) => m[0] + "*".repeat(Math.max(0, m.length - 1)))
    .replace(/https?:\/\/\S+/gi, "[oculto]")
    .replace(/@\w+/g, "[oculto]");
}

function Icon({ kind }: { kind?: Item["categoryIcon"] }) {
  const base = "h-5 w-5";
  switch (kind) {
    case "ai":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "design":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <path d="M4 20h16" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M7 17l10-10 2 2-10 10H7v-2z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "video":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <path d="M4 7h12v10H4V7z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M16 10l4-2v8l-4-2v-4z" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "course":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <path
            d="M4 6h10a3 3 0 013 3v11H7a3 3 0 01-3-3V6z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M17 9h3v11h-3" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    default:
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
  }
}

export default function DashboardPage() {
  const router = useRouter();

  // ✅ PROTECCIÓN: si no hay sesión, fuera al login
  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) router.replace("/login");
    };
    check();
  }, [router]);

  const [liveMode, setLiveMode] = useState(false);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<ItemType>("platform");

  const shownContact = liveMode ? maskSensitive(CONTACT) : CONTACT;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ITEMS.filter((i) => i.isActive)
      .filter((i) => i.type === tab)
      .filter(
        (i) =>
          !q ||
          i.title.toLowerCase().includes(q) ||
          (i.subtitle ?? "").toLowerCase().includes(q) ||
          i.tags.join(" ").toLowerCase().includes(q)
      );
  }, [query, tab]);

  const copyContact = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT);
      alert("Contacto copiado ✅");
    } catch {
      alert("No se pudo copiar. Copia manual: " + CONTACT);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[28px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-5">
            <div>
              <div className="text-2xl font-black tracking-tight">
                DM <span className="text-slate-300">Streaming</span>
              </div>
              <div className="mt-1 text-sm text-slate-300">
                Panel privado <span className="text-slate-600">•</span>{" "}
                {tab === "platform" ? "Plataformas" : "Métodos"}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-extrabold",
                  liveMode
                    ? "bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/20"
                    : "bg-white/10 text-slate-300 ring-1 ring-white/10"
                )}
              >
                {liveMode ? "LIVE MODE ON" : "LIVE MODE OFF"}
              </span>

              {/* Switch */}
              <button
                onClick={() => setLiveMode((v) => !v)}
                className={cn(
                  "relative h-10 w-[96px] rounded-full border transition-all",
                  liveMode
                    ? "border-sky-300/30 bg-sky-400/10 shadow-[0_0_0_6px_rgba(56,189,248,0.08)]"
                    : "border-white/15 bg-white/5"
                )}
                aria-pressed={liveMode}
              >
                <span
                  className={cn(
                    "absolute top-1 left-1 h-8 w-8 rounded-full shadow-lg transition-all",
                    liveMode ? "translate-x-[52px] bg-sky-200" : "translate-x-0 bg-white/80"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-3 top-1/2 -translate-y-1/2 text-xs font-extrabold",
                    liveMode ? "text-slate-500" : "text-slate-200"
                  )}
                >
                  OFF
                </span>
                <span
                  className={cn(
                    "absolute right-3 top-1/2 -translate-y-1/2 text-xs font-extrabold",
                    liveMode ? "text-sky-200" : "text-slate-500"
                  )}
                >
                  ON
                </span>
              </button>

              {/* ✅ Cerrar sesión */}
              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  window.location.href = "/login";
                }}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold text-white hover:bg-white/10 transition"
                title="Cerrar sesión"
              >
                🔒 Salir
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="px-6 py-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-2xl bg-white/5 p-1 ring-1 ring-white/10">
                <button
                  onClick={() => setTab("platform")}
                  className={cn(
                    "rounded-xl px-4 py-2 text-sm font-extrabold transition",
                    tab === "platform"
                      ? "bg-white/10 text-white ring-1 ring-white/10"
                      : "text-slate-300 hover:text-white"
                  )}
                >
                  Plataformas
                </button>
                <button
                  onClick={() => setTab("method")}
                  className={cn(
                    "rounded-xl px-4 py-2 text-sm font-extrabold transition",
                    tab === "method"
                      ? "bg-white/10 text-white ring-1 ring-white/10"
                      : "text-slate-300 hover:text-white"
                  )}
                >
                  Métodos
                </button>
              </div>

              <div className="flex-1">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar… (ej: IA, diseño, vino)"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-400/20"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-extrabold text-slate-200">
                {filtered.length} item{filtered.length === 1 ? "" : "s"}
              </div>
            </div>

            {/* Grid */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((i) => (
                <div
                  key={i.id}
                  className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-b from-white/6 to-white/3 shadow-[0_18px_55px_rgba(0,0,0,0.45)] transition hover:-translate-y-0.5 hover:border-white/15"
                >
                  {/* glow */}
                  <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-sky-400/10 blur-3xl opacity-0 transition group-hover:opacity-100" />

                  {/* Preview 16:9 */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-[26px] ring-1 ring-white/10">
                    {i.image ? (
                      <>
                        <Image
                          src={i.image}
                          alt={i.title}
                          fill
                          className={cn(
                            "object-cover transition duration-500",
                            liveMode ? "scale-[1.02] blur-[10px]" : "group-hover:scale-[1.04]"
                          )}
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          priority={false}
                        />

                        <div
                          className={cn(
                            "absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent",
                            liveMode ? "from-slate-950/85 via-slate-950/30" : ""
                          )}
                        />

                        {liveMode && (
                          <div className="absolute right-3 top-3 rounded-full bg-rose-500/15 px-3 py-1 text-[11px] font-extrabold text-rose-200 ring-1 ring-rose-400/20">
                            LIVE
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-white/5 text-sm font-extrabold text-slate-300">
                        Sin imagen
                      </div>
                    )}

                    <div className="absolute left-3 top-3 rounded-full bg-white/10 px-3 py-1 text-xs font-extrabold text-white ring-1 ring-white/10">
                      {i.type === "platform" ? "PLATAFORMA" : "MÉTODO"}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center rounded-xl bg-white/6 p-2 text-slate-200 ring-1 ring-white/10">
                          <Icon kind={i.categoryIcon} />
                        </span>
                        <div className="truncate text-lg font-black tracking-tight text-white">
                          {i.title}
                        </div>
                      </div>

                      {!liveMode && i.subtitle && (
                        <div className="mt-1 truncate text-sm font-semibold text-slate-300">
                          {i.subtitle}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {i.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/6 px-3 py-1 text-xs font-extrabold text-slate-200 ring-1 ring-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 text-sm font-semibold text-slate-300">
                      {liveMode ? "Disponible por DM" : i.details}
                    </div>

                    <div className="mt-5 flex gap-2">
                      <button className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-extrabold text-white hover:bg-white/8">
                        {liveMode ? "Solicitar" : "Ver detalle"}
                      </button>

                      <button
                        onClick={copyContact}
                        className="rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-slate-900 hover:bg-slate-100"
                        title="Copiar contacto"
                      >
                        Copiar
                      </button>
                    </div>
                  </div>

                  <div className="h-1 w-full bg-gradient-to-r from-sky-300/30 via-white/10 to-transparent" />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[26px] border border-white/10 bg-white/5 p-5">
              <div>
                <div className="text-sm font-extrabold text-white">Contacto</div>
                <div className="mt-1 text-xs font-semibold text-slate-400">
                  Escribe para info / acceso
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950 px-5 py-3 font-mono text-sm font-extrabold text-white ring-1 ring-white/10">
                {shownContact}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs font-semibold text-slate-400">
          Tip: activa <span className="font-extrabold text-slate-200">Modo LIVE</span> para mostrar el catálogo sin detalles sensibles.
        </div>
      </div>
    </div>
  );
}

