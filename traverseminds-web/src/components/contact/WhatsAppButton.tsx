"use client";

import { MessageCircle } from "lucide-react";

// TODO: Replace with real WhatsApp number before going live
const WHATSAPP_NUMBER = "256700000000";
const WHATSAPP_MESSAGE = "Hello Traverse Minds, I'd like to enquire about your services.";

export function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Traverse Minds on WhatsApp"
      className="inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-[#1da851] hover:shadow-md active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2"
    >
      <MessageCircle className="h-5 w-5" />
      Chat on WhatsApp
    </a>
  );
}
