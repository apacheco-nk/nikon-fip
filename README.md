# Nikon Foto Image Perú

Adaptación independiente de Nikon Magia. Fondo blanco en portada, formulario, galerías y visor. Fechas tomadas de Info.txt: 17 al 20 de septiembre de 2026, Lima.

## Desarrollo

Node 22.13 o superior. Ejecutar npm ci y npm run dev. Para producción: npm run build y npm start.

## Supabase

Copiar .env.example a .env.local y configurar exclusivamente la URL y la clave publicable del proyecto nikon-fip. No utilizar la conexión de Nikon Magia. Aplicar el SQL de supabase/migrations en el proyecto correcto. Los contactos permiten inserción anónima con consentimiento; la lectura, actualización y eliminación públicas están revocadas. La clave secreta de carga de fotos solo va en .env.upload.local, nunca en el navegador ni Git.

La conexión de Supabase disponible durante la implementación no mostraba nikon-fip: configuración y prueba de persistencia pendientes.

## Jornadas y fotografías

Rutas: /17-septiembre, /18-septiembre, /19-septiembre y /20-septiembre. Las imágenes entregadas se usan como portadas y muestras identificadas. Los contadores no las presentan como fotos reales del evento. Consultar CARGAR-FOTOS.md.

El registro habilita la navegación mediante un indicador local específico del evento, igual al flujo de Magia, sin almacenar los datos personales en el navegador. No es autenticación privada: las imágenes son públicas.

## Publicación

Repositorio: https://github.com/apacheco-nk/nikon-fip
Configurar las variables de .env.example en el alojamiento antes de publicar. No hay conexión heredada con el despliegue de Nikon Magia.
