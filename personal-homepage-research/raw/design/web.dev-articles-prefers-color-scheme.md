URL: https://web.dev/articles/prefers-color-scheme
抓取日期: 2026-10-05
标题: Preferreds-color-scheme：你好，黑暗，我的老朋友 | Articles | web.dev

---

是过度炒作还是必需品？全面了解深色模式以及如何支持深色模式，从而让用户受益！
简介
深色模式之前的深色模式
我们已全面支持深色模式。 在个人计算的初期，深色模式并不是一种选择，而是一种事实：单色 CRT 计算机显示器通过在荧光屏上发射电子束来工作，而早期 CRT 中使用的荧光粉是绿色的。由于文本以绿色显示，而屏幕的其余部分为黑色，因此这些型号通常被称为绿屏。
随后推出的彩色 CRT 通过使用红色、绿色和蓝色荧光粉显示多种颜色。 他们通过同时激活这三种荧光粉来产生白色。 随着更复杂的 WYSIWYG 桌面出版的出现，使虚拟文档看起来像实体纸张的想法开始流行起来。
深色文字搭配白色背景的设计趋势由此开始，并延续到早期基于文档的 Web。有史以来的第一个浏览器 WorldWideWeb（请注意，当时甚至还没有发明 CSS），就是以这种方式显示网页的。 趣闻：有史以来的第二个浏览器 Line Mode Browser（基于终端的浏览器）采用的是深色背景上的绿色文字。 如今，网页和 Web 应用通常采用浅色背景上的深色文字设计，这一基本假设也硬编码在用户代理样式表中，包括 Chrome 的样式表。
CRT 时代早已过去。 内容消费和创作已转移到使用背光 LCD 或节能 AMOLED 屏幕的移动设备上。更小巧、更便携的计算机、平板电脑和智能手机带来了新的使用模式。 网页浏览、趣味编码和高端游戏等休闲任务通常在下班后在昏暗的环境中进行。 人们甚至会在夜间躺在床上使用设备。 随着越来越多的人在黑暗中使用设备，回归深色背景浅色文字的理念也越来越受欢迎。
深色模式的优势
出于美观考虑而使用深色模式
当人们被问到为什么喜欢或想要深色模式时，最常见的回答是“它对眼睛更友好”，其次是“它优雅而美观”。Apple 在其深色模式开发者文档中明确写道：“对于大多数用户而言，选择启用浅色外观还是深色外观是一个美学问题，可能与环境光照条件无关。”
深色模式作为无障碍工具
还有一些人确实需要深色模式，并将其用作另一种无障碍工具，例如低视力用户。我能找到的最早的此类无障碍工具是 System 7 的 CloseView 功能，该功能具有黑底白字和白底黑字切换开关。虽然 System 7 支持彩色，但默认界面仍为黑白。
这些基于反转的实现方式在引入颜色后，便暴露出了其缺点。Szpiro 等人针对低视力用户如何访问计算设备进行的用户研究表明，所有受访用户都不喜欢反色图片，但许多用户更喜欢深色背景上的浅色文字。Apple 通过一项名为智能反转的功能来满足这一用户偏好，该功能会反转显示屏上的颜色，但使用深色样式的图片、媒体和部分应用除外。
一种特殊形式的低视力是电脑视觉综合征，也称为数字眼疲劳，定义为“与使用电脑（包括台式电脑、笔记本电脑和平板电脑）和其他电子显示屏（例如智能手机和电子阅读设备）相关的眼部和视力问题。” 有研究表明，青少年使用电子设备（尤其是在夜间）会增加睡眠时长缩短、入睡潜伏期延长和睡眠不足的风险。此外，有报告广泛指出，蓝光暴露与昼夜节律和睡眠周期的调节有关，而根据 Rosenfield 的研究，不规律的光照环境可能会导致睡眠不足，进而可能影响情绪和任务表现。 为了限制这些负面影响，可以通过 iOS 的夜间模式或 Android 的夜间灯光等功能调整显示屏色温来减少蓝光，还可以通过深色主题或深色模式来避免使用强光或不规则的光源。
在 AMOLED 屏幕上使用深色模式可节省电量
最后，众所周知，深色模式可在 AMOLED 屏幕上节省大量电量。专注于 YouTube 等热门 Google 应用的 Android 案例研究表明，节省的电量最多可达 60%。 下面的视频详细介绍了这些案例研究以及每个应用的省电量。
在操作系统中启用深色模式
现在，我已经介绍了深色模式对许多用户来说为何如此重要，接下来我们来了解一下如何支持深色模式。
支持深色模式或深色主题的操作系统通常会在设置中提供用于启用该模式或主题的选项。在 macOS X 中，该设置位于系统偏好设置的通用部分，称为外观（屏幕截图）；在 Windows 10 中，该设置位于颜色部分，称为选择颜色（屏幕截图）。 对于 Android Q，您可以在显示下找到深色主题切换开关（屏幕截图）；对于 iOS 13，您可以在设置的显示与亮度部分更改外观（屏幕截图）。
prefers-color-scheme 媒体查询
在开始之前，我再介绍一点理论知识。
借助媒体查询，作者可以测试和查询用户代理或显示设备的值或功能，而无需考虑正在呈现的文档。
它们用于 CSS @media 规则中，以有条件地将样式应用于文档，还用于各种其他上下文和语言中，例如 HTML 和 JavaScript。媒体查询级别 5 引入了所谓的“用户偏好媒体功能”，也就是说，网站可以检测用户偏好的内容显示方式。
prefers-color-scheme 媒体功能用于检测用户是否请求页面使用浅色或深色主题。
它适用于以下值：
- light ：表示用户已通知系统，他们偏好使用浅色主题（浅色背景上的深色文字）的网页。
- dark ：表示用户已通知系统，他们偏好使用深色主题（在深色背景上使用浅色文本）的网页。
支持深色模式
了解浏览器是否支持深色模式
由于深色模式是通过媒体查询报告的，因此您可以通过检查媒体查询 prefers-color-scheme 是否匹配来轻松检查当前浏览器是否支持深色模式。请注意，我没有包含任何值，而只是检查媒体查询本身是否匹配。
if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
 console.log('🎉 Dark mode is supported');
}
在撰写本文时，Chrome 和 Edge（自版本 76 起）、Firefox（自版本 67 起）以及 Safari（自 macOS 版本 12.1 起和 iOS 版本 13 起）在桌面设备和移动设备（如果可用）上均支持 prefers-color-scheme。
对于所有其他浏览器，您可以查看 Can I use 支持表文档。
在请求时了解用户的偏好
借助 Sec-CH-Prefers-Color-Scheme 客户端提示标头，网站可以在请求时选择性地获取用户的配色方案偏好设置，从而让服务器能够内嵌正确的 CSS，避免出现错误的色彩主题闪烁。
深色模式实践
最后，我们来看看实际支持深色模式的效果。 与 Highlander 一样，深色模式只能有一种：深色或浅色，但绝不会同时存在！我为什么会提到这一点？因为这一事实应该会对加载策略产生影响。 请勿强制用户下载关键渲染路径中用于他们当前未使用的模式的 CSS。 为了优化加载速度，我将示例应用的 CSS 分成了三部分，以便延迟加载非关键 CSS，该示例应用实际展示了以下建议：
- style.css ，其中包含在网站上普遍使用的通用规则。
- dark.css ，其中仅包含深色模式所需的规则。
- light.css ，其中仅包含浅色模式所需的规则。
加载策略
后两个（light.css 和 dark.css）通过 <link media> 查询有条件地加载。最初，并非所有浏览器都支持 prefers-color-scheme（可使用上述模式进行检测），我通过在极小的内嵌脚本中插入条件性 <link rel="stylesheet"> 元素来动态处理此问题，从而加载默认的 light.css 文件（浅色主题是任意选择的，我也可以将深色主题作为默认回退体验）。为了避免出现无样式内容闪烁，我隐藏了网页的内容，直到 light.css 加载完毕。
<script>
 // If `prefers-color-scheme` is not supported, fall back to light mode.
 // In this case, light.css will be downloaded with `highest` priority.
 if (window.matchMedia('(prefers-color-scheme: dark)').media === 'not all') {
 document.documentElement.style.display = 'none';
 document.head.insertAdjacentHTML(
 'beforeend',
 '<link rel="stylesheet" href="/light.css" onload="document.documentElement.style.display = \'\'">',
 );
 }
