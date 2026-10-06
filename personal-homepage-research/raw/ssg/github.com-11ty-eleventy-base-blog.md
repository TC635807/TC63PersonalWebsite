# https://github.com/11ty/eleventy-base-blog

ok: true
title: GitHub - 11ty/eleventy-base-blog: A starter repository for a blog web site using the Eleventy static site generator.
error: 

A starter repository showing how to build a blog with the Eleventy site generator (using the v3.0 release).
- Make a directory and navigate to it:
mkdir my-blog-name
cd my-blog-name
- Clone this Repository
git clone https://github.com/11ty/eleventy-base-blog.git .
Optional: Review eleventy.config.js and _data/metadata.js to configure the site’s options and data.
- Install dependencies
npm install
- Run Eleventy
Generate a production-ready build to the _site folder:
npx @11ty/eleventy
Or build and host on a local development server:
npx @11ty/eleventy --serve
Or you can run debug mode to see all the internals.
- Using Eleventy v3 with zero-JavaScript output.
 - Content is exclusively pre-rendered (this is a static site).
 - Can easily deploy to a subfolder without changing any content
 - All URLs are decoupled from the content’s location on the file system.
 - Configure templates via the Eleventy Data Cascade
- Performance focused: four-hundos Lighthouse score out of the box!
 - 0 Cumulative Layout Shift
 - 0ms Total Blocking Time
- Local development live reload provided by Eleventy Dev Server.
- Content-driven navigation menu
- Fully automated Image optimization
 - Zero-JavaScript output.
 - Support for modern image formats automatically (e.g. AVIF and WebP)
 - Processes images on-request during --serve for speedy local builds.
 - Prefers <img> markup if possible (single image format) but switches automatically to<picture> for multiple image formats.
 - Automated <picture> syntax markup withsrcset and optionalsizes
 - Includes width /height attributes to avoid content layout shift.
 - Includes loading="lazy" for native lazy loading without JavaScript.
 - Includes decoding="async"
 - Images can be co-located with blog post files.
- Per page CSS bundles via eleventy-plugin-bundle .
- Built-in syntax highlighter (zero-JavaScript output).
- Draft content: use draft: true to mark any template as a draft. Drafts are only included during--serve /--watch and are excluded from full builds. This is driven by theaddPreprocessor configuration API ineleventy.config.js . Schema validator will show an error if non-boolean value is set in data cascade.
- Blog Posts
 - Automated next/previous links
 - Accessible deep links to headings
- Generated Pages
 - Home, Archive, and About pages.
 - Atom feed included (with easy one-line swap to use RSS or JSON)
 - sitemap.xml
 - Zero-maintenance tag pages (View on the Demo)
 - Content not found (404) page
Deploy this Eleventy site in just a few clicks on these services:
- Read more about Deploying an Eleventy project to the web.
- Deploy this to Netlify
- Deploy this to Vercel
- Look in .github/workflows/gh-pages.yml.sample for information on Deploying to GitHub Pages.
- Try it out on Stackblitz
- content/about/index.md is an example of a content page.
- content/blog/ has the blog posts but really they can live in any directory. They need only theposts tag to be included in the blog posts collection.
- Use the eleventyNavigation key (via the Eleventy Navigation plugin) in your front matter to add a template to the top level site navigation. This is in use oncontent/index.njk andcontent/about/index.md .
- Content can be in any template format (blog posts needn’t exclusively be markdown, for example). Configure your project’s supported templates in eleventy.config.js ->templateFormats .
- The public folder in your input directory will be copied to the output folder (viaaddPassthroughCopy in theeleventy.config.js file). This means./public/css/* will live at./_site/css/* after your build completes.
- This project uses three Eleventy Layouts:
 - _includes/layouts/base.njk : the top level HTML structure
 - _includes/layouts/home.njk : the home page template (wrapped intobase.njk )
 - _includes/layouts/post.njk : the blog post template (wrapped intobase.njk )
- _includes/postslist.njk is a Nunjucks include and is a reusable component used to display a list of all the posts.content/index.njk has an example of how to use it.
If your site enforces a Content Security Policy (as public-facing sites should), you have a few choices (pick one):
- In base.njk , remove<style>{% getBundle "css" %}</style> and uncomment<link rel="stylesheet" href="{% getBundleFileUrl "css" %}">
- Configure the server with the CSP directive style-src: 'unsafe-inline' (less secure).
