/**
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — Dr. Muhammad Osama Riaz
 * ─────────────────────────────────────────────────────────────
 *  Every piece of copy, credential, and image on the site lives
 *  here. Components only read from this file.
 *
 *  Values wrapped in [BRACKETS] are still placeholders — replace
 *  them with verified details (phone number, etc.).
 *
 *  Portrait, story and about-detail photography is of Dr. Osama
 *  (AI-upscaled from the originals); ZindagiCare images are from
 *  the ZindagiCare poster. All other photography is licensed stock
 *  (Unsplash) of rooms and equipment only — no other clinicians.
 * ─────────────────────────────────────────────────────────────
 */

const img = (name, alt) => ({
  src: `/img/${name}-2000.webp`,
  srcSet: `/img/${name}-1000.webp 1000w, /img/${name}-2000.webp 2000w`,
  alt,
})

const ZINDAGICARE_URL = 'https://zindagicare.com'
// Every "Book a Consultation" button on the site links here.
const BOOKING_URL = 'https://www.zindagicare.com/admin/doctors/review/6a33b540a4b44aae934c9b6c'

export const doctor = {
  name: 'Dr. Muhammad Osama Riaz',
  shortName: 'Dr. Osama',
  specialty: 'General Physician',
  city: 'Lahore',
  signatureLine: 'Listen. Explain. Care.',
  portrait: img('doctor', 'Dr. Muhammad Osama Riaz, seated at his desk wearing scrubs and a stethoscope'),
}

export const contact = {
  // Consultations are booked through ZindagiCare.
  bookingHref: BOOKING_URL,
  email: null, // e.g. 'appointments@zindagicare.com' — hidden while null
  addressLines: ['Shalamar Hospital', 'Lahore, Pakistan'],
  languages: 'English, Urdu',
  social: [{ label: 'ZindagiCare', href: ZINDAGICARE_URL }],
}

export const freeCare = {
  long: 'If you don’t have the money to pay, you can get a free consultation. No one should go without medical advice because of cost.',
}

export const nav = {
  links: [
    { label: 'About', href: '#about' },
    { label: 'Care', href: '#specialties' },
    { label: 'ZindagiCare', href: '#zindagicare' },
    { label: 'Reviews', href: '#reviews' },
  ],
  cta: { label: 'Book a Consultation', href: BOOKING_URL },
}

export const hero = {
  eyebrow: 'General Physician — Lahore',
  headline: ['Medicine that', 'listens.'],
  body: 'Attentive, clearly explained care — at the clinic, online, or at home.',
  primaryCta: { label: 'Book a Consultation', href: BOOKING_URL },
  background: img('hero-bg', ''),
  portrait: doctor.portrait,
}

export const introduction = {
  lines: ['Medicine is science.', 'Diagnosis is attention.', 'Care is personal.'],
  body: 'Most health concerns begin with a general physician. My aim is simple: take the time to understand what you are experiencing, explain it clearly, and stay with you until it is resolved.',
}

export const specialties = {
  eyebrow: 'Areas of care',
  title: ['Areas', 'of care.'],
  intro: 'A general physician is the first point of care for most health concerns — and a steady guide for the ones that last.',
  items: [
    {
      name: 'General Medicine',
      text: 'Fevers, infections, aches and everyday concerns — assessed carefully, explained clearly, and treated with the right medication.',
      image: img('spec-1', 'A stethoscope resting on a white sheet'),
    },
    {
      name: 'Diabetes & Endocrine Care',
      text: 'Informed by his time as Medical Officer in the Endocrinology Department at Shalamar Hospital — diabetes, thyroid and hormonal concerns, managed over time.',
      image: img('spec-2', 'Stethoscope and medication on a white surface'),
    },
    {
      name: 'Asthma & Respiratory Care',
      text: 'Coughs, breathlessness and asthma — diagnosed properly, with medication and inhaler use explained step by step.',
      image: img('spec-3', 'Glass medication vials and ampoules'),
    },
    {
      name: 'Long-term Conditions',
      text: 'Blood pressure and other ongoing conditions, with regular follow-up rather than one-off visits.',
      image: img('spec-4', 'Blister packs of daily medication'),
    },
    {
      name: 'Online & Home Consultations',
      text: 'Secure video consultations and home visits through ZindagiCare, so care reaches patients wherever they are.',
      image: img('spec-5', 'A laptop and stethoscope on a desk, ready for an online consultation'),
    },
  ],
}