</script>
<!--
 Conditionally either load the light or the dark stylesheet. The matching file
 will be downloaded with `highest`, the non-matching file with `lowest`
 priority. If the browser doesn't support `prefers-color-scheme`, the media
 query is unknown and the files are downloaded with `lowest` priority (but
 above I already force `highest` priority for my default light experience).
-->
<link rel="stylesheet" href="/dark.css" media="(prefers-color-scheme: dark)" />
<link
 rel="stylesheet"
 href="/light.css"
 media="(prefers-color-scheme: light)"
/>
<!-- The main stylesheet -->
<link rel="stylesheet" href="/style.css" />
样式表架构
我最大限度地利用了 CSS 变量，这使得我的通用 style.css 能够保持通用，而所有浅色或深色模式自定义设置都在另外两个文件 dark.css 和 light.css 中进行。
您可以在下方看到实际样式的摘录，但这些摘录应该足以传达总体思路。
我声明了两个变量 --color 和 --background-color，它们本质上创建了 dark-on-light 和 light-on-dark 基准主题。
/* light.css: 👉 dark-on-light */
:root {
 --color: rgb(5, 5, 5);
 --background-color: rgb(250, 250, 250);
}
/* dark.css: 👉 light-on-dark */
:root {
 --color: rgb(250, 250, 250);
 --background-color: rgb(5, 5, 5);
}
在我的 style.css 中，我随后在 body { … } 规则中使用这些变量。
由于它们是在 :root CSS 伪类（一种在 HTML 中表示 <html> 元素的选择器，与选择器 html 相同，只是特异性更高）上定义的，因此它们会层叠向下，这有助于我声明全局 CSS 变量。
/* style.css */
:root {
 color-scheme: light dark;
}
body {
 color: var(--color);
 background-color: var(--background-color);
}
在上面的代码示例中，您可能已经注意到一个属性 color-scheme，其值 light dark 以空格分隔。
这会告知浏览器我的应用支持哪些颜色主题，并允许浏览器激活用户代理样式表的特殊变体，这对于让浏览器以深色背景和浅色文本呈现表单字段、调整滚动条或启用主题感知突出显示颜色非常有用。
color-scheme 的确切详细信息在 CSS 颜色调整模块级别 1 中指定。
然后，剩下的就是为网站上重要的内容定义 CSS 变量。
在处理深色模式时，按语义组织样式非常有帮助。例如，与其使用 --highlight-yellow，不如考虑调用变量 --accent-color，因为“黄色”在深色模式下可能实际上不是黄色，反之亦然。以下是我在示例中使用的其他一些变量的示例。
/* dark.css */
:root {
 --color: rgb(250, 250, 250);
 --background-color: rgb(5, 5, 5);
 --link-color: rgb(0, 188, 212);
 --main-headline-color: rgb(233, 30, 99);
 --accent-background-color: rgb(0, 188, 212);
 --accent-color: rgb(5, 5, 5);
}
/* light.css */
:root {
 --color: rgb(5, 5, 5);
 --background-color: rgb(250, 250, 250);
 --link-color: rgb(0, 0, 238);
 --main-headline-color: rgb(0, 0, 192);
 --accent-background-color: rgb(0, 0, 238);
 --accent-color: rgb(250, 250, 250);
}
完整示例
在下面的 Glitch 嵌入内容中，您可以看到将上述概念付诸实践的完整示例。 尝试在特定操作系统设置中切换深色模式，看看网页的反应。
加载影响
在尝试此示例时，您会发现我通过媒体查询加载 dark.css 和 light.css 的原因。
尝试切换到深色模式并重新加载页面：当前不匹配的特定样式表仍会加载，但优先级最低，因此它们永远不会与网站当前所需的资源竞争。
对深色模式变化做出反应
与任何其他媒体查询更改一样，深色模式更改可以通过 JavaScript 进行订阅。例如，您可以使用此功能动态更改网页的 favicon 或更改 <meta name="theme-color">（用于确定 Chrome 中网址栏的颜色）。
上面的完整示例展示了实际效果，如需查看主题颜色和网站图标的变化，请在单独的标签页中打开演示。
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkModeMediaQuery.addEventListener('change', (e) => {
 const darkModeOn = e.matches;
 console.log(`Dark mode is ${darkModeOn ? '🌒 on' : '☀️ off'}.`);
});
从 Chromium 93 和 Safari 15 开始，您可以使用 meta 主题颜色元素的 media 属性，根据媒体查询调整颜色。系统会选择第一个匹配的规则。例如，您可以为浅色模式设置一种颜色，为深色模式设置另一种颜色。在撰写本文时，您无法在清单中定义这些内容。请参阅 w3c/manifest#975 GitHub 问题。
<meta
 name="theme-color"
 media="(prefers-color-scheme: light)"
 content="white"
