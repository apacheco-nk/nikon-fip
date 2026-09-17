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
