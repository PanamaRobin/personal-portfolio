import { createContext, useContext } from 'react';

export type Lang = 'en' | 'es';

/**
 * English source strings are the keys — the same contract the source design
 * used when it walked the DOM swapping text nodes. Anything missing from the
 * dictionary falls through to English.
 */
export const DICT: Record<string, string> = {
  About: 'Acerca',
  Work: 'Experiencia',
  Studies: 'Estudios',
  Projects: 'Proyectos',
  Files: 'Archivos',
  Contact: 'Contacto',
  Stack: 'Stack',
  'Download CV ↓': 'Descargar CV ↓',
  'Open to new opportunities': 'Abierto a nuevas oportunidades',
  Software: 'Ingeniero',
  engineer: 'de software',
  "I'm Jorge — a Panamanian engineer building complex apps, AI-touched products, and the everyday work of features, APIs, tests, and deploys.":
    'Soy Jorge — un ingeniero panameño que construye aplicaciones complejas, productos con IA y el trabajo diario de funcionalidades, APIs, pruebas y despliegues.',
  'View work': 'Ver trabajo',
  'Get in touch': 'Contáctame',
  Name: 'Nombre',
  Location: 'Ubicación',
  Experience: 'Experiencia',
  Currently: 'Actualmente',
  'Featured stack': 'Stack destacado',
  '5+ years': '5+ años',
  'Senior SWE · Acme': 'SWE Senior · Acme',
  'Years shipping': 'Años desarrollando',
  'Production projects': 'Proyectos en producción',
  'Stacks & tools': 'Stacks y herramientas',
  'Cups of coffee': 'Tazas de café',
  'Engineering for an ever-changing industry.': 'Ingeniería para una industria en cambio constante.',
  "I work across the stack — typed-up Angular front-ends, Spring Boot APIs, mobile in Ionic and Swift, Python and AWS where the data lives — and I've spent the last couple of years building and deploying AI-touched products alongside the everyday work of features, code reviews, unit tests, and deploys.":
    'Trabajo a lo largo de todo el stack — front-ends en Angular tipados, APIs en Spring Boot, móvil en Ionic y Swift, Python y AWS donde viven los datos — y los últimos años los he dedicado a construir y desplegar productos con IA junto al trabajo diario de funcionalidades, revisiones de código, pruebas unitarias y despliegues.',
  'The thing I care about most is keeping the lights on for the teams I work with: small clear changes, tests that actually catch regressions, pull requests a teammate can read without needing a coffee first.':
    'Lo que más me importa es mantener todo funcionando para los equipos con los que trabajo: cambios pequeños y claros, pruebas que de verdad atrapan regresiones, y pull requests que un compañero pueda leer sin necesitar un café primero.',
  CURRENT: 'ACTUAL',
  'Senior Software Engineer': 'Ingeniero de Software Senior',
  'Software Engineer': 'Ingeniero de Software',
  'Junior Software Engineer': 'Ingeniero de Software Junior',
  Languages: 'Lenguajes',
  Frameworks: 'Frameworks',
  'Cloud & data': 'Cloud y datos',
  'Tooling & process': 'Herramientas y proceso',
  'Selected work.': 'Trabajo seleccionado.',
  'Selected work': 'Trabajo seleccionado',
  'PROJECT THUMBNAIL': 'MINIATURA DE PROYECTO',
  'PROJECT SCREENSHOT': 'CAPTURA DE PROYECTO',
  'DIPLOMA PREVIEW': 'VISTA DEL DIPLOMA',
  'Downloadable.': 'Descargables.',
  Downloadable: 'Descargables',
  'CV, certifications, and diplomas — direct downloads. The drop zone at the bottom is only visible to me when I’m signed in.':
    'CV, certificaciones y diplomas — descargas directas. La zona de carga al final solo es visible para mí cuando inicio sesión.',
  'Download →': 'Descargar →',
  'Descargar →': 'Descargar →',
  'Download PDF': 'Descargar PDF',
  'CV — English': 'CV — Inglés',
  'CV — Español': 'CV — Español',
  "Bachelor's Diploma": 'Diploma de Licenciatura',
  'AWS Solutions Architect': 'AWS Solutions Architect',
  'Java SE Certification': 'Certificación Java SE',
  'References Letter': 'Carta de Referencias',
  'Signed in as Jorge': 'Sesión iniciada como Jorge',
  'Drop files to add them to this list': 'Suelta archivos para añadirlos a esta lista',
  'PDF, PNG, JPG · only visible to you when logged in.':
    'PDF, PNG, JPG · solo visible para ti cuando inicias sesión.',
  "Let's build something.": 'Construyamos algo.',
  "Let's build something": 'Construyamos algo',
  'Fastest way to reach me is email — I usually answer within a day. Currently open to senior IC roles and small-team tech-lead positions.':
    'La forma más rápida de contactarme es por correo — suelo responder en un día. Actualmente abierto a roles senior IC y posiciones de tech-lead en equipos pequeños.',
  Email: 'Correo',
  Where: 'Dónde',
  '© 2026 Jorge L. Herrera · all rights reserved':
    '© 2026 Jorge L. Herrera · todos los derechos reservados',
  'Show diploma': 'Ver diploma',
  'Diploma / certificate file': 'Archivo de diploma / certificado',
  'Project URL (optional)': 'URL del proyecto (opcional)',
  'Drop a PDF or image here to attach the diploma. With a file attached, the card shows a “Show diploma” button.':
    'Suelta un PDF o imagen aquí para adjuntar el diploma. Con un archivo adjunto, la tarjeta muestra el botón “Ver diploma”.',
  'Add experience': 'Añadir experiencia',
  'Add study': 'Añadir estudio',
  'Add project': 'Añadir proyecto',
  Edit: 'Editar',
  Save: 'Guardar',
  Cancel: 'Cancelar',
  Delete: 'Eliminar',
  'Engineering for an ever-changing industry': 'Ingeniería para una industria en cambio constante',
  'Senior thesis on real-time event processing. Elective sequences in mobile and machine learning.':
    'Tesis de grado sobre procesamiento de eventos en tiempo real. Secuencias electivas en móvil y machine learning.',
  'Continuing-education work on AI / LLM deployment patterns. Credential downloadable below.':
    'Educación continua sobre patrones de despliegue de IA / LLM. Credencial descargable abajo.',
  'B.Sc. Software Engineering': 'Lic. en Ingeniería de Software',
  Overview: 'Resumen',
  Screenshots: 'Capturas',
  Role: 'Rol',
  When: 'Cuándo',
  'Back to projects': 'Volver a proyectos',
  Close: 'Cerrar',
  'View project': 'Ver proyecto',
};

export type Translate = (key: string) => string;

export const LangContext = createContext<{ lang: Lang; t: Translate }>({
  lang: 'en',
  t: (key) => key,
});

export function useI18n() {
  return useContext(LangContext);
}

export function makeTranslate(lang: Lang): Translate {
  if (lang === 'en') return (key) => key;
  return (key) => DICT[key] ?? key;
}
