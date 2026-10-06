URL: https://web.dev/articles/font-best-practices
抓取日期: 2026-10-05
标题: 字体最佳实践 | Articles | web.dev

---

针对 Core Web Vitals 优化 Web 字体。
本文档讨论了字体的性能最佳实践。Web 字体会以多种方式影响性能：
- 延迟文本渲染： 如果 Web 字体尚未加载，浏览器通常会延迟文本渲染。在许多情况下，这会延迟 首次内容绘制 (FCP)。在某些情况下，这会延迟 最大内容绘制 (LCP)。
- 布局偏移： 字体替换的做法可能会 导致布局偏移 ，并影响 累积布局偏移 (CLS)。当 Web 字体及其回退字体在网页上占用的空间量不同时，就会发生这些布局偏移。
本文档包含三个部分：字体加载、字体交付和 字体渲染。每个部分都介绍了字体生命周期的特定方面的工作原理，并提供了相应的最佳实践。
字体加载
字体是重要的资源。如果没有字体，用户可能无法查看网页内容。因此，字体加载的最佳实践通常侧重于确保尽可能早地加载字体。应特别注意从第三方网站加载的字体，因为下载这些字体文件需要单独的连接设置。
如果您不确定网页的字体是否及时请求，请查看 Chrome 开发者工具中网络 面板内的时间 标签页，了解详情。
了解 @font-face
在深入了解字体加载的最佳实践之前，务必了解
如何 @font-face 工作
以及它如何影响字体加载。
@font-face
声明是使用任何 Web 字体的重要组成部分。它至少会声明用于引用字体的名称，并指明相应字体文件的位置。
@font-face {
 font-family: "Open Sans";
 src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
}
一个常见的误解是，当遇到 @font-face 声明时，系统会请求字体。这是错误的。就其本身而言，@font-face 声明不会触发字体下载。相反，只有当网页上使用的样式引用了字体时，才会下载字体。例如：
@font-face {
 font-family: "Open Sans";
 src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
}
h1 {
 font-family: "Open Sans"
}
在此示例中，Open Sans 只有当网页包含
<h1> 元素时，才会下载。
因此，在考虑字体优化时，务必像考虑字体文件本身一样考虑样式表。更改样式表的内容或交付方式可能会对字体到达时间产生重大影响。 同样，移除未使用的 CSS 和拆分样式表可以减少网页加载的字体数量。
内嵌字体声明
大多数网站都会从在主文档的 <head> 中内嵌字体声明和其他
关键样式中受益，而不是将它们包含在外部样式表中。这样一来，浏览器就能更快地发现字体声明，因为浏览器无需等待外部样式表下载。
<head>
 <style>
 @font-face {
 font-family: "Open Sans";
 src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
 }
 body {
 font-family: "Open Sans";
 }
 ...etc.
 </style>
</head>
内嵌关键 CSS 可能是一种更高级的技术，并非所有网站都能实现。性能优势显而易见，但它需要额外的流程和构建工具，以确保必要的 CSS（最好是仅关键 CSS）正确内嵌，并且任何额外的 CSS 都以非渲染阻塞的方式交付。
预先连接到关键第三方来源
如果您的网站从第三方网站加载字体，强烈建议您使用 preconnect资源提示与第三方来源建立早期连接。资源提示应放置在文档的 <head> 中。以下资源提示用于设置连接以加载字体样式表。
<head>
 <link rel="preconnect" href="https://fonts.com">
</head>
如需预先连接用于下载字体文件的连接，请添加一个单独的 preconnect 资源提示，该提示使用 crossorigin 属性。
与样式表不同，字体文件必须通过
CORS 连接发送。
<head>
 <link rel="preconnect" href="https://fonts.com">
 <link rel="preconnect" href="https://fonts.com" crossorigin>
</head>
使用 preconnect 资源提示时，请注意字体提供商可能会从单独的来源提供样式表和字体。例如，以下是如何将 preconnect 资源提示用于 Google Fonts。
<head>
 <link rel="preconnect" href="https://fonts.googleapis.com">
 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
