import ServiceCard from "@/components/ui/ServiceCard";

export default function ServicesPage() {
  const allServices = [
    {
      title: "Relationship Problems",
      description: "Get guidance to solve conflicts, misunderstandings and emotional stress in relationships.",
      imageUrl: "/images/kurta_astrologer.png",
      imagePlaceholder: "Relationship",
      href: "/contact",
    },
    {
      title: "Marriage Compatibility",
      description: "Match making and compatibility analysis for a long, prosperous married life.",
      imageUrl: "/images/kurta_astrologer.png",
      imagePlaceholder: "Marriage",
      href: "/contact",
    },
    {
      title: "Career Guidance",
      description: "Detailed analysis of your birth chart to find the most suitable career path.",
      imageUrl: "/images/suit_astrologer.png",
      imagePlaceholder: "Career",
      href: "/contact",
    },
    {
      title: "Business Growth",
      description: "Gain an edge over competitors and increase financial profits with expert advice.",
      imageUrl: "/images/suit_astrologer.png",
      imagePlaceholder: "Business",
      href: "/contact",
    },
    {
      title: "Financial Problems",
      description: "Unlock remedies to clear debts and attract wealth abundance.",
      imageUrl: "/images/suit_astrologer.png",
      imagePlaceholder: "Finance",
      href: "/contact",
    },
    {
      title: "Health Astrology",
      description: "Predictive analysis for physical well-being and health-related remedies.",
      imageUrl: "/images/kurta_astrologer.png",
      imagePlaceholder: "Health",
      href: "/contact",
    },
    {
      title: "Property Vastu",
      description: "Residential & commercial vastu consultation to harmonize property energies.",
      imageUrl: "/images/kurta_astrologer.png",
      imagePlaceholder: "Property Vastu",
      href: "/contact",
    },
    {
      title: "Numerology",
      description: "Discover your life path number and suitable names for business or newborn.",
      imageUrl: "/images/suit_astrologer.png",
      imagePlaceholder: "Numerology",
      href: "/contact",
    },
  ];

  return (
    <div className="bg-cream min-h-screen pt-10 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-crimson mb-4">Our Services</h1>
          <p className="max-w-2xl mx-auto text-gray-700 font-sans">
            Explore our wide range of astrology and vastu services tailored to bring positive transformations to every aspect of your life.
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allServices.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
}
