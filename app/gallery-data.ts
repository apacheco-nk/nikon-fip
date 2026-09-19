import type { EventDay } from '@/lib/event';
export type GalleryPhoto = { original: string; optimized: string; thumb: string; filename: string; capturedAt?: string };
const day = '17-septiembre';
const photos: GalleryPhoto[] = Array.from({ length: 236 }, (_, index) => {
  const number = index + 1;
  const filename = 'Fotoimage 2026 17.09-' + number + '_resize.JPG';
  const stem = 'fotoimage-2026-17-09-' + number + '_resize';
  return {
    original: '/gallery/' + day + '/full/' + encodeURIComponent(filename),
    optimized: '/gallery/' + day + '/optimized/' + stem + '.jpg',
    thumb: '/gallery/' + day + '/thumbs/' + stem + '.webp',
    filename,
  };
});
export const galleries: Record<EventDay, GalleryPhoto[]> = {
  [day]: photos,
  '18-septiembre': [],
  '19-septiembre': [],
  '20-septiembre': [],
};
import type { EventDay } from '@/lib/event';
export type GalleryPhoto = {
  original: string;
  optimized: string;
  thumb: string;
  filename: string;
  capturedAt?: string;
};
export const galleries: Record<EventDay, GalleryPhoto[]> = {
  '17-septiembre': [],
  '18-septiembre': [],
  '19-septiembre': [],
  '20-septiembre': [],
};
