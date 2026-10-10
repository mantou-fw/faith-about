import { projects, profile } from './portfolio.json';

export const portfolioRoutes = [
  { path: '/', title: profile.name },
  { path: '/projects', title: `Projects · ${profile.name}` },
  { path: '/about', title: `About · ${profile.name}` },
  ...projects.map((project) => ({ path: `/projects/${project.slug}`, title: `${project.name} · ${profile.name}` })),
];
