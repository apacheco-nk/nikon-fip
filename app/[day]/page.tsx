import { notFound } from 'next/navigation';
import Gallery from '../gallery-client';
import { eventDays } from '@/lib/event';
import { galleries } from '../gallery-data';
export function generateStaticParams() {
  return eventDays.map((day) => ({ day: day.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  const eventDay = eventDays.find((item) => item.slug === day);
  return { title: (eventDay?.label || 'Galería') + ' · Nikon Foto Image Perú' };
}
export default async function Page({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  const eventDay = eventDays.find((item) => item.slug === day);
  if (!eventDay || galleries[eventDay.slug].length === 0) notFound();
  return <Gallery day={eventDay.slug} />;
}
