/* oxlint-disable nextjs/no-img-element -- Logos SVG locales sin transformación. */
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export function Header({ back = false }: { back?: boolean }) {
  return (
    <header className="site-header">
      <Link href="/" aria-label="Nikon Foto Image, inicio">
        <img className="nikon-logo" src="/brand/nikon.svg" alt="Nikon" />
      </Link>
      {back ? (
        <Link href="/#galerias" className="back-link">
          <ArrowLeft size={18} /> Volver al inicio
        </Link>
      ) : (
        <span className="event-mark">
          FOTO IMAGE <span>PERÚ · 2026</span>
        </span>
      )}
    </header>
  );
}
export function Footer() {
  return (
    <footer>
      <img src="/brand/nikon.svg" alt="Nikon" />
      <span>© 2026 Nikon Perú · Foto Image</span>
    </footer>
  );
}