export const story = {
  eyebrow: 'The physician',
  lines: ['Experience matters.', 'So does listening.'],
  caption: 'Every consultation starts with time — to understand the history, the concern, and the person.',
  background: img('story-bg', ''),
  foreground: img('story-fg', 'Dr. Osama in theatre scrubs, examining a surgical specimen with a senior colleague'),
}

export const about = {
  eyebrow: 'About',
  title: ['Expertise you can feel.', 'Care you can trust.'],
  bio: [
    'Dr. Muhammad Osama Riaz is a PMDC-registered General Physician practising at Shalamar Hospital, Lahore.',
    'A graduate of Shalamar Medical College, he served as Medical Officer in the Endocrinology Department at Shalamar Hospital and is Medical Incharge of the Maryam Nawaz Health Clinic in Pendorian, Sanghla. He is also Co-Founder & CEO of ZindagiCare, a digital healthcare platform working to make quality care accessible across Pakistan.',
    'Patients describe him the same way: he listens carefully, explains everything clearly, and makes people feel heard.',
  ],
  portrait: doctor.portrait,
  detail: img('about-detail', 'Dr. Osama guiding a hands-on surgical skills workshop'),
  /**
   * Set `value` to a number to enable the count-up animation;
   * otherwise `placeholder` text is shown as-is.
   */
  credentials: [
    { label: 'Registration', value: null, placeholder: 'PMDC', note: 'Pakistan Medical & Dental Council' },
    { label: 'Qualification', value: null, placeholder: 'MBBS', note: 'Shalamar Medical College · 2023' },
    { label: 'Years of Experience', value: 3, suffix: '+', note: 'In clinical practice' },
    { label: 'Patient Rating', value: null, placeholder: '5.0 / 5', note: 'From 4 patient reviews' },
  ],
  details: [
    { label: 'Previously', items: ['Medical Officer, Endocrinology Department — Shalamar Hospital'] },
    {
      label: 'Practices at',
      items: ['Shalamar Hospital — Lahore', 'Medical Incharge, Maryam Nawaz Health Clinic — Pendorian, Sanghla'],
    },
    { label: 'Languages', items: ['English, Urdu'] },
  ],
}

export const approach = {
  eyebrow: 'The approach',
  title: ['Three principles.', 'One approach.'],
  principles: [
    { name: 'Listen', text: 'Understanding the patient comes before recommending treatment.' },
    { name: 'Explain', text: 'Every diagnosis and prescription is explained clearly, so you know what is happening and why.' },
    { name: 'Reach', text: 'Care should reach everyone — at the clinic, online, at home, and free for those who cannot pay.' },
  ],
}

export const zindagiCare = {
  eyebrow: 'ZindagiCare',
  title: ['Care,', 'connected.'],
  role: 'Co-Founder & CEO',
  lead: 'ZindagiCare is a digital healthcare platform built to make quality healthcare more accessible, convenient, and connected across Pakistan.',
  body: 'As Co-Founder & CEO, Dr. Osama leads the healthcare and business side of ZindagiCare — bringing together qualified medical professionals, patients, and healthcare services through one technology-driven platform.',
  partner: 'Built in partnership with Ibrahim Bajwa, Founder of TechCognify.',
  services: [
    { name: 'Online Doctor Consultations', text: 'Secure video consultations with PMDC-verified doctors.' },
    { name: 'Urgent Care', text: 'Fast access to a doctor through video consultation.' },
    { name: 'Home Healthcare', text: 'Doctor and nurse visits at the patient’s home.' },
    { name: 'Home Physiotherapy', text: 'Professional physiotherapy delivered at home.' },
    { name: 'Free Sunday Consultations', text: 'Free 10-minute online consultations every Sunday.' },
    { name: 'Healthcare Network', text: 'Doctors, diagnostics and hospital-based care, connected.' },
  ],
  vision: 'A more connected healthcare ecosystem, where patients move easily between online care, home healthcare, diagnostics, doctors and hospitals — instead of navigating disconnected services on their own.',
  cta: { label: 'Visit ZindagiCare', href: ZINDAGICARE_URL },
  images: [
    {
      ...img('zc-1', 'ZindagiCare poster: Healthcare that comes home — in-house medical services in Lahore, with Dr. Osama'),
      caption: 'Fig. 01 — Healthcare that comes home',
      poster: true,
    },
    { ...img('zc-2', 'ZindagiCare services: in-house medical services, home physiotherapy, online consultation, Sunday free consult and urgent care'), caption: 'Fig. 02 — Services' },
    { ...img('zc-3', 'Quality care at your doorstep: verified professionals, quick response, secure records, transparent pricing'), caption: 'Fig. 03 — At your doorstep' },
    { ...img('zc-4', 'Dr. Osama for ZindagiCare'), caption: 'Fig. 04 — Doctor at home' },
  ],
}