/>
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="black" />
调试和测试深色模式
在开发者工具中模拟 prefers-color-scheme
切换整个操作系统的配色方案很快就会让人感到厌烦，因此 Chrome 开发者工具现在允许您模拟用户偏好的配色方案，但只会影响当前可见的标签页。
打开命令菜单，开始输入 Rendering，运行 Show Rendering 命令，然后更改模拟 CSS 媒体功能 prefers-color-scheme 选项。
使用 Puppeteer 截屏 prefers-color-scheme
Puppeteer 是一个 Node.js 库，它提供了一个高级 API，用于通过 DevTools 协议控制 Chrome 或 Chromium。
借助 dark-mode-screenshot，我们提供了一个 Puppeteer 脚本，可让您在深色模式和浅色模式下创建网页的屏幕截图。您可以一次性运行此脚本，也可以将其纳入持续集成 (CI) 测试套件。
npx dark-mode-screenshot --url https://googlechromelabs.github.io/dark-mode-toggle/demo/ --output screenshot --fullPage --pause 750
深色模式最佳实践
避免使用纯白色
您可能已经注意到，我没有使用纯白色。相反，为了防止发光和渗色，我选择了一种略微深色的白色。类似 rgb(250, 250, 250) 的内容效果不错。
重新着色并调暗照片图像
如果您比较下面的两张屏幕截图，会发现不仅核心主题从深色文字搭配浅色背景变为浅色文字搭配深色背景，而且主打图片看起来也略有不同。我的用户研究表明，在深色模式处于活动状态时，大多数受访者更喜欢略微不那么鲜艳和明亮的图片。 我将此称为“重新着色”。
可以通过对图片应用 CSS 滤镜来实现重新着色。
我使用了一个 CSS 选择器，用于匹配网址中不含 .svg 的所有图片，这样做的目的是为了让矢量图形（图标）获得与图片（照片）不同的重新着色处理，有关这方面的详细信息，请参阅下一段。
请注意，我再次使用了 CSS 变量，以便日后灵活地更改滤镜。
由于仅在深色模式下（即 dark.css 处于有效状态时）需要重新着色，因此 light.css 中没有相应的规则。
/* dark.css */
--image-filter: grayscale(50%);
img:not([src*='.svg']) {
 filter: var(--image-filter);
}
使用 JavaScript 自定义深色模式重新着色强度
每个人的情况各不相同，对深色模式的需求也不尽相同。
通过坚持使用上述重新着色方法，我可以轻松地将灰度强度设为用户偏好设置，通过 JavaScript 进行更改，并且通过将值设置为 0%，我还可以完全停用重新着色功能。
请注意，document.documentElement 提供对文档根元素的引用，也就是说，它与我可以使用 :root CSS 伪类引用的元素相同。
const filter = 'grayscale(70%)';
document.documentElement.style.setProperty('--image-filter', value);
反转矢量图形和图标
对于矢量图形（在我的示例中用作我通过 <img> 元素引用的图标），我使用不同的重新着色方法。虽然研究表明人们不喜欢照片反转，但反转功能对大多数图标都非常有效。
我再次使用 CSS 变量来确定常规状态和 :hover 状态下的反转量。
请注意，我再次只反转了 dark.css 中的图标，而没有反转 light.css 中的图标，以及 :hover 在这两种情况下的反转强度不同，以便根据用户选择的模式使图标看起来略微变暗或变亮。
/* dark.css */
--icon-filter: invert(100%);
--icon-filter_hover: invert(40%);
img[src*='.svg'] {
 filter: var(--icon-filter);
}
/* light.css */
--icon-filter_hover: invert(60%);
/* style.css */
img[src*='.svg']:hover {
 filter: var(--icon-filter_hover);
}
使用 currentColor 表示内嵌 SVG
对于内嵌 SVG 图片，您可以利用 currentColor CSS 关键字（表示元素 color 属性的值），而不是使用反转滤镜。这样一来，您就可以在默认情况下不接收 color 值的属性上使用该值。方便的是，如果 currentColor 用作 SVG fill 或 stroke 属性的值，它会改为从 color 属性的继承值中获取其值。更棒的是，这还适用于 <svg><use href="…"></svg>，因此您可以拥有单独的资源，并且 currentColor 仍会在上下文中应用。
请注意，此功能仅适用于内嵌或 <use href="…"> SVG，但不适用于作为图片 src 或以某种方式通过 CSS 引用的 SVG。您可以在下面的演示中看到此应用。
<!-- Some inline SVG -->
<svg xmlns="http://www.w3.org/2000/svg"
 stroke="currentColor"
