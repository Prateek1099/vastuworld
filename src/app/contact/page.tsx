"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In the future, API call to send email/DB can go here
    // Also: Future Razorpay Integration can be injected here or immediately after form validation
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
      setFormData({ name: "", phone: "", email: "", category: "", message: "" });
    }, 500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-cream min-h-screen pt-10 pb-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-crimson mb-4">Book a Consultation</h1>
          <p className="max-w-2xl mx-auto text-gray-700 font-sans">
            Reach out to us for expert guidance on astrology and vastu. We are here to help you navigate through life's challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gold/20">
          
          {/* Contact Form */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-serif text-crimson mb-6">Send Us a Message</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center font-sans">
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p>Your consultation request has been received. We will contact you shortly.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 text-sm underline text-green-700 hover:text-green-900"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-sans">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent transition-shadow"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent transition-shadow"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Problem Category</label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent transition-shadow bg-white"
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="Relationship">Relationship</option>
                    <option value="Marriage">Marriage</option>
                    <option value="Career">Career</option>
                    <option value="Business">Business</option>
                    <option value="Health">Health</option>
                    <option value="Finance">Finance</option>
                    <option value="Vastu">Vastu</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent transition-shadow resize-none"
                    placeholder="Tell us briefly about your situation..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary text-center block bg-crimson text-white hover:bg-crimson-light"
                >
                  Submit Request
                </button>
                {/* Future integration wrapper for Razorpay below */}
                {/* <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center mb-2">Or pay instantly to confirm slot</p>
                    <button type="button" className="w-full bg-blue-600 text-white py-3 rounded-md...">Pay via Razorpay</button>
                </div> */}
              </form>
            )}
          </div>

          {/* Contact Details Panel */}
          <div className="bg-crimson-dark text-cream p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-0 translate-x-1/3 -translate-y-1/3" />
            
            <div className="relative z-10">
              <h2 className="text-2xl font-serif text-gold-light mb-8">Contact Information</h2>
              
              <ul className="space-y-8 font-sans">
                <li className="flex items-start">
                  <Phone size={24} className="mr-4 text-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">Call Us</h4>
                    <p className="text-cream/80">+91 8058940303</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <Mail size={24} className="mr-4 text-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">Email Us</h4>
                    <p className="text-cream/80">shivvastuworld@gmail.com</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <MapPin size={24} className="mr-4 text-gold shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">Visit Us</h4>
                    <p className="text-cream/80 leading-relaxed">
                      Jodhpur, Rajasthan<br/>
                      India
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Map */}
            <div className="mt-12 relative z-10 w-full h-64 bg-white/10 rounded-lg flex items-center justify-center border border-white/20 overflow-hidden shadow-sm">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.585457261602!2d73.00985437564037!3d26.21857858957532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418b1f9c6bdb45%3A0x67aa4496da757a7e!2svastu%20world!5e1!3m2!1sen!2sin!4v1776251606428!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