</head>
使用 preload 加载字体时要谨慎
虽然 preload 在使字体在网页加载过程的早期可被发现方面非常有效，但这样做会占用浏览器资源，从而影响其他资源的加载。
内嵌字体声明和调整样式表可能是一种更有效的方法。这些调整更接近于解决字体发现延迟的根本原因，而不仅仅是提供一种解决方法。
此外，使用 preload 作为字体加载策略时也应谨慎，因为它会绕过浏览器的一些内置内容协商策略。例如，preload 会忽略 unicode-range 声明，如果谨慎使用，则应仅用于加载单个字体格式。
不过，在使用外部样式表时，预加载最重要的字体可能非常有效，因为浏览器在很晚之前不会发现是否需要该字体。
字体交付
字体交付速度越快，文本渲染速度就越快。此外，如果字体交付得足够早，这有助于消除因字体替换而导致的布局偏移。
使用自托管字体
从理论上讲，使用自托管字体应该可以提供更好的性能，因为它消除了第三方连接设置。但在实践中，这两种选项之间的性能差异不太明显。例如， 《Web Almanac》发现， 使用第三方字体的网站的渲染速度比使用 第一方字体的网站更快。
如果您考虑使用自托管字体，请确认您的网站使用 内容分发网络 (CDN) 和 HTTP/2。如果不使用这些技术，自托管字体不太可能提供更好的性能。
如果您使用自托管字体，建议您还应用一些字体文件优化，第三方字体提供商通常会自动提供这些优化。例如，字体子集化和 WOFF2 压缩。应用这些优化所需的工作量在一定程度上取决于您的网站支持的语言。特别是，请注意针对字体优化 CJK 语言可能特别具有挑战性。
使用 WOFF2
在现代字体中，WOFF2 是最新的， 具有最广泛的浏览器支持，并提供最佳压缩。由于它使用 Brotli，因此 WOFF2 的压缩效果比 WOFF 好 30%，从而减少了要下载的数据，因此性能更快。
鉴于浏览器支持，专家现在建议仅使用 WOFF2：
 
 事实上，我们认为现在也是时候宣布：仅使用 WOFF2，忘记其他一切。
 
 这将大大简化您的 CSS 和工作流程，并防止任何意外的双重或不正确的字体下载。现在，WOFF2 在任何地方都受支持。因此，除非您需要支持非常旧的浏览器，否则只需使用 WOFF2。如果无法使用，请考虑完全不向这些旧版浏览器提供任何 Web 字体。如果您制定了可靠的回退策略，这不会成为问题。旧版浏览器上的访问者将看到您的回退字体。
 
子集字体
字体文件通常包含大量 字形，用于支持各种字符 。但您可能不需要网页上的所有字符，并且可以通过子集化字体来减小字体文件的大小。
unicode-range
声明中的 @font-face 描述符会告知浏览器字体可用于哪些字符
。
@font-face {
 font-family: "Open Sans";
 src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
 unicode-range: U+0025-00FF;
}
如果网页包含一个或多个与 Unicode 范围匹配的字符，则会下载字体文件。unicode-range 通常用于根据网页内容使用的语言提供不同的字体文件。
unicode-range 通常与子集化技术结合使用。
子集字体包含原始字体文件中包含的字形的一小部分。例如，网站可能会为拉丁字符和西里尔字符生成单独的子集字体，而不是向所有用户提供所有字符。
每个字体的字形数量差异很大：
- 拉丁字体的字形数量通常在 100 到 1000 个之间。
- CJK 字体的字符数可能超过 10,000 个。
移除未使用的字形可以显著减小字体的文件大小。
某些字体提供商可能会自动提供具有不同子集的字体文件的不同版本。例如，Google Fonts 默认会这样做：
/* devanagari */
@font-face {
 font-family: 'Poppins';
 font-style: normal;
 font-weight: 400;
 font-display: swap;
 src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJbecnFHGPezSQ.woff2) format('woff2');
 unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
}
/* latin-ext */
@font-face {
 font-family: 'Poppins';
 font-style: normal;
 font-weight: 400;
 font-display: swap;
 src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJnecnFHGPezSQ.woff2) format('woff2');
 unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
 font-family: 'Poppins';
 font-style: normal;
 font-weight: 400;
 font-display: swap;
 src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2) format('woff2');
 unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
