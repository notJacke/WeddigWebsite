import { mapsEmbedUrl } from '@/lib/maps';

export const canEmbedMap = true;

export function MapEmbed({ query, title }: { query: string; title: string }) {
  return (
    <iframe
      src={mapsEmbedUrl(query)}
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      style={{ border: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}
