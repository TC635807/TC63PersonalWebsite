# https://github.com/onwidget/astrowind

ok: true
title: GitHub - arthelokyo/astrowind: ⭕️ AstroWind: A free template using Astro v7 and Tailwind CSS v4. Astro starter theme.
error: 

🌟 Most starred & forked Astro theme in 2022, 2023, 2024 & 2025. 🌟
AstroWind is a free and open-source template to make your website using Astro v7 + Tailwind CSS v4. Ready to start a new project and designed taking into account web best practices.
- ✅ Production-ready scores in PageSpeed Insights reports.
- ✅ 30+ page-section widgets (heroes, features, bento, tabs, pricing with comparison table, FAQ accordion, testimonials, team, timeline, gallery, projects, countdown, newsletter…) typed and composable.
- ✅ Integration with Tailwind CSS v4 supporting Dark mode and RTL.
- ✅ Fast and SEO friendly blog with automatic RSS feed, MDX support, Categories & Tags, Social Share, ...
- ✅ Image Optimization (using new Astro Assets and Unpic for Universal image CDN).
- ✅ Generation of project sitemap based on your routes.
- ✅ Open Graph tags for social media sharing.
- ✅ Analytics built-in Google Analytics integration.
- ✅ shadcn/ui-compatible design tokens (bg-background ,text-foreground ,border-border …) derived from the theme variables.
- ✅ AI-ready: AGENTS.md and step-by-step skills in.agents/skills/ for Claude Code, Codex, Cursor and similar tools.
Table of Contents
📌 https://astrowind.vercel.app/
npm create astro@latest -- --template arthelokyo/astrowind
AstroWind tries to give you quick access to creating a website using Astro v7 + Tailwind CSS v4. It's a free theme which focuses on simplicity, good practices and high performance.
Very little vanilla javascript is used only to provide basic functionality so that each developer decides which framework (React, Vue, Svelte, Solid JS...) to use and how to approach their goals.
Note: Requires Node.js >= 22.22.3 (see .nvmrc). The template currently uses output: 'static', but the blog only works with prerender = true.
Inside AstroWind template, you'll see the following folders and files:
/
├── .agents/
│ └── skills/
├── AGENTS.md
├── public/
│ ├── _headers
│ └── robots.txt
├── src/
│ ├── assets/
│ │ ├── favicons/
│ │ ├── images/
│ │ └── styles/
│ │ ├── shadcn.css
│ │ └── tailwind.css
│ ├── components/
│ │ ├── blog/
│ │ ├── common/
│ │ ├── ui/
│ │ ├── widgets/
│ │ │ ├── Header.astro
│ │ │ └── ...
│ │ ├── CustomStyles.astro
│ │ ├── Favicons.astro
│ │ └── Logo.astro
│ ├── content.config.ts
│ ├── data/
│ │ └── post/
│ │ ├── post-slug-1.md
│ │ ├── post-slug-2.mdx
│ │ └── ...
│ ├── layouts/
│ │ ├── Layout.astro
│ │ ├── MarkdownLayout.astro
│ │ └── PageLayout.astro
│ ├── pages/
│ │ ├── [...blog]/
│ │ │ ├── [category]/
│ │ │ ├── [tag]/
│ │ │ ├── [...page].astro
│ │ │ └── index.astro
│ │ ├── index.astro
│ │ ├── 404.astro
│ │ ├-- rss.xml.ts
│ │ └── ...
│ ├── utils/
│ ├── config.yaml
│ └── navigation.ts
├── package.json
├── astro.config.ts
└── ...
Astro looks for .astro or .md files in the src/pages/ directory. Each page is exposed as a route based on its file name.
There's nothing special about src/components/, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.
Any static assets, like images, can be placed in the public/ directory if they do not require any transformation or in the assets/ directory if they are imported directly.
🧑🚀 Seasoned astronaut? Delete this file README.md. Update src/config.yaml and contents. Have fun!
All commands are run from the root of the project, from a terminal:
| Command | Action | 
|---|---|
| npm install | Installs dependencies | 
| npm run dev | Starts local dev server at localhost:4321 | 
| npm run build | Build your production site to ./dist/ | 
| npm run preview | Preview your build locally, before deploying | 
| npm run check | Check your project for errors | 
| npm run fix | Run Eslint and format codes with Prettier | 
| npm run astro ... | Run CLI commands like astro add ,astro preview | 
Basic configuration file: ./src/config.yaml
site:
 name: 'Example'
 site: 'https://example.com'
 base: '/' # Change this if you need to deploy to Github Pages, for example
 trailingSlash: false # Generate permalinks with or without "/" at the end
 googleSiteVerificationId: false # Or some value,
