URL: https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
抓取日期: 2026-10-05
标题: :focus-visible CSS pseudo-class - CSS | MDN

---

:focus-visible CSS pseudo-class

 Baseline
 
 Widely available

 This feature is well established and works across many devices and browser versions. It’s been available across browsers since March 2022.
The :focus-visible pseudo-class applies while an element matches the :focus pseudo-class and the UA (User Agent) determines via heuristics that the focus should be made evident on the element. (Many browsers show a "focus ring" by default in this case.)
This selector is useful to provide a different focus indicator based on the user's input modality (mouse vs. keyboard).
Try it
Syntax
:focus vs :focus-visible
Originally, user-agent CSS set focus styles based only on the :focus pseudo-class, styling most focused elements with a focus ring outline. This meant all elements, including all links and buttons, had a focus ring applied when focused, which many found ugly. Because of the appearance, some authors removed the user-agent outline focus styles. Changing focus style can decrease usability, while removing focus styles makes keyboard navigation inaccessible for sighted users.
Browsers no longer visibly indicate focus (such as by drawing a "focus ring"), around each element when it has focus. Instead, they use a variety of heuristics to provide focus indicators only when it would be most helpful to the user. For instance, when a button is clicked using a pointing device, the focus is generally not visually indicated, but when a text box needing user input has focus, focus is indicated. While focus styles are always required when users are navigating the page with the keyboard or when focus is managed via scripts, focus styles are not required when the user knows where they are putting focus, such as when they use a pointing device such as a mouse or finger to physically set focus on an element, unless that element continues to need user attention.
The :focus pseudo-class always matches the currently-focused element. The :focus-visible pseudo-class also matches the focused element, but only if the user needs to be informed where the focus currently is. Because the :focus-visible pseudo-class matches the focused element when needed, using the :focus-visible (instead of the :focus pseudo-class) allows authors to change the appearance of the focus indicator without changing when the focus indicator appears.
When the :focus pseudo-class is used, it always targets the currently focused element. This means that when a user employs a pointing device, a visible focus ring appears around the focused element, which some consider obtrusive. The :focus-visible pseudo-class respects user agents' selective focus indication behavior while still allowing focus indicator customization.
Accessibility
Low vision
Make sure the visual focus indicator can be seen by people with low vision. This will also benefit anyone use a screen in a brightly lit space (like outside in the sun). WCAG 2.1 SC 1.4.11 Non-Text Contrast requires that the visual focus indicator be at least 3 to 1.
- Accessible Visual Focus Indicators: Give Your Site Some Focus! Tips for Designing Useful and Usable Focus Indicators
Cognition
It may not be obvious as to why the focus indicator is appearing and disappearing if a person is using mixed forms of input. For users with cognitive concerns, or who are less technologically literate, this lack of consistent behavior for interactive elements may be confusing.
Examples
Comparing :focus and :focus-visible
This example presents three pairs of controls. Each pair consists of a text input and a button.
- The first pair does not add any custom styles for focus states, and shows the default case.
- The second pair adds styles using the :focus pseudo-class.
- The third pair adds styles using the :focus-visible pseudo-class.
If you click each element in turn, you will see that when :focus is used to style the focus ring, the UA draws the focus ring when the user clicks the button. However, when :focus-visible is used to style the focus ring, the UA does not draw the focus ring when the user clicks the button, just like in the default case.
If you then tab through each element, you will see that in all three cases — default, :focus, and :focus-visible — the UA draws the focus ring around the button when the user navigates to it with the keyboard.
This shows how :focus-visible enables a designer to follow the browser's logic in determining when a focus ring should be shown.
Providing a :focus fallback
If your code has to work in old browser versions that do not support :focus-visible, check supports of :focus-visible with @supports and repeat the same focus styling in it, but inside a :focus rule. Note that even if you do not specify anything at all for :focus, old browsers will simply display the native outline, which can be enough.
Specifications
| Specification | 
|---|
| Selectors Level 4 # the-focus-visible-pseudo |
