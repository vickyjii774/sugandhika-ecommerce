import { useState } from "react";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Thank you! Your message has been sent to our customer care team. 🌿");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <SEO title="Contact Us" description="Reach out to Sugandhika customer support. Get address, phone number, business hours, or send an inquiry directly through our message form." />
      <div className="bg-beige-50 dark:bg-forest-950 py-16 transition-colors duration-300">
        <Container>
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-forest-600 dark:text-sage-200">Get in Touch</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-forest-900 dark:text-white mt-4 mb-4">
              We are Here to Help
            </h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-sage-100">
              For wholesale inquiries, retail custom orders, or product support, reach out and our wellness consultants will respond shortly.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 max-w-6xl mx-auto">
            
            {/* Contact Details Column (Lg: col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card Container */}
              <div className="bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-8 shadow-sm space-y-6">
                <h2 className="font-heading text-2xl font-bold text-gray-800 dark:text-white mb-4">Contact Info</h2>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-forest-50 dark:bg-forest-800 text-forest-750 dark:text-sage-200">
                    <FiMapPin className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-400">Head Office</h3>
                    <p className="text-gray-700 dark:text-sage-100 font-medium mt-1">Lazimpat Road, Ward 2, Kathmandu, Nepal</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-forest-50 dark:bg-forest-800 text-forest-750 dark:text-sage-200">
                    <FiPhone className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-400">Phone Support</h3>
                    <p className="text-gray-700 dark:text-sage-100 font-medium mt-1">+977 1-4412345, +977 9801234567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-forest-50 dark:bg-forest-800 text-forest-750 dark:text-sage-200">
                    <FiMail className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-400">Email Address</h3>
                    <p className="text-gray-700 dark:text-sage-100 font-medium mt-1">care@sugandhika.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-gray-100 dark:border-forest-800 pt-6">
                  <div className="p-3 rounded-xl bg-forest-50 dark:bg-forest-800 text-forest-750 dark:text-sage-200">
                    <FiClock className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-gray-400">Support Hours</h3>
                    <p className="text-gray-700 dark:text-sage-100 font-medium mt-1">Sun – Fri: 9:00 AM – 6:00 PM</p>
                    <p className="text-xs text-gray-400 mt-0.5">Closed on Saturday and public holidays</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="overflow-hidden rounded-3xl border border-gray-200 dark:border-forest-800 shadow-sm h-64 bg-gray-100 dark:bg-forest-900 relative">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-3xl mb-2">🗺️</span>
                  <span className="font-bold text-gray-700 dark:text-white">Lazimpat, Kathmandu</span>
                  <span className="text-xs text-gray-400 mt-1">Interactive map placeholder for build deploy</span>
                </div>
              </div>

            </div>

            {/* Inquiry Form Column (Lg: col-span-7) */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-8 md:p-10 shadow-sm">
                <h2 className="font-heading text-2xl font-bold text-gray-800 dark:text-white mb-6">Send an Inquiry</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">Your Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">Your Email <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">Subject</label>
                    <input
                      type="text"
                      placeholder="Wholesale request, custom order..."
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gray-500 uppercase">Message <span className="text-red-500">*</span></label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Write your query here..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-forest-700 hover:bg-forest-800 text-white font-semibold py-4 transition duration-300 disabled:opacity-50 dark:bg-forest-600 dark:hover:bg-forest-700 shadow-md shadow-forest-800/10 cursor-pointer"
                  >
                    {loading ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        Send Inquiry <FiSend />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </Container>
      </div>
    </>
  );
}