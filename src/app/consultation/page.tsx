"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Coins, 
  Heart, 
  Briefcase, 
  Users, 
  Sun, 
  TrendingUp, 
  CheckCircle2, 
  Lock, 
  Upload, 
  Clock, 
  User, 
  ShieldCheck,
  LogOut
} from "lucide-react";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "@/app/actions/auth";
import { submitConsultation } from "@/app/actions/consultation";

export default function ConsultationPage() {
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  
  // Auth Form State
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Consultation Form State
  const [propertyType, setPropertyType] = useState("");
  const [question, setQuestion] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"unpaid" | "paying" | "paid">("unpaid");

  useEffect(() => {
    // Check if user is already logged in
    getCurrentUser().then(sessionUser => {
      if (sessionUser) setUser(sessionUser);
    });
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    const formData = new FormData();
    formData.append("email", authEmail);
    formData.append("password", authPassword);

    try {
      if (authMode === "register") {
        formData.append("name", authName);
        const res = await registerUser(formData);
        if (res.error) setAuthError(res.error);
        else if (res.user) setUser(res.user);
      } else {
        const res = await loginUser(formData);
        if (res.error) setAuthError(res.error);
        else if (res.user) setUser(res.user);
      }
    } catch (err) {
      setAuthError("An unexpected error occurred.");
    }
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("propertyType", propertyType);
    formData.append("question", question);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const res = await submitConsultation(formData);
      if (res.error) {
        setSubmitError(res.error);
      } else {
        setSubmitSuccess(true);
        setPropertyType("");
        setQuestion("");
        setSelectedFile(null);
        setPaymentStatus("unpaid");
      }
    } catch (err) {
      setSubmitError("Failed to submit request.");
    }
    setIsSubmitting(false);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center overflow-hidden min-h-[70vh]">
        <div className="absolute inset-0 bg-gradient-to-b from-cream-light to-background -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/10 rounded-full blur-3xl -z-10" />
        
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={fadeIn}
            className="text-5xl md:text-7xl font-serif text-crimson mb-6 tracking-tight"
          >
            What is <span className="text-gold">Vastu Shastra ?</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="text-lg md:text-xl text-crimson-dark/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Vastu Shastra is an ancient Indian architectural science that helps balance the energy of your home or workplace to improve peace, prosperity, health, and success.
          </motion.p>
          
          <motion.div variants={fadeIn}>
            <button 
              onClick={() => document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-crimson text-cream font-serif text-lg px-8 py-4 rounded-md shadow-lg shadow-crimson/20 hover:bg-gold hover:shadow-gold/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Ask Your Question
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/40">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-crimson mb-4">Transform Your Space & Life</h2>
            <p className="text-crimson-dark/70 max-w-2xl mx-auto">Discover how balancing the elemental energies in your environment can unlock new potential.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Coins, title: "Financial Growth", desc: "Attract abundance by removing energy blocks in wealth zones." },
              { icon: Heart, title: "Peace & Harmony", desc: "Create a serene environment that reduces stress and conflict." },
              { icon: Briefcase, title: "Career Success", desc: "Enhance focus and attract better professional opportunities." },
              { icon: Users, title: "Better Relationships", desc: "Foster understanding and love among family members." },
              { icon: Sun, title: "Positive Energy", desc: "Clear negativity and invite vibrant, life-affirming energy." },
              { icon: TrendingUp, title: "Business Growth", desc: "Optimize your commercial space for maximum profitability." },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
                }}
                className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-14 h-14 bg-gold-light/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <benefit.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="text-xl font-serif text-crimson mb-3">{benefit.title}</h3>
                <p className="text-crimson-dark/70 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-crimson mb-4">How It Works</h2>
            <p className="text-crimson-dark/70 max-w-2xl mx-auto">Your journey to a balanced and harmonious space in four simple steps.</p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gold-light/30 -translate-x-1/2" />
            
            <div className="space-y-12">
              {[
                { step: "01", title: "Register / Login", desc: "Create your secure account to keep your consultations private and track progress." },
                { step: "02", title: "Submit Your Question and Make Payment", desc: "Share details about your property, specific concerns, and optionally upload photos." },
                { step: "03", title: "Expert Reviews Your Issue", desc: "Our Vastu specialists deeply analyze your floor plan and specific challenges." },
                { step: "04", title: "Receive Personalized Guidance", desc: "Get practical, actionable remedies to balance your space's energy within 24-48 hours." },
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`md:w-1/2 flex ${index % 2 !== 0 ? 'md:justify-start' : 'md:justify-end'} w-full`}>
                    <div className="glass-card p-6 w-full max-w-md bg-white/60 relative overflow-hidden">
                      <span className="text-gold font-serif text-7xl opacity-10 absolute -top-4 -right-2 pointer-events-none select-none">{item.step}</span>
                      <h3 className="text-xl font-serif text-crimson mb-2 relative z-10">{item.title}</h3>
                      <p className="text-crimson-dark/70 relative z-10">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex relative z-10 w-12 h-12 bg-cream border-4 border-gold-light rounded-full items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-5 h-5 text-gold" />
                  </div>
                  <div className="md:w-1/2 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4 & 5. Question Submission Form & Authentication */}
      <section id="consultation-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-crimson-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--color-gold) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gold/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-cream mb-4">Request a Consultation</h2>
            <p className="text-cream/70">Fill out the form below to receive expert Vastu guidance.</p>
          </div>

          <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[500px]">
            
            {/* Authentication Layer */}
            {!user ? (
              <div className="absolute inset-0 z-20 bg-cream/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gold/20">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-crimson/10 rounded-full flex items-center justify-center">
                      <Lock className="w-8 h-8 text-crimson" />
                    </div>
                  </div>
                  
                  <div className="flex border-b border-gray-200 mb-6">
                    <button 
                      onClick={() => {setAuthMode("login"); setAuthError("");}}
                      className={`flex-1 py-3 font-serif text-lg border-b-2 transition-colors ${authMode === "login" ? "border-crimson text-crimson font-bold" : "border-transparent text-gray-500 hover:text-crimson-light"}`}
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => {setAuthMode("register"); setAuthError("");}}
                      className={`flex-1 py-3 font-serif text-lg border-b-2 transition-colors ${authMode === "register" ? "border-crimson text-crimson font-bold" : "border-transparent text-gray-500 hover:text-crimson-light"}`}
                    >
                      Register
                    </button>
                  </div>

                  {authError && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm text-center border border-red-200">
                      {authError}
                    </div>
                  )}

                  <form onSubmit={handleAuth} className="space-y-4">
                    {authMode === "register" && (
                      <div>
                        <label className="block text-sm font-medium text-crimson-dark mb-1">Full Name</label>
                        <input 
                          type="text" 
                          required
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-gray-50" 
                          placeholder="John Doe" 
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-crimson-dark mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-gray-50" 
                        placeholder="john@example.com" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-crimson-dark mb-1">Password</label>
                      <input 
                        type="password" 
                        required
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold bg-gray-50" 
                        placeholder="••••••••" 
                      />
                    </div>
                    <button 
                      type="submit" 
                      disabled={authLoading}
                      className="w-full mt-4 bg-crimson text-white font-serif text-lg px-6 py-3 rounded-md shadow-lg hover:bg-crimson-light transition-all disabled:opacity-70"
                    >
                      {authLoading ? "Please wait..." : (authMode === "login" ? "Secure Login" : "Create Account")}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              // Logged In State & Form
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold-light/20 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 leading-none mb-1">Logged in as</p>
                      <p className="font-medium text-crimson-dark leading-none">{user.name}</p>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-crimson transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>

                {submitSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-serif text-crimson mb-4">Request Submitted Successfully!</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-8">
                      Our Vastu experts will review your details and get back to you with personalized guidance within 24-48 hours.
                    </p>
                    <button 
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-gold text-white font-serif px-8 py-3 rounded-md hover:bg-[#a67c52] transition-colors"
                    >
                      Ask Another Question
                    </button>
                  </div>
                ) : paymentStatus !== "paid" ? (
                  <div className="text-center py-8">
                    <h3 className="text-2xl font-serif text-crimson mb-2">Complete Payment</h3>
                    <p className="text-gray-600 mb-6">A consultation fee of <strong className="text-gold-dark text-lg">₹101</strong> is required to submit your Vastu question.</p>
                    
                    <div className="bg-white border-2 border-gold/30 p-6 rounded-2xl inline-block shadow-lg mb-8 relative">
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cream border border-gold/30 px-4 py-1 rounded-full text-xs font-bold text-gold-dark shadow-sm">Scan to Pay</div>
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi%3A%2F%2Fpay%3Fpa%3Dshivvastuworld%40upi%26pn%3DShiv%2BVastu%2BWorld%26am%3D101%26cu%3DINR&color=4a1c1c" 
                        alt="UPI QR Code"
                        className="w-48 h-48 mx-auto"
                      />
                      <p className="mt-4 font-sans font-medium text-sm text-gray-500">Pay via GPay, PhonePe, or Paytm</p>
                    </div>

                    <div>
                      <button 
                        onClick={() => {
                          setPaymentStatus("paying");
                          setTimeout(() => setPaymentStatus("paid"), 1500);
                        }}
                        disabled={paymentStatus === "paying"}
                        className="bg-crimson text-white font-serif text-lg px-10 py-3 rounded-md shadow-md hover:bg-crimson-light transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {paymentStatus === "paying" ? "Verifying Payment..." : "I have paid ₹101"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleConsultationSubmit}>
                    {submitError && (
                      <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
                        {submitError}
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-crimson-dark mb-2">Type of Property</label>
                      <select 
                        required
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all text-gray-700 bg-gray-50/50"
                      >
                        <option value="">Select Property Type</option>
                        <option value="residential">Residential (House/Apartment)</option>
                        <option value="commercial">Commercial (Office/Shop)</option>
                        <option value="industrial">Industrial (Factory)</option>
                        <option value="land">Plot / Land</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-crimson-dark mb-2">Your Question / Concern</label>
                      <textarea 
                        required
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        rows={5} 
                        className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all resize-none bg-gray-50/50" 
                        placeholder="Describe the issues you are facing (e.g., financial stress, health issues) or specific questions about your floor plan..."
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-crimson-dark mb-2">Upload House/Room Image or Floor Plan (Optional)</label>
                      <label htmlFor="file-upload" className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gold/5 hover:border-gold/50 transition-colors cursor-pointer group">
                        <Upload className="w-10 h-10 mx-auto text-gray-400 group-hover:text-gold mb-3 transition-colors" />
                        <p className="text-sm font-medium text-gray-700">
                          {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                        <input 
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setSelectedFile(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      <p className="text-xs text-gray-500 max-w-xs">By submitting, you agree to our privacy policy and terms of consultation.</p>
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-gold text-white font-serif text-lg px-10 py-3 rounded-md shadow-md hover:bg-[#a67c52] transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap disabled:opacity-70 disabled:hover:-translate-y-0"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Question"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Trust Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-cream-light relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, text: "100% Private & Confidential" },
              { icon: User, text: "Personalized Expert Guidance" },
              { icon: CheckCircle2, text: "Trusted by 10,000+ Clients" },
              { icon: Clock, text: "Response within 24–48 Hours" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-4 group">
                <div className="w-16 h-16 bg-cream-light rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-300">
                  <item.icon className="w-7 h-7 text-crimson group-hover:text-gold transition-colors" />
                </div>
                <h4 className="font-medium text-crimson-dark text-lg">{item.text}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream-light to-background text-center relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-64 h-64 border-[1px] border-gold/20 rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 border-[1px] border-gold/20 rounded-full" />
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-3xl mx-auto relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-crimson mb-6">Still Confused About Your Space Energy?</h2>
          <p className="text-lg text-crimson-dark/80 mb-10">Our experts are here to help you unlock peace, prosperity, and harmony in your life.</p>
          <button onClick={() => document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth' })} className="bg-crimson text-cream font-serif text-lg px-10 py-4 rounded-md shadow-xl hover:bg-gold transition-all duration-300 transform hover:-translate-y-1">
            Consult Now
          </button>
        </motion.div>
      </section>

    </div>
  );
}
