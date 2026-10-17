// Single source for public contact details. Same number as the Traverse Security WhatsApp line.
export const WHATSAPP_NUMBER = "256775692334";
export const PHONE_DISPLAY = "+256 775 692 334";
export const PHONE_E164 = "+256775692334";

export const whatsappUrl = (message: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