在迁移到自托管时，可能会遗漏此优化，从而导致本地字体文件较大。
如果您的字体提供商允许，您可以手动子集化字体，方法是使用
API (Google Fonts 通过提供 text 参数)，
或者手动修改字体文件，然后进行自托管。用于生成字体子集的工具包括
subfont 和
glyphanger。
请务必查看字体许可，以确认它们允许子集化 和自托管。
减少 Web 字体的使用
交付速度最快的字体是根本没有请求的字体。 系统字体和可变字体是两种可能减少网站上使用的 Web 字体数量的方法。
系统字体是用户设备的用户界面使用的默认字体。系统字体通常因操作系统和版本而异。由于字体已安装，因此无需下载字体。系统字体特别适合用于正文。
如需在 CSS 中使用系统字体，请将 system-ui 列为字体系列：
font-family: system-ui
__可变字体的理念是，单个
可变字体可以替代多个字体文件。可变
字体的工作原理是定义“默认”字体样式，并提供
“轴”用于操作字体。
例如，具有 Weight 轴的可变字体可用于实现以前需要为细体、常规、粗体和特粗体使用单独字体的字母。
并非所有人都受益于切换到可变字体。 可变字体包含许多样式，因此通常 比仅包含一种 样式的单个非可变字体的文件大小更大。使用可变字体后，改进最大的网站是那些使用（并且需要使用）各种字体样式和粗细的网站。
字体渲染
当遇到尚未加载的 Web 字体时，浏览器面临着一个两难境地：是应该等到 Web 字体到达后再渲染文本？ 还是应该在 Web 字体到达之前以回退字体渲染文本？
不同的浏览器对此场景的处理方式不同。默认情况下，如果关联的 Web 字体尚未加载，基于 Chromium 的浏览器和 Firefox 浏览器会阻止文本渲染最多 3 秒。Safari 会无限期阻止文本渲染。
可以使用 font-display 属性配置此行为。此选择可能会产生重大影响：font-display 可能会影响 LCP、FCP 和布局稳定性。
选择合适的 font-display 策略
font-display
会告知浏览器在关联的 Web 字体尚未加载时应如何继续进行文本渲染。它是按字体面定义的。
@font-face {
 font-family: Roboto, Sans-Serif
 src: url(/fonts/roboto.woff) format('woff'),
 font-display: swap;
}
font-display 有五个可能的值：
| 值 | 阻塞期 | 替换期 | 
|---|---|---|
| 自动 | 因浏览器而异 | 因浏览器而异 | 
| 阻塞 | 2-3 秒 | 无限 | 
| 替换 | 0 毫秒 | 无限 | 
| 后备 | 100 毫秒 | 3 秒 | 
| 可选 | 100 毫秒 | 无 | 
- 阻塞期：阻塞期从浏览器请求 Web 字体时开始。在阻塞期内，如果 Web 字体不可用，则字体会以不可见的回退字体渲染，因此用户看不到文本。如果在阻塞期结束时字体不可用，则会以回退字体渲染。
- 替换期：替换期在阻塞期之后。如果 Web 字体在替换期内可用，则会“替换”为该字体。
font-display 策略反映了关于性能和美观之间权衡的不同观点。因此，很难推荐一种方法，因为它取决于个人偏好、Web 字体对网页和品牌的重要性，以及延迟到达的字体在替换时可能带来的突兀感。
对于大多数网站，根据您的首要任务，以下是三种最适用的策略：
- 性能：使用 font-display: optional 。这是“性能”最高的方法：文本渲染延迟不超过 100 毫秒，并且可以确保不会发生与字体替换相关的布局偏移。
缺点是，如果 Web 字体延迟到达，则不会使用该字体。
- 快速显示文本并仍使用 Web 字体：使用 font-display: swap 但请确保字体交付得足够早，以免导致布局
偏移。此选项的缺点是，当字体延迟到达时，会发生突兀的偏移。
- 文本以 Web 字体显示：使用 font-display: block ，但请确保
字体交付得足够早，以最大限度地减少文本延迟。
初始文本显示会延迟。尽管存在此延迟，但它仍然可能导致布局偏移，因为文本实际上是以不可见的方式绘制的，因此回退字体空间用于保留空间。Web 字体加载后，可能需要不同的空间，因此会发生偏移。与font-display: swap 相比，这可能是一种不太突兀的偏移，因为文本本身不会发生偏移。
另请注意，这两种方法可以结合使用：例如，对品牌和其他视觉上独特的网页元素使用 font-display: swap。
对正文使用的字体使用 font-display: optional。
图标字体
适用于传统 Web 字体的 font-display 策略不适用于图标字体。图标字体的回退字体通常与图标字体看起来有很大不同，并且其字符可能传达完全不同的含义。因此，图标字体更有可能导致显著的布局偏移。
此外，使用回退字体可能不切实际。如果可能，请将图标字体替换为 SVG，这也有利于无障碍功能。较新版本的常用图标字体通常支持 SVG。如需详细了解如何切换到 SVG，请参阅 Font Awesome 的 SVG Sprites 页面 和我们的 Material Icons 指南。
减少回退字体和 Web 字体之间的偏移
如需减少 CLS 影响，您可以使用
size-adjust 属性。
总结
Web 字体仍然是性能瓶颈，但我们有越来越多的选项可供选择，以便我们对其进行优化，尽可能减少此瓶颈。