>
 […]
</svg>
模式之间的平滑过渡
由于 color 和 background-color 都是可动画化的 CSS 属性，因此从深色模式切换到浅色模式或反之亦然时，可以实现平滑过渡。
创建动画非常简单，只需为这两个属性声明两个 transition 即可。以下示例展示了总体思路，您可以在演示中体验实际效果。
body {
 --duration: 0.5s;
 --timing: ease;
 color: var(--color);
 background-color: var(--background-color);
 transition: color var(--duration) var(--timing), background-color var(
 --duration
 ) var(--timing);
}
深色模式下的艺术指导
虽然出于加载性能方面的考虑，我通常建议仅在 <link> 元素的 media 属性中使用 prefers-color-scheme（而不是在样式表中内嵌），但在某些情况下，您可能确实希望直接在 HTML 代码中内嵌 prefers-color-scheme。艺术指导就是这样一种情况。
在网页上，艺术指导涉及页面的整体视觉外观以及它如何以视觉方式传达信息、激发情绪、对比突出功能，以及在心理上吸引目标受众群体。
在深色模式下，设计师可以自行判断在特定模式下哪张图片效果最好，以及图片重新着色是否不够好。如果与 <picture> 元素搭配使用，则要显示的图片的 <source> 可以取决于 media 属性。
在下面的示例中，我展示了深色模式下的西半球和浅色模式下的东半球，或者在未指定偏好设置时，默认显示东半球。
当然，这纯粹是为了说明目的。
在设备上切换到深色模式，看看效果有何不同。
<picture>
 <source srcset="western.webp" media="(prefers-color-scheme: dark)" />
 <source srcset="eastern.webp" media="(prefers-color-scheme: light)" />
 <img src="eastern.webp" />
