import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://weatherops-hyperlocal-weather-api-for-field-service-optimiza.vercel.app/sitemap.xml',
  };
}
