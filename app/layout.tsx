import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Nikon Foto Image Perú · Encuentra tu fotografía',
  description:
    'Encuentra y descarga tu retrato con Nikon en Foto Image. Lima, Perú. Del 17 al 20 de septiembre de 2026.',
  icons: { icon: '/favicon.png' },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-PE">
      <body>{children}</body>
    </html>
  );
}
