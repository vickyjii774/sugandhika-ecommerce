import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../components/ui/Container";
import SEO from "../components/common/SEO";
import { FiCalendar, FiUser, FiArrowLeft, FiMessageSquare } from "react-icons/fi";
import toast from "react-hot-toast";

const blogsMock = {
  "deet-free-repellents-guide": {
    title: "The Ultimate Guide to DEET-Free Mosquito Repellents",
    date: "July 20, 2026",
    author: "Dr. Anjali R.",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    content: `
      Mosquito defense inside our home is vital to protect against vectors like dengue and malaria. However, many household repellents utilize active chemicals like DEET (N,N-Diethyl-meta-toluamide). While effective, research indicates that prolonged exposure to high DEET concentrations can cause skin irritation, dizziness, and respiratory concerns, particularly in infants.
      
      Thankfully, nature offers potent botanical alternatives. Essential oils derived from plants such as Citronella (Cymbopogon nardus), Lemongrass, Eucalyptus, and Neem contain natural terpene compounds that mask human lactic odors, making us virtually invisible to mosquitoes.
      
      At Sugandhika, we steam-distill these oils and infuse them into our slow-burning sticks and skin-safe room sprays. They release a pleasant herbal aroma that clears flying bugs while keeping your indoor air safe, clean, and chemical-free.
    `
  },
  "charcoal-free-incense-benefits": {
    title: "Why Charcoal-Free Incense is Essential for Infant Health",
    date: "July 15, 2026",
    author: "Prasanna K.",
    category: "Baby Safety",
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&q=80&w=800",
    content: `
      Standard coils and mosquito repellents often rely on coal dust, charcoal, and chemical binders to keep burning. When ignited, they emit thick, black smoke containing fine particulate matter (PM2.5), formaldehyde, and carbon monoxide. Inhaling this smoke in closed rooms is equivalent to smoking multiple cigarettes, causing chronic breathing issues.
      
      For babies and infants, whose respiratory systems are still developing, this heavy smoke is particularly harmful. 
      
      Sugandhika's natural incense sticks are crafted with natural wood powder and tree gum resin binders (no charcoal). They burn with a light, non-suffocating white smoke that diffuses purely botanical active ingredients. You get all the mosquito defense without the toxic soot.
    `
  },
  "5-ayurvedic-herbs-for-protection": {
    title: "5 Himalayan Herbs That Repel Mosquitoes Instantly",
    date: "July 08, 2026",
    author: "Sujata Shrestha",
    category: "Herbs Guide",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800",
    content: `
      Himalayan regions are rich in aromatic plants that have been utilized in Ayurvedic practice for thousands of years to purify the air and deter insects. Here are five of the most potent:
      
      1. Citronella: The classic citrus defense. Its strong scent disorients insect search patterns.
      2. Neem (Azadirachta indica): Famous for its antibacterial and insecticidal active principles (azadirachtin).
      3. Eucalyptus: Steam-distilled oil acts as a powerful vapor shield.
      4. Lemongrass: Fresh, crisp fragrance that deters mosquitoes while lifting mental mood.
      5. camphor wood: Traditionally burned in households to purify air and keep flies away.
    `
  }
};

export default function BlogDetails() {
  const { slug } = useParams();
  const blog = blogsMock[slug];

  const [comments, setComments] = useState([
    { name: "Siddharth B.", date: "July 21, 2026", text: "This guide was eye-opening! Switched to Sugandhika sticks last week and the difference in smoke quality is incredible." }
  ]);
  const [newComment, setNewComment] = useState({ name: "", text: "" });

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.text.trim()) {
      toast.error("Please fill in comment fields.");
      return;
    }
    const comment = {
      name: newComment.name,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      text: newComment.text
    };
    setComments([comment, ...comments]);
    setNewComment({ name: "", text: "" });
    toast.success("Comment added successfully! 💬");
  };

  if (!blog) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold">Article Not Found</h1>
          <Link to="/blog" className="mt-4 inline-block text-forest-700 hover:underline">
            Back to Articles
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <>
      <SEO title={blog.title} />
      <div className="bg-beige-50 dark:bg-forest-950 py-16 transition-colors duration-300">
        <Container>
          <div className="max-w-3xl mx-auto">
            
            {/* Back Button */}
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-forest-750 transition mb-8">
              <FiArrowLeft /> Back to Articles
            </Link>

            {/* Main Article Card */}
            <article className="bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl overflow-hidden shadow-sm p-6 md:p-10">
              
              {/* Image banner */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 bg-gray-50">
                <img src={blog.image} alt={blog.title} className="h-full w-full object-cover" />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-forest-850 select-none">
                <span className="flex items-center gap-1"><FiCalendar /> {blog.date}</span>
                <span className="flex items-center gap-1"><FiUser /> {blog.author}</span>
                <span className="bg-forest-100 text-forest-800 dark:bg-forest-850 dark:text-sage-100 px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ml-auto">
                  {blog.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Paragraph content */}
              <div className="text-gray-600 dark:text-sage-100 leading-relaxed text-base space-y-6 font-serif">
                {blog.content.split("\n\n").map((para, idx) => (
                  <p key={idx}>{para.trim()}</p>
                ))}
              </div>

            </article>

            {/* Comments Board */}
            <div className="bg-white dark:bg-forest-900 border border-gray-150 dark:border-forest-800 rounded-3xl p-6 md:p-10 mt-8 shadow-sm">
              <h3 className="font-heading text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-6 border-b border-gray-100 dark:border-forest-850 pb-3">
                <FiMessageSquare />
                <span>Comments ({comments.length})</span>
              </h3>

              {/* Add Comment */}
              <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                      className="rounded-xl border border-gray-250 px-4 py-2.5 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <textarea
                    required
                    rows={3}
                    placeholder="Write a comment..."
                    value={newComment.text}
                    onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                    className="rounded-xl border border-gray-250 px-4 py-2.5 text-sm focus:border-forest-500 focus:outline-none dark:bg-forest-950 dark:border-forest-800 dark:text-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-forest-750 hover:bg-forest-800 text-white font-semibold text-xs px-6 py-2.5 transition duration-300 dark:bg-forest-600 dark:hover:bg-forest-700 cursor-pointer"
                >
                  Post Comment
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((c, idx) => (
                  <div key={idx} className="border-b border-gray-100 dark:border-forest-850 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-baseline mb-2">
                      <span className="font-bold text-sm text-gray-800 dark:text-white">{c.name}</span>
                      <span className="text-[10px] text-gray-400">{c.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-sage-100 leading-relaxed font-sans">{c.text}</p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </Container>
      </div>
    </>
  );
}
