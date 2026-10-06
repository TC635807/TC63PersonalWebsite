原始 URL: https://github.com/RyanFitzgerald/devportfolio
采集日期: 2026-10-05

A modern, minimalist portfolio template built with Astro and Tailwind CSS. Perfect for developers looking to showcase their skills, experience, and projects in a clean, professional way.
This was completely rebuilt from the ground up from V1. This template was built to be entirely ready to go with a quick config edit (see below) but also provides the ability to easily extend in whatever way you want.
This template also comes with CLAUDE.md and .cursor/rules files for easy integration with your existing AI workflows.
📬 Connect & Share!
For questions and updates, feel free to reach out on X (Twitter).
If you've built and published your personal site with this template, I'd love to see it! Send me a DM 🚀
To view a live preview of the site, click here.
- Astro - Static site generator for modern web apps
- Tailwind CSS v4 - Utility-first CSS framework
- Tabler Icons - Free and open source icons
- TypeScript - For type-safe configuration
The template is designed to be easily customizable through the src/config.ts file. This single file controls:
- Personal Information: Name, title, description
- Accent Color: Primary color theme (changing this will change the accent color site wide)
- Social Links: Email, LinkedIn, Twitter, GitHub (all optional)
- About Section: Personal bio/description
- Skills: List of technical skills
- Projects: Project showcase with descriptions and links
- Experience: Work history with bullet points
- Education: Educational background and achievements
If skills, projects, experience, or education are removed from the config, those sections will be hidden entirely.
Here's what the config data structure looks like for each section:
name: "Your Name",
title: "Your Job Title",
description: "Brief site description",
accentColor: "#1d4ed8", // Hex color for themesocial: {
 email: "your-email@example.com",
 linkedin: "https://linkedin.com/in/yourprofile",
 twitter: "https://twitter.com/yourprofile", 
 github: "https://github.com/yourusername",
}aboutMe: "A paragraph describing yourself, your background, interests, and what you're passionate about. This appears in the About section of your portfolio."skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"]projects: [
 {
 name: "Project Name",
 description: "Brief description of what the project does and its impact",
 link: "https://github.com/yourusername/project",
 skills: ["React", "Node.js", "AWS"], // Technologies used
 }
]experience: [
 {
 company: "Company Name",
 title: "Your Job Title",
 dateRange: "Jan 2022 - Present",
 bullets: [
 "Led development of microservices architecture serving 1M+ users",
 "Reduced API response times by 40% through optimization",
 "Mentored team of 5 junior developers",
 ],
 }
]education: [
 {
 school: "University Name",
 degree: "Bachelor of Science in Computer Science",
 dateRange: "2014 - 2018",
 achievements: [
 "Graduated Magna Cum Laude with 3.8 GPA",
 "Dean's List all semesters",
 "President of Computer Science Club"
 ]
 }
]
The template uses Tabler Icons for all icons. If you wish to add more icons and have it look consistent with what's already there, you can browse through their extensive icon library.
devportfolio/
├── public/
│ └── favicon.svg # Site favicon
├── src/
│ ├── components/ # Astro components
│ │ ├── About.astro # About section
│ │ ├── Education.astro # Education section
│ │ ├── Experience.astro # Work experience section
│ │ ├── Footer.astro # Site footer
│ │ ├── Header.astro # Navigation header
│ │ ├── Hero.astro # Hero/intro section
│ │ └── Projects.astro # Projects showcase
│ ├── pages/
│ │ └── index.astro # Main page layout
│ ├── styles/
│ │ └── global.css # Global styles
│ └── config.ts # Site configuration
├── astro.config.mjs # Astro configuration
├── package.json # Project dependencies
├── tailwind.config.js # Tailwind configuration
└── tsconfig.json # TypeScript configuration
If you'd like to run it locally:
git clone https://github.com/RyanFitzgerald/devportfolio.git
cd devportfolio
npm install
After that, start up the Astro dev server with:
npm run dev
The template can be deployed to any static hosting service easily (and in most cases, completely free). Here are some options:
- To deploy with Netlify, click here.
- To deploy with Vercel, click here.
- To deploy with GitHub Pages, click here.
- To deploy with Cloudflare Pages, click here.
- To deploy with Render, click here.
Want to deploy somewhere else? Find more guides here.
To view the changelog, see CHANGELOG.md.
This project is fully and completely MIT. See LICENSE.md.
Feel free to reach out on X (Twitter) if you have any questions or need help.
