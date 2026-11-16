import { useServerDocumentContext } from 'expo-router/html';
import type { PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  const { headNodes, bodyNodes, htmlAttributes, bodyAttributes } = useServerDocumentContext();
  return (
    <html lang="sv" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#FAF6EF" />
        <link rel="preload" href="/fonts/cormorant-300.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/great-vibes-400.woff2" as="font" type="font/woff2" crossOrigin="" />
        {/* Enables scroll-reveal styles only when scripts can run. ScrollViewStyleReset is left out on purpose, so the page scrolls naturally on phones. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {headNodes}
      </head>
      <body {...bodyAttributes}>
        {children}
        {bodyNodes}
      </body>
    </html>
  );
}
