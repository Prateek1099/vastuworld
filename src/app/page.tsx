import Link from "next/link";
import ServiceCard from "@/components/ui/ServiceCard";
import { CheckCircle, Star } from "lucide-react";

export default function Home() {
  const services = [
    {
      title: "Relationship Problems",
      description: "Get guidance to solve conflicts, misunderstandings and emotional stress in relationships.",
      imageUrl: "/images/kurta_astrologer.png",
      imagePlaceholder: "Relationship Image",
      href: "/services",
    },
    {
      title: "Marriage Compatibility",
      description: "Know the compatibility with your partner through our matchmaking analysis.",
      imageUrl: "/images/kurta_astrologer.png",
      imagePlaceholder: "Match Making Image",
      href: "/services",
    },
    {
      title: "Career Guidance",
      description: "Find the right career path based on planetary positions and your birth chart.",
      imageUrl: "/images/suit_astrologer.png",
      imagePlaceholder: "Career Image",
      href: "/services",
    },
    {
      title: "Business Growth",
      description: "Overcome business obstacles and achieve financial success with Vastu & Astrology.",
      imageUrl: "/images/suit_astrologer.png",
      imagePlaceholder: "Business Image",
      href: "/services",
    },
  ];

  const features = [
    "Accurate Analysis",
    "Confidential Consultation",
    "Practical Remedies",
    "Online & Offline Consultation",
    "Experienced Astrologer",
    "Personalized Guidance",
  ];

  const testimonials = [
    {
      text: "Very accurate guidance. Helped me solve marriage issues and brought peace to our family.",
      name: "Ramesh P.",
    },
    {
      text: "Business improved dramatically after Vastu consultation. Highly recommended!",
      name: "Sunita M.",
    },
    {
      text: "The remedies provided were simple yet incredibly effective. Life changing experience.",
      name: "Amit K.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-crimson-dark flex items-center justify-center min-h-[85vh] overflow-hidden px-4">
        {/* Subtle decorative background matching user image (stars/dots) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(178,138,93,0.15)_0%,transparent_70%)]" />
        <div className="absolute inset-0 pattern-dots opacity-20" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-gold/30 bg-gold/10 text-gold-light text-sm font-sans tracking-wide uppercase">
            Expert Consultation
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-cream mb-6 leading-tight drop-shadow-lg">
            <span className="italic block mb-2 font-light">Astrology & Vastu</span>
            Guidance for a <span className="text-gold">Better Life</span>
          </h1>
          <p className="text-lg md:text-xl text-cream-light/80 mb-10 max-w-2xl mx-auto font-sans font-light leading-relaxed">
            Get clarity in career, marriage, relationships, health and finances through expert astrology and vastu consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary w-full sm:w-auto text-lg px-8 py-4 bg-cream text-crimson hover:bg-gold hover:text-white border-2 border-transparent">
              Book Consultation
            </Link>
            <a href="https://wa.me/918058940303?text=Hi!%20I%20would%20like%20to%20book%20a%20consultation.%0A%0AName:%20%0ADOB:%20%0APlace%20of%20Birth:%20" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto text-lg px-8 py-4 rounded-md border-2 border-gold text-gold hover:bg-gold hover:text-white transition-all duration-300 font-serif">
              WhatsApp Chat
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-cream px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-gold-light mb-2">Services Offered</h2>
          <p className="text-gray-800 font-sans mb-12">Align your space and self with our expert services.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          
          <div className="mt-16">
            <Link href="/services" className="inline-flex items-center justify-center px-8 py-3 border border-crimson text-crimson font-serif hover:bg-crimson hover:text-white rounded-md transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white px-4 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-crimson/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-crimson mb-6">About Shiv Vastu World</h2>
          <p className="text-lg text-gray-700 leading-relaxed font-sans mb-12">
            Shiv Vastu World provides professional astrology and vastu consultation services to help individuals overcome life challenges and achieve harmony, success and peace. With profound knowledge of ancient sciences combined with practical modern insights, we guide you towards a prosperous path.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t border-gold/20 pt-12">
            <div>
              <div className="text-4xl font-serif text-gold mb-2">15+</div>
              <div className="text-sm font-sans tracking-widest uppercase text-gray-500">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-gold mb-2">10k+</div>
              <div className="text-sm font-sans tracking-widest uppercase text-gray-500">Consultations</div>
            </div>
            <div>
              <div className="text-4xl font-serif text-gold mb-2">100%</div>
              <div className="text-sm font-sans tracking-widest uppercase text-gray-500">Confidential</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-crimson-dark text-cream relative px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-gold-light mb-4">Why Choose Us</h2>
            <p className="text-cream/80 max-w-2xl mx-auto font-sans">
              We combine deep astrological knowledge with ethical practices to bring clarity and direction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 bg-white/5 p-6 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <CheckCircle className="text-gold flex-shrink-0" size={28} />
                <span className="font-serif text-lg tracking-wide">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-cream px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif text-crimson mb-4">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-gold mx-auto rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gold/10 relative">
                <div className="flex text-gold mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="font-sans text-gray-700 italic mb-6">"{t.text}"</p>
                <div className="font-serif font-bold text-crimson">- {t.name}</div>
                <div className="absolute top-4 right-4 text-gold/10 pointer-events-none">
                  <span className="text-8xl font-serif">"</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
