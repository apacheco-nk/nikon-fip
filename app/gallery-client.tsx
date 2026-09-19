/* oxlint-disable nextjs/no-img-element -- Miniaturas WebP y JPG optimizados generados por el proceso de fotos. */
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Eye, X } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Header, Footer } from '@/components/brand';
import { eventDays, type EventDay } from '@/lib/event';
import { galleries, type GalleryPhoto } from './gallery-data';
import { galleryUrl } from '@/lib/gallery-url';
import { useRegistration } from '@/lib/registration';
export default function Gallery({ day }: { day: EventDay }) {
  const router = useRouter();
  const registration = useRegistration();
  const authorized = registration === 'registered';
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  const [downloadError, setDownloadError] = useState('');
  const photos = galleries[day];
  const label = eventDays.find((item) => item.slug === day)!.label;
  useEffect(() => {
    if (registration === 'unregistered') router.replace('/');
  }, [registration, router]);
  useEffect(() => {
    if (open && api) api.scrollTo(selected, true);
  }, [open, api, selected]);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  async function download(photo: GalleryPhoto) {
    setDownloadError('');
    try {
      const response = await fetch(
        galleryUrl(photo.optimized),
      );
      if (!response.ok) throw new Error();
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download =
        'nikon-fip-' + day + '-' + photo.filename.replace(/\.[^.]+$/, '.jpg');
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setDownloadError(
        'No se pudo descargar la fotografía. Inténtalo nuevamente.',
      );
    }
  }
  if (!authorized)
    return (
      <main className="access-loading">
        <p>Verificando registro…</p>
      </main>
    );
  return (
    <main className="gallery-page">
      <Header back />
      <section className="gallery-intro">
        <p className="eyebrow">Nikon Foto Image · Perú</p>
        <h1>{label}</h1>
        <p>
          Encuentra tu retrato, previsualízalo y descarga la versión que prefieras.
        </p>
        <span>{photos.length + ' fotografías'}</span>
      </section>
      {downloadError && (
        <p className="form-error download-error" role="alert">
          {downloadError}
        </p>
      )}
      <section className="photo-grid" aria-label="Fotografías del evento">
        {photos.map((photo, index) => (
          <article
            className="photo-card"
            key={photo.filename}
            tabIndex={0}
            role="button"
            onClick={(event) => {
              if (event.target instanceof HTMLButtonElement) return;
              setSelected(index);
              setOpen(true);
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                
                setSelected(index);
              }
            }}
            aria-label={'Previsualizar fotografía ' + (index + 1)}
          >
            <img
              src={galleryUrl(photo.thumb)}
              alt={'Fotografía ' + (index + 1) + ' de ' + label}
              loading={index > 7 ? 'lazy' : 'eager'}
            />
            <div className="photo-number">
              {String(index + 1).padStart(3, '0')}
            </div>
            <div className="photo-actions">
              <button
                className="preview-button"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelected(index);
                  setOpen(true);
                }}
                aria-label={'Previsualizar fotografía ' + (index + 1)}
              >
                <Eye size={18} /> <span>Previsualizar</span>
              </button>
              <button
                className="download-trigger"
                onClick={(event) => {
                  event.stopPropagation();
                  download(photo);
                }}
                aria-label={'Descargar fotografía ' + (index + 1)}
              >
                <Download size={18} /> <span>Descargar</span>
              </button>
            </div>
          </article>
        ))}
      </section>
      <Footer />
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Visor de fotografías">
          <button className="lightbox-close" onClick={() => setOpen(false)} aria-label="Cerrar visor">
            <X />
          </button>
          <Carousel setApi={setApi} opts={{ startIndex: selected }} className="lightbox-carousel">
            <CarouselContent>
              {photos.map((photo, index) => (
                <CarouselItem key={photo.filename + '-slide-' + index}>
                  <div className="slide">
                    <img src={galleryUrl(photo.optimized)} alt={'Fotografía ampliada ' + (index + 1)} />
                    <div>
                      <span>{index + 1} / {photos.length}</span>
                      <div className="slide-downloads">
                        <button onClick={() => download(photo)}><Download size={17} /> Descargar</button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="lightbox-prev" />
            <CarouselNext className="lightbox-next" />
          </Carousel>
        </div>
      )}
    </main>
  );
}
