# https://github.com/LekoArts/gatsby-themes

ok: true
title: GitHub - LekoArts/gatsby-themes: Get high-quality and customizable Gatsby themes to quickly bootstrap your website! Choose from many professionally created and impressive designs with a wide variety o
error: 

This repository was archived by the owner on Sep 5, 2026. It is now read-only.
LekoArts
/
gatsby-themes
Public archive
Sponsor
Sponsor LekoArts/gatsby-themes
Uh oh!
There was an error while loading.
Please reload this page
.
Notifications
You must be signed in to change notification settings
Fork
507
Star
1.9k
main
16
Branches
1367
Tags
Go to file
Code
Open more actions menu
Latest commit
renovate[bot]
chore(deps): update typescript (
#1465
)
Open commit details
success
Apr 1, 2026
0ee6007
·
Apr 1, 2026
History
1,423 Commits
Open commit details
1,423 Commits
Folders and files
Name
Name
Last commit message
Last commit date
.changeset
.changeset
chore(release): Publish (
#1434
)
Jun 26, 2025
.github
.github
chore: OIDC publishing
Oct 15, 2025
.husky
.husky
chore(deps): update dependency husky to v9 (
#1308
)
Feb 1, 2024
.yarn/
releases
.yarn/
releases
chore(deps): update yarn to v4.8.1 (
#1408
)
Apr 9, 2025
cypress
cypress
chore: Misc updates
Oct 15, 2025
examples
examples
chore: Misc updates
Oct 15, 2025
packages
packages
chore(release): Publish (
#1434
)
Jun 26, 2025
plop-templates
plop-templates
chore: Replace Twitter with Bluesky (
#1369
)
Dec 24, 2024
scripts
scripts
chore: Add emotion to renovate groups
May 3, 2023
themes
themes
chore: Misc updates
Oct 15, 2025
www
www
fix(deps): update www (
#1463
)
Mar 1, 2026
.editorconfig
.editorconfig
chore: Use Changesets (
#528
)
Nov 11, 2020
.eslintignore
.eslintignore
chore: Convert "packages" to TypeScript (
#1012
)
Oct 1, 2022
.eslintrc.js
.eslintrc.js
chore: Format MDX files
Jul 10, 2024
.gitignore
.gitignore
chore: Convert "packages" to TypeScript (
#1012
)
Oct 1, 2022
.npmignore
.npmignore
feat: Add jest (
#30
)
Aug 8, 2019
.nvmrc
.nvmrc
BREAKING: Gatsby 5 (
#1045
)
Nov 9, 2022
.prettierignore
.prettierignore
chore: Convert "packages" to TypeScript (
#1012
)
Oct 1, 2022
.yarnrc.yml
.yarnrc.yml
chore(deps): update yarn to v4.8.1 (
#1408
)
Apr 9, 2025
CODE_OF_CONDUCT.md
CODE_OF_CONDUCT.md
chore: Format CoC
Aug 12, 2019
CONTRIBUTING.md
CONTRIBUTING.md
feat: TS all the things (
#1103
)
Jan 6, 2023
LICENSE
LICENSE
feat: Use ESM (
#1119
)
Feb 2, 2023
OVERVIEW.md
OVERVIEW.md
chore(deps): update dependency husky to v9 (
#1308
)
Feb 1, 2024
README.md
README.md
chore: Replace Twitter with Bluesky (
#1369
)
Dec 24, 2024
cypress.config.ts
cypress.config.ts
chore(deps): update dependency cypress to v13 (
#1230
)
Sep 1, 2023
lint-staged.config.js
lint-staged.config.js
BREAKING: MDX v2, Theme UI v0.15, Gatsby Head API (
#967
)
Oct 1, 2022
package.json
package.json
chore(deps): update typescript (
#1465
)
Apr 1, 2026
plopfile.mjs
plopfile.mjs
feat: Use ESM (
#1119
)
Feb 2, 2023
renovate.json5
renovate.json5
chore: Add emotion to renovate groups
May 3, 2023
tsconfig.ci.json
tsconfig.ci.json
chore: TypeScript updates (
#792
)
Jan 9, 2022
tsconfig.json
tsconfig.json
chore: Formatting
Jul 9, 2024
vitest-setup.ts
vitest-setup.ts
chore(deps): update typescript (
#1207
)
Aug 29, 2023
vitest.config.ts
vitest.config.ts
chore(deps): update typescript (
#1207
)
Aug 29, 2023
yarn.lock
yarn.lock
chore(deps): update typescript (
#1465
)
Apr 1, 2026
View all files
Repository files navigation
Free & Open Source Gatsby Themes by LekoArts
Get
high-quality
and
customizable
Gatsby themes to quickly bootstrap your website! Choose from many professionally created and impressive designs with a wide variety of features and customization options. Use Gatsby Themes to take your project to the next level and let you and your customers take advantage of the many benefits Gatsby has to offer.
🎨 Themes Overview
💼 Contents
This repository is a collection of my Gatsby themes, managed as a
monorepo
with
Changesets
and
yarn workspaces
.
.changeset
: Changeset files and configuration.
.github
: GitHub actions, templates for issues, and FUNDING file. A GitHub action will publish the
/examples
as starters to individual GitHub repositories. Another GitHub action will handle the publishing of packages.
cypress
: Contains the Cypress tests for
examples
.
examples
: Contains the corresponding example sites for the
themes
. These projects can and should be used as a starter and will be copied over to their own repository. Hence they contain example data and additional Gatsby plugins (e.g.
gatsby-plugin-manifest
). The folder names are the contents after
gatsby-theme-*
.
packages
: Shared helpers and utilities for the themes. Compiled with
tsup
.
plop-templates
: Template for
plop.js
.
scripts
: In order to run the tests on GitHub Actions some utility bash scripts are needed which are located here.
themes
: Contains the themes themselves. They should only have the bare minimum of plugins installed (as
examples
can expand them) and also use
Theme UI
for styling. The naming of the folders must be
gatsby-theme-[name-with-dashes]
and the package name under the scope of
@lekoarts
.
www
: Contains the source code for
themes.lekoarts.de
.
vite.config.ts
&
vitest-setup.ts
:
Vitest
is used for Unit Testing.
🤝 How to Contribute
Make sure that you have
yarn
installed on your machine (as it's mandatory for
yarn workspaces
). Fork this repository, clone it and run
yarn
in the root directory.
To launch the development server of an example site, use:
yarn workspace [examples/name] develop
Or for a build:
yarn workspace [examples/name] build
In the case of
examples/emma
this command would be
yarn workspace emma develop
. Now you can make changes to the respective theme and see them via Hot-Reloading.
Commit your changes to a feature branch of your fork and open up a PR against this repository. The PR will have checks in place (unit and end-to-end tests) which you can also run on your machine in preparation for the PR.
Have a look at the
contributing guide
to learn more.
🤩 Support Me
Thanks for using this project! I'm always interested in seeing what people do with my projects, so don't hesitate to tag me on
Bluesky
and share the project with me.
Please star this project, share it on Social Media or consider supporting me on
GitHub Sponsors
!
🎓 Learning Gatsby Themes
Articles from lekoarts.de
How I used Theme UI to build my Gatsby Themes library
Setting up a Gatsby Themes workspace with TypeScript, ESLint & Cypress
Specimens for Gatsby powered Design Systems
Creating your own Status Dashboard with Gatsby
Official resources
Gatsbyjs.com - Gatsby Themes
Building a Theme
Free egghead.io "Gatsby Theme Authoring" course
Paid resources
Composable Gatsby Themes
About
Get high-quality and customizable Gatsby themes to quickly bootstrap your website! Choose from many professionally created and impressive designs with a wide variety of features and customization options.
themes.lekoarts.de
Topics
gatsby
gatsby-theme
gatsby-themes
gatsbyjs
lekoarts
lekoarts-oss
theme-ui
themes
typescript
Resources
Readme
MIT license
Code of conduct
Code of conduct
Contributing
Contributing
Activity
Stars
1.9k
stars
Watchers
11
watching
Forks
507
forks
Report repository
Releases
422
(422)
@lekoarts/gatsby-theme-minimal-blog@6.2.6
Latest
Jun 26, 2025
+ 421 releases
Sponsor this project
LekoArts
Lennart
Sponsor @LekoArts
ko-fi.com/lekoarts
Learn more about GitHub Sponsors
Contributors
16
(16)
+ 2 contributors
Languages
TypeScript
80.8%
JavaScript
14.1%
Handlebars
3.8%
MDX
0.9%
CSS
0.3%
Shell
0.1%
