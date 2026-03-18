"use client";

import { motion } from "framer-motion";
import { Mic, Headphones, Rss } from "lucide-react";

const subscribeLinks = [
  {
    label: "Spotify",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    label: "Apple Podcasts",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.6-.36 1.2-.96 1.2h-.12c-.48 0-.84-.36-.96-.84-.264-1.272-.792-2.376-1.68-3.288-1.32-1.368-3.012-2.088-4.944-2.088-3.648 0-6.624 3.024-6.576 6.672.024 1.776.72 3.384 1.872 4.584.48.48.48 1.272 0 1.752l-.072.072c-.48.48-1.272.48-1.752 0C3.408 16.056 2.472 13.896 2.4 11.52c-.12-4.944 3.84-9.024 8.76-8.976.24.024.48.024.704.024zm.024 4.464c1.272 0 2.472.504 3.384 1.416.816.84 1.296 1.872 1.44 3.024.048.48-.312.888-.792.936h-.072c-.432 0-.792-.312-.84-.744-.096-.744-.408-1.416-.936-1.944-.6-.6-1.392-.936-2.232-.936-1.728 0-3.168 1.44-3.12 3.168.024.768.336 1.464.84 1.992.264.264.264.696 0 .96l-.072.072c-.264.264-.696.264-.96 0-.768-.768-1.2-1.8-1.248-2.904-.096-2.472 1.896-4.536 4.368-4.536.096-.024.168-.024.24.024v-.528zm-.168 4.464c.624 0 1.128.504 1.128 1.128 0 .624-.504 1.128-1.128 1.128-.624 0-1.128-.504-1.128-1.128 0-.624.504-1.128 1.128-1.128zm-.72 3.696c.096-.024.192-.024.288-.024h.768c.096 0 .192 0 .288.024.48.096.84.504.84 1.008v3.456c0 .648-.384 1.224-.984 1.464-.264.12-.552.168-.84.168s-.576-.048-.84-.168c-.6-.24-.984-.816-.984-1.464V16.2c0-.504.36-.912.84-1.008h.624z" />
      </svg>
    ),
  },
  {
    label: "RSS Feed",
    href: "#",
    icon: <Rss className="h-5 w-5" />,
  },
];

export function PodcastPreview() {
  return (
    <section className="relative overflow-hidden bg-primary section-padding">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-100 w-100 translate-y-1/3 -translate-x-1/4 rounded-full bg-emerald/6 blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 h-80 w-80 -translate-y-1/3 translate-x-1/3 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-accent/10 blur-[60px]" />

              {/* Outer ring */}
              <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full border border-white/6 bg-surface-dark-elevated flex items-center justify-center">
                {/* Waveform decoration */}
                <div className="absolute inset-4 rounded-full border border-white/4" />
                <div className="absolute inset-10 rounded-full border border-white/3" />
                <div className="absolute inset-16 rounded-full border border-white/2" />

                {/* Microphone icon */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex h-24 w-24 items-center justify-center rounded-full bg-accent/15"
                >
                  <Mic className="h-10 w-10 text-accent" />
                </motion.div>
              </div>

              {/* Waveform bars */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-end gap-1">
                {[20, 35, 50, 28, 45, 60, 38, 52, 30, 42, 55, 25, 48, 35, 20].map(
                  (h, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [h * 0.4, h, h * 0.4] }}
                      transition={{
                        duration: 1.2 + Math.random() * 0.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.08,
                      }}
                      className="w-1 rounded-full bg-accent/40"
                      style={{ height: h * 0.4 }}
                    />
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-8"
            >
              <Headphones className="h-3 w-3 text-accent" />
              <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/50">
                Traverse Media
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Facts &amp;{" "}
              <span className="text-gradient-accent">Figures</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-5 text-base md:text-lg text-white/45 leading-relaxed max-w-md"
            >
              Unpacking the data, laws, and technology shaping East Africa.
            </motion.p>

            {/* Coming soon note */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 inline-flex items-center gap-2.5 rounded-xl border border-white/6 bg-white/3 px-5 py-3"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              <span className="text-sm font-medium text-white/60">
                First episode coming soon
              </span>
            </motion.div>

            {/* Subscribe Links */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-10"
            >
              <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/25 mb-4">
                Subscribe on launch
              </p>
              <div className="flex flex-wrap gap-3">
                {subscribeLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-white/8 bg-white/5 px-5 py-3 text-sm font-semibold text-white/60 transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
