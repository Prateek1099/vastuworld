import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  imagePlaceholder: string;
  imageUrl?: string;
  href: string;
}

export default function ServiceCard({
  title,
  description,
  imagePlaceholder,
  imageUrl,
  href,
}: ServiceCardProps) {
  return (
    <div className="group rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-white hover:shadow-2xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1 mx-2">
      <div className="relative h-64 w-full overflow-hidden bg-gold/5 flex items-center justify-center p-2">
        {imageUrl ? (
          <Image src={imageUrl} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-xl" />
        ) : (
          <span className="text-crimson/50 font-serif text-lg z-0 relative">{imagePlaceholder}</span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
      </div>
      <div className="p-6 flex flex-col flex-grow relative z-20 bg-white text-center rounded-t-3xl -mt-6">
        <h3 className="font-serif text-xl mb-3 text-gold-light italic group-hover:text-gold transition-colors font-bold tracking-wide">
          {title}
        </h3>
        <p className="text-sm text-gray-600 font-sans flex-grow leading-relaxed px-2">
          {description}
        </p>
      </div>
    </div>
  );
}
