source: https://github.com/senli1073/academic-homepage-template/blob/main/README.md



![Github Forks](https://img.shields.io/github/forks/senli1073/academic-homepage-template?style=flat)
![Github Stars](https://img.shields.io/github/stars/senli1073/academic-homepage-template?style=flat)
![License](https://img.shields.io/github/license/senli1073/academic-homepage-template)
![Last Commit](https://img.shields.io/github/last-commit/senli1073/academic-homepage-template)

# A simple Github Pages template for personal academic websites.

> ⚠️ SECURITY NOTICE (2026-06)
> 
> Older versions of this template include a polyfill.io dependency
> which may cause malicious popups.
>
> Please update to the latest version immediately.

## Preview
[![Screenshot of the Website](https://raw.githubusercontent.com/senli1073/academic-homepage-template/main/screenshot_full.png)](https://senli1073.github.io/)


## Introduction

This personal academic website template is based on [startbootstrap](https://github.com/StartBootstrap/startbootstrap-new-age).

The template is designed to integrate Markdown files as content input.  There's no need to compile the webpage before deployment.  Upon loading, the Markdown files are automatically parsed and embedded into the page.

The homepage sections and navigation bar are configured in `contents/config.yml`. Each section loads its body from a matching Markdown file in `contents/`, such as `contents/publications.md`.

The top background supports multiple images. Add images under `static/assets/background/`, list them in `contents/config.yml`, and the page will pick a random first image on refresh before rotating through the list.

This template supports LaTeX formula input. You can use `$...$` and `\(...\)` as delimiters for inline-math, or use `$$...$$` and `\[...\]` as delimiters for display-math. Macros such as `\ref{...}`, `\eqref{...}`, and `\begin{equation}...\end{equation}` are also supported. See [MathJax](https://docs.mathjax.org/en/latest/index.html) for more details.

:milky_way: Demo: https://senli1073.github.io/


## Getting Start
### 1. Fork this repository
The repository name should be `<username>.github.io`, which will also be your website's URL.


### 2. Edit page content

(1) Go to the folder where you want to store your project, and clone the new repository:
```
git clone https://github.com/<username>/<username>.github.io.git
```
The directory structure is as follows:

```.
.
├── contents
└── static
    ├── assets
    │   ├── background
    │   └── img
    ├── css
    └── js
```

(2) Modify the content of each section, which corresponds to `contents/*.md`.

(3) Adjust the title, copyright information, background images, footer links, navigation, and sections in `contents/config.yml`.

Example section configuration:

```yaml
sections:
  - id: home
    nav: HOME
    title: User Name&ensp;|&ensp;姓名
    href: '#page-top'
  - id: publications
    nav: PUBLICATIONS
    title: PUBLICATIONS
    icon: bi-file-text-fill
  - id: awards
    nav: AWARDS
    title: AWARDS
    icon: bi-award-fill
```

For each section, `id` maps to `contents/<id>.md`, `nav` sets the navigation text, `title` sets the section heading, and `icon` is an optional [Bootstrap Icons](https://icons.getbootstrap.com/) class. If `href` is omitted, the navigation link defaults to `#<id>`.

Example background configuration:

```yaml
backgrounds:
  - static/assets/background/background_0.jpeg
  - static/assets/background/background_1.png
background-interval-ms: 7000
background-overlay: 0.52
```

(4) Replace background images in `static/assets/background/` and replace the profile photo in `static/assets/img/`.

(5) Push it: 
```
git commit -am 'init'
git push
```

### 3. Setup
(1) Under your repository name, click `Settings`.

(2) In the "Code and automation" section of the sidebar, click `Pages`.

(3) Under "Build and deployment", under "Source", select Deploy from a branch. Then, use the branch dropdown menu and select a publishing source.

### 4. Enjoy

Fire up a browser and go to `https://<username>.github.io`

> Note that it can take up to 10 minutes for changes to your site to publish after you push the changes to GitHub.


## License

Copyright Sen Li, 2023-2025. Licensed under an MIT license. You can copy and mess with this template.
