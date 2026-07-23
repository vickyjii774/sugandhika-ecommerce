import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import { motion } from "framer-motion";

export default function About() {
  const values = [
    { title: "Pure Botanicals", desc: "No charcoal, no chemical fillers, no DEET. Only steam-distilled essential oils and ancient Ayurvedic herbs." },
    { title: "Empowering Nepal", desc: "Our products are hand-rolled and packed by local women-led co-operatives in rural Nepal, promoting fair wage jobs." },
    { title: "Eco-Conscious Packaging", desc: "Biodegradable materials, recycled glass containers, and plastic-free packaging to protect the earth." }
  ];

  const timeline = [
    { year: "2023", title: "The Discovery", desc: "Frustrated by choking chemical coils, we began blending Ayurvedic herbs to find natural mosquito repellent alternatives." },
    { year: "2024", title: "Hand-Crafted Beginnings", desc: "Partnered with local farmers in Pokhara to source wild citronella and lemongrass, launching our first incense sticks." },
    { year: "2025", title: "National Recognition", desc: "Sugandhika products reached over 5,000 households in Nepal, securing safety certifications for infants and pets." }
  ];

  return (
    <>
      <SEO title="About Our Story" description="Discover the story behind Sugandhika's organic mosquito repellents. Read about our Ayurvedic ingredients, environmental values, and mission to protect Nepalese households." />
      
      {/* Editorial Hero */}
      <section className="bg-gradient-to-b from-sage-100 to-beige-50 dark:from-forest-950 dark:to-forest-900 py-20 px-6 transition-colors duration-300">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs uppercase tracking-widest font-bold text-forest-600 dark:text-sage-200">Our Story</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-forest-900 dark:text-white mt-4 mb-6 leading-tight">
              Honoring Ancient Ayurveda. <br />
              Protecting Modern Homes.
            </h1>
            <p className="text-lg text-gray-600 dark:text-sage-100 leading-relaxed font-serif italic">
              "We believe that mosquito defense shouldn't require compromising the air we breathe at home."
            </p>
          </div>
        </Container>
      </section>

      {/* Brand Narrative */}
      <section className="py-20 px-6 bg-white dark:bg-forest-950 transition-colors duration-300">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Roots</h2>
              <div className="space-y-4 text-gray-600 dark:text-sage-100 leading-relaxed text-sm md:text-base">
                <p>
                  Sugandhika was founded on a simple realization: the tools we use to repel pests inside our living spaces shouldn't be hazardous to our health. Most traditional coils and sprays utilize synthetic chemicals that pollute indoor air quality.
                </p>
                <p>
                  Drawing inspiration from ancient Himalayan Ayurvedic practices, we set out to craft slow-burning incense sticks, personal sprays, and diffuse extracts using steam-distilled essential oils of citronella, eucalyptus, neem, and lemongrass.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
                alt="Ayurvedic herbs preparation"
                className="rounded-3xl shadow-lg h-[350px] w-full object-cover border border-gray-100 dark:border-forest-900"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-20 px-6 bg-beige-50 dark:bg-forest-900 transition-colors duration-300">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-forest-950 p-8 rounded-3xl border border-gray-100 dark:border-forest-850 shadow-sm">
              <span className="text-3xl">🎯</span>
              <h3 className="font-heading text-2xl font-bold text-gray-800 dark:text-white mt-4 mb-3">Our Mission</h3>
              <p className="text-sm text-gray-500 dark:text-sage-200 leading-relaxed">
                To replace hazardous chemical repellents with premium, non-toxic, Ayurvedic botanicals that protect families safely and restore clean indoor air quality.
              </p>
            </div>
            <div className="bg-white dark:bg-forest-950 p-8 rounded-3xl border border-gray-100 dark:border-forest-850 shadow-sm">
              <span className="text-3xl">👁️</span>
              <h3 className="font-heading text-2xl font-bold text-gray-800 dark:text-white mt-4 mb-3">Our Vision</h3>
              <p className="text-sm text-gray-500 dark:text-sage-200 leading-relaxed">
                To establish Sugandhika as Nepal's leading herbal wellness brand, building a sustainable network of local organic farming and women-led rural co-operatives.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 bg-white dark:bg-forest-950 transition-colors duration-300">
        <Container>
          <h2 className="font-heading text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Our Core Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((v, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-beige-200 dark:border-forest-850 bg-beige-50/50 dark:bg-forest-900/40 text-center">
                <h3 className="font-heading text-xl font-bold text-forest-800 dark:text-sage-100 mb-3">{v.title}</h3>
                <p className="text-sm text-gray-500 dark:text-sage-200 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-beige-50 dark:bg-forest-900 transition-colors duration-300">
        <Container>
          <h2 className="font-heading text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">Our Journey</h2>
          <div className="relative border-l border-forest-200 dark:border-forest-800 max-w-xl mx-auto space-y-8">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative pl-8">
                {/* dot indicator */}
                <div className="absolute left-0 top-1.5 -translate-x-1/2 h-4.5 w-4.5 rounded-full bg-forest-600 border-4 border-beige-50 dark:border-forest-900" />
                <span className="font-heading text-lg font-bold text-gold-600 block">{item.year}</span>
                <h3 className="font-heading text-xl font-bold text-gray-800 dark:text-white mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-sage-200 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}