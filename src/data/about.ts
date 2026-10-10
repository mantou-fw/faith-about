/**
 * Content for the About page.
 *
 * Everything the page renders is declared here so the markup stays structural
 * and the copy can be edited without touching components.
 */

export interface Favorite {
  label: string;
  image: string;
  imdbUrl?: string;
}

export interface StackItem {
  name: string;
  /** simple-icons slug — maps to an icon in `src/components/site/icons/` */
  slug: 'astro' | 'svelte' | 'react' | 'typescript' | 'python';
}

export interface Project {
  name: string;
  href: string;
  description: string;
  image: string;
  imageClassName?: string;
}

export interface Article {
  title: string;
  href: string;
  excerpt: string;
  date: string;
}

export const profile = {
  name: 'Faith LI',
  role: 'Founder, HTIFA',
  location: 'Taiwan',
  email: 'mantou.fw@gmail.com',
  github: 'https://github.com/faithli-dev',
  x: 'https://x.com',
  about: 'About me',
} as const;

export const story: string[] = [
  "I've been writing code for several years now, working across both frontend and backend. My focus is on creating products that balance clean design, solid architecture, and great user experience.",
  "I care about clarity, simplicity, and craftsmanship — not just in code, but in how things feel to use. I like tools that are lightweight and flexible, and I believe that the best products are the ones that stay out of the user's way.",
  "Hey — I'm Faith, a founder who loves turning ideas into real, working products. I enjoy the craft of building — the small details that make software feel thoughtful, fast, and alive.",
];

export const favoriteMovies: Favorite[] = [
  { label: 'F1', image: '/images/about/movies/f1.webp' , imdbUrl: 'https://www.imdb.com/title/tt16311594/' },
  { label: 'Home Alone', image: '/images/about/movies/home-alone.webp' , imdbUrl: 'https://www.imdb.com/title/tt0099785/' },
  {
    label: 'Mission Impossible Franchise',
    image: '/images/about/movies/mission-impossible.webp',
    imdbUrl: 'https://www.imdb.com/title/tt0117060/',
  },
  { label: 'Rain Man', image: '/images/about/movies/rain-man.webp' , imdbUrl: 'https://www.imdb.com/title/tt0095953/' },
  { label: 'Top Gun Maverick', image: '/images/about/movies/top-gun-maverick.webp' , imdbUrl: 'https://www.imdb.com/title/tt1745960/' },
  {
    label: 'The Shawshank Redemption',
    image: '/images/about/movies/shawshank-redemption.webp',
    imdbUrl: 'https://www.imdb.com/title/tt0111161/',
  },
];

export const favoriteCars: Favorite[] = [
  { label: 'Nissan Skyline GT-R', image: '/images/about/cars/nissan-skyline.webp' },
  { label: 'Honda Civic Type-R', image: '/images/about/cars/honda-civic.webp' },
  { label: 'Audi R8', image: '/images/about/cars/audi-r8.webp' },
  { label: 'BMW M5', image: '/images/about/cars/bmw-m5.webp' },
  { label: 'Xiaomi SU7', image: '/images/about/cars/xiaomi-su7.webp' },
  { label: 'Mercedes-Benz S-Class', image: '/images/about/cars/mercedes-s-class.webp' },
];

export const stack: StackItem[] = [
  { name: 'Astro', slug: 'astro' },
  { name: 'Svelte', slug: 'svelte' },
  { name: 'React', slug: 'react' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Python', slug: 'python' },
];

export const projects: Project[] = [
  {
    name: 'HTIFA',
    href: 'https://htifa.com',
    description: 'Taiwan operations for foreign SMEs',
    image: '/images/projects/echo-ui/cover.webp',
    imageClassName: 'object-[center_20%]',
  },
  {
    name: 'JustOS',
    href: 'https://github.com/faithli-dev',
    description: 'Productivity OS for creators',
    image: '/images/projects/justos/cover.svg',
    imageClassName: 'size-24 dark:invert',
  },
];

export const articles: Article[] = [
  {
    title: 'Scaling a side project to 10k users',
    href: '/articles/scaling-side-project',
    excerpt:
      "What started as a weekend idea slowly turned into a product used by thousands. Here’s what I learned about infrastructure, patience, and why “just ship it” only works when you're ready to handle what comes next.",
    date: 'Nov 4, 2025',
  },
  {
    title: 'Why I still love writing vanilla JavaScript',
    href: '/articles/vanilla-javascript',
    excerpt:
      "Even with frameworks evolving every month, I keep coming back to plain JavaScript. There's something pure about writing logic that runs instantly in the browser — no setup, no build step, just you and the code.",
    date: 'Nov 1, 2025',
  },
  {
    title: 'Thinking in components',
    href: '/articles/thinking-in-components',
    excerpt:
      "Building modern interfaces isn't about pages anymore — it's about systems. Thinking in components changes how you design, code, and even debug. Once you get it, you'll never build the same way again.",
    date: 'Oct 25, 2025',
  },
];