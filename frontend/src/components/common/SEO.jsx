import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, keywords, image, url }) {
  const siteTitle = title ? `${title} | Sugandhika` : "Sugandhika | Premium Natural Mosquito Repellents 🌿";
  const siteDesc = description || "Protect your home naturally with Sugandhika natural mosquito repellents made with citronella, neem, lemongrass, and eucalyptus.";
  const siteKeywords = keywords || "mosquito repellent, natural, herbal, citronella, organic, safe for kids";

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDesc} />
      <meta name="keywords" content={siteKeywords} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="website" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDesc} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
