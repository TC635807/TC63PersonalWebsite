原始 URL: https://github.com/mldangelo/personal-site
采集日期: 2026-10-05

mldangelo
/
personal-site
Public
Notifications
You must be signed in to change notification settings
Fork
980
Star
1.7k
main
40
Branches
10
Tags
Go to file
Code
Open more actions menu
Latest commit
mldangelo
chore(deps): update React and remaining dependency backlog (
#1006
)
success
Oct 5, 2026
f7a255b
·
Oct 5, 2026
History
997 Commits
Open commit details
997 Commits
Folders and files
Name
Name
Last commit message
Last commit date
.github
.github
chore(deps): update React and remaining dependency backlog (
#1006
)
Oct 5, 2026
app
app
docs: correct and simplify fork guidance (
#928
)
Jul 28, 2026
content/
writing
content/
writing
feat: rebuild the site's visual identity as a measurement instrument
Jul 26, 2026
docs
docs
fix: harden CI credentials and resolve security findings (
#998
)
Oct 5, 2026
public
public
fix: harden CI credentials and resolve security findings (
#998
)
Oct 5, 2026
scripts
scripts
fix: harden CI credentials and resolve security findings (
#998
)
Oct 5, 2026
src
src
fix: harden CI credentials and resolve security findings (
#998
)
Oct 5, 2026
.env.example
.env.example
feat: Next.js TypeScript Migration (
#674
)
Jul 17, 2025
.gitattributes
.gitattributes
feat: Next.js TypeScript Migration (
#674
)
Jul 17, 2025
.gitignore
.gitignore
chore: modernize root config files and documentation (
#770
)
Jan 2, 2026
.nvmrc
.nvmrc
chore(deps): bring every dependency current and move to Node 26 (
#925
)
Jul 27, 2026
.prettierignore
.prettierignore
chore: modernize root config files and documentation (
#770
)
Jan 2, 2026
.prettierrc.json
.prettierrc.json
chore: remove unused ESLint deps and update docs (
#728
)
Nov 22, 2025
AGENTS.md
AGENTS.md
chore(deps): update React and remaining dependency backlog (
#1006
)
Oct 5, 2026
CLAUDE.md
CLAUDE.md
feat: add local markdown blog posts (
#779
)
Jan 3, 2026
LICENSE
LICENSE
chore: update license copyright year range (
#775
)
Jan 3, 2026
README.md
README.md
docs: correct and simplify fork guidance (
#928
)
Jul 28, 2026
biome.json
biome.json
chore(deps): update React and remaining dependency backlog (
#1006
)
Oct 5, 2026
next.config.mjs
next.config.mjs
chore(deps): bring every dependency current and move to Node 26 (
#925
)
Jul 27, 2026
package-lock.json
package-lock.json
chore(deps): update React and remaining dependency backlog (
#1006
)
Oct 5, 2026
package.json
package.json
chore(deps): update React and remaining dependency backlog (
#1006
)
Oct 5, 2026
postcss.config.mjs
postcss.config.mjs
feat: migrate from SCSS to Tailwind CSS v4 (
#772
)
Jan 3, 2026
tsconfig.json
tsconfig.json
chore: migrate from Jest to Vitest with expanded test coverage (
#778
)
Jan 3, 2026
vitest.config.ts
vitest.config.ts
chore: migrate from Jest to Vitest with expanded test coverage (
#778
)
Jan 3, 2026
vitest.setup.tsx
vitest.setup.tsx
chore(deps-dev): bump jsdom to 29.0.0 and harden localStorage tests (
#…
Mar 22, 2026
View all files
Repository files navigation
Michael D'Angelo: Personal Site
The source for
mldangelo.com
, a portfolio, résumé,
project archive, and writing site built with
Next.js
,
React
,
TypeScript
, and
Tailwind CSS
.
The architecture is reusable and MIT licensed. The content and visual design
are personal, so a fork needs a full rebrand.
Visit the live site →
What is here
A statically exported Next.js 16 site deployed to GitHub Pages.
A responsive light/dark design system built from semantic CSS tokens.
Markdown writing with drafts, RSS, and page metadata.
A filterable résumé that still prints in full.
Tests for components, content, metadata, and the final static export.
Get started
With a coding agent
Open your fork in a coding agent and ask:
Read AGENTS.md, use the Node version in .nvmrc, install the locked
dependencies, and start the development server. Do not change the site yet.
Tell me the local URL and report any setup failure with its exact output.
Manual setup
With
GitHub CLI
and
nvm
installed:
gh repo fork mldangelo/personal-site --clone
cd
personal-site
nvm install
npm ci
npm run dev
If you use another version manager, choose a release accepted by
engines.node
in
package.json
.
GitHub Codespaces
Click
Fork
at the top of this page.
In your fork, click
Code
, choose
Codespaces
, then create a codespace.
Run:
nvm install
npm ci
npm run dev
Codespaces provides the tools, so you do not need to install them locally.
Adapt it with a coding agent
When you are ready to customize the site, give the agent your résumé, profile
details, links, images, and intended site URL. Try:
Read AGENTS.md and docs/adapting-guide.md, set up the repository, then rebrand
this fork for [NAME] with the details and assets I provide. Work on a topic
branch and preserve the current routes and design unless I say otherwise.
Inventory the existing posts, external writing, résumé, and projects before
changing the shared identity. Do not relabel that content as mine. Ask whether
unmatched personal content should keep its original attribution, be replaced,
or be removed. Use the guide's reference map to update every identity surface
and generated asset. Search for remaining upstream details and run the full
validation suite. Do not commit, push, merge, change GitHub settings, create
secrets, or modify DNS. Report the external steps that remain.
The
adapting guide
has focused prompts for
writing, feature removal, visual changes, and deployment, plus a map of the
files an agent should inspect.
Commands
npm run dev
#
Start the development server
npm run format
#
Format with Prettier and Biome
npm run lint
#
Run Biome checks
npm run type-check
#
Run TypeScript
npm
test
#
Run Vitest
npm run build
#
Build the production static export
npm run verify-export
#
Inspect the generated HTML and XML
npm run og
#
Regenerate the share card
npm run og:check
#
Verify the committed share card is current
CI checks formatting, linting, types, the share card, tests, the production
build, and the exported site on every pull request.
Deploy
Pushes to
main
deploy the same static build that CI validates. See the
adapting guide
for URL and
domain setup.
Contributing
See the
contributing guide
for setup, branch and commit
conventions, validation, and pull request expectations.
License
MIT
. Use it however you want.
About
My personal website - built with Next for Static-Export, and GitHub Pages.
mldangelo.com
Topics
github-page
javascript
personal-website
portfolio
portfolio-website
react
resume
resume-website
serverless
webpack
Resources
Readme
MIT license
Contributing
Contributing
Activity
Stars
1.7k
stars
Watchers
23
watching
Forks
980
forks
Report repository
Releases
10
(10)
v4.1.0 (2026-01-03)
Latest
Jan 3, 2026
+ 9 releases
Contributors
13
(13)
Languages
TypeScript
72%
CSS
21.9%
JavaScript
6.1%
