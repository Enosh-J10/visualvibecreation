export const siteConfig = {
  name: 'Visual Vibe Creation',
  founder: 'Enosh Jaques',
  jobTitle: 'Founder & Creative Developer',
  title: 'Visual Vibe Creation | Independent Creative Digital Studio',
  description:
    'Visual Vibe Creation is the independent creative digital studio founded by Enosh Jaques, offering software development, UI/UX design, mobile app development, motion graphics, and video editing services in the UK.',
  url: 'https://www.visualvibecreation.com',
  ogImage: 'https://www.visualvibecreation.com/assets/images/ej-logo.jpg',
  links: {
    github: 'https://github.com/Enosh-J10',
    linkedin: 'https://www.linkedin.com/in/enosh-jaques-b93817302',
    email: 'hello@visualvibecreation.com',
  },
  routes: [
    { path: '', label: 'Home', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/about', label: 'About', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/portfolio', label: 'Portfolio', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/services', label: 'Services', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', label: 'Contact', priority: 0.8, changeFrequency: 'monthly' as const },
  ],
} as const;
