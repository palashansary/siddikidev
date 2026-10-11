// Static site content.
//
// This is what the site renders before the database responds, and what it
// keeps rendering if the database is down, empty, or returns something
// malformed — so the site never breaks. Anything saved from the admin panel
// overrides the matching section here.
//
// To make this file match what is live, use Admin → Data → "Export JSON"
// and paste the result over the object below.
//
// Image paths point at /public so they stay stable across builds (they can
// be stored in the database as-is).

export const siteContent = {
  profile: {
    name: "Abdul Hai Siddiki Ansary",
    email: "palashansary@gmail.com",
  },

  seo: {
    title: "Abdul Hai Siddiki Ansary | Full Stack Developer",
    description:
      "Full Stack Developer with 3 years of experience building Vue.js, Nuxt.js and React.js frontends and Node.js APIs.",
  },

  hero: {
    headline: "Inspiring Innovation, Transforming Web Experiences.",
    intro:
      "I am Siddiki, a Full Stack Developer skilled in Vue.js, Nuxt.js, React.js and Node.js. Creating exceptional web experiences by blending cutting-edge technologies with a keen eye for detail.",
    ctaLabel: "Get in touch",
    ctaUrl: "/contact",
  },

  about: {
    greeting: "Greetings!",
    body: "I'm Abdul Hai Siddiki Ansary, a Computer Science graduate from the University of Kalyani and a Full Stack Developer with 3 years of experience building fast, reliable web applications. I work across Vue.js, Nuxt.js and React.js on the frontend and Node.js/Express on the backend, and I've shipped production features for enterprise HR SaaS, online gaming and e-commerce products. I care deeply about performance and clean, reusable code: I've cut load times by 30% with code splitting and lazy loading, and built shared component libraries that reduced UI development effort by 25%. Currently at Dokume India, I'm building an enterprise HR management system with multi-tenant access control. Let's turn ideas into captivating realities together!",
  },

  // Numbers shown under the About text; they count up when scrolled into view.
  stats: [
    { id: "years", value: "3+", label: "Years of experience" },
    { id: "load", value: "30%", label: "Faster load times" },
    { id: "delivery", value: "20%", label: "Faster feature delivery" },
    { id: "effort", value: "25%", label: "Less UI dev effort" },
  ],

  // Newest first. `highlights`: one bullet per line. `tech`: comma separated.
  experience: [
    {
      id: "dokume",
      role: "Full Stack Developer",
      company: "Dokume India Pvt Ltd",
      period: "Feb 2026 – Present",
      highlights:
        "Building an enterprise HR management system and admin console in Vue.js and React.js on a Node.js/Express backend.\nImplemented multi-tenant RBAC, authentication flows and granular module-level permissions per client.\nDesigned REST APIs on PostgreSQL and MySQL, tuning indexes and slow queries behind high-volume listing and reporting screens.\nBuilt a shared Vue.js/React.js component library used across teams, cutting UI development time by 25%.",
      tech: "Vue.js, React.js, Node.js, Express, PostgreSQL, MySQL, Docker",
    },
    {
      id: "fple",
      role: "Full Stack Developer",
      company: "Fple Technology Pvt Ltd",
      period: "Nov 2023 – Jan 2026",
      highlights:
        "Improved load performance by 30% across production apps with route-level code splitting, lazy loading and Vite build optimization.\nBuilt the player-facing online gaming platform in Vue.js and Pinia, with real-time leaderboards over WebSockets.\nDeveloped an SSR Nuxt.js e-commerce storefront with faceted search, cart and checkout flows.\nAccelerated feature delivery by 20% with reusable components and configured GitHub Actions CI/CD pipelines.",
      tech: "Vue.js, Nuxt.js, Pinia, Node.js, WebSockets, GraphQL, Tailwind CSS",
    },
  ],

  projectsSection: {
    intro:
      "The following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described, with a live demo.",
  },

  projects: [
    {
      id: "shoe-store",
      name: "Shoe Store",
      image: "/images/projects/shoestore.webp",
      description:
        "A modern-looking shoe store built with the latest on-demand technologies: Next.js and Tailwind CSS.",
      link: "https://nike-shop-eta.vercel.app/",
      showOnHome: true,
    },
    {
      id: "youtube-app",
      name: "Youtube App",
      image: "/images/projects/youtube.webp",
      description:
        "An innovative YouTube application built with React, Tailwind and the YouTube API from RapidAPI.",
      link: "https://nxtgenyoutubeapp.netlify.app",
      showOnHome: true,
    },
    {
      id: "react-quiz",
      name: "React Quiz App",
      image: "/images/projects/reactquiz.webp",
      description:
        "Discover the React Quiz App, where engaging quizzes meet seamless user-friendliness.",
      link: "https://react-quiz-nxtgen.netlify.app",
      showOnHome: true,
    },
    {
      id: "forkify",
      name: "Food Recipe App",
      image: "/images/projects/forkify.webp",
      description:
        "Forkify, your ultimate food recipe app! Explore mouthwatering recipes, personalized collections and hassle-free shopping lists.",
      link: "https://forkifyofpalash.netlify.app",
      showOnHome: true,
    },
    {
      id: "real-estate",
      name: "Real Estate",
      image: "/images/projects/realestate.webp",
      description:
        "A real estate website that showcases professionalism and simplicity, setting industry standards.",
      link: "https://palashansary.github.io/RealEstateBeta2.0/",
      showOnHome: true,
    },
    {
      id: "weatherly",
      name: "Weatherly",
      image: "/images/projects/weather.webp",
      description:
        "Real-time weather updates with precision. Explore forecasts and conditions effortlessly with Weatherly. Stay informed, stay prepared.",
      link: "https://weatherappnxt.netlify.app",
      showOnHome: true,
    },
  ],

  // variant "full":   the image fills the tile (3D renders like HTML/CSS/JS)
  // variant "framed": the image sits on a white rounded card (flat logos)
  // padding:          inner spacing around the image, in % of the card
  skills: [
    { id: "html", name: "HTML5", image: "/images/skills/html.webp", variant: "full", bgFrom: "#fb7185", bgTo: "#ef4444", padding: 0 },
    { id: "css", name: "CSS3", image: "/images/skills/css.webp", variant: "full", bgFrom: "#818cf8", bgTo: "#22d3ee", padding: 0 },
    { id: "js", name: "JavaScript", image: "/images/skills/js.webp", variant: "full", bgFrom: "#fde68a", bgTo: "#fde047", padding: 0 },
    { id: "typescript", name: "TypeScript", image: "/images/skills/typescript.svg", variant: "framed", bgFrom: "#3178c6", bgTo: "#1e4f8a", padding: 14 },
    { id: "vue", name: "Vue.js", image: "/images/skills/vue.svg", variant: "framed", bgFrom: "#42b883", bgTo: "#35495e", padding: 12 },
    { id: "nuxt", name: "Nuxt.js", image: "/images/skills/nuxt.svg", variant: "framed", bgFrom: "#00dc82", bgTo: "#003c3c", padding: 12 },
    { id: "react", name: "React.js", image: "/images/skills/react.webp", variant: "framed", bgFrom: "#5b21b6", bgTo: "#5b21b6", padding: 0 },
    { id: "next", name: "Next.js", image: "/images/skills/next.webp", variant: "framed", bgFrom: "#18181b", bgTo: "#18181b", padding: 0 },
    { id: "redux", name: "Redux Toolkit", image: "/images/skills/redux.webp", variant: "framed", bgFrom: "#5b21b6", bgTo: "#9333ea", padding: 0 },
    { id: "pinia", name: "Pinia", image: "/images/skills/pinia.svg", variant: "framed", bgFrom: "#facc15", bgTo: "#65a30d", padding: 12 },
    { id: "tailwind", name: "Tailwind CSS", image: "/images/skills/tailwind.webp", variant: "framed", bgFrom: "#22d3ee", bgTo: "#22d3ee", padding: 0 },
    { id: "node", name: "Node.js", image: "/images/skills/node.svg", variant: "framed", bgFrom: "#3c873a", bgTo: "#1f4d1e", padding: 12 },
    { id: "express", name: "Express.js", image: "/images/skills/express.svg", variant: "framed", bgFrom: "#52525b", bgTo: "#18181b", padding: 14 },
    { id: "graphql", name: "GraphQL", image: "/images/skills/graphql.svg", variant: "framed", bgFrom: "#e10098", bgTo: "#86005a", padding: 12 },
    { id: "postgresql", name: "PostgreSQL", image: "/images/skills/postgresql.svg", variant: "framed", bgFrom: "#336791", bgTo: "#1e3a5f", padding: 12 },
    { id: "mysql", name: "MySQL", image: "/images/skills/mysql.svg", variant: "framed", bgFrom: "#00758f", bgTo: "#f29111", padding: 10 },
    { id: "mongodb", name: "MongoDB", image: "/images/skills/mongodb.svg", variant: "framed", bgFrom: "#13aa52", bgTo: "#0b5e2d", padding: 12 },
    { id: "docker", name: "Docker", image: "/images/skills/docker.svg", variant: "framed", bgFrom: "#2496ed", bgTo: "#1d4ed8", padding: 10 },
    { id: "github", name: "GitHub", image: "/images/skills/github.webp", variant: "full", bgFrom: "#18181b", bgTo: "#1c1917", padding: 0 },
  ],

  resume: {
    url: "/cv/Abdul_Hai_Siddiki_Ansary_Resume.pdf",
    fileName: "Abdul_Hai_Siddiki_Ansary_Resume.pdf",
  },

  socials: [
    {
      id: "linkedin",
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abdul-hai-siddiki-ansary-345433285/",
      icon: "/images/social/linkedin.webp",
    },
    {
      id: "gmail",
      name: "Email",
      url: "mailto:palashansary@gmail.com",
      icon: "/images/social/gmail.webp",
    },
    {
      id: "github",
      name: "GitHub",
      url: "https://github.com/palashansary",
      icon: "/images/social/github.webp",
    },
  ],

  footer: {
    tagline: "Innovating Next-gen web apps that meet the needs of users",
  },
};

// Blog posts shown if the database can't be reached. Same shape as a post
// from the admin panel: { slug, title, excerpt, coverImage, tags,
// publishedAt (ms timestamp), content (markdown) }.
export const fallbackPosts = [];

// Icons offered in the admin panel when adding a social link.
export const socialIconPresets = [
  "/images/social/linkedin.webp",
  "/images/social/gmail.webp",
  "/images/social/github.webp",
  "/images/social/twitter.webp",
  "/images/social/facebook.webp",
];
