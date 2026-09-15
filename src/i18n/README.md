# Traducciones

Cada idioma tiene un JSON compartido (`common.json`) y un JSON por página:

- `home.json`: inicio y formulario.
- `about.json`: nosotros.
- `services.json`: servicios y soluciones.
- `contact.json`: contacto y sedes.

Los archivos de `locales/en/` son copias iniciales del contenido español. Para completar la versión inglesa, editá únicamente sus valores de texto y conservá la estructura y las claves.

No cambies los campos `id`, porque conectan los contenidos con imágenes y enlaces internos. Conservá también `\n` cuando quieras mantener un salto de línea y el marcador `{{name}}` de `emailSubject`, que se reemplaza con el nombre enviado en el formulario.

## Detección del navegador

En la primera visita a `/`, un script estático revisa el idioma preferido del navegador. Si el idioma compatible de mayor prioridad es inglés, redirige a `/en/`; si es español o no se reconoce, mantiene `/`. Las rutas interiores no se redirigen automáticamente.

Cuando la persona elige un idioma desde el menú, esa preferencia se guarda en `localStorage` con la clave `pronave-locale` y tiene prioridad en las visitas siguientes.
