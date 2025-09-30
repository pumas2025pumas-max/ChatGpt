const yearElement = document.getElementById("year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSuggestionButtons = document.querySelectorAll(
  ".chatbot__suggestions button[data-question]"
);
const languageToggle = document.getElementById("language-toggle");
const contactForm = document.getElementById("contact-form");
const contactFormStatus = document.getElementById("contact-form-status");

const translations = {
  es: {
    "meta.title": "Estudio Meraki · Asesoramiento legal y contable",
    "nav.study": "El estudio",
    "nav.team": "Equipo",
    "nav.services": "Servicios",
    "nav.methodology": "Metodología",
    "nav.testimonials": "Testimonios",
    "nav.contact": "Contacto",
    "nav.label": "Navegación principal",
    "nav.whatsapp": "WhatsApp directo",
    "language.toggle": "EN",
    "language.toggleLabel": "Cambiar a inglés",
    "hero.kicker": "Soluciones legales y contables a medida",
    "hero.title": "Estudio Meraki",
    "hero.lead": "Acompañamos a personas, familias y empresas con una mirada integral. Nos enfocamos en la escucha activa, el análisis preciso y la creación de estrategias que generen confianza a largo plazo.",
    "hero.primaryCta": "Conocé nuestros servicios",
    "hero.secondaryCta": "Reservá una reunión",
    "hero.metric1Value": "+12 años",
    "hero.metric1Label": "De experiencia interdisciplinaria",
    "hero.metric2Value": "96%",
    "hero.metric2Label": "De consultas resueltas en menos de 48 h",
    "hero.metric3Value": "5.0",
    "hero.metric3Label": "Promedio de satisfacción de clientes",
    "about.eyebrow": "Sobre el estudio",
    "about.title": "Un equipo interdisciplinario comprometido con tus proyectos",
    "about.lead": "Somos abogados y contadores que unen experiencia jurídica y contable para acompañarte con un servicio personalizado. Diseñamos soluciones que contemplan la dimensión humana, financiera y legal de cada caso.",
    "about.card1Title": "👥 Acompañamiento cercano",
    "about.card1Body": "Generamos vínculos de confianza a través de reuniones periódicas, seguimiento activo y comunicación clara en cada instancia del proceso.",
    "about.card2Title": "📚 Actualización permanente",
    "about.card2Body": "Participamos en capacitaciones y redes profesionales para ofrecerte respuestas ágiles basadas en la normativa vigente y las mejores prácticas del mercado.",
    "about.card3Title": "🤝 Visión integral",
    "about.card3Body": "Articulamos la mirada legal y contable para anticipar riesgos, optimizar recursos y diseñar estrategias sostenibles para tu vida o negocio.",
    "team.eyebrow": "Equipo profesional",
    "team.title": "Abogados y contadores que combinan visión estratégica y humana",
    "team.lead": "Conocé a quienes lideran cada especialidad. Su experiencia académica y de campo respalda las soluciones integrales que ofrecemos día a día.",
    "team.julieta.alt": "Fotografía de Julieta Elizabeth Cardinali Merani",
    "team.julieta.name": "Julieta Elizabeth Cardinali Merani",
    "team.julieta.role": "Abogada",
    "team.julieta.location": "Ciudad Autónoma y Provincia de Buenos Aires",
    "team.julieta.bio": "Lidera el abordaje integral de asuntos de familia e inmobiliarios, priorizando la escucha activa y las soluciones colaborativas.",
    "team.julieta.highlight1": "<span aria-hidden=\"true\">🎓</span> Abogacía (UADE) con orientación en derecho privado",
    "team.julieta.highlight2": "<span aria-hidden=\"true\">⚖️</span> Especialista en derecho de familia y sucesiones",
    "team.julieta.highlight3": "<span aria-hidden=\"true\">📜</span> Diplomada en derecho inmobiliario registral",
    "team.julieta.tagsLabel": "Áreas principales de Julieta",
    "team.julieta.tag1": "Derecho de familia",
    "team.julieta.tag2": "Sucesiones",
    "team.julieta.tag3": "Derecho inmobiliario",
    "team.viviana.initials": "Iniciales de Viviana Elizabeth Merani",
    "team.viviana.name": "Viviana Elizabeth Merani",
    "team.viviana.role": "Abogada",
    "team.viviana.location": "Ciudad Autónoma y Provincia de Buenos Aires",
    "team.viviana.bio": "Conduce estrategias integrales en derecho civil, comercial y laboral, priorizando la prevención de conflictos mediante acuerdos sostenibles y acompañamiento personalizado.",
    "team.viviana.highlight1": "<span aria-hidden=\"true\">🎓</span> Abogada (UBA) con posgrado en derecho civil y comercial",
    "team.viviana.highlight2": "<span aria-hidden=\"true\">⚖️</span> Mediadora prejudicial matriculada con enfoque en resolución colaborativa",
    "team.viviana.highlight3": "<span aria-hidden=\"true\">🤝</span> Amplia experiencia en asesoramiento a pymes y familias empresarias",
    "team.viviana.tagsLabel": "Áreas principales de Viviana",
    "team.viviana.tag1": "Derecho civil",
    "team.viviana.tag2": "Derecho comercial",
    "team.viviana.tag3": "Mediación",
    "team.alberto.alt": "Fotografía de Alberto Lassa",
    "team.alberto.name": "Alberto Lassa",
    "team.alberto.role": "Contador Público",
    "team.alberto.location": "Ciudad Autónoma y Provincia de Buenos Aires",
    "team.alberto.bio": "Coordina los servicios contables e impositivos del estudio, acompañando a empresas y emprendedores con planificación fiscal, cumplimiento normativo y reportes financieros claros.",
    "team.alberto.highlight1": "<span aria-hidden=\"true\">📊</span> Más de 30 años asesorando en impuestos nacionales y provinciales",
    "team.alberto.highlight2": "<span aria-hidden=\"true\">🏢</span> Experto en armado de estructuras societarias y balances ante IGJ",
    "team.alberto.highlight3": "<span aria-hidden=\"true\">🤝</span> Especialista en liquidación de haberes y convenios colectivos",
    "team.alberto.tagsLabel": "Áreas principales de Alberto",
    "team.alberto.tag1": "Planificación fiscal",
    "team.alberto.tag2": "Sociedades",
    "team.alberto.tag3": "Liquidación de sueldos",
    "team.agustin.alt": "Fotografía de Agustin Lescano",
    "team.agustin.name": "Agustin Lescano",
    "team.agustin.role": "Abogado",
    "team.agustin.location": "Ciudad Autónoma y Provincia de Buenos Aires",
    "team.agustin.bio": "Lidera el asesoramiento laboral del estudio, acompañando a trabajadores y pymes en negociaciones, auditorías y estrategias de prevención de conflictos.",
    "team.agustin.highlight1": "<span aria-hidden=\"true\">🎓</span> Abogado (UBA) con especialización en derecho penal y laboral",
    "team.agustin.highlight2": "<span aria-hidden=\"true\">📑</span> Docente Universitario",
    "team.agustin.highlight3": "<span aria-hidden=\"true\">⚖️</span> Maestría en Derecho Laboral",
    "team.agustin.tagsLabel": "Áreas principales de Agustin",
    "team.agustin.tag1": "Derecho laboral",
    "team.agustin.tag2": "Negociaciones colectivas",
    "team.agustin.tag3": "Prevención de conflictos",
    "team.consultCta": "Agendar consulta",
    "services.eyebrow": "Áreas de práctica",
    "services.title": "Seleccioná el asesoramiento que necesitás",
    "services.lead": "Desplegá cada especialidad para conocer las gestiones en las que podemos acompañarte. Si tenés un caso particular, escribinos y armamos una propuesta a medida.",
    "services.legal.title": "Servicios legales",
    "services.legal.inmobiliario.summary": "🏡 Derecho inmobiliario",
    "services.legal.inmobiliario.items": "<li>Boleto de compraventa y seguimiento de escrituración</li><li>Contratos de locación para vivienda, comerciales y temporarios</li><li>Due diligence y asesoría integral en operaciones inmobiliarias</li><li>Regularización dominial y trámites registrales</li><li>Constitución y administración legal de fideicomisos</li>",
    "services.legal.familia.summary": "👨‍👩‍👧 Derecho de familia",
    "services.legal.familia.items": "<li>Divorcios de común acuerdo o contenciosos</li><li>Convenios de alimentos, cuidado personal y régimen de comunicación</li><li>Sucesiones y planificación hereditaria</li><li>Adopciones, filiaciones y uniones convivenciales</li><li>Acompañamiento integral ante situaciones de violencia familiar</li>",
    "services.legal.laboral.summary": "💼 Derecho laboral",
    "services.legal.laboral.items": "<li>Asesoramiento a empleadores y trabajadores</li><li>Reclamos por despidos, accidentes laborales e indemnizaciones</li><li>Liquidaciones finales y cálculo de haberes</li><li>Negociaciones individuales y colectivas</li><li>Representación ante el Ministerio de Trabajo y auditorías</li>",
    "services.legal.comercial.summary": "📄 Derecho comercial y societario",
    "services.legal.comercial.items": "<li>Constitución de sociedades (SRL, SA, SAS) y acuerdos societarios</li><li>Redacción de estatutos, actas y contratos comerciales</li><li>Due diligence y reorganizaciones empresariales</li><li>Asesoramiento en contratos civiles y comerciales</li><li>Gestión de cumplimiento normativo y gobierno corporativo</li>",
    "services.legal.civil.summary": "⚖️ Derecho civil",
    "services.legal.civil.items": "<li>Redacción y revisión de contratos civiles</li><li>Reclamos por daños y perjuicios</li><li>Cobro de deudas y ejecuciones</li><li>Acciones de amparo y medidas cautelares</li><li>Resolución de conflictos extrajudiciales</li>",
    "services.legal.penal.summary": "🛡️ Derecho penal",
    "services.legal.penal.items": "<li>Defensa en causas penales en todas las instancias</li><li>Presentación de denuncias y querellas</li><li>Asistencia a víctimas y medidas de protección</li><li>Excarcelaciones y estrategias cautelares</li><li>Programas de compliance y prevención del delito</li>",
    "services.accounting.title": "Servicios contables",
    "services.accounting.general.summary": "📘 Contabilidad general",
    "services.accounting.general.items": "<li>Armado de libros contables obligatorios (diario, inventario y balances)</li><li>Registración de operaciones contables</li><li>Elaboración de estados contables (balance general, estado de resultados)</li><li>Certificaciones contables para trámites bancarios o judiciales</li><li>Auditorías internas y externas</li>",
    "services.accounting.tax.summary": "🧾 Impositivos y fiscales",
    "services.accounting.tax.items": "<li>Inscripción y categorización en AFIP (monotributo, responsable inscripto)</li><li>Liquidación de impuestos nacionales (IVA, Ganancias, Bienes Personales)</li><li>Liquidación de impuestos provinciales (Ingresos Brutos, Sellos)</li><li>Presentación de declaraciones juradas mensuales y anuales</li><li>Atención de requerimientos y fiscalizaciones de AFIP y ARBA</li><li>Asesoramiento en regímenes de retención y percepción</li>",
    "services.accounting.business.summary": "🏢 Sociedades y emprendimientos",
    "services.accounting.business.items": "<li>Constitución de sociedades (SRL, SA, SAS)</li><li>Asesoramiento en estructura societaria y estatutos</li><li>Presentación de balances ante IGJ o DPPJ</li><li>Trámites ante organismos públicos (AFIP, IGJ, CNV)</li><li>Planificación fiscal y contable para pymes y emprendedores</li>",
    "services.accounting.labor.summary": "🧑‍💼 Laborales y previsionales",
    "services.accounting.labor.items": "<li>Alta de empleadores en AFIP</li><li>Liquidación de sueldos y cargas sociales</li><li>Generación de recibos de sueldo</li><li>Altas y bajas de empleados (SIPA, ART, obra social)</li><li>Asesoramiento en convenios colectivos y legislación laboral</li><li>Cálculo de indemnizaciones y liquidaciones finales</li>",
    "process.eyebrow": "Metodología Meraki",
    "process.title": "Trabajamos con un proceso claro y acompañado",
    "process.lead": "Desde el primer contacto hasta el cierre del caso mantenemos una comunicación transparente para que sepas en qué instancia estamos y cuáles son los siguientes pasos.",
    "process.step1Title": "Diagnóstico inicial",
    "process.step1Body": "Escuchamos tu consulta en detalle y recopilamos la documentación necesaria para entender el contexto legal y/o contable.",
    "process.step2Title": "Estrategia a medida",
    "process.step2Body": "Diseñamos un plan integral que contempla riesgos, oportunidades y tiempos estimados, y lo validamos con vos antes de avanzar.",
    "process.step3Title": "Ejecución y seguimiento",
    "process.step3Body": "Gestionamos cada instancia operativa con reportes periódicos, reuniones de actualización y acceso a la documentación digital.",
    "process.step4Title": "Cierre y acompañamiento",
    "process.step4Body": "Presentamos los resultados, definimos próximos pasos y quedamos disponibles para el soporte continuo que necesites.",
    "testimonials.eyebrow": "Experiencias reales",
    "testimonials.title": "Las personas que nos eligen hablan de nuestro compromiso",
    "testimonials.lead": "Historias de pymes, familias y emprendedores que confiaron en el Estudio Meraki para resolver procesos sensibles y estratégicos.",
    "testimonials.quote1": "“Nos acompañaron en la reorganización societaria y logramos ordenar la documentación sin detener la operación del negocio. La disponibilidad del equipo fue clave.”",
    "testimonials.name1": "Lucía Fernández",
    "testimonials.role1": "Directora de Pyme tecnológica",
    "testimonials.quote2": "“Encontré una escucha humana en un momento complejo de mi familia. El plan de acción fue claro y me sentí acompañada en cada etapa del proceso.”",
    "testimonials.name2": "Martina Thompson",
    "testimonials.role2": "Cliente de derecho de familia",
    "testimonials.quote3": "“El seguimiento mensual contable e impositivo nos permitió anticipar vencimientos y mejorar el flujo de caja. Hoy tomamos decisiones con información clara.”",
    "testimonials.name3": "Gonzalo Schuster",
    "testimonials.role3": "Cliente pyme industria textil",
    "cta.eyebrow": "Agenda inteligente",
    "cta.title": "Reservá una consulta virtual",
    "cta.lead": "Coordinamos una videollamada de 20 minutos para evaluar tu caso y sugerirte el plan de trabajo ideal. Recibí un resumen con los próximos pasos y honorarios estimados.",
    "cta.primaryCta": "Agenda por WhatsApp",
    "cta.secondaryCta": "Quiero dejar mi consulta",
    "chatbot.eyebrow": "Asistente virtual",
    "chatbot.title": "Chateá con Meraki para resolver tus dudas rápidas",
    "chatbot.lead": "Consultá sobre nuestras áreas de asesoramiento o pedí los datos de contacto. Nuestro asistente te orienta y, si el caso lo requiere, te comparte los medios para hablar directamente con el equipo.",
    "chatbot.suggestionsLabel": "Consultas sugeridas",
    "chatbot.suggestion1": "Servicios legales",
    "chatbot.suggestion1Question": "Quisiera conocer los servicios legales disponibles",
    "chatbot.suggestion2": "Servicios contables",
    "chatbot.suggestion2Question": "Necesito información sobre los servicios contables",
    "chatbot.suggestion3": "Derecho inmobiliario",
    "chatbot.suggestion3Question": "Quiero asesoramiento en derecho inmobiliario",
    "chatbot.suggestion4": "Contabilidad general",
    "chatbot.suggestion4Question": "Busco ayuda en contabilidad general",
    "chatbot.suggestion5": "Impositivos y fiscales",
    "chatbot.suggestion5Question": "Necesito apoyo con impuestos y fiscalizaciones",
    "chatbot.suggestion6": "Sociedades y emprendimientos",
    "chatbot.suggestion6Question": "Quiero saber más sobre sociedades y emprendimientos",
    "chatbot.suggestion7": "Laborales y previsionales",
    "chatbot.suggestion7Question": "Me interesa el servicio laboral y previsional contable",
    "chatbot.suggestion8": "Datos de contacto",
    "chatbot.suggestion8Question": "¿Cuál es el teléfono de contacto?",
    "chatbot.inputLabel": "Escribí tu consulta",
    "chatbot.placeholder": "Escribí tu consulta acá...",
    "chatbot.submit": "Enviar",
    "chatbot.initialMessage": "Hola, soy el asistente virtual del Estudio Meraki. Contame si necesitás asesoramiento legal o contable y te orientaré.",
    "chatbot.contactDetails": "Podés comunicarte al +54 9 11 6257-6017 (WhatsApp o llamada) o escribirnos a ejcmeraki@gmail.com. También podés visitarnos en Guardia Vieja 3732 4 E, Almagro, CABA.",
    "chatbot.fallbackIntro": "No estoy seguro de haber entendido tu consulta.",
    "chatbot.responses.greeting": "¡Hola! Soy el asistente virtual del Estudio Meraki. ¿En qué puedo ayudarte hoy?",
    "chatbot.responses.thanks": "¡Gracias a vos por escribirnos! Si necesitás algo más, contanos y seguimos en contacto.",
    "chatbot.responses.about": "Somos un equipo interdisciplinario de abogadas y contadoras. Acompañamos a personas, familias y empresas con soluciones legales y contables integrales.",
    "chatbot.responses.team": "Trabajamos de manera interdisciplinaria, combinando la mirada legal y contable para ofrecer respuestas ágiles y personalizadas a cada consulta.",
    "chatbot.responses.legalServices": "Nuestros servicios legales incluyen derecho inmobiliario, de familia, laboral, comercial y societario, civil y penal. Contanos tu caso y te conectamos con el equipo jurídico indicado.",
    "chatbot.responses.accountingServices": "Desde el área contable te acompañamos con contabilidad general, impuestos y fiscalizaciones, sociedades y emprendimientos, y gestiones laborales y previsionales. Contame qué necesitás y te guiamos paso a paso.",
    "chatbot.responses.inmobiliario": "En derecho inmobiliario te asistimos en boletos de compraventa, contratos de alquiler, escrituración y fideicomisos. Coordinamos todo el proceso para que tu operación sea segura.",
    "chatbot.responses.familia": "El área de familia acompaña divorcios, convenios de alimentos y cuidado personal, sucesiones, adopciones y situaciones de violencia familiar con un enfoque humano y cercano.",
    "chatbot.responses.laboralAccounting": "En materia laboral y previsional gestionamos el alta de empleadores en AFIP, la liquidación de sueldos y cargas sociales, la generación de recibos, las altas y bajas de personal en SIPA, ART u obra social, el asesoramiento en convenios colectivos y el cálculo de indemnizaciones y liquidaciones finales.",
    "chatbot.responses.laboral": "Nuestro equipo laboral asesora a personas y empresas en despidos, liquidaciones, indemnizaciones, accidentes de trabajo y negociaciones ante el Ministerio de Trabajo.",
    "chatbot.responses.comercial": "En derecho comercial y societario constituimos sociedades (SRL, SA, SAS), redactamos estatutos y contratos, y acompañamos reorganizaciones y cumplimiento normativo.",
    "chatbot.responses.civil": "El área civil cubre redacción de contratos, reclamos por daños, cobro de deudas, acciones de amparo y soluciones extrajudiciales.",
    "chatbot.responses.penal": "En derecho penal brindamos defensa en todas las instancias, presentación de denuncias y querellas, medidas de protección y planes de compliance preventivo.",
    "chatbot.responses.contabilidad": "En contabilidad general armamos los libros obligatorios, registramos operaciones, elaboramos estados contables, emitimos certificaciones para trámites bancarios o judiciales y realizamos auditorías internas y externas.",
    "chatbot.responses.impositivos": "El área impositiva se encarga de la inscripción y categorización en AFIP, la liquidación de impuestos nacionales y provinciales, la presentación de declaraciones juradas y la atención de requerimientos o fiscalizaciones, incluyendo regímenes de retención y percepción.",
    "chatbot.responses.sociedades": "Acompañamos a sociedades y emprendimientos con la constitución de figuras como SRL, SA o SAS, el armado de estructuras y estatutos, la presentación de balances ante IGJ o DPPJ, los trámites ante organismos como AFIP, IGJ o CNV y la planificación fiscal para pymes y emprendedores.",
    "chatbot.responses.general": "Contamos con asesoramiento legal (inmobiliario, familia, laboral, comercial y societario, civil y penal) y contable (contabilidad general, impuestos, sociedades y emprendimientos, laborales y previsionales). Contame brevemente tu situación y te indico el equipo ideal.",
    "chatbot.responses.reunion": "Coordinamos reuniones presenciales en Almagro o virtuales según tu disponibilidad. Escribinos por WhatsApp o completá el formulario de contacto y te respondemos en menos de 24 horas hábiles.",
    "chatbot.responses.horarios": "Atendemos de lunes a viernes de 9 a 18 h. Podemos coordinar una reunión presencial o virtual según tu disponibilidad.",
    "chatbot.responses.direccion": "Estamos en Guardia Vieja 3732 4 E, en el barrio de Almagro, Ciudad Autónoma de Buenos Aires. Te esperamos con cita previa.",
    "chatbot.responses.aprecio": "¡Me alegra que la información te sirva! Si aparece otra duda, escribime cuando quieras.",
    "chatbot.responses.despedida": "¡Hasta luego! Cuando quieras retomar la conversación, escribinos y seguimos charlando.",
    "contact.eyebrow": "Agendemos una reunión",
    "contact.title": "Contanos en qué podemos ayudarte",
    "contact.lead": "Elegí el medio que prefieras o completá el formulario. Respondemos dentro de las 24 horas hábiles con los próximos pasos para tu consulta.",
    "contact.cardTitle": "Datos de contacto",
    "contact.phoneLabel": "Teléfono",
    "contact.emailLabel": "Email",
    "contact.addressLabel": "Dirección",
    "contact.address": "<p><span aria-hidden=\"true\">📍</span> Guardia Vieja 3732 4 E<br />Almagro, Ciudad Autónoma de Buenos Aires</p><p><span aria-hidden=\"true\">📍</span> Alicia Moreau de Justo 740 3ero 1<br />Puerto Madero, Ciudad Autónoma de Buenos Aires</p>",
    "contact.hoursLabel": "Horarios",
    "contact.hours": "Lunes a Viernes de 9 a 18 h",
    "contact.whatsappCta": "Escribir por WhatsApp",
    "contact.emailCta": "Enviar correo",
    "contact.formTitle": "Enviá tu consulta",
    "contact.formName": "Nombre completo",
    "contact.formNamePlaceholder": "María Pérez",
    "contact.formEmail": "Email",
    "contact.formEmailPlaceholder": "nombre@correo.com",
    "contact.formPhone": "Teléfono",
    "contact.formPhonePlaceholder": "11 2345 6789",
    "contact.formReason": "Motivo de la consulta",
    "contact.formReasonOptions": "<option value=\"\" disabled selected>Elegí una opción</option><option value=\"inmobiliario\">Derecho inmobiliario</option><option value=\"familia\">Derecho de familia</option><option value=\"laboral\">Derecho laboral</option><option value=\"comercial\">Derecho comercial y societario</option><option value=\"civil\">Derecho civil</option><option value=\"penal\">Derecho penal</option><option value=\"contabilidad-general\">Contabilidad general</option><option value=\"impositivos\">Impositivos y fiscales</option><option value=\"sociedades-emprendimientos\">Sociedades y emprendimientos</option><option value=\"laborales-previsionales\">Laborales y previsionales</option><option value=\"otros\">Otros</option>",
    "contact.formDetails": "Contanos más detalles",
    "contact.formDetailsPlaceholder": "Describí tu consulta",
    "contact.formSubject": "Nueva consulta desde el sitio web",
    "contact.formSubmit": "Enviar consulta",
    "contact.formDisclaimer": "Al enviar tus datos aceptás ser contactado/a por un representante del Estudio Meraki.",
    "contact.formSendingButton": "Enviando...",
    "contact.formSendingStatus": "Enviando tu consulta...",
    "contact.formSuccess": "¡Gracias! Recibimos tu consulta y te contactaremos dentro de las próximas 24 horas hábiles.",
    "contact.formErrorFallback": "No pudimos enviar el formulario en este momento. Escribinos a ejcmeraki@gmail.com o por WhatsApp.",
    "contact.formNetworkError": "Ocurrió un inconveniente al enviar tu consulta. Por favor escribinos a ejcmeraki@gmail.com o por WhatsApp.",
    "footer.copy": "© <span id=\"year\"></span> Estudio Meraki. Todos los derechos reservados.",
    "footer.navLabel": "Navegación en el pie",
    "footer.home": "Inicio",
    "footer.study": "El estudio",
    "footer.services": "Servicios",
    "footer.methodology": "Metodología",
    "footer.testimonials": "Testimonios",
    "footer.contact": "Contacto",
  },
  en: {
    "meta.title": "Meraki Firm · Legal and Accounting Advisory",
    "nav.study": "The firm",
    "nav.team": "Team",
    "nav.services": "Services",
    "nav.methodology": "Methodology",
    "nav.testimonials": "Testimonials",
    "nav.contact": "Contact",
    "nav.label": "Primary navigation",
    "nav.whatsapp": "Direct WhatsApp",
    "language.toggle": "ES",
    "language.toggleLabel": "Switch to Spanish",
    "hero.kicker": "Tailored legal and accounting solutions",
    "hero.title": "Meraki Firm",
    "hero.lead": "We support individuals, families, and companies with an integral approach. We focus on active listening, precise analysis, and crafting strategies that build long-term trust.",
    "hero.primaryCta": "Explore our services",
    "hero.secondaryCta": "Book a meeting",
    "hero.metric1Value": "+12 years",
    "hero.metric1Label": "Of interdisciplinary experience",
    "hero.metric2Value": "96%",
    "hero.metric2Label": "Of inquiries resolved within 48 hours",
    "hero.metric3Value": "5.0",
    "hero.metric3Label": "Client satisfaction average",
    "about.eyebrow": "About the firm",
    "about.title": "An interdisciplinary team committed to your projects",
    "about.lead": "We are attorneys and accountants who combine legal and accounting expertise to deliver a personalized service. We design solutions that consider every human, financial, and legal angle of each case.",
    "about.card1Title": "👥 Close guidance",
    "about.card1Body": "We build trusting relationships through regular meetings, proactive follow-up, and clear communication at every stage of the process.",
    "about.card2Title": "📚 Continuous learning",
    "about.card2Body": "We join training programs and professional networks to offer agile responses based on current regulations and best market practices.",
    "about.card3Title": "🤝 Integral vision",
    "about.card3Body": "We connect the legal and accounting perspectives to anticipate risks, optimise resources, and design sustainable strategies for your life or business.",
    "team.eyebrow": "Professional team",
    "team.title": "Attorneys and accountants with strategic and human vision",
    "team.lead": "Meet the leaders of each specialty. Their academic and field experience sustains the comprehensive solutions we deliver every day.",
    "team.julieta.alt": "Portrait of Julieta Elizabeth Cardinali Merani",
    "team.julieta.name": "Julieta Elizabeth Cardinali Merani",
    "team.julieta.role": "Attorney",
    "team.julieta.location": "City and Province of Buenos Aires",
    "team.julieta.bio": "Leads the integral handling of family and real estate matters, prioritising active listening and collaborative solutions.",
    "team.julieta.highlight1": "<span aria-hidden=\"true\">🎓</span> Law degree (UADE) with a focus on private law",
    "team.julieta.highlight2": "<span aria-hidden=\"true\">⚖️</span> Specialist in family law and probate",
    "team.julieta.highlight3": "<span aria-hidden=\"true\">📜</span> Diploma in real estate registry law",
    "team.julieta.tagsLabel": "Julieta’s main areas",
    "team.julieta.tag1": "Family law",
    "team.julieta.tag2": "Probate",
    "team.julieta.tag3": "Real estate law",
    "team.viviana.initials": "Initials of Viviana Elizabeth Merani",
    "team.viviana.name": "Viviana Elizabeth Merani",
    "team.viviana.role": "Attorney",
    "team.viviana.location": "City and Province of Buenos Aires",
    "team.viviana.bio": "Leads comprehensive strategies in civil, commercial, and labour law, prioritising prevention through sustainable agreements and personalised support.",
    "team.viviana.highlight1": "<span aria-hidden=\"true\">🎓</span> Attorney (UBA) with postgraduate studies in civil and commercial law",
    "team.viviana.highlight2": "<span aria-hidden=\"true\">⚖️</span> Registered pre-trial mediator with a collaborative resolution focus",
    "team.viviana.highlight3": "<span aria-hidden=\"true\">🤝</span> Extensive experience advising SMEs and family businesses",
    "team.viviana.tagsLabel": "Viviana’s main areas",
    "team.viviana.tag1": "Civil law",
    "team.viviana.tag2": "Commercial law",
    "team.viviana.tag3": "Mediation",
    "team.alberto.alt": "Portrait of Alberto Lassa",
    "team.alberto.name": "Alberto Lassa",
    "team.alberto.role": "Certified Public Accountant",
    "team.alberto.location": "City and Province of Buenos Aires",
    "team.alberto.bio": "Heads the firm’s accounting and tax services, helping companies and entrepreneurs with tax planning, compliance, and clear financial reporting.",
    "team.alberto.highlight1": "<span aria-hidden=\"true\">📊</span> 30+ years advising on national and provincial taxes",
    "team.alberto.highlight2": "<span aria-hidden=\"true\">🏢</span> Expert in corporate structures and financial statements before IGJ",
    "team.alberto.highlight3": "<span aria-hidden=\"true\">🤝</span> Specialist in payroll and collective bargaining agreements",
    "team.alberto.tagsLabel": "Alberto’s main areas",
    "team.alberto.tag1": "Tax planning",
    "team.alberto.tag2": "Corporate structures",
    "team.alberto.tag3": "Payroll management",
    "team.agustin.alt": "Portrait of Agustin Lescano",
    "team.agustin.name": "Agustin Lescano",
    "team.agustin.role": "Attorney",
    "team.agustin.location": "City and Province of Buenos Aires",
    "team.agustin.bio": "Leads the firm’s labour advisory services, guiding workers and SMEs through negotiations, audits, and conflict-prevention strategies.",
    "team.agustin.highlight1": "<span aria-hidden=\"true\">🎓</span> Attorney (UBA) specialised in criminal and labour law",
    "team.agustin.highlight2": "<span aria-hidden=\"true\">📑</span> University lecturer",
    "team.agustin.highlight3": "<span aria-hidden=\"true\">⚖️</span> Master’s degree in Labour Law",
    "team.agustin.tagsLabel": "Agustin’s main areas",
    "team.agustin.tag1": "Labour law",
    "team.agustin.tag2": "Collective bargaining",
    "team.agustin.tag3": "Conflict prevention",
    "team.consultCta": "Schedule a consultation",
    "services.eyebrow": "Practice areas",
    "services.title": "Choose the advisory service you need",
    "services.lead": "Expand each specialty to explore how we can support you. If your case is unique, write to us and we will design a tailored proposal.",
    "services.legal.title": "Legal services",
    "services.legal.inmobiliario.summary": "🏡 Real estate law",
    "services.legal.inmobiliario.items": "<li>Purchase agreements and deed follow-up</li><li>Residential, commercial, and short-term lease contracts</li><li>Due diligence and end-to-end support for real estate transactions</li><li>Title regularisation and registry filings</li><li>Creation and legal management of trusts</li>",
    "services.legal.familia.summary": "👨‍👩‍👧 Family law",
    "services.legal.familia.items": "<li>Uncontested and contested divorces</li><li>Child support, custody, and parenting agreements</li><li>Probate processes and estate planning</li><li>Adoptions, parentage, and domestic partnerships</li><li>Comprehensive support in family violence situations</li>",
    "services.legal.laboral.summary": "💼 Labour law",
    "services.legal.laboral.items": "<li>Advice for employers and employees</li><li>Claims for dismissals, workplace accidents, and compensation</li><li>Severance settlements and wage calculations</li><li>Individual and collective negotiations</li><li>Representation before the Labour Ministry and audits</li>",
    "services.legal.comercial.summary": "📄 Commercial and corporate law",
    "services.legal.comercial.items": "<li>Incorporation of companies (LLC, Corp., SAS) and shareholders’ agreements</li><li>Drafting of bylaws, minutes, and commercial contracts</li><li>Due diligence and corporate reorganisations</li><li>Advisory on civil and commercial agreements</li><li>Compliance management and corporate governance</li>",
    "services.legal.civil.summary": "⚖️ Civil law",
    "services.legal.civil.items": "<li>Drafting and review of civil contracts</li><li>Claims for damages and losses</li><li>Debt collection and enforcement</li><li>Amparo actions and precautionary measures</li><li>Out-of-court dispute resolution</li>",
    "services.legal.penal.summary": "🛡️ Criminal law",
    "services.legal.penal.items": "<li>Defence in criminal cases at every stage</li><li>Filing complaints and private prosecutions</li><li>Support for victims and protective measures</li><li>Bail requests and precautionary strategies</li><li>Compliance programmes and crime prevention</li>",
    "services.accounting.title": "Accounting services",
    "services.accounting.general.summary": "📘 General accounting",
    "services.accounting.general.items": "<li>Preparation of mandatory accounting books (journal, inventory, and balance)</li><li>Bookkeeping of daily transactions</li><li>Preparation of financial statements (balance sheet, income statement)</li><li>Accounting certifications for banking or court procedures</li><li>Internal and external audits</li>",
    "services.accounting.tax.summary": "🧾 Tax and fiscal",
    "services.accounting.tax.items": "<li>AFIP registration and tax status (monotributo, registered taxpayer)</li><li>National tax filings (VAT, Income Tax, Personal Assets)</li><li>Provincial tax filings (Gross Income, Stamp Tax)</li><li>Monthly and annual tax returns</li><li>Handling AFIP and ARBA requirements and audits</li><li>Advice on withholding and collection regimes</li>",
    "services.accounting.business.summary": "🏢 Companies and ventures",
    "services.accounting.business.items": "<li>Company incorporation (LLC, Corp., SAS)</li><li>Advice on corporate structures and bylaws</li><li>Financial statement filings with IGJ or DPPJ</li><li>Procedures with public agencies (AFIP, IGJ, CNV)</li><li>Tax and accounting planning for SMEs and entrepreneurs</li>",
    "services.accounting.labor.summary": "🧑‍💼 Labour and social security",
    "services.accounting.labor.items": "<li>Employer registration with AFIP</li><li>Payroll and social security calculations</li><li>Issuing pay slips</li><li>Employee onboarding and offboarding (SIPA, workers’ compensation, healthcare)</li><li>Advice on collective bargaining agreements and labour regulations</li><li>Calculation of severance and final settlements</li>",
    "process.eyebrow": "Meraki methodology",
    "process.title": "We work with a clear and supportive process",
    "process.lead": "From the first contact to closing the case we keep transparent communication so you always know where we stand and the next steps.",
    "process.step1Title": "Initial diagnosis",
    "process.step1Body": "We listen to your inquiry in detail and gather the documents needed to understand the legal and/or accounting context.",
    "process.step2Title": "Tailored strategy",
    "process.step2Body": "We design an integral plan that considers risks, opportunities, and timelines, and validate it with you before moving forward.",
    "process.step3Title": "Execution and follow-up",
    "process.step3Body": "We handle each operational stage with regular updates, review meetings, and access to digital documentation.",
    "process.step4Title": "Closure and support",
    "process.step4Body": "We present the outcomes, define the next steps, and remain available for the ongoing support you need.",
    "testimonials.eyebrow": "Real experiences",
    "testimonials.title": "The people who choose us speak about our commitment",
    "testimonials.lead": "Stories from SMEs, families, and entrepreneurs who trusted Meraki to manage sensitive and strategic processes.",
    "testimonials.quote1": "“They guided us through a corporate reorganisation and we were able to organise the paperwork without stopping business operations. The team’s availability was key.”",
    "testimonials.name1": "Lucía Fernández",
    "testimonials.role1": "Tech SME director",
    "testimonials.quote2": "“I found a human approach during a complex family moment. The action plan was clear and I felt supported every step of the way.”",
    "testimonials.name2": "Martina Thompson",
    "testimonials.role2": "Family law client",
    "testimonials.quote3": "“Monthly accounting and tax follow-up helped us anticipate deadlines and improve cash flow. Today we make decisions with clear information.”",
    "testimonials.name3": "Gonzalo Schuster",
    "testimonials.role3": "Textile industry SME client",
    "cta.eyebrow": "Smart scheduling",
    "cta.title": "Book an online consultation",
    "cta.lead": "We set up a 20-minute video call to assess your case and suggest the best plan. Receive a summary with next steps and estimated fees.",
    "cta.primaryCta": "Schedule on WhatsApp",
    "cta.secondaryCta": "Leave us your inquiry",
    "chatbot.eyebrow": "Virtual assistant",
    "chatbot.title": "Chat with Meraki to solve quick questions",
    "chatbot.lead": "Ask about our advisory areas or request contact details. The assistant will guide you and, if needed, connect you directly with the team.",
    "chatbot.suggestionsLabel": "Suggested questions",
    "chatbot.suggestion1": "Legal services",
    "chatbot.suggestion1Question": "I’d like to know the legal services available",
    "chatbot.suggestion2": "Accounting services",
    "chatbot.suggestion2Question": "I need information about accounting services",
    "chatbot.suggestion3": "Real estate law",
    "chatbot.suggestion3Question": "I’m looking for advice on real estate law",
    "chatbot.suggestion4": "General accounting",
    "chatbot.suggestion4Question": "I need help with general accounting",
    "chatbot.suggestion5": "Tax and fiscal",
    "chatbot.suggestion5Question": "I need support with taxes and audits",
    "chatbot.suggestion6": "Companies and ventures",
    "chatbot.suggestion6Question": "I want details about companies and ventures",
    "chatbot.suggestion7": "Labour and social security",
    "chatbot.suggestion7Question": "I’m interested in labour and social security services",
    "chatbot.suggestion8": "Contact details",
    "chatbot.suggestion8Question": "What’s the contact phone number?",
    "chatbot.inputLabel": "Type your question",
    "chatbot.placeholder": "Write your question here...",
    "chatbot.submit": "Send",
    "chatbot.initialMessage": "Hi! I’m Meraki’s virtual assistant. Tell me if you need legal or accounting support and I’ll guide you.",
    "chatbot.contactDetails": "You can reach us at +54 9 11 6257-6017 (WhatsApp or call) or email ejcmeraki@gmail.com. We also welcome visits at Guardia Vieja 3732 4 E, Almagro, Buenos Aires.",
    "chatbot.fallbackIntro": "I’m not sure I understood your question.",
    "chatbot.responses.greeting": "Hi! I’m Meraki’s virtual assistant. How can I help you today?",
    "chatbot.responses.thanks": "Thanks for reaching out! If you need anything else just let us know and we’ll stay in touch.",
    "chatbot.responses.about": "We’re an interdisciplinary team of attorneys and accountants. We support people, families, and companies with comprehensive legal and accounting solutions.",
    "chatbot.responses.team": "We work interdisciplinarily, combining legal and accounting perspectives to offer agile, personalised answers to every inquiry.",
    "chatbot.responses.legalServices": "Our legal services cover real estate, family, labour, commercial and corporate, civil, and criminal law. Tell us about your case and we’ll connect you with the right legal specialist.",
    "chatbot.responses.accountingServices": "Our accounting team supports you with general accounting, taxes and audits, companies and ventures, plus labour and social security procedures. Share what you need and we’ll guide you step by step.",
    "chatbot.responses.inmobiliario": "In real estate law we assist with purchase agreements, lease contracts, deeds, and trusts. We coordinate the whole process so your transaction is safe.",
    "chatbot.responses.familia": "Our family law area assists with divorces, parenting agreements, probate, adoptions, and family violence cases with a human, empathetic focus.",
    "chatbot.responses.laboralAccounting": "For labour and social security matters we handle employer registration, payroll and social charges, pay slips, onboarding and offboarding in SIPA, workers’ compensation and healthcare, collective agreements, and severance calculations.",
    "chatbot.responses.laboral": "Our labour law team advises people and companies on dismissals, settlements, compensation, workplace accidents, and negotiations before the Labour Ministry.",
    "chatbot.responses.comercial": "In commercial and corporate law we set up companies (LLC, Corp., SAS), draft bylaws and contracts, and support reorganisations and compliance.",
    "chatbot.responses.civil": "The civil law area covers contract drafting, damage claims, debt collection, amparo actions, and out-of-court solutions.",
    "chatbot.responses.penal": "In criminal law we provide defence at every stage, file complaints and private prosecutions, support victims, and design compliance programmes to prevent crime.",
    "chatbot.responses.contabilidad": "In general accounting we prepare mandatory books, record transactions, produce financial statements, issue certifications, and carry out internal and external audits.",
    "chatbot.responses.impositivos": "Our tax area manages AFIP registration, national and provincial tax filings, monthly and annual returns, plus requirements or audits including withholding and collection regimes.",
    "chatbot.responses.sociedades": "We support companies and ventures with incorporating LLCs, corporations, or SAS, structuring bylaws, filing financial statements with IGJ or DPPJ, handling procedures with AFIP, IGJ, or CNV, and planning taxes for SMEs and entrepreneurs.",
    "chatbot.responses.general": "We offer legal advice (real estate, family, labour, commercial and corporate, civil, and criminal) and accounting advice (general accounting, taxes, companies and ventures, labour and social security). Tell me briefly about your situation and I’ll guide you to the right team.",
    "chatbot.responses.reunion": "We schedule in-person meetings in Almagro or online sessions depending on your availability. Write to us on WhatsApp or fill in the contact form and we’ll reply within 24 business hours.",
    "chatbot.responses.horarios": "We’re available Monday to Friday from 9 a.m. to 6 p.m. We can arrange an in-person or online meeting according to your schedule.",
    "chatbot.responses.direccion": "We’re located at Guardia Vieja 3732 4 E, in Almagro, Buenos Aires City. Visits are by appointment.",
    "chatbot.responses.aprecio": "I’m glad the information was useful! If any other question comes up, just message me again.",
    "chatbot.responses.despedida": "See you soon! Whenever you want to continue the conversation, write to us and we’ll pick it up from there.",
    "contact.eyebrow": "Let’s schedule a meeting",
    "contact.title": "Tell us how we can help",
    "contact.lead": "Choose your preferred channel or fill in the form. We reply within 24 business hours with the next steps for your inquiry.",
    "contact.cardTitle": "Contact details",
    "contact.phoneLabel": "Phone",
    "contact.emailLabel": "Email",
    "contact.addressLabel": "Address",
    "contact.address": "<p><span aria-hidden=\"true\">📍</span> Guardia Vieja 3732 4 E<br />Almagro, Buenos Aires City</p><p><span aria-hidden=\"true\">📍</span> Alicia Moreau de Justo 740 3rd 1<br />Puerto Madero, Buenos Aires City</p>",
    "contact.hoursLabel": "Office hours",
    "contact.hours": "Monday to Friday from 9 a.m. to 6 p.m.",
    "contact.whatsappCta": "Write on WhatsApp",
    "contact.emailCta": "Send email",
    "contact.formTitle": "Send your inquiry",
    "contact.formName": "Full name",
    "contact.formNamePlaceholder": "Jane Doe",
    "contact.formEmail": "Email",
    "contact.formEmailPlaceholder": "name@email.com",
    "contact.formPhone": "Phone",
    "contact.formPhonePlaceholder": "+1 555 123 4567",
    "contact.formReason": "Reason for inquiry",
    "contact.formReasonOptions": "<option value=\"\" disabled selected>Select an option</option><option value=\"inmobiliario\">Real estate law</option><option value=\"familia\">Family law</option><option value=\"laboral\">Labour law</option><option value=\"comercial\">Commercial & corporate law</option><option value=\"civil\">Civil law</option><option value=\"penal\">Criminal law</option><option value=\"contabilidad-general\">General accounting</option><option value=\"impositivos\">Tax & fiscal</option><option value=\"sociedades-emprendimientos\">Companies & ventures</option><option value=\"laborales-previsionales\">Labour & social security</option><option value=\"otros\">Other</option>",
    "contact.formDetails": "Share more details",
    "contact.formDetailsPlaceholder": "Describe your inquiry",
    "contact.formSubject": "New inquiry from the website",
    "contact.formSubmit": "Submit inquiry",
    "contact.formDisclaimer": "By submitting your details you agree to be contacted by a Meraki representative.",
    "contact.formSendingButton": "Sending...",
    "contact.formSendingStatus": "Sending your inquiry...",
    "contact.formSuccess": "Thank you! We received your inquiry and will contact you within the next 24 business hours.",
    "contact.formErrorFallback": "We couldn’t send the form right now. Please email ejcmeraki@gmail.com or reach us on WhatsApp.",
    "contact.formNetworkError": "Something went wrong while sending your inquiry. Please email ejcmeraki@gmail.com or contact us on WhatsApp.",
    "footer.copy": "© <span id=\"year\"></span> Meraki Firm. All rights reserved.",
    "footer.navLabel": "Footer navigation",
    "footer.home": "Home",
    "footer.study": "The firm",
    "footer.services": "Services",
    "footer.methodology": "Methodology",
    "footer.testimonials": "Testimonials",
    "footer.contact": "Contact",
  },
};
const knowledgeBaseDefinitions = [
  {
    responseKey: "chatbot.responses.greeting",
    patterns: { es: "(hola|buen[oa]s (d[ií]as|tardes|noches)|hey|qué tal|que tal|saludo)", en: "(hi|hello|hey|good (morning|afternoon|evening))" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.thanks",
    patterns: { es: "(gracias|muchas gracias|te agradezco|muy amable)", en: "(thanks|thank you|appreciate it)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.about",
    patterns: {
      es: "(qu[ié]n sos|quien sos|qu[ié]nes son|quienes son|qu[eé] es meraki|que es meraki|sobre ustedes|qu[eé] hacen)",
      en: "(who (are|is) (you|meraki)|about you|what do you do)",
    },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.team",
    patterns: { es: "(experiencia|equipo|profesionales|trayectoria|interdisciplinario)", en: "(experience|team|professionals|interdisciplinary)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.legalServices",
    patterns: { es: "(servicio legal|servicios legales|área legal|area legal|abogad)", en: "(legal service|legal services|attorney|lawyer|law area)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.accountingServices",
    patterns: { es: "(servicio contable|servicios contables|contable|contabilidad|estudio contable)", en: "(accounting service|accounting|bookkeeping|accountant|tax service)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.inmobiliario",
    patterns: { es: "inmobiliari|alquiler|alquilar|escritura|escrituraci|fideicomiso|propiedad|venta", en: "(real estate|property|rental|lease|deed|trust|sell|purchase)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.familia",
    patterns: { es: "familia|divorci|alimento|cuidad|régimen|regimen|adopci|filiaci|violencia", en: "(family law|divorce|alimony|custody|parenting|adoption|violence)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.laboralAccounting",
    patterns: {
      es: "laboral y previsional|contabilidad laboral|liquidaci[óo]n de sueldos|cargas sociales|recibos de sueldo|alta de empleadores|empleadores en afip|altas y bajas de empleados|sipa|obra social|\\bart\\b|convenios colectivos|legislaci[óo]n laboral|liquidaciones finales contables",
      en: "(payroll|social security|employer registration|wage slip|sipa|workers'? comp|healthcare|collective agreement|labour settlement)",
    },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.laboral",
    patterns: { es: "laboral|trabaj|despido|liquidaci|indemnizaci|accidente", en: "(labour|labor|employment|dismissal|layoff|settlement|compensation|accident)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.comercial",
    patterns: { es: "societari|comercial|empresa|sociedad|estatuto|s\\.?a|srl|sas|contrato comercial", en: "(commercial|corporate|company|bylaw|s\\.?a|llc|sas|shareholder|business contract)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.civil",
    patterns: { es: "civil|contrato civil|daño|perjuicio|deuda|ejecuci|amparo|mediaci", en: "(civil|contract|damages|debt|enforcement|injunction|mediation)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.penal",
    patterns: { es: "penal|denuncia|querella|excarcelaci|delito|victima|víctima", en: "(criminal|crime|complaint|lawsuit|bail|victim|defen[cs]e)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.contabilidad",
    patterns: { es: "contabilidad general|libro[s]? contable[s]?|registraci[óo]n contable|estado[s]? contable[s]?|certificaci[óo]n contable[s]?|auditor[íi]a(s)?", en: "(accounting book|bookkeeping|financial statement|accounting certification|audit)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.impositivos",
    patterns: { es: "impositiv|impuesto|afip|monotribut|ganancias|iva|bienes personales|arba|ingresos brutos|sellos|declaraci[óo]n jurada|retenci[óo]n|percepci[óo]n|fiscalizaci[óo]n|inscripci[óo]n|categorizaci[óo]n", en: "(tax|afip|vat|income tax|personal assets|gross income|withholding|audit|registration|classification)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.sociedades",
    patterns: { es: "sociedades y emprendimientos|balance ante igj|balances ante igj|dppj|cnv|planificaci[óo]n fiscal y contable|estructura societaria|tr[aá]mites ante organismos p[úu]blicos|pymes y emprendedores", en: "(company|venture|startup|igj|cnv|corporate structure|business planning|public agency|sme|entrepreneur)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.general",
    patterns: { es: "(servicio|servicios|asesoramiento|ayuda|consulta|especialidad|área|area)", en: "(service|services|advice|support|consultation|specialty|area)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.reunion",
    patterns: { es: "(reuni[óo]n|reunion|agendar|reservar|turno|agenda|coordinar)", en: "(meeting|schedule|book|appointment|call|coordination)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.horarios",
    patterns: { es: "horario|hora|atenci|disponibilidad|agenda|turno", en: "(hours|schedule|availability|open|opening)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.direccion",
    patterns: { es: "direcci|ubicaci|dónde están|donde estan", en: "(address|location|where are you)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.contactDetails",
    patterns: { es: "correo|mail|email|escribir|contacto|tel[eé]fono|whatsapp|llamar|comunicar", en: "(phone|call|email|mail|contact|whats?app|reach)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.aprecio",
    patterns: { es: "(gracias por la ayuda|muy claro|perfecto|genial)", en: "(thanks for the help|very clear|perfect|great|awesome)" },
    flags: { es: "", en: "i" },
  },
  {
    responseKey: "chatbot.responses.despedida",
    patterns: { es: "(adios|chau|hasta luego|nos vemos)", en: "(goodbye|bye|see you|later)" },
    flags: { es: "", en: "i" },
  },
];

const directContactKeywordsMap = {
  es: /(tel[eé]fono|whatsapp|contacto directo|correo|email|llamar|celular|celu)/,
  en: /(phone|whats?app|direct contact|email|mail|call|cell)/i,
};

const timeLocales = {
  es: "es-AR",
  en: "en-US",
};
let currentLanguage = localStorage.getItem("preferredLanguage") || "es";
let knowledgeBase = [];
let fallbackAnswer = "";
let directContactKeywords = directContactKeywordsMap[currentLanguage] || directContactKeywordsMap.es;

function getTranslation(key, language = currentLanguage) {
  const dictionary = translations[language];
  if (dictionary && Object.prototype.hasOwnProperty.call(dictionary, key)) {
    return dictionary[key];
  }
  const fallbackDictionary = translations.es;
  return fallbackDictionary[key] || "";
}

function buildKnowledgeBase(language) {
  return knowledgeBaseDefinitions
    .map((definition) => {
      const patternSource = definition.patterns[language] || definition.patterns.es;
      if (!patternSource) return null;
      const flags = definition.flags[language] || definition.flags.es || "";
      const pattern = new RegExp(patternSource, flags);
      const responseKey = definition.responseKey;
      const responseText =
        responseKey === "chatbot.contactDetails"
          ? getTranslation("chatbot.contactDetails", language)
          : getTranslation(responseKey, language);
      return { match: pattern, responseKey, response: responseText };
    })
    .filter(Boolean);
}

function formatTime(date) {
  const locale = timeLocales[currentLanguage] || timeLocales.es;
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function addMessage(role, text) {
  if (!chatbotMessages) return;
  const bubble = document.createElement("div");
  bubble.classList.add("chatbot__bubble", `chatbot__bubble--${role}`);

  const messageText = document.createElement("p");
  messageText.textContent = text;
  bubble.appendChild(messageText);

  const timestamp = document.createElement("time");
  const now = new Date();
  timestamp.dateTime = now.toISOString();
  timestamp.textContent = formatTime(now);
  bubble.appendChild(timestamp);

  chatbotMessages.appendChild(bubble);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function setContactStatus(messageOrKey, type, { isKey = false } = {}) {
  if (!contactFormStatus) return;
  const message = isKey ? getTranslation(messageOrKey) : messageOrKey;
  contactFormStatus.textContent = message;
  contactFormStatus.classList.remove("form__status--success", "form__status--error");
  if (type) {
    contactFormStatus.classList.add(`form__status--${type}`);
  }
  if (isKey) {
    contactFormStatus.dataset.statusKey = messageOrKey;
  } else {
    delete contactFormStatus.dataset.statusKey;
  }
}

function applyTranslations(language) {
  currentLanguage = language;
  localStorage.setItem("preferredLanguage", currentLanguage);
  document.documentElement.lang = currentLanguage;
  document.body.dataset.language = currentLanguage;

  const title = getTranslation("meta.title");
  if (title) {
    document.title = title;
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (!key) return;
    const translation = getTranslation(key);
    if (translation !== undefined) {
      element.innerHTML = translation;
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    const attrList = element.getAttribute("data-i18n-attr");
    if (!attrList) return;
    attrList.split(",").forEach((item) => {
      const [attr, key] = item.split(":").map((value) => value.trim());
      if (!attr || !key) return;
      const translation = getTranslation(key);
      if (translation !== undefined) {
        element.setAttribute(attr, translation);
      }
    });
  });

  if (contactFormStatus && contactFormStatus.dataset.statusKey) {
    const statusTranslation = getTranslation(contactFormStatus.dataset.statusKey);
    if (statusTranslation) {
      contactFormStatus.textContent = statusTranslation;
    }
  }

  rebuildTranslationDependentData(currentLanguage);
}

function rebuildTranslationDependentData(language) {
  knowledgeBase = buildKnowledgeBase(language);
  directContactKeywords = directContactKeywordsMap[language] || directContactKeywordsMap.es;
  fallbackAnswer = `${getTranslation("chatbot.fallbackIntro", language)} ${getTranslation("chatbot.contactDetails", language)}`.trim();

  if (chatbotMessages) {
    chatbotMessages.innerHTML = "";
    addMessage("bot", getTranslation("chatbot.initialMessage", language));
  }

  if (contactForm) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton && !contactFormStatus?.dataset.statusKey) {
      submitButton.textContent = getTranslation("contact.formSubmit", language);
    }
  }
}

function findResponse(message) {
  const normalized = message.toLowerCase();
  if (directContactKeywords.test(normalized)) {
    return getTranslation("chatbot.contactDetails");
  }

  for (const item of knowledgeBase) {
    if (item.match.test(normalized)) {
      return item.response;
    }
  }

  return fallbackAnswer;
}

function handleUserMessage(message) {
  const trimmed = message.trim();
  if (!trimmed) return;
  addMessage("user", trimmed);

  window.setTimeout(() => {
    const reply = findResponse(trimmed);
    addMessage("bot", reply);
  }, 350);
}

if (chatbotForm && chatbotInput) {
  chatbotForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userMessage = chatbotInput.value;
    chatbotInput.value = "";
    handleUserMessage(userMessage);
  });
}

chatbotSuggestionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { question } = button.dataset;
    if (!question) return;
    if (chatbotInput) {
      chatbotInput.value = "";
      chatbotInput.focus();
    }
    handleUserMessage(question);
  });
});

if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    const nextLanguage = currentLanguage === "es" ? "en" : "es";
    applyTranslations(nextLanguage);
  });
}

const contactFormSubmitHandler = async (event) => {
  if (!contactForm) return;
  event.preventDefault();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = getTranslation("contact.formSendingButton");
  }

  setContactStatus("contact.formSendingStatus", "", { isKey: true });

  try {
    const formData = new FormData(contactForm);
    const response = await fetch("https://formsubmit.co/ajax/ejcmeraki@gmail.com", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      if (data && (data.message || data.error)) {
        setContactStatus(data.message || data.error, "error");
      } else {
        setContactStatus("contact.formErrorFallback", "error", { isKey: true });
      }
      return;
    }

    setContactStatus("contact.formSuccess", "success", { isKey: true });
    contactForm.reset();
  } catch (error) {
    setContactStatus("contact.formNetworkError", "error", { isKey: true });
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = getTranslation("contact.formSubmit");
    }
  }
};

if (contactForm && window.fetch) {
  contactForm.addEventListener("submit", contactFormSubmitHandler);
}

applyTranslations(currentLanguage);