# Default SEO metadata
metadata:
 title:
 default: 'Example'
 template: '%s — Example'
 description: 'This is the default meta description of Example website'
 robots:
 index: true
 follow: true
 openGraph:
 site_name: 'Example'
 images:
 - url: '~/assets/images/default.png'
 width: 1200
 height: 628
 type: website
 twitter:
 handle: '@twitter_user'
 site: '@twitter_user'
 cardType: summary_large_image
i18n:
 language: en
 textDirection: ltr
apps:
 blog:
 isEnabled: true # If the blog will be enabled
 postsPerPage: 6 # Number of posts per page
 post:
 isEnabled: true
 permalink: '/blog/%slug%' # Variables: %slug%, %year%, %month%, %day%, %hour%, %minute%, %second%, %category%
 robots:
 index: true
 list:
 isEnabled: true
 pathname: 'blog' # Blog main path, you can change this to "articles" (/articles)
 robots:
 index: true
 category:
 isEnabled: true
 pathname: 'category' # Category main path /category/some-category, you can change this to "group" (/group/some-category)
 robots:
 index: true
 tag:
 isEnabled: true
 pathname: 'tag' # Tag main path /tag/some-tag, you can change this to "topics" (/topics/some-category)
 robots:
 index: false
 isRelatedPostsEnabled: true # If a widget with related posts is to be displayed below each post
 relatedPostsCount: 4 # Number of related posts to display
analytics:
 vendors:
 googleAnalytics:
 id: null # or "G-XXXXXXXXXX"
ui:
 theme: 'system' # Values: "system" | "light" | "dark" | "light:only" | "dark:only"
With Tailwind CSS v4, all configuration is CSS-first. To customize Font families, Colors or more Elements refer to the following files:
- src/components/CustomStyles.astro — CSS variables for colors and fonts
- src/assets/styles/tailwind.css — Tailwind theme tokens (@theme ), custom utilities (@utility ), and plugins
- src/assets/styles/shadcn.css — shadcn/ui-compatible variables (--background ,--border ,--ring …) derived from the theme, so shadcn-style components pick up your colors
You can create an optimized production build with:
npm run build
Now, your website is ready to be deployed. All generated files are located at
dist folder, which you can deploy the folder to any hosting service you
prefer.
Clone this repository on your own GitHub account and deploy it to Netlify:
Clone this repository on your own GitHub account and deploy to Vercel:
Clone this repository on your own GitHub account and deploy it to Cloudflare Workers (static assets, no adapter needed; the wrangler.jsonc in the repo points Cloudflare at dist/):
Is AstroWind v1 still maintained? Yes, in maintenance mode: v1 receives dependency updates and bug fixes, while new development goes to AstroWind v2 (October 2026).
How do I disable the blog, change the Open Graph image, deploy under a sub-path, connect a CMS, deploy to Cloudflare…?
Ask your AI coding assistant. AstroWind is AI-ready: the repository ships an AGENTS.md with the project conventions and step-by-step skills in .agents/skills/ for the most common tasks, so Claude Code, Codex/ChatGPT, Cursor, Copilot and similar tools can do them reliably (and you can read the skills yourself).
Which widgets are there and how do I use them?
Every section is a component in src/components/widgets/ with typed props. The catalogue with props and where each one is demoed is in .agents/skills/use-widgets.md; the six pages in src/pages/landing/ show them combined into complete landing pages.
Where do blog posts go?
src/data/post/ as .md or .mdx files. They are read at build time.
Where do I change colors and fonts?
Colors in src/components/CustomStyles.astro (CSS variables for light and dark), Tailwind tokens and utilities in src/assets/styles/tailwind.css, fonts in the fonts entry of astro.config.ts.
Which Node.js version do I need?
Node.js 22.22.3 or newer (.nvmrc).
If you have any ideas, suggestions or find any bugs, feel free to open a discussion, an issue or create a pull request. That would be very useful for all of us and we would be happy to listen and take action.
Initially created by Arthelokyo and maintained by a community of contributors.
AstroWind is licensed under the MIT license — see the LICENSE file for details.
