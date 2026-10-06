# https://github.com/barryclark/jekyll-now

ok: true
title: GitHub - barryclark/jekyll-now: Build a Jekyll blog in minutes, without touching the command line.
error: 

March, 2016: If you're on an old version of Jekyll Now and run into a) build warnings or b) syntax highlighting issues caused by Jekyll 3 and GitHub Pages updates, just ✨update your _config.yml✨ and you'll be set!
Jekyll is a static site generator that's perfect for GitHub hosted blogs (Jekyll Repository)
Jekyll Now makes it easier to create your Jekyll blog, by eliminating a lot of the up front setup.
- You don't need to touch the command line
- You don't need to install/configure ruby, rvm/rbenv, ruby gems ☺️
- You don't need to install runtime dependencies like markdown processors, Pygments, etc
- If you're on Windows, this will make setting up Jekyll a lot easier
- It's easy to try out, you can just delete your forked repository if you don't like it
In a few minutes you'll be set up with a minimal, responsive blog like the one below giving you more time to spend on writing epic blog posts!
Fork this repo, then rename the repository to yourgithubusername.github.io.
Your Jekyll blog will often be viewable immediately at https://yourgithubusername.github.io (if it's not, you can often force it to build by completing step 2)
Enter your site name, description, avatar and many other options by editing the _config.yml file. You can easily turn on Google Analytics tracking, Disqus commenting and social icons here too.
Making a change to _config.yml (or any file in your repository) will force GitHub Pages to rebuild your site with jekyll. Your rebuilt site will be viewable a few seconds later at https://yourgithubusername.github.io - if not, give it ten minutes as GitHub suggests and it'll appear soon
There are 3 different ways that you can make changes to your blog's files:
- Edit files within your new username.github.io repository in the browser at GitHub.com (shown below).
- Use a third party GitHub content editor, like Prose by Development Seed. It's optimized for use with Jekyll making markdown editing, writing drafts, and uploading images really easy.
- Clone down your repository and make updates locally, then push them to your GitHub repository.
Edit /_posts/2014-3-3-Hello-World.md to publish your first blog post. This Markdown Cheatsheet might come in handy.
You can add additional posts in the browser on GitHub.com too! Just hit the + icon in /_posts/ to create new content. Just make sure to include the front-matter block at the top of each new blog post and make sure the post's filename is in this format: year-month-day-title.md
- Install Jekyll and plug-ins in one fell swoop. gem install github-pages This mirrors the plug-ins used by GitHub Pages on your local machine including Jekyll, Sass, etc.
- Clone down your fork git clone https://github.com/yourusername/yourusername.github.io.git
- Serve the site and watch for markup/sass changes jekyll serve
- View your website at http://127.0.0.1:4000/
- Commit any changes and push everything to the master branch of your GitHub user repository. GitHub Pages will then rebuild and serve your website.
I've created a more detailed walkthrough, Build A Blog With Jekyll And GitHub Pages over at the Smashing Magazine website. Check it out if you'd like a more detailed walkthrough and some background on Jekyll. 🤘
It covers:
- A more detailed walkthrough of setting up your Jekyll blog
- Common issues that you might encounter while using Jekyll
- Importing from Wordpress, using your own domain name, and blogging in your favorite editor
- Theming in Jekyll, with Liquid templating examples
- A quick look at Jekyll 2.0’s new features, including Sass/Coffeescript support and Collections
✓ Command-line free fork-first workflow, using GitHub.com to create, customize and post to your blog
✓ Fully responsive and mobile optimized base theme (Theme Demo)
✓ Sass/Coffeescript support using Jekyll 2.0
✓ Free hosting on your GitHub Pages user site
✓ Markdown blogging
✓ Syntax highlighting
✓ Disqus commenting
✓ Google Analytics integration
✓ SVG social icons for your footer
✓ 3 http requests, including your avatar
✘ No installing dependencies
✘ No need to set up local development
✘ No configuring plugins
✘ No need to spend time on theming
✘ More time to code other things ... wait ✓!
Open an Issue and let's chat!
You can use the Quick Start workflow with other themes that are set up to be forked too! Here are some of my favorites:
- Hyde by MDO
- Lanyon by MDO
- mojombo.github.io by Tom Preston-Werner
- Left by Zach Holman
- Minimal Mistakes by Michael Rose
- Skinny Bones by Michael Rose
- Jekyll - Thanks to its creators, contributors and maintainers.
- SVG icons - Thanks, Neil Orange Peel. They're beautiful.
- Solarized Light Pygments - Thanks, Edward.
- Joel Glovier - Great Jekyll articles. I used Joel's feed.xml in this repository.
- David Furnes, Jon Uy, Luke Patton - Thanks for the design/code reviews.
- Bart Kiers, Florian Simon, Henry Stanley, Hun Jae Lee, Javier Cejudo, Peter Etelej, Ben Abbott, Ray Nicholus, Erin Grand, Léo Colombaro, Dean Attali, Clayton Errington, Colton Fitzgerald, Trace Mayer - Thanks for your fantastic contributions to the project!
Issues and Pull Requests are greatly appreciated. If you've never contributed to an open source project before I'm more than happy to walk you through how to create a pull request.
You can start by opening an issue describing the problem that you're looking to resolve and we'll go from there.
I want to keep Jekyll Now as minimal as possible. Every line of code should be one that's useful to 90% of the people using it. Please bear that in mind when submitting feature requests. If it's not something that most people will use, it probably won't get merged. 💂♂️
