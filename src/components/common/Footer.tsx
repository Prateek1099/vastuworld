import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-crimson-dark text-cream pt-16 pb-8 border-t-4 border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-gold-light">Shiv Vastu World</h3>
            <p className="text-sm opacity-80 leading-relaxed font-sans">
              Shiv Vastu World provides professional astrology and vastu consultation services to help individuals overcome life challenges and achieve harmony, success and peace.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm font-sans">
              <li><Link href="/" className="hover:text-gold transition-colors block">Home</Link></li>
              <li><Link href="/about" className="hover:text-gold transition-colors block">About Us</Link></li>
              <li><Link href="/services" className="hover:text-gold transition-colors block">Our Services</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors block">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-gold">Contact Details</h4>
            <ul className="space-y-3 text-sm font-sans">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-0.5 text-gold" />
                <span>+91 8058940303</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-0.5 text-gold" />
                <span>shivvastuworld@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-0.5 text-gold shrink-0" />
                <span>
                  9/194-A, Near Sardar Patel School, Rameswar nagar, JODHPUR, RAJASTHAN, India 342005
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-gold">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/shivvastuworld?utm_source=qr&igsh=MXg1czNha2IzdTBt" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 px-3 rounded-full hover:bg-gold transition-colors text-sm font-bold">
                IG
              </a>
              <a href="https://www.facebook.com/people/Shiv-Vastuworld/pfbid0py7Zk7HWtjmPYbqRK9fiSirx5G9hp2TdJqQj2NN34ZjmTQDAVtvnn8Zs37BbtrSxl/?rdid=82MGZXhpMwmsTPZ9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1GRUKCMU8k%2F%3Fref%3D1" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 px-3 rounded-full hover:bg-gold transition-colors text-sm font-bold">
                FB
              </a>
            </div>
          </div>
          
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm opacity-60 font-sans">
          <p>&copy; {new Date().getFullYear()} Shiv Vastu World. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
