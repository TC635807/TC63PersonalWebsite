URL: https://patrickstox.com/technical-seo/on-page/meta-tags/social-images/
抓取日期: 2026-10-05
标题: Social Sharing Images (og:image and twitter:image): Sizes, Limits, and Fallbacks

---

Social Sharing Images (og:image and twitter:image): Sizes, Limits, and Fallbacks
The image spec sheet for og:image and twitter:image — the safe 1200×630 (1.91:1) default, per-platform dimensions and file-size caps, the absolute-URL rule, Google's own 2026 thumbnail requirements, and why images fail vs. fall back.
og:image and twitter:image point at the image in your link-preview card — this is the deep dive on the image requirements, not the tag syntax (see the Open Graph and Twitter Cards siblings for that). The safe cross-platform default is an absolute HTTPS URL to a ~1200×630px (1.91:1) image, but that's a community-converged compromise, not a single official spec. Only Meta's numbers are primary-sourced: 200×200 minimum, 600×315 floor, ≥1200×630 recommended, 1.91:1, 8 MB cap. X's ~1200×628/675 and ~5 MB, Slack's ~32 KB early-HTML read, and WhatsApp's silent drop of large images are community consensus, not freshly-verifiable first-party specs — say so. The absolute-URL rule is a real silent failure: social crawlers don't resolve relative paths. A missing tag falls back to a scraped body image; a present-but-broken image (404, oversized, auth-blocked) is less forgiving and often shows no image at all. As of March 2026 Google reads og:image for its own Search and Discover thumbnails (its own docs don't extend this to AI surfaces), but its spec is 16:9 / ≥1200px wide / ≥300K pixels / no logos / no text — a different shape than the 1.91:1 social crop. Caching means fixing an image doesn't fix already-shared links until you force a re-scrape. This is a deep dive under the Meta Tags for SEO hub.
TL;DR — The social sharing image is the picture in the preview card when you
paste a link into Facebook, LinkedIn, Slack, or X. You set it with the og:image
tag (and twitter:image for X). Make it a full https:// web address, sized
about 1200×630 pixels, and keep the file small. If it’s the wrong size, a
broken link, or too big, you don’t get a nice card — you get whatever the platform
grabs instead. 
What the social image is
When you share a link, most apps show a little preview card: a headline, a bit of
text, and a picture. That picture is the social sharing image. You tell each
platform which image to use with a tag in your page’s head called og:image. X
(Twitter) can use a separate twitter:image tag, but if you don’t set one, X just
reuses your og:image.
This page is about the image itself — how big it should be, how small the file should be, and what breaks. The tags that point at the image are covered separately in the Open Graph and Twitter Cards topics; here we care about the picture.
The one size to remember
There’s no single official size that every platform agrees on, but one number is the safe default everywhere: 1200 × 630 pixels, a wide rectangle (about 1.91-to-1). Facebook recommends “at least 1200 x 630 pixels,” and that size looks right on LinkedIn, Slack, and X too. Use it and you’ll be fine on almost everything.
Three rules that trip people up
- Use a full web address, not a relative path. og:image needs a completehttps://www.example.com/image.jpg URL. A shortcut like/image.jpg won’t work —
the platforms that read your tag can’t figure out your domain on their own, so they
just skip it.
- Keep the file small. Facebook allows up to 8 MB, but other apps quietly drop images that are too heavy. Aim to keep it well under 1 MB — a few hundred KB is plenty for a preview.
- A missing or broken image isn’t a blank card. If your image is missing, platforms grab some other picture off your page. If your image link is broken (wrong address, blocked, too big), some apps show no picture at all — which can look worse than never setting one.
Why the image sometimes won’t update
If you fix your image but the old one keeps showing when you share the link, that’s caching — the platform saved the old version. You have to ask it to look again using a tool like Facebook’s Sharing Debugger or LinkedIn’s Post Inspector. Same story as with the other social tags.
Want the exact numbers per platform, the file-size caps, Google’s own image rules, and the difference between “missing” and “broken”? Switch to the Advanced tab.
TL;DR — This is the image spec sheet, not the tag syntax — og:image /
twitter:image mechanics live in the Open Graph and Twitter Cards siblings.
1200×630 (1.91:1) is the safe default, not an official universal standard. Only
Meta’s numbers are primary-sourced: 200×200 minimum, 600×315 floor, ≥1200×630
recommended, 1.91:1, 8 MB cap. X’s ~1200×628/675 and ~5 MB, Slack’s ~32 KB
early-HTML read, and WhatsApp’s ~300 KB silent drop are community consensus, not
freshly-verifiable first-party specs — I flag which is which. The absolute-URL
rule is a real silent failure: social crawlers don’t resolve relative paths.
Missing ≠ broken: an absent tag falls back to a scraped body image; a present
but failing image (404, oversized, auth/robots-blocked) often shows nothing.
Google now reads og:image for its own Search and Discover thumbnails (March 2026),
but its spec is 16:9 / ≥1200px wide / ≥300K pixels / no logo / no text — a
different shape than the 1.91:1 social crop. Caching means a fix doesn’t reach
already-shared links until you force a re-scrape. 
What this article covers (and what the siblings cover)
The tag mechanics — the four required Open Graph properties, name= vs. property=,
the four Twitter Card types, and the twitter:image → og:image fallback rule — are
already handled in Open Graph Tags and
Twitter Card Tags. This piece is the
companion spec sheet: dimensions, aspect ratio, file size, format, the absolute-URL
requirement, and what actually breaks when any of those is wrong. If you’re here to
write the <meta> line, start with those two; if you’re here because your image is
the wrong size or won’t show, you’re in the right place.
One quick reuse of the fallback rule, because it decides how many images you need:
twitter:image falls back to og:image when it’s absent, so most sites set one
image and use it for both — you only diverge if you specifically want a different
crop for X.
The safe default: 1200×630 (1.91:1) — and why it’s a compromise
Nearly every guide leads with 1200×630 and stops there. It’s a good default, but it’s worth being honest about where it comes from: it’s not a single cross-platform standard anyone publishes identically. It’s the community-converged size that clears Facebook’s recommendation and renders acceptably on everything else. Some guides say 1200×627, some say 1200×628 for X — those are rounding and legacy variants of the same ~1.91:1 idea, not competing specs. Pick 1200×630, and the only place you might want a second image is X, if you care about a tighter crop there.
Per-platform dimensions and file size
The single most useful thing this page can do is separate what’s primary-sourced (Meta) from what’s community consensus (everything else). I’ve been explicit about which is which — don’t treat the non-Meta numbers as gospel.
Facebook / Meta (primary-sourced)
From Meta’s own sharing-images documentation:
- Minimum: “The minimum allowed image dimension is 200 x 200 pixels.”
- Floor to avoid the small render: “At the minimum, you should use images that are 600 x 315 pixels to display link page posts with larger images.”
- Recommended: “Use images that are at least 1200 x 630 pixels for the best display on high resolution devices.”
- Aspect ratio: keep it “as close to 1.91:1 aspect ratio as possible” to avoid cropping in Feed.
- File-size cap: “The size of the image file must not exceed 8 MB.”
Meta is also the source of the “first-share” caching quirk: the crawler has to see the image at least once before it renders, so “the first person who shares a piece of content won’t see a rendered image.” (LinkedIn behaves similarly — this is the re-scrape story, covered in the Open Graph sibling.)
X / Twitter (community consensus — treat with caution)
X’s numbers are the ones to be careful with. The official Card Validator was
deprecated in 2022 with no replacement, and developer.x.com’s Cards documentation
is effectively gone: it returned an HTTP 402 Payment Required response in early July
2026, and as of this update the same URL instead redirects (HTTP 307) to docs.x.com’s
homepage, where the equivalent Cards-markup path 404s — a dead link either way, so
there is no live, freshly-checkable first-party X spec right now. The figures that
circulate across guides — roughly 1200×628 or 1200×675 for summary_large_image, a
300×157 minimum, a 4096×4096 maximum, and a ~5 MB file cap, with the small
summary card needing a smaller ~144×144-minimum square — are third-party consensus,
not a confirmed current official spec. They’re close enough to the 1.91:1 default to
be useful, but I wouldn’t present any specific X byte or pixel number as authoritative.
(The X documentation and validator situation is covered in full in the
Twitter Cards sibling.)
LinkedIn, Slack, WhatsApp, Discord, iMessage
- LinkedIn is the one non-Meta platform with its own documented numbers: its help page for making a site shareable states a minimum of 1200×627 pixels, a recommended ratio of 1.91:1, and a 5 MB max file size — and separately notes that “images less than 401 pixels wide display as a thumbnail image.” Build to the 1200×630 default and you clear this with margin; don’t confuse it with Facebook’s numbers, they’re LinkedIn’s own. Its Post Inspector is the re-scrape tool.
- Slack is a placement gotcha more than a size one: it’s widely reported to read
only the first ~32 KB of a page’s raw HTML when unfurling. If your head tags —
and thus your og:image reference — sit below that, Slack may never see them.
Slack’s own unfurling docs confirm it reads Open Graph / X Card metadata but don’t
publish a byte limit, so treat the 32 KB figure as reported, not officially
confirmed.
- WhatsApp is reported to silently drop the preview image for large files — commonly cited around ~300 KB, even though a higher (~600 KB) “official-sounding” WhatsApp number also floats around. Either way, a heavy image is the failure mode.
- Discord and iMessage inherit Open Graph with no separately documented image specs — build to the 1200×630 default and they follow.
The honest takeaway: rather than chasing the tightest documented number, target under ~1 MB — ideally 100–300 KB — and you clear every platform’s ceiling with margin.
The absolute-URL rule — a real, silent failure mode
This one is stated as fact everywhere but rarely explained. og:image and
twitter:image must be an absolute https://... URL. A relative path like
/images/share.jpg isn’t rejected with a visible error — it’s just silently
ignored. The reason: a browser resolves a relative path against the page’s own URL
because it already knows what page it’s on, but a social crawler fetching your tag has
no such base context and won’t reliably reconstruct your domain. So it skips the tag
and falls back to whatever else it can scrape. If your image “isn’t showing” and the
path in your source starts with a / instead of https://, that’s your bug.
One image, two masters: Google’s 2026 thumbnail spec
Here’s the freshest and least-covered angle. As of March 2, 2026, Google
documents og:image as one of two accepted metadata sources (alongside schema.org
primaryImageOfPage) for selecting its own thumbnails in Search and Discover
— Google’s own docs describe these two surfaces specifically and don’t extend the
claim to AI Overviews or other AI surfaces, so I won’t either. That means the same
image file now often has to satisfy both the social platforms and Google’s
text-result/Discover thumbnails — and their specs aren’t the same shape.
Google’s image guidance (Discover and Image SEO docs):
- Dimensions: “at least 1200 px wide.”
- Aspect ratio: a 16:9 ratio — not the social world’s 1.91:1.
- Resolution: “more than 300,000 total pixels” (a 1280×720 image is 921,600 pixels and clears this comfortably).
- Content: avoid “a generic image (for example, your site
