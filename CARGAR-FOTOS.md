# Cargar fotografías de Foto Image

1. Copiar los originales en public/gallery/17-septiembre/full (o 18-septiembre, 19-septiembre, 20-septiembre).
2. Ejecutar npm run photos:sync. Se conservan originales intactos, se generan JPG de hasta 2400 px y miniaturas WebP; el catálogo de cada jornada se actualiza en app/gallery-data.ts. Una jornada vacía muestra imágenes de referencia claramente identificadas.
3. Para Supabase, configurar .env.upload.local según .env.upload.example con el proyecto nikon-fip y una clave secreta autorizada. Ejecutar npm run photos:upload -- 17-septiembre, o sin jornada para cargar todas. Se cargan las tres variantes al bucket nikon-fip.
4. Cambiar NEXT_PUBLIC_GALLERY_STORAGE a supabase en el alojamiento y desplegar el catálogo actualizado. Los originales y derivados del evento no se suben a Git. Las muestras están incluidas en public/samples.
5. Verificar una miniatura y ambas descargas antes de anunciar la jornada.

El bucket admite archivos de hasta 50 MB. Archivos mayores necesitan ajustar el límite del bucket antes de cargar. La sincronización regenera el catálogo desde los originales locales: conservar las carpetas de todas las jornadas.
