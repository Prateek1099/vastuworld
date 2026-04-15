import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen pt-10 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-crimson mb-8 text-center">About Shiv Vastu World</h1>
        
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-xl border border-gold/20">
          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-crimson max-w-none font-sans text-gray-700 leading-relaxed">
            <h2 className="text-2xl font-bold mb-4 font-serif text-crimson">Our Mission</h2>
            <p className="mb-6">
              Shiv Vastu World provides professional astrology and vastu consultation services to help individuals overcome life challenges and achieve harmony, success, and peace. We blend ancient wisdom with practical solutions for modern problems.
            </p>
            
            <h2 className="text-2xl font-bold mb-4 mt-8 font-serif text-crimson">Our Expertise</h2>
            <p className="mb-6">
              With over 15 years of deep research and practice in Vedic Astrology, Vastu Shastra, and Numerology, our experts analyze planetary positions and cosmic energies to bring positive shifts in our clients' lives. We have successfully conducted over 10,000 consultations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 bg-cream/50 p-6 rounded-lg">
              <div>
                <h3 className="text-xl font-bold text-gold mb-3 font-serif">Astrology</h3>
                <p className="text-sm">We provide precise predictions and practical remedies for career, marriage, relationships, and health.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gold mb-3 font-serif">Vastu Shastra</h3>
                <p className="text-sm">We analyze residential and commercial properties to balance cosmic energies for growth and prosperity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
