const encode = encodeURIComponent;

export const mapsOpenUrl = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encode(query)}`;
export const mapsDirectionsUrl = (query: string) => `https://www.google.com/maps/dir/?api=1&destination=${encode(query)}`;
export const mapsEmbedUrl = (query: string) => `https://www.google.com/maps?q=${encode(query)}&output=embed`;
