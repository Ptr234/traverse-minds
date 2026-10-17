"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/contact";

/** Site-wide WhatsApp shortcut, bottom-right. Sits under the cookie banner until it is dismissed. */
export function FloatingWhatsApp() {
  const pathname = usePathname();
  // Studio is an internal tool
  if (pathname?.startsWith("/studio")) return null;

  return (
    <a
      href={whatsappUrl("Hello Traverse Minds Africa, I'd like to enquire about your services.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Traverse Minds Africa on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2"
      style={{ borderRadius: 999 }}
    >
      <MessageCircle className="h-6 w-6" aria-hidden />
    </a>
  );
}
