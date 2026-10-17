"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, Sparkles, X } from "lucide-react";

// Served by the VPS backend (server/src/assistant.js); the Groq key never reaches the browser.
const API = process.env.NEXT_PUBLIC_ASSISTANT_URL || "https://api.traverseminds.com";

type Msg = { role: "user" | "assistant"; content: string };

const STARTERS = [
  "What security services do you offer banks?",
  "How do I train my school's staff?",
  "What does Uganda's data protection law require after a breach?",
  "What is Public Record Africa?",
];

const LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/[^\s)\]]+)/g;

/**
 * Renders Markdown links and bare URLs as links; everything else stays plain text, so model output
 * can never inject HTML.
 */
function Linkified({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    out.push(<span key={`t${m.index}`}>{text.slice(last, m.index).replace(/\*\*(.+?)\*\*/g, "$1")}</span>);
    const href = (m[2] ?? m[3]).replace(/[.,;:]+$/, "");
    const label = m[1] ?? href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    out.push(
      <a key={`a${m.index}`} href={href} target={href.includes("traverseminds.com") ? undefined : "_blank"} rel="noopener noreferrer" className="break-words text-accent underline underline-offset-2">
        {label}
      </a>
    );
    last = (m.index ?? 0) + m[0].length;
  }
  out.push(<span key="end">{text.slice(last).replace(/\*\*(.+?)\*\*/g, "$1")}</span>);
  return <>{out}</>;
}

export function AssistantWidget() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  // Only show the launcher once the backend confirms the assistant is configured
  useEffect(() => {
    let cancelled = false;
    fetch(`${API}/assistant/status`)
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((d) => !cancelled && setEnabled(Boolean(d.enabled)))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, busy]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Typewriter: the stream fills `full`; a timer reveals it a few characters at a time
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
  }, []);

  /**
   * Reveals `full.text` into the last message at a reading pace. Resolves once the stream has
   * finished (`full.done`) and everything is shown. Reduced-motion users see text immediately.
   */
  function typeOut(history: Msg[], full: { text: string; done: boolean }) {
    const instant = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let shown = 0;
    return new Promise<void>((resolve) => {
      const tick = () => {
        const backlog = full.text.length - shown;
        if (backlog > 0) {
          // ~100 characters a second, a little faster on long answers so nobody waits too long
          const step = instant ? backlog : backlog > 600 ? 5 : backlog > 250 ? 3 : 2;
          shown += Math.min(step, backlog);
          // Finish on a whole word so half-typed links never render as broken anchors for long
          const next = full.text.indexOf(" ", shown);
          const cut = next !== -1 && next - shown < 12 && !instant ? next : shown;
          setMessages([...history, { role: "assistant", content: full.text.slice(0, cut) }]);
          shown = cut;
        }
        if (full.done && shown >= full.text.length) {
          typingTimer.current = null;
          resolve();
          return;
        }
        typingTimer.current = setTimeout(tick, 18);
      };
      tick();
    });
  }

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const history: Msg[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setError("");
    setBusy(true);
    const full = { text: "", done: false };
    let typing: Promise<void> | null = null;
    try {
      const res = await fetch(`${API}/assistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "The assistant could not answer right now.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        full.text += decoder.decode(value, { stream: true });
        typing ??= typeOut(history, full);
      }
      full.done = true;
      if (!full.text) throw new Error("No answer came back. Please try again.");
      await typing;
    } catch (err) {
      full.done = true;
      if (typingTimer.current) clearTimeout(typingTimer.current);
      setMessages(history);
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (!enabled || pathname?.startsWith("/studio")) return null;

  return (
    <>
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-[88px] right-5 z-40 flex items-center gap-2 bg-primary px-4 py-3 text-[14px] font-semibold text-white shadow-lg hover:bg-black"
          aria-haspopup="dialog"
        >
          <Sparkles className="h-4 w-4 text-accent" aria-hidden />
          Ask Traverse AI
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Traverse AI assistant"
          className="fixed inset-0 z-[110] flex flex-col bg-white sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[600px] sm:max-h-[calc(100vh-40px)] sm:w-[400px] sm:border sm:border-black/15 sm:shadow-2xl"
        >
          <header className="flex items-start justify-between gap-3 border-b-2 border-black px-5 py-4">
            <div>
              <p className="flex items-center gap-2 font-serif text-[19px] font-semibold text-black">
                <Sparkles className="h-4 w-4 text-accent" aria-hidden /> Traverse AI
              </p>
              <p className="mt-0.5 text-[12px] text-gn-500">Answers from our website. It can make mistakes.</p>
            </div>
            <button type="button" onClick={() => { setOpen(false); launcherRef.current?.focus(); }} className="p-1 text-gn-400 hover:text-black" aria-label="Close assistant">
              <X className="h-5 w-5" />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4" aria-live="polite">
            {messages.length === 0 && (
              <div>
                <p className="text-[15px] leading-relaxed text-gn-300">
                  Hi! Ask me about our security services, training, research, events or Public Record.
                </p>
                <ul className="mt-4 space-y-2">
                  {STARTERS.map((s) => (
                    <li key={s}>
                      <button type="button" onClick={() => send(s)} className="w-full border border-black/15 px-3 py-2 text-left text-[14px] text-gn-200 hover:border-accent hover:text-black">
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] bg-primary px-3.5 py-2.5 text-[14px] leading-relaxed text-white"
                      : "max-w-[95%] whitespace-pre-wrap text-[15px] leading-relaxed text-gn-200"
                  }
                >
                  {m.content ? (
                    <Linkified text={m.content} />
                  ) : (
                    <span className="inline-flex items-center gap-1 py-1.5" role="status" aria-label="Traverse AI is typing">
                      {[0, 150, 300].map((delay) => (
                        <span
                          key={delay}
                          className="h-1.5 w-1.5 animate-bounce rounded-full bg-gn-500 motion-reduce:animate-none"
                          style={{ animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {error && <p className="border-l-2 border-accent pl-3 text-[14px] text-gn-300" role="alert">{error}</p>}
          </div>

          <form
            className="border-t border-black/10 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <div className="flex items-end gap-2">
              <label className="grow">
                <span className="sr-only">Your question</span>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, 1500))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder="Ask a question"
                  className="max-h-32 min-h-[44px] w-full resize-none border border-black/15 px-3 py-2.5 text-[15px] outline-none focus:border-accent"
                />
              </label>
              <button type="submit" disabled={busy || !input.trim()} className="flex h-11 w-11 shrink-0 items-center justify-center bg-accent text-white disabled:opacity-40" aria-label="Send">
                <ArrowUp className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-gn-500">
              General information, not legal advice. Don&apos;t share sensitive personal data.{" "}
              <a href="/contact/" className="underline">Talk to a person</a>
            </p>
          </form>
        </div>
      )}
    </>
  );
}
