# https://github.com/madrilene/eleventy-excellent

ok: true
title: GitHub - madrilene/eleventy-excellent: Eleventy starter with CUBE CSS, Every Layout and global design tokens. A workflow for modern & resilient websites, based on the CUBE CSS boilerplate.
error: 

Easy to use Eleventy starter, based on the workflow suggested by Andy Bell's buildexcellentwebsit.es.
If you end up using this starter, feel free to send me a link, I'd love to see it!
https://eleventy-excellent.netlify.app/
This starter includes:
- Cube Boilerplate: Created by Andy Bell, available under the MIT License. View Repository
- Accessible site navigation, editable in src/_data/navigation.js
- Image optimization with Eleventy-img (see blog post)
- Youtube embed with lite-youtube (see blog post)
- Easy resource fetching with eleventy-fetch (see blog post)
- Syntax highlighting via eleventy-plugin-syntaxhighlight (see blog post)
- Advanced markdown handling (see blog post)
- 301 redirects for Netlify (see blog post)
- Automatically generated Open Graph images for blog posts (see blog post)
- Tailwind CSS - but not how you might expect (see blog post)
- XML-sitemap
- Opt-in /llms.txt site summary, plus configurable crawl rules inrobots.txt
- dayjs handling dates & times
- Bundling via esbuild
- RSS feed (now you can add more than one)
- Links to platforms and social media profiles
- Mastodon domain verification snippet
- carbon.txt - to show that their digital infrastructure runs on green electricity
- Accessible dark and light mode based on user preference and custom toggle
- Tags in blog posts
- Accessible blog pagination
- A styleguide™
package.json pins nanoid under overrides forcing a patched 5.x (@11ty/webc and postcss declare older ranges).
Chain: pa11y-ci --> puppeteer --> @puppeteer/browsers --> extract-zip. Ignored until pa11y / Puppeteer drops extract-zip.
npm install
Starts watch tasks to compile when changes detected
npm start
Minify JS, CSS and HTML.
npm run build
Sites that are based on / built with Eleventy Excellent. Add your site by submitting a pull request! :)
Andy Bell
Be the browser's mentor, not its micromanager. Give the browser some solid rules and hints, then let it make the right decisions for the people that visit it, based on their device, connection quality and capabilities.
Heydon Pickering
Heydon creates some invaluable resources.
Zach Leatherman
Zach is developing Eleventy and is constantly making it even better!
Stephanie Eckles
Stephanie provides a lot of resources for Eleventy and modern CSS.
Ryan Mulligan
I'm using Ryan's example of a breakout wrapper on this site.
Also have a look at those codepens!
Sara Soueidan
I took a close look at Sara's recommendations for accessible theme switch and pagination in the Practical Accessibility course
Steven Woodson
The style guide was inspired by a great talk on the Eleventy Meetup. Steven also wrote a blog post about that.
Aleksandr Hovhannisyan
Aleksandr seems to value a well-structured project just as much as I do. It was the repo from aleksandrhovhannisyan.com that inspired me to write the article Organizing the Eleventy config file. The 301 redirect solution I'm using is from Aleksandr's article.
- https://github.com/AleksandrHovhannisyan
- https://www.aleksandrhovhannisyan.com/blog/eleventy-netlify-redirects/
Manuel Matuzović
Manuel is an accessibility expert. The menu I was using as default up to v2, is very much inspired by an article Manuel wrote on web.dev.
Bernard Nijenhuis
Bernard wrote the article on which the Open Graph Images implementation is based.
