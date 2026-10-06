URL: https://alltools.dev/reference/design/spacing-scales-explained/
抓取日期: 2026-10-05
标题: Spacing Scales Explained - 8pt Grids and Tokens

---

Spacing Scales Explained: Why 8pt Beats Eyeballing It
Pick any production design system - Material 3, Apple HIG, Bootstrap, Tailwind, your last employer's internal one - and one of the first decisions documented is the spacing scale. Not "how much padding should this button have," but "what is the legal set of values padding can take, anywhere, ever." That constraint is what makes a design feel like a system rather than a collection of one-offs.
The 8-point grid (and its 4-point variant) became the dominant choice for one practical reason: every common screen density (1×, 1.5×, 2×, 3×) divides 8 cleanly into whole-pixel values, so a button padded with 8px renders pixel-perfect on a phone, a desktop, and a high-DPI tablet alike. Sub-pixel rendering is what makes 5px or 7px values look soft and inconsistent across devices, and it's why Material 3, Apple HIG, and Tailwind's default scale all step in multiples of 4. The systems that work best in practice are small enough to memorize - 6 to 10 values, not 20.
On this page (9)
Why a Scale Beats Arbitrary Values
If padding can be any pixel value, designers and engineers will quietly drift toward "the value that looks right today." Multiply that by a hundred components and a year of churn, and you end up with 32px and 33px sitting next to each other on the same screen, both of them deliberate at the time.
A scale forces every spacing decision through a small number of allowed values - typically 8 to 12. Every gap, padding, and margin in the system has to pick one. The benefits compound:
- Visual consistency. Components from different teams and different vintages share the same rhythm.
- Easier engineering. Spacing tokens map to a small set of utility classes; "padding-md" is unambiguous.
- Easier review. "This card uses 14px padding" is immediately a code-smell - 14 isn't on the scale.
- Cheaper redesigns. Changing the base unit cascades; one variable, a hundred components.
The 8pt Grid
Material Design popularized the 8pt grid in 2014 - every spacing value is a multiple of 8 (4, 8, 16, 24, 32, 48, 64, 96, …). It works because:
- It scales cleanly across device pixel ratios. 8 logical pixels stays sharp at 1×, 1.5×, 2×, and 3× display densities. Half-values (4) don't blur on integer-ratio displays.
- It's coarse enough to avoid one-pixel-off bugs but fine enough to express most real spacing needs.
- Most icon grids align to it. 24×24 and 16×16 icons share a multiple of 8.
The classic 8pt scale: 4, 8, 16, 24, 32, 48, 64, 96, 128. The 4 is a half-step for fine adjustments inside compact components (badge padding, gap between an icon and label).
When to Drop to 4pt
A pure 8pt grid feels too coarse for very dense UIs - admin dashboards, IDEs, financial tooling - where the difference between 8px and 16px gap between two table rows is visually huge. Apple's HIG and Microsoft's Fluent both use a 4pt grid.
4pt scale: 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64. More steps, finer control, works for compact UI without giving up the snap-to-grid discipline.
A useful pattern: 4pt grid for component-internal spacing (padding, gap), 8pt grid for page-level layout (section margins, container gutters). Both grids share many values; the 4pt steps fill in the gaps where they matter most.
Geometric vs Arithmetic Scales
Spacing scales come in two broad shapes:
- Arithmetic - fixed-size steps. 4, 8, 12, 16, 20, 24, 28, … Each step adds 4. Works fine in the small-spacing range; loses expressiveness at large sizes (32 vs 36 is a tiny visual difference).
- Geometric - multiplicative steps. 4, 8, 16, 32, 64, 128. Each step doubles the previous. The visual size of the jumps stays proportional - small steps in the small range, dramatic jumps for layout-level spacing.
- Hybrid - most production scales. Arithmetic at the bottom (every 4 from 4 to 24 or so) and geometric at the top (32 → 48 → 64 → 96 → 128). Tailwind, Material, and Bootstrap all do this.
The hybrid shape matches how spacing is actually used: small adjustments need fine control, big layout decisions need coarse, distinguishable values.
T-Shirt Sizes vs Numeric Tokens
Two naming conventions dominate:
- T-shirt sizes - xs / sm / md / lg / xl / 2xl / 3xl . Memorable, but semantically dishonest if you ever need to insert a value between sm and md (you'll end up with smd, which is illegible).
- Numeric tokens - Tailwind's 1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96 . The number is a multiple of the base unit (0.25rem = 4px). Insertion is unambiguous (add 14 between 12 and 16). The downside: numbers don't carry semantic meaning ("which is bigger, 6 or 8?" is a thing every newcomer to Tailwind asks once).
Many systems combine both - semantic tokens (spacing.section, spacing.card-padding) layered on top of a numeric scale. Components reference the semantic name; the semantic token resolves to a numeric step. Renaming a numeric value cascades; renaming a semantic value rarely does.
Design Tokens - Bridging Design and Code
Design tokens are the implementation form of a scale. A JSON or YAML file defines each step once; build tooling compiles it into CSS variables, Tailwind config, iOS / Android assets, Figma styles, and documentation. The W3C is standardizing the format (Design Tokens Community Group spec).
A minimal spacing-token file:
{
 "spacing": {
 "1": { "value": "4px" },
 "2": { "value": "8px" },
 "3": { "value": "12px" },
 "4": { "value": "16px" },
 "6": { "value": "24px" },
 "8": { "value": "32px" }
 }
}
Tools like Style Dictionary or the Tokens Studio Figma plugin compile these into platform-specific outputs. The win: the spacing scale lives in one file, shared between design and engineering, with no manual translation step.
Type Scale
Spacing Scale
Output
:root {
 /* Type Scale */
 --font-xs: 10.2px;
 --font-sm: 12.8px;
 --font-base: 16px;
 --font-lg: 20px;
 --font-xl: 25px;
 --font-2xl: 31.3px;
 --font-3xl: 39.1px;
 --font-4xl: 48.8px;
 --font-5xl: 61px;
 /* Spacing Scale */
 --space-2xs: 4px;
 --space-xs: 8px;
 --space-sm: 12px;
 --space-md: 16px;
 --space-lg: 24px;
 --space-xl: 32px;
 --space-2xl: 48px;
 --space-3xl: 64px;
 --space-4xl: 96px;
}
Tailwind as a Working Example
Tailwind ships with a complete spacing scale in its default config. Every spacing utility (p-*, m-*, gap-*, space-x-*) accepts the same scale - and the same numeric tokens drive width, height, font-size offsets, and gap, so the rhythm propagates everywhere.
The Tailwind v3 default scale: 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96. Each multiplied by 0.25rem (4px). 32 evenly spaced steps, hybrid-shaped (arithmetic 0–12, geometric jumps 14, 16, 20, 24, 28, 32, 40, 48 …).
Tailwind v4 makes the base unit a CSS variable (--spacing), so you can override the entire scale by changing one value - every utility recomputes. The token system that used to live in tailwind.config.js now lives in CSS, which is closer to where engineers expect it.
Density Modes
Some systems ship two scales side by side - a compact and a comfortable mode - letting users pick. Material 3 calls these density; iOS calls them compact mode; many B2B SaaS apps offer them. The compact scale is the comfortable scale shifted down by one or two steps.
Implementation: define both scales as design tokens and toggle a CSS class or data attribute on the root that swaps which scale is active. Component code stays the same - the token value changes underneath.
The rem-vs-px Decision Hides an Accessibility Choice
One detail in a spacing scale quietly decides whether a user can zoom your layout: whether the token resolves to px or rem. A pixel value is absolute. A rem is relative to the root font size, which defaults to 16px but which a user can raise in their browser settings - and many people with low vision do exactly that. If your spacing scale is authored in px, the text scales when the user bumps the root size but the gaps and padding around it do not, so a comfortable layout turns cramped at the zoom level the user needed.
This is why Tailwind authors its scale in rem: p-4 is 1rem, not 16px, so a user who sets their browser to 20px gets proportionally larger padding for free. The gotcha is that the convenient mental model - "the base unit is 4px" - is only true at the default root size. The honest statement is "the base unit is 0.25rem, which is 4px when nobody has changed anything." Teams that hardcode the scale in pixels because pixels are easier to eyeball are trading away resize accessibility without noticing, and WCAG 2.2 SC 1.4.4 (Resize Text) is the criterion they quietly fail. Keep the scale in rem, reserve pixels for things that genuinely must not scale (hairline borders, 1px dividers), and the system honors the user's zoom by default.
Material Design 3 - Foundations: Layout
Google's spacing-scale guidance, including the 4dp / 8dp grid and density classes used across Material components.
Apple Human Interface Guidelines - Layout
Apple's layout guidance for iOS, macOS, and watchOS, including the 4pt grid the system frameworks align to.
Tailwind CSS - Spacing
Tailwind's spacing-scale documentation, the default ramp values, and how to extend or override the scale via tokens.
Design Tokens Community Group - Format Spec
W3C-tracked specification for the design tokens JSON format, the emerging standard for cross-platform token interchange.
Informational only. This article is for general reference and does not constitute professional financial, medical, or legal advice. Verify details with a qualified professional for your specific situation.
Sources & Further Reading
- 1. Material Design 3 - Foundations: Layout — Google's spacing-scale guidance, including the 4dp / 8dp grid and density classes used across Material components.
- 2. Apple Human Interface Guidelines - Layout — Apple's layout guidance for iOS, macOS, and watchOS, including the 4pt grid the system frameworks align to.
- 3. Tailwind CSS - Spacing — Tailwind's spacing-scale documentation, the default ramp values, and how to extend or override the scale via tokens.
- 4. Design Tokens Community Group - Format Spec — W3C-tracked specification for the design tokens JSON format, the emerging standard for cross-platform token interchange.
Related Tools
Spacing & Type Scale Calculator
Free modular scale generator. Create harmonious typography and 8pt spacing tokens from a base size and ratio. Export CSS variables.
CSS Gradient Generator - Visual Linear, Radial & Conic Builder
Free CSS gradient generator. Build linear, radial, and conic gradients visually, tune color stops, and copy CSS or Tailwind instantly.
Color Converter - HEX, RGB, HSL, OKLCH & Contrast
Free color converter. Convert between HEX, RGB, HSL, and OKLCH formats with live preview, WCAG contrast, and one-click copy.
Contrast Checker - WCAG 2.2 AA & AAA Color Tester
Free WCAG 2.2 contrast checker. Test foreground and background colors against SC 1.4.3 AA and 1.4.6 AAA thresholds with live preview.
Related Reading
- Color Theory Basics: A Practical Guide for Designers — Color models, the wheel, harmonies, the 60-30-10 rule, and the accessibility constraints that shape every production palette - in one practical guide.
- Typography Hierarchy: How to Make Words Look Like a System — Type scales, body text fundamentals, font pairing, the difference between weight and size contrast, and the WCAG rules that constrain every text decision.
- WCAG Color Contrast: Designing for Accessibility — Why 4.5:1 and 3:1 are the AA thresholds, how the luminance math behind them works, and how to build a palette that passes without flattening your brand.
