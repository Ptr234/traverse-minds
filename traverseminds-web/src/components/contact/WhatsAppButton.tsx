"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/contact";

const WHATSAPP_MESSAGE = "Hello Traverse Minds Africa, I'd like to enquire about your services.";

export function WhatsAppButton() {
  const url = whatsappUrl(WHATSAPP_MESSAGE);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Traverse Minds Africa on WhatsApp"
      className="inline-flex items-center gap-3 bg-[#075E54] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#054a42] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075E54]"
    >
      <MessageCircle className="h-5 w-5" />
      Chat on WhatsApp
    </a>
  );
}
