import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918058940303?text=Hi!%20I%20would%20like%20to%20book%20a%20consultation.%0A%0AName:%20%0ADOB:%20%0APlace%20of%20Birth:%20"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 flex items-center justify-center animate-bounce"
    >
      <MessageCircle size={32} />
    </a>
  );
}
