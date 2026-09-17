export const registrationKey = 'nikon-fip-registration-v1';
export const eventDays = [
  {
    slug: '17-septiembre',
    day: 'Jueves',
    date: '17 SEP',
    label: 'Jueves 17 de septiembre',
    cover: '/samples/galeria.jpg',
  },
  {
    slug: '18-septiembre',
    day: 'Viernes',
    date: '18 SEP',
    label: 'Viernes 18 de septiembre',
    cover: '/samples/galeria2.jpg',
  },
  {
    slug: '19-septiembre',
    day: 'Sábado',
    date: '19 SEP',
    label: 'Sábado 19 de septiembre',
    cover: '/samples/galeria3.jpg',
  },
  {
    slug: '20-septiembre',
    day: 'Domingo',
    date: '20 SEP',
    label: 'Domingo 20 de septiembre',
    cover: '/samples/galeria_bw.jpg',
  },
] as const;
export type EventDay = (typeof eventDays)[number]['slug'];
