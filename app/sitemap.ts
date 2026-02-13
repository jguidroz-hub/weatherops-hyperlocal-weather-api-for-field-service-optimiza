import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://weatherops-hyperlocal-weather-api-for-field-service-optimiza.vercel.app', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://weatherops-hyperlocal-weather-api-for-field-service-optimiza.vercel.app/pricing', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
