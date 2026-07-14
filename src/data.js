// All portfolio content, extracted from the original bundled page.

export const RESUME_URL = `${import.meta.env.BASE_URL}Saurabh_Singh_Resume.pdf`

export const CONTACT = {
  email: 'saurabhsingh.93011@gmail.com',
  phone: '+917600893011',
  linkedin: 'https://www.linkedin.com/in/saurabh-singh-520180282/',
  github: 'https://github.com/Saurabh-2342',
}

export const PROJECTS = [
  {
    n: '01',
    title: 'Hand Mouse',
    tag: 'Gesture-Controlled Cursor',
    desc: 'A real-time computer-vision virtual mouse — hand tracking translates finger gestures from a webcam into cursor movement, clicks, and scroll, with a live on-screen overlay. Fully modular Python (tracker, gesture detector, controller, overlay).',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI'],
    grad: 'linear-gradient(135deg,#1F8A5B,var(--a3))',
    gh: '',
    live: '',
  },
  {
    n: '02',
    title: 'Circuit Guard',
    tag: 'Real-time Fault Detection',
    desc: 'An AI decision agent processing live sensor readings to classify 5+ electrical fault types at 90%+ accuracy and recommend corrective actions — a fully automated safety-monitoring pipeline that cut manual inspection ~60%.',
    tech: ['Python', 'scikit-learn', 'FastAPI', 'Random Forest / SVM'],
    grad: 'linear-gradient(135deg,var(--a1),var(--a2))',
    gh: 'https://github.com/Saurabh-2342/CircuitGuard_Pcb',
    live: '',
  },
  {
    n: '03',
    title: 'Workflow Automation',
    tag: 'Enterprise Agentic Pipeline',
    desc: 'Multi-step agentic workflows in n8n integrating Google Drive and Sheets for automated data extraction, transformation, and delivery — packaged as reusable, trigger-based JSON templates with zero manual intervention.',
    tech: ['n8n', 'Google Drive API', 'Google Sheets API', 'Automation'],
    grad: 'linear-gradient(135deg,var(--a2),var(--a3))',
    gh: 'https://github.com/Saurabh-2342',
    live: '',
  },
  {
    n: '04',
    title: 'Movie Recommender',
    tag: 'AI Recommendation Engine',
    desc: 'Content-based recommendation engine using cosine similarity, deployed as a Streamlit app with live TMDb integration for posters, genres, and trailers — an end-to-end ML pipeline shipped to the browser.',
    tech: ['Python', 'Streamlit', 'scikit-learn', 'TMDb API'],
    grad: 'linear-gradient(135deg,var(--a3),var(--a1))',
    gh: 'https://github.com/Saurabh-2342/movie-recommender-system',
    live: '',
  },
]

export const EXPERIENCE = [
  {
    role: 'Data Scientist Intern',
    org: 'Infosys Springboard · Ahmedabad',
    date: 'Sep 2025 — Nov 2025',
    desc: 'Built Circuit Guard — an ML system classifying 5+ electrical fault types from sensor data at 90%+ accuracy, cutting manual inspection ~60%. Designed a real-time ingestion & alert pipeline mirroring agentic AI decision loops, served via FastAPI.',
  },
  {
    role: 'B.Tech — Computer Science (AI & ML)',
    org: 'Adani University · Ahmedabad',
    date: '2023 — Expected May 2027',
    desc: 'Coursework in Machine Learning, Deep Learning, Data Science, Web Development, and DSA. Building a foundation across the full AI + product stack.',
  },
  {
    role: 'ML Branch Lead · Coding Club',
    org: 'Adani University',
    date: 'Ongoing',
    desc: 'Active member of the Machine Learning branch; led peer-learning sessions on ML model building and Python best practices.',
  },
]

export const CAPABILITIES = [
  {
    label: 'AI / ML',
    desc: 'Models, training & evaluation',
    color: 'var(--a1)',
    skills: ['Python', 'TensorFlow', 'Keras', 'scikit-learn', 'Pandas', 'NumPy', 'Model Evaluation', 'Feature Engineering'],
  },
  {
    label: 'AI Agents & Automation',
    desc: 'Agentic workflows that run themselves',
    color: 'var(--a2)',
    skills: ['n8n', 'Workflow Automation', 'API Integration', 'Real-time Pipelines', 'Agentic Design'],
  },
  {
    label: 'Backend',
    desc: 'APIs & services that scale',
    color: 'var(--a3)',
    skills: ['FastAPI', 'REST APIs', 'Python', 'C++'],
  },
  {
    label: 'Frontend & Tools',
    desc: 'Interfaces & the daily kit',
    color: 'var(--a-soft)',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Streamlit', 'Git', 'GitHub'],
  },
]

export const REPOS = [
  {
    name: 'CircuitGuard_Pcb',
    href: 'https://github.com/Saurabh-2342/CircuitGuard_Pcb',
    desc: 'Real-time electrical fault detection agent.',
    glow: 'var(--a1-rgb)',
    lang: 'Python',
  },
  {
    name: 'movie-recommender-system',
    href: 'https://github.com/Saurabh-2342/movie-recommender-system',
    desc: 'Content-based recommender with TMDb.',
    glow: 'var(--a2-rgb)',
    lang: 'Python',
  },
]

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#resume', label: 'Résumé' },
]

// The four palettes from the original theme system. Ember is the default.
export const THEMES = {
  blue: { a1: '#4D7CFF', a2: '#8B5CF6', a3: '#22D3EE', soft: '#8FB0FF', a2soft: '#C4B5FD', a3soft: '#67E8F9', a1rgb: '77,124,255', a2rgb: '139,92,246', a3rgb: '34,211,238' },
  ember: { a1: '#FF7A45', a2: '#F43F5E', a3: '#FBBF24', soft: '#FFC08A', a2soft: '#FDA4AF', a3soft: '#FDE68A', a1rgb: '255,122,69', a2rgb: '244,63,94', a3rgb: '251,191,36' },
  emerald: { a1: '#10B981', a2: '#14B8A6', a3: '#A3E635', soft: '#6EE7B7', a2soft: '#5EEAD0', a3soft: '#D9F99D', a1rgb: '16,185,129', a2rgb: '20,184,166', a3rgb: '163,230,53' },
  violet: { a1: '#A855F7', a2: '#EC4899', a3: '#6366F1', soft: '#D8B4FE', a2soft: '#F9A8D4', a3soft: '#C7D2FE', a1rgb: '168,85,247', a2rgb: '236,72,153', a3rgb: '99,102,241' },
}