</picture>
深色模式，但添加了选择停用功能
如上文深色模式的优势部分所述，深色模式是大多数用户的审美选择。因此，有些用户可能喜欢使用深色操作系统界面，但仍希望以他们习惯的方式查看网页。一个不错的模式是，最初遵循浏览器通过 prefers-color-scheme 发送的信号，但随后可选择性地允许用户替换其系统级设置。
<dark-mode-toggle> 自定义元素
您当然可以自行创建此代码，但也可以直接使用我为此目的创建的现成自定义元素（Web 组件）。它名为 <dark-mode-toggle>，可向您的网页添加一个可完全自定义的切换开关（深色模式：开启/关闭）或主题切换器（主题：浅色/深色）。下面的演示展示了该元素的实际效果（哦，我还悄悄地将其添加到了其他
示例
中）。
<dark-mode-toggle
 legend="Theme Switcher"
 appearance="switch"
 dark="Dark"
 light="Light"
 remember="Remember this"
></dark-mode-toggle>
在以下演示中，尝试点击或点按右上角的深色模式控件。 如果您选中第三个和第四个控件中的复选框，请查看即使在重新加载页面后，系统也会记住您的模式选择。 这样，访问者就可以在操作系统处于深色模式的情况下，以浅色模式浏览您的网站，反之亦然。
总结
使用和支持深色模式非常有趣，并开辟了新的设计途径。
对于某些访问者而言，这可能决定了他们能否顺利使用您的网站，以及能否成为满意的用户。
虽然存在一些陷阱，并且绝对需要进行仔细测试，但深色模式绝对是一个绝佳的机会，让您展现对所有用户的关怀。
本文中提到的最佳实践和 <dark-mode-toggle> 等自定义元素应该能让您有信心打造出色的深色模式体验。请在 Twitter 上告诉我您创建了什么内容，以及此帖子是否有用，或者您对改进此帖子有何建议。
感谢您的阅读！🌒
相关链接
针对 prefers-color-scheme 媒体查询的资源：
有关 color-scheme 元标记和 CSS 属性的资源：
深色模式常规链接：
此帖子的背景研究文章：
致谢
prefers-color-scheme 媒体功能、color-scheme CSS 属性和相关元标记是 👏 Rune Lillesveen 的实现工作。
Rune 也是 CSS 颜色调整模块级别 1 规范的共同编辑者。我要衷心感谢 Lukasz Zbylut、Rowan Merewood、Chirag Desai 和 Rob Dodson 对本文的全面审核。
加载策略是 Jake Archibald 的创意。
Emilio Cobos Álvarez 为我指明了正确的 prefers-color-scheme 检测方法。
包含引用 SVG 和 currentColor 的提示来自 Timothy Hatcher。
最后，我要感谢参与各种用户研究的众多匿名参与者，他们帮助我们形成了本文中的建议。
