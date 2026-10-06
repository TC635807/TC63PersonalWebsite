source: https://github.com/picocss/pico
ok: true
title: GitHub - picocss/pico: Minimal CSS Framework for semantic HTML

v2.1.1 is the final release.
Why
Today, AI can generate lightweight, standalone, accessible HTML with just the CSS it needs, so a Minimal CSS Framework for Semantic HTML matters less than it used to. To stay relevant, Pico CSS would need a full rewrite: plain modern CSS instead of Sass, built on features it doesn't use today (OKLCH colors, cascade layers, Popover, anchor positioning) with fallbacks for older browsers, and a native compiler that strips unused CSS and makes customization easy. That would be a different project. Pico CSS stays as it is.
What this means
- Nothing breaks. npm, the jsDelivr CDN and picocss.com stay online for the long term.
- The repositories are archived. No new issues, PRs or releases.
- Pico CSS is MIT licensed. You're free to fork it and take it further. See community forks.
- The Pico CSS name and logo are not covered by the MIT license. Please give your fork its own name, so users don't confuse it with the original.
Thank you
What started as a small side project ended up powering thousands of websites. Thank you to everyone who used it, opened issues, sent pull requests and wrote kind messages over the years.
A minimalist and lightweight starter kit that prioritizes semantic syntax, making every HTML element responsive and elegant by default.
Write HTML, Add Pico CSS, and Voilà!
Pico v2.0 features better accessibility, easier customization with SASS, a complete color palette, a new group component, and 20 precompiled color themes totaling over 100 combinations accessible via CDN.
With just the right amount of everything, Pico is great starting point for a clean and lightweight design system.
- Class-light and Semantic
- Great Styles with Just CSS
- Responsive Everything
- Light or Dark Mode
- Easy Customization
- Optimized Performance
There are 4 ways to get started with pico.css:
Download Pico and link /css/pico.min.css in the <head> of your website.
<link rel="stylesheet" href="css/pico.min.css">
Alternatively, you can use jsDelivr CDN to link pico.css.
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">npm install @picocss/pico
Or
yarn add @picocss/pico
Then, import Pico into your SCSS file with @use:
@use "pico";composer require picocss/pico<!doctype html>
<html lang="en">
 <head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">
 <meta name="color-scheme" content="light dark">
 <link rel="stylesheet" href="css/pico.min.css">
 <title>H