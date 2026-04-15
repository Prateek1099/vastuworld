export default function BlogPage() {
  const articles = [
    { title: "Vastu Tips for a Peaceful Home", category: "Vastu", readTime: "5 min read" },
    { title: "Understanding Marriage Astrology Compatibility", category: "Astrology", readTime: "7 min read" },
    { title: "Lucky Directions for Business Success", category: "Vastu", readTime: "4 min read" },
    { title: "How Planetary Transitions Affect Career", category: "Astrology", readTime: "6 min read" },
    { title: "Basic Numerology for Naming Your Business", category: "Numerology", readTime: "5 min read" },
  ];

  return (
    <div className="bg-cream min-h-screen pt-10 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-crimson mb-4">Our Blog</h1>
          <p className="max-w-2xl mx-auto text-gray-700 font-sans">
            Insights, remedies, and wisdom from ancient sciences to help you lead a better life.
          </p>
          <div className="w-24 h-1 bg-gold mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gold/10 overflow-hidden group cursor-pointer hover:shadow-2xl transition-all">
              <div className="h-48 bg-gold/10 relative flex items-center justify-center">
                <span className="text-crimson/50 font-serif">[ Article Image ]</span>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold">{article.category}</span>
                  <span className="text-xs text-gray-500 font-sans">{article.readTime}</span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-crimson mb-3 group-hover:text-gold transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 font-sans mb-4 line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <span className="text-sm font-serif font-bold text-crimson group-hover:text-gold transition-colors">
                  Read Article &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
