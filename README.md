# Sitio web Estudio Meraki

Landing page bilingüe (español/inglés) diseñada para centralizar los servicios legales y contables del Estudio Meraki. El proyecto prioriza la presentación institucional del equipo, detalla las áreas de práctica, incorpora testimonios reales y ofrece múltiples vías de contacto —incluido un asistente virtual con respuestas guiadas.

## Contenidos principales
- **Hero con métricas clave**: comunica la propuesta de valor, muestra resultados destacados y ofrece accesos directos a los servicios y a la reserva de reuniones.
- **Sobre el estudio**: describe el enfoque interdisciplinario y los pilares de trabajo.
- **Equipo profesional**: tarjetas individuales para abogadas/os y contador, con biografías, áreas de expertise y CTA personalizadas hacia WhatsApp.
- **Servicios legales y contables**: acordeones separados por especialidad para explorar tareas frecuentes (familia, laboral, societario, impuestos, etc.).
- **Metodología Meraki**: proceso en cuatro etapas para transparentar la forma de trabajo.
- **Testimonios**: citas de clientes empresariales y particulares que refuerzan la credibilidad.
- **CTA intermedia**: invitación a agendar una videollamada introductoria.
- **Asistente virtual**: widget que responde preguntas frecuentes y comparte datos de contacto.
- **Sección de contacto**: datos actualizados (teléfono, email, oficinas, horarios), formulario conectado a FormSubmit y mapas embebidos de las dos sedes.

## Funcionalidades destacadas
- **Internacionalización**: botón para alternar entre español e inglés que reemplaza textos, atributos accesibles y contenidos dinámicos desde `app.js`.
- **Accesibilidad**: navegación semántica, etiquetas ARIA, elementos visually-hidden y control de foco para mejorar la experiencia inclusiva.
- **Asistente conversacional**: sugerencias rápidas, mensajes predefinidos según la consulta y almacenamiento mínimo de estado en el front-end.
- **Formulario conectado**: envíos gestionados por [FormSubmit](https://formsubmit.co/) con mensajes de estado en pantalla.
- **Integración multimedia**: video de encabezado en loop, imágenes optimizadas del equipo, íconos emoji y mapas de Google embebidos.

## Estructura del proyecto
```
├── index.html      # Marcado principal del sitio
├── styles.css      # Estilos base, layout responsive y personalización de componentes
├── app.js          # Lógica de internacionalización, asistente virtual y formularios
└── assets/         # Logotipo, fotografías, video promocional y otros recursos multimedia
```

## Requisitos y uso local
1. Cloná este repositorio o descargá los archivos.
2. Abrí `index.html` en tu navegador preferido.
3. Para experimentar con el cambio de idioma o el chatbot no se necesitan dependencias adicionales.

> 💡 Si deseás utilizar un servidor local para hot reload, podés apoyarte en utilidades como `live-server`, `http-server` o la extensión “Live Preview” del editor de tu preferencia.

## Personalización
- **Identidad visual**: reemplazá `assets/LogoMeraki.png` y actualizá los colores desde las variables CSS en `:root`.
- **Contenido institucional**: editá titulares y descripciones directamente en `index.html` o en los objetos de traducción de `app.js` (secciones `es` e `en`).
- **Chatbot**: ajustá preguntas sugeridas, respuestas o palabras clave modificando el bloque `chatbotSuggestions` y las llaves `chatbot.responses` dentro de `app.js`.
- **Formulario**: cambia el destino de los envíos actualizando el atributo `action` del formulario (`#contact-form`).
- **Métricas y testimonios**: reemplazá los valores en `index.html` para reflejar casos reales del estudio.

## Créditos y recursos
- **Diseño y desarrollo**: Equipo Estudio Meraki.
- **Fotografías del staff**: provistas por Estudio Meraki.
- **Tipografías**: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) y [Work Sans](https://fonts.google.com/specimen/Work+Sans) vía Google Fonts.
- **Integraciones externas**: [FormSubmit](https://formsubmit.co/) para el formulario de consultas y Google Maps para los iframes de ubicación.

## Licencia
El contenido se entrega para uso interno del Estudio Meraki. Podés adaptarlo a proyectos derivados respetando la autoría y fuentes citadas.