export const operatingRoom = {
  eyebrow: 'In the clinic',
  lines: ['Behind every consultation', 'is a person, a history,', 'and a responsibility.'],
  meta: ['Person', 'History', 'Responsibility'],
  image: img('or', 'A quiet, empty examination room'),
}

export const journey = {
  eyebrow: 'Patient journey',
  title: ['A clear path,', 'step by step.'],
  steps: [
    { name: 'Consultation', text: 'In person, online, or at home — understanding your concerns.' },
    { name: 'Assessment', text: 'History, examination, and any tests that are genuinely needed.' },
    { name: 'Diagnosis', text: 'What is happening, explained in plain language.' },
    { name: 'Treatment', text: 'The right medication and advice, with clear instructions.' },
    { name: 'Follow-up', text: 'Checking progress and adjusting care until you are better.' },
  ],
}

export const testimonials = {
  eyebrow: 'Patient reviews',
  rating: '5.0',
  count: 4,
  disclaimer: 'Reviews shared by patients. Individual experiences vary.',
  items: [
    {
      quote: 'I liked how attentive Dr Osama was and how keen. Made me feel heard, and I love the fact that the session was very easy-going and super helpful in knowing my symptoms and my own health.',
      author: 'Seerat Hassan',
      context: '23 Aug 2026',
    },
    {
      quote: 'I had severe asthma, and Dr. Usama diagnosed me well and prescribed the right medication. Alhamdulillah, I’m much better now. He listens carefully, explains everything clearly, and is highly recommended!',
      author: 'Ibrahim Aslam',
      context: '21 Aug 2026',
    },
    {
      quote: 'Dr shaib, men to alfaz ada nhin kr skta ap ke shokr krne ka, ap ka bht bht shokrya, dil khosh kr dya, allah ap ko ajar de de, itna de itna de ke ap ke weham o guman me b na ho, Allah ap ko ajar de',
      translation: 'Doctor sahib, I can’t find the words to thank you. Thank you so very much — you made my heart glad. May Allah reward you, more than you could ever imagine.',
      author: 'Muhammad',
      context: '23 Aug 2026',
    },
  ],
}

export const resources = {
  eyebrow: 'Resources',
  title: ['Understanding', 'your options.'],
  intro: 'Practical guidance to help you get the most from your consultation.',
  // Replace `href` with links to the corresponding articles when available.
  items: [
    { topic: 'What to expect in your first consultation', text: 'How the appointment works, what to bring, and what to mention.', href: '#contact', image: img('res-1', '') },
    { topic: 'Preparing for an online consultation', text: 'A quiet space, your medication list, and any recent reports.', href: '#zindagicare', image: img('res-2', '') },
    { topic: 'Free Sunday consultations', text: 'Free 10-minute online consultations every Sunday through ZindagiCare.', href: '#zindagicare', image: img('res-3', '') },
    { topic: 'Questions to ask your doctor', text: 'A short list to help you understand your diagnosis and treatment.', href: '#contact', image: img('res-4', '') },
  ],
}

export const finalCta = {
  lines: ['Your next step', 'starts with a conversation.'],
  body: 'Book a consultation to discuss your concerns, your treatment options, and the path forward — in person at Shalamar Hospital, or online through ZindagiCare.',
  primary: 'Book on ZindagiCare',
  secondary: 'Free Sunday Consultations',
  secondaryHref: '#zindagicare',
}

export const footer = {
  links: [
    { label: 'About', href: '#about' },
    { label: 'Areas of care', href: '#specialties' },
    { label: 'Approach', href: '#approach' },
    { label: 'ZindagiCare', href: '#zindagicare' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ],
  // Replace with real policy pages.
  legal: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms', href: '#terms' },
    { label: 'Medical Disclaimer', href: '#disclaimer' },
  ],
  disclaimer: 'The information on this website is for general educational purposes and is not a substitute for professional medical advice. In an emergency, go to the nearest hospital emergency department.',
}
