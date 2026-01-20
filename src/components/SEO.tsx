import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  path?: string;
}

function SEO({ title, description, keywords, ogImage, path = '' }: SEOProps) {
  const baseUrl = 'https://tonychou-tech.github.io/tony';
  const fullUrl = `${baseUrl}${path}`;
  const defaultImage = `${baseUrl}/logo.png`;
  const image = ogImage || defaultImage;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
}

export default SEO;
