/* oxlint-disable nextjs/no-img-element -- Miniaturas WebP y JPG optimizados generados por el proceso de fotos. */
'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Download, Eye, X } from 'lucide-react';
import { Header, Footer } from '@/components/brand';
import { eventDays, type EventDay } from '@/lib/event';
import { galleries, type GalleryPhoto } from './gallery-data';
import { galleryUrl } from '@/lib/gallery-url';
import { useRegistration } from '@/lib/registration';
export default function Gallery({ day }: { day: EventDay }) {
  const router = useRouter();
  const registration = useRegistration();
  const authorized = registration === 'registered';
  const [selected, setSelected] = useState<number | null>(null);
  const [downloadError, setDownloadError] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const photos = galleries[day];
  const label = eventDays.find((item) => item.slug === day)!.label;
  useEffect(() => {
    if (registration === 'unregistered') router.replace('/');
  }, [registration, router]);
  useEffect(() => {
    if (selected === null) return;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selected]);
  function close() {
    dialog.current?.close();
    setSelected(null);
    lastTrigger.current?.focus();
  }
  async function download(photo: GalleryPhoto, original = false) {
    setDownloadError('');
    try {
      const response = await fetch(
        galleryUrl(original ? photo.original : photo.optimized),
      );
      if (!response.ok) throw new Error();
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = original
        ? photo.filename
        : 'nikon-fip-' + day + '-' + photo.filename.replace(/\.[^.]+$/, '.jpg');
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
          <article className="photo-card" key={photo.filename}>
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
                  lastTrigger.current = event.currentTarget;
                  setSelected(index);
                }}
                aria-label={'Previsualizar fotografía ' + (index + 1)}
              >
                <Eye size={18} /> <span>Previsualizar</span>
              </button>
              <button
                className="download-trigger"
                onClick={() => download(photo)}
                aria-label={'Descargar fotografía ' + (index + 1)}
              >
                <Download size={18} /> <span>Descargar</span>
              </button>
            </div>
          </article>
        ))}
      </section>
      <Footer />
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Visor de fotografías"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            setSelected((current) => Math.max(0, (current ?? 0) - 1));
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            setSelected((current) =>
              Math.min(photos.length - 1, (current ?? 0) + 1),
            );
          }
        }}
      >
        {selected !== null && (
          <>
            <button
              className="lightbox-close"
              onClick={close}
              aria-label="Cerrar visor"
              autoFocus
            >
              <X />
            </button>
            <div className="viewer-heading">
              {label}
            </div>
            <img
              className="viewer-image"
              src={galleryUrl(photos[selected].optimized)}
              alt={'Fotografía ampliada ' + (selected + 1)}
            />
            <div className="viewer-controls">
              <div className="viewer-navigation">
                <button
                  aria-label="Fotografía anterior"
                  disabled={selected === 0}
                  onClick={() => setSelected(selected - 1)}
                >
                  <ArrowLeft />
                </button>
                <span>
                  {selected + 1} / {photos.length}
                </span>
                <button
                  aria-label="Fotografía siguiente"
                  disabled={selected === photos.length - 1}
                  onClick={() => setSelected(selected + 1)}
                >
                  <ArrowRight />
                </button>
              </div>
              <div className="slide-downloads">
                <button onClick={() => download(photos[selected])}>
                  <Download size={17} /> Descargar en alta
                </button>
              </div>
            </div>
            {downloadError && (
              <p role="alert" className="form-error">
                {downloadError}
              </p>
            )}
          </>
        )}
      </dialog>
    </main>
  );
}
