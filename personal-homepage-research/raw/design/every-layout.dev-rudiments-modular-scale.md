URL: https://every-layout.dev/rudiments/modular-scale/
抓取日期: 2026-10-05
标题: Modular scale

---

Modular scale
Music is fundamentally a mathematical exposition, and when we talk about the musicality of typesetting it is because typesetting and music share a mathematical basis.
We’re sure you will have heard of concepts like frequency, pitch, and harmony. These are all mathematically determinable, but were you aware that perceived pitch can be formed of multiple frequencies?
A single musical note, such as one produced by plucking a guitar string, is in itself a composition. The different frequencies (or harmonics) together belong to a harmonic series. A harmonic series is a sequence of fractions based on the arithmetic series of incrementation by 1.
1,2,3,4,5,6 // arithmetic series
1,½,⅓,¼,⅕,⅙ // harmonic series
The resulting sound is harmonious because of its regularity. The fundamental frequency is divisible by each of the harmonic frequencies, and each harmonic frequency is the mean of the frequencies either side of it.
Visual harmony
We should aim for harmony in our visual layout too. Like the sound of a plucked string, it should be cohesive. Given we’re working predominantly with text, it’s sensible to treat the line-height as a basis for extrapolating values for white space. A font-size of (implicitly) 1rem, and a line-height of 1.5 creates a default value of 1.5rem. A harmoniously larger space might be 3rem (2 ⨉ 1.5) or 4.5rem (3 ⨉ 1.5).
Creating a sequence by adding 1.5 at each step results in large intervals. Instead, we can multiply by 1.5. The result is still regular; the increments just smaller.
1 * 1.5; // 1.5
1.5 * 1.5; // 2.25
1.5 * 1.5 * 1.5; // 3.375
This algorithm is called a modular scale, and like a musical scale is intended for producing harmony. How you employ it in your design depends on what technology you are using.
Custom properties
In CSS, you can describe a modular scale using custom properties and the calc() function, which supports simple arithmetic.
In the following example, we divide or multiply by the set --ratio custom property (variable) to create the points on our scale. We can make use of already set points to generate new ones. That is, var(--s2) * var(--ratio) is equivalent to var(--ratio) * var(--ratio) * var(--ratio).
:root {
 --ratio: 1.5;
 --s-5: calc(var(--s-4) / var(--ratio));
 --s-4: calc(var(--s-3) / var(--ratio));
 --s-3: calc(var(--s-2) / var(--ratio));
 --s-2: calc(var(--s-1) / var(--ratio));
 --s-1: calc(var(--s0) / var(--ratio));
 --s0: 1rem;
 --s1: calc(var(--s0) * var(--ratio));
 --s2: calc(var(--s1) * var(--ratio));
 --s3: calc(var(--s2) * var(--ratio));
 --s4: calc(var(--s3) * var(--ratio));
 --s5: calc(var(--s4) * var(--ratio));
}
 
 The pow() function
 
At the time of writing, browsers only support basic arithmetic in calc() operations. However, a new suite of mathematical functions/expressions are coming to CSS. Crucially, this includes the pow() function, with which accessing and creating modular scale points becomes much easier.
:root {
 --ratio: 1.5rem;
}
.my-element {
 /* ↓ 1.5 * 1.5 * 1.5 is equal to 1.5³ */
 font-size: pow(var(--ratio), 3);
}
JavaScript access
Our scale variables are placed on the :root element, making them globally available. And by global, we mean truly global. Custom properties are available to JavaScript and also “pierce” Shadow DOM boundaries to affect the CSS of a shadowRoot stylesheet.
JavaScript consumes CSS custom properties like JSON properties. You can think of global custom properties as configurations shared by CSS and JavaScript. Here’s how you would get the --s3 point on the scale using JavaScript (document.documentElement represents the :root, or <html> element):
const rootStyles = getComputedStyle(document.documentElement);
const scale3 = rootStyles.getPropertyValue('--s3');
Shadow DOM support
The same --s3 property is successfully applied when invoked in Shadow DOM, as in the following example. The :host selector refers to the hypothetical custom element itself.
this.shadowRoot.innerHTML = `
 <style>
 :host {
 padding: var(--s3);
 }
 </style>
 <slot></slot>
`;
Passing via props
Sometimes we might want our custom element to consume certain styles from properties (props) — in this case a padding prop.
<my-element padding="var(--s3)">
 <!-- Light DOM contents -->
</my-element>
The var(--s3) string can be interpolated into the custom element instance's CSS using a template literal:
this.shadowRoot.innerHTML = `
 <style>
 :host {
 padding: ${this.padding};
 }
 </style>
 <slot></slot>
`;
But first we need to write a getter and a setter for our padding prop. The || var(--s1) suffix in the getter’s return line is the default value. Use of sensible defaults makes working with layout components less laborious; we’re aiming for convention over configuration.
 get padding() {
 return this.getAttribute('padding') || 'var(--s1)';
 }
 set padding(val) {
 return this.setAttribute('padding', val);
 }
Eschewing Shadow DOM
The custom elements used to implement Every Layout's layouts do not use Shadow DOM because they are designed to more fully leverage 'global' styles. See Global and local styling for more information.
Not using Shadow DOM also makes it easier to server-side render the embedded styles. The initial styling of any one layout is embedded into the document as part of the build process, meaning Every Layout's custom elements are not dependent on JavaScript, except for the dynamic processing of their values in developer tools, or via your own custom scripting.
Enforcing consistency
This padding prop is currently permissive; the author can supply a custom property, or a simple length value like 1.25rem. If we wanted to enforce the use of our modular scale, we would accept only numbers (2, 3, -1) and interpolate them like var(--${this.padding}).
We could check that an integer value is being passed using a regular expression. HTML attribute values are implicitly strings. We are looking for a single digit string containing a number.
if (!/(?<!\S)\d(?!\S)/.test(this.padding)) {
 console.error('<my-component>’s padding value should be a number representing a point on the modular scale');
 return;
}
The modular scale is predicated on a single number, in this case 1.5. Through extrapolation—as a multiplier and divisor—the number’s presence can be felt throughout the visual design. Consistent, balanced design is seeded by simple axioms like the modular scale ratio.
Some believe the specific ratio used for one’s modular scale is important, with many adhering to the golden ratio of 1.61803398875. But it is in the strict adherence to whichever ratio you choose that harmony is created.
