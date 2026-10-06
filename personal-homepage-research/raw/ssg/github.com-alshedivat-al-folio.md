# https://github.com/alshedivat/al-folio

ok: true
title: GitHub - alshedivat/al-folio: A beautiful, simple, clean, and responsive Jekyll theme for academics
error: 

A simple, clean, and responsive Jekyll starter for academic websites.
In v1.x, al-folio is a thin starter, not a theme: the runtime ships as independently versioned plugin gems, so you pick up fixes and features by bumping a pinned version in your Gemfile instead of merging theme internals into your site.
When creating your own website with al-folio, you have two options:
- ✅ Recommended: Click "Use this template" – This creates a clean copy that is independent from the main al-folio repository. Changes you make to your site won't be accidentally submitted to al-folio as pull requests.
- ❌ Not recommended: Forking the repository – This keeps a link to the main al-folio repo, making it easy to accidentally submit your personal site changes as contributions to our project.
If you already forked: Don't worry! You can still work with your fork normally. Just make sure to:
- Make changes on a dedicated branch (e.g., my-site-updates )
- When pushing changes, always verify you're pushing to your own repository, not the main al-folio repository
- Never create pull requests to alshedivat/al-folio unless you're intentionally contributing improvements that benefit all users
For quick setup, see docs/QUICKSTART.md.
Want to learn more about Jekyll? Check out this tutorial. Why Jekyll? Read Andrej Karpathy's blog post! Why write a blog? Read Rachel Thomas blog post.
For installation and deployment details please refer to docs/INSTALL.md.
For customization details please refer to docs/CUSTOMIZE.md.
al-folio is a thin starter in v1.x. Runtime features are plugin-owned and published as Ruby gems.
- Ownership boundaries: docs/BOUNDARIES.md
- Plugin catalog metadata: _data/featured_plugins.yml
- Rendered plugin catalog: alshedivat.github.io/al-folio/plugins/
- Plugin catalog page source: _pages/plugins.md
The catalog page is deliberately kept out of the navbar (nav: false) so the demo site's chrome stays unchanged; reach it through the links above.
Naming convention:
- Theme-coupled plugins use al-folio-<feature> repos andal_folio_<feature> gem/plugin ids.
- Reusable plugins can use al-<feature> or neutral naming.
Featured plugins and bundled starter plugins are different tracks. Bundling requires explicit updates to Gemfile and _config.yml.
Plugin-owned changes should be made in the owning al-org-dev plugin repository, not by copying runtime assets into this starter.
The bundled v1 plugin repos are:
- al-folio-core : shared layouts, includes, style/runtime primitives, and upgrade contracts
- al-folio-cv : CV rendering
- al-folio-distill : Distill layouts and runtime assets
- al-folio-bootstrap-compat : temporary Bootstrap compatibility runtime
- al-folio-upgrade : v1 upgrade audit/report/codemods
- al-icons : icon loading
- al-search : search runtime
- al-citations : publication/citation helpers
- al-ext-posts : external post ingestion
- al-analytics ,al-comments ,al-cookie ,al-img-tools ,al-math ,al-charts , andal-newsletter : feature-specific runtime and integration behavior
al-folio v1.x is designed for agent-assisted setup and migration. Agents should read AGENTS.md first, then use docs/BOUNDARIES.md to route changes to the starter or the owning plugin repo.
For existing customized forks, the recommended migration path is to ask an agent to use the al-folio v1 migration skill. The skill walks through creating a disposable migration branch, bringing site-owned content/config/data onto the v1 starter contract, running al_folio_upgrade, auditing local overrides, and validating the build. This is preferred over a manual file-by-file upgrade because v1 runtime ownership moved into plugins and local overrides need explicit drift tracking.
The canonical skills live in .agents/skills/. They are also exposed through .codex/skills/ and .claude/skills/ symlinks for agents that discover skills from tool-specific directories.
Codex can use the repo-local skills:
- al-folio bootstrap: create and configure a new v1 site.
- al-folio v1 migration: migrate customized forks and audit local overrides.
Useful first prompts:
- "Use the al-folio bootstrap skill to configure my new site."
- "Use the al-folio v1 migration skill to migrate this customized fork and run the override audit."
Claude should start from CLAUDE.md, which imports AGENTS.md. For setup or migration tasks, use the matching skill from .claude/skills/, which points to the canonical .agents/skills/ directory.
Copilot should follow .github/copilot-instructions.md and the specialized agents in .github/agents/. Other agents should follow the same rule: keep starter work in this repo, route runtime behavior to the owning al-org-dev plugin, and run bundle exec al-folio upgrade overrides audit whenever local overrides are added or retained.
Comprehensive guides for all aspects of your al-folio website:
- Documentation index – All user, maintainer, and migration guides
- Quick Start – Get running in 5 minutes
- Installation & Deployment – Set up your site on GitHub Pages or other platforms
- Customization Guide – Personalize your website (CVs, publications, themes, etc.)
- Troubleshooting – Fix common issues (deployment, build, styling, content)
- FAQ – Frequently asked questions and solutions
- Analytics – Add website analytics and visitor tracking
- SEO Guide – Optimize for search engines and improve discoverability
- Plugin Catalog – Featured and bundled plugin metadata (page source)
Everything below ships with the starter. Rows marked setup render nothing until you supply a key, ID or credential — bundling a plugin is not the same as switching the feature on. Each feature is owned by a versioned plugin — see docs/BOUNDARIES.md for the full ownership table, and Plugin Ecosystem for how to add or remove one.
| Feature | Plugin | Configure | 
|---|---|---|
| Pages, layouts, navigation, light/dark mode, theming | al_folio_core | Changing theme color | 
| Publications from BibTeX | al_folio_core + jekyll-scholar | Adding a new publication | 
| CV from RenderCV or JSONResume | al_folio_cv | Modifying the CV information | 
| Distill-style posts | al_folio_distill | the example post | 
| Math, TikZ diagrams | al_math | the math post | 
| Charts, mermaid, plotly | al_charts | the charts post | 
| Image zoom, galleries, sliders, lightbox | al_img_tools | the images post | 
| Full-text search (ctrl k) | al_search | search_enabled in _config.yml | 
| Comments (Giscus or Disqus) — setup | al_comments | giscus: in _config.yml | 
| Analytics — Google, Cronitor, Pirsch, Openpanel, Cloudflare, Simple — setup | al_analytics | docs/ANALYTICS.md | 
| GDPR cookie consent, gating analytics until opt-in — setup | al_cookie | GDPR Cookie Consent Dialog | 
| Newsletter signup — setup | al_newsletter | newsletter: in _config.yml | 
| Citation counts, altmetric/dimensions badges | al_citations | Adding a new publication | 
| FontAwesome, Academicons, scholar icons | al_icons | third_party_libraries in _config.yml | 
| Posts syndicated from Medium and other feeds | al_ext_posts | external_sources: in _config.yml | 
| Legacy Bootstrap markup (opt-in, removed in v2.0) | al_folio_bootstrap_compat | al_folio.compat.bootstrap in _config.yml | 
| Upgrade audits and codemods | al_folio_upgrade | bundle exec al-folio upgrade audit | 
Also included: Open Graph and schema.org previews, an Atom feed at /feed.xml, related posts, tabbed content, typograms, responsive image generation, and a Google Scholar citation-refresh workflow.
The theme follows the visitor's system preference and can be toggled with the sun/moon control in the navbar. The choice persists across visits.
Publications are generated from your BibTeX bibliography, the CV from a single cv.yml or resume.json, and the people page from _data. Everything is content-driven — you edit data files, not templates.
Projects are one of four Jekyll collections the starter ships (news, projects, books, teachings). You can add your own for courses, talks, or anything else — see Adding Collections.
Posts support the distill.pub layout, MathJax and TikZ, syntax-highlighted code, Jupyter notebooks, charts, image galleries, video and audio embeds.
The /repositories/ page renders repository and profile cards via github-stats-extended. Profile trophies via github-profile-trophy are supported but off by default, because that project's free public instance is currently disabled — see docs/CUSTOMIZE.md to self-host and re-enable.
Configure which repositories and profiles appear under Modifying the user and repository information.
Academics around the world use al-folio for their homepages, blogs, and lab pages, as well as webpages for courses, workshops, conferences, meetups, and more.
Want your site listed? Post a request in the Showcase category of GitHub Discussions — we review and add entries periodically. Please do not open a pull request for this.
Run the test yourself: Google Lighthouse PageSpeed Insights
For frequently asked questions, please refer to docs/FAQ.md.
Contributions to al-folio are very welcome! Before you get started, please take a look at the guidelines.
If you would like to improve documentation or fix a minor inconsistency or bug, please feel free to send a PR directly to main. For more complex issues/bugs or feature requests, please open an issue using the appropriate template.
CI runs the following on every pull request:
- Prettier — formatting, including Liquid templates
- lychee — broken links
- npm run lint:style-contract — enforces the thin-starter boundary described in AGENTS.md
- the six test/integration_*.sh scripts, and Playwright visual-regression checks
Axe accessibility checks are run manually, because the fixes are not always straightforward for contributors without web development experience.
Our most active contributors are welcome to join the maintainers team. If you are interested, please reach out!
| Maruan | Rohan Deb Sarkar | Amir Pourmand | George | 
Generated by bin/generate_star_history.py and refreshed automatically by star-history.yml.
al-folio is available as open source under the terms of the MIT License.
Originally, al-folio was based on the *folio theme (published by Lia Bogoev and under the MIT license). Since then, it got a full re-write of the styles and many additional cool features.
