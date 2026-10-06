# https://github.com/satnaing/astro-paper

ok: true
title: GitHub - satnaing/astro-paper: A minimal, accessible and SEO-friendly Astro blog theme.
error: 

AstroPaper is a minimal, responsive, accessible and SEO-friendly Astro blog theme. This theme is designed and crafted based on my personal blog.
Read the blog posts or check the README Documentation Section for more info.
- type-safe markdown
- super fast performance
- accessible (Keyboard/VoiceOver)
- responsive (mobile ~ desktops)
- SEO-friendly
- light & dark mode
- static search (Pagefind)
- draft posts & pagination
- sitemap & rss feed
- MDX support
- collapsible table of contents
- followed best practices
- highly customizable
- dynamic OG image generation for blog posts (Blog Post)
- i18n ready
Note: I've tested screen-reader accessibility of AstroPaper using VoiceOver on Mac and TalkBack on Android. I couldn't test all other screen-readers out there. However, accessibility enhancements in AstroPaper should be working fine on others as well.
Inside of AstroPaper, you'll see the following folders and files:
/
├── public/
│ ├── pagefind/ # auto-generated on build
│ ├── favicon.svg
│ └── default-og.jpg
├── src/
│ ├── assets/
│ │ ├── icons/
│ │ └── images/
│ ├── components/
│ ├── content/
│ │ ├── pages/
│ │ │ └── about.md
│ │ └── posts/
│ │ └── some-blog-posts.md
│ ├── i18n/
│ ├── layouts/
│ ├── pages/
│ ├── scripts/
│ ├── styles/
│ ├── types/
│ ├── utils/
│ ├── config.ts
│ └── content.config.ts
├── astro-paper.config.ts # user-defined configurations
└── astro.config.ts
All blog posts are stored in the src/content/posts/ directory. You can organise posts into subdirectories — the subdirectory name becomes part of the post URL.
Documentation can be read in two formats_ markdown & blog post.
- Configuration - markdown | blog post
- Add Posts - markdown | blog post
- Customize Color Schemes - markdown | blog post
- Predefined Color Schemes - markdown | blog post
Main Framework - Astro
Type Checking - TypeScript
Styling - TailwindCSS
UI/UX - Figma Design File
Static Search - Pagefind
Icons - Tablers
Code Formatting - Prettier
Deployment - Cloudflare Pages
Linting - ESLint
Dynamic OG images - Satori + Sharp + Astro Fonts
You can start using this project locally by running the following command in your desired directory:
# pnpm
pnpm create astro@latest --template satnaing/astro-paper
# npm
npm create astro@latest -- --template satnaing/astro-paper
# yarn
yarn create astro --template satnaing/astro-paper
# bun
bun create astro@latest -- --template satnaing/astro-paper
Then start the project by running the following commands:
# install dependencies if you haven't done so in the previous step.
pnpm install
# start running the project
pnpm dev
You can add your Google Site Verification HTML tag by setting site.googleVerification in astro-paper.config.ts:
export default defineAstroPaperConfig({
 site: {
 // ...
 googleVerification: "your-google-site-verification-value",
 },
 // ...
});
See this discussion for adding AstroPaper to the Google Search Console.
All commands are run from the root of the project, from a terminal:
| Command | Action | 
|---|---|
| pnpm install | Installs dependencies | 
| pnpm dev | Starts local dev server at localhost:4321 | 
| pnpm build | Type-checks, builds the site, runs Pagefind indexing, and copies the index to public/pagefind/ | 
| pnpm preview | Preview your build locally, before deploying | 
| pnpm sync | Generates TypeScript types for all Astro modules. Learn more. | 
| pnpm astro ... | Run CLI commands like astro add ,astro check | 
If you have any suggestions/feedback, you can contact me via my email. Alternatively, feel free to open an issue if you find bugs or want to request new features.
Licensed under the MIT License, Copyright © 2026
Made with 🤍 by Sat Naing 👨🏻💻 and contributors.
