URL: https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
抓取日期: 2026-10-05
标题: aspect-ratio CSS property - CSS | MDN

---

aspect-ratio CSS property

 Baseline
 
 Widely available

 This feature is well established and works across many devices and browser versions. It’s been available across browsers since September 2021.
The aspect-ratio CSS property allows you to define the desired width-to-height ratio of an element's box.
Try it
Syntax
Values
This property is specified as one or both of the keyword auto or a <ratio>.
- auto
- 
Replaced elements with an intrinsic aspect ratio use that aspect ratio, otherwise the box has no preferred aspect ratio. Size calculations involving intrinsic aspect ratio always work with the content box dimensions.
- <ratio>
- 
The box's preferred aspect ratio is the specified ratio of width /height . Ifheight and the preceding slash character are omitted,height defaults to1 . Size calculations involving preferred aspect ratio work with the dimensions of the box specified bybox-sizing .
- auto && <ratio>
- 
When both auto and a<ratio> are specified together,auto is used if the element is a replaced element with a natural aspect ratio, like an<img> element. Otherwise, the specified ratio ofwidth /height is used as the preferred aspect ratio.
Description
The aspect-ratio property defines a desired width-to-height ratio of an element's box. This means that even if the parent container or viewport size changes, the browser will adjust the element's dimensions to maintain the specified width-to-height ratio. The specified aspect ratio is used in the calculation of auto sizes and some other layout functions.
At least one of the box's sizes needs to be automatic in order for aspect-ratio to have any effect. If neither the width nor height is an automatic size, then the provided aspect ratio has no effect on the box's preferred sizes.
This property is specified as one or both of the keyword auto or a <ratio>. If both are given, and the element is a replaced element, such as <img>, then the given ratio is used until the content is loaded. After the content is loaded, the auto value is applied, so the intrinsic aspect ratio of the loaded content is used.
If the element is not a replaced element, then the given ratio is used.
Formal definition
| Initial value | auto | 
|---|---|
| Applies to | all elements except inline boxes and internal ruby or table boxes | 
| Inherited | no | 
| Computed value | as specified | 
| Animation type | by computed value type | 
Formal syntax
aspect-ratio = 
auto ||
<ratio>
<ratio> =
<number [0,∞]> [ / <number [0,∞]> ]?
Examples
Exploring aspect-ratio effects with fixed width
In this example, the width of the <div> elements has been set to 100px and height to auto. Since the width value is fixed here, the aspect-ratio property affects only the height of the <div> elements to maintain the specified width-to-height ratio.
Fallback to natural aspect ratio
In this example we are using two <img> elements. The first element does not have its src attribute set to an image file.
The following code sets 3/2 as the preferred aspect ratio and auto as a fallback.
Note how the first image without replaced content keeps the 3/2 aspect ratio, while the second image after the content is loaded uses the image's natural aspect ratio.
Specifications
| Specification | 
|---|
| CSS Box Sizing Module Level 4 # aspect-ratio |
