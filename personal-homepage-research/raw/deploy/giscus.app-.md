原始 URL: https://giscus.app/
抓取日期: 2026-10-05
tier: browser

---

giscus
利用 GitHub Discussions 实现的评论系统，让访客借助 GitHub 在你的网站上留下评论和反应吧！本项目深受 utterances 的启发。
- 开源。🌏
- 无跟踪，无广告，永久免费。📡 🚫
- 无需数据库。所有数据均储存在 GitHub Discussions 中。:octocat:
- 支持自定义主题！🌗
- 支持多种语言。🌐
- 高可配置性。🔧
- 自动从 GitHub 拉取新评论与编辑。🔃
- 可自建服务！🤳
注意：
giscus 仍处于活跃开发中，GitHub 也还在活跃地开发 Discussions 及其 API，因此一些 giscus 的特性可能随时间损坏或变更。
它如何运作
giscus 加载时，会使用 GitHub Discussions 搜索 API 根据选定的映射方式（如 URL、pathname、<title> 等）来查找与当前页面关联的 discussion。如果找不到匹配的 discussion，giscus bot 就会在第一次有人留下评论或回应时自动创建一个 discussion。
访客如果想要评论，必须按照 GitHub OAuth 流程授权 giscus app 代表他发布，或者可以直接在 GitHub Discussion 里评论。你可以在 GitHub 上管理评论。
配置
语言
选择 giscus 的显示语言。找不到你的语言？贡献一个吧。
仓库
选择 giscus 连接到的仓库。请确保：
页面 ↔️ discussion 映射关系
选择页面与嵌入的 discussion 之间的映射关系。
当有多个具有相似标题的讨论时，避免由于 GitHub 的模糊搜索方法而导致的不匹配。查看文档获取更多细节。
Discussion 分类
选择新 discussions 所在的分类。 推荐使用公告（announcements）类型的分类，以确保新 discussion 只能由仓库维护者和 giscus 创建。
当搜索匹配的 discussion 时，giscus 将只搜索该分类。
特性
选择是否启用某些特性。
Discussion 的主帖子上的反应将会显示在评论前。
Discussion 的元数据将定期被发送到父页面（被嵌入的页面）。作为演示，尝试启用该选项并在此页面打开浏览器控制台。查看文档获取更多细节。
评论输入框会放在评论上方，这样用户可以在不滚动到讨论底部的情况下发表评论。
评论的加载将延迟到用户滚动到评论容器附近。 这是通过将 loading="lazy" 添加到 <iframe> 元素来完成的。
主题
选择适合你网站的主题。找不到合适的？贡献一个新主题吧。
启用 giscus
在你想让评论出现的位置添加以下 <script> 标签。但如果已经存在带有 giscus 类的元素，则评论会被放在那里。
<script src="https://giscus.app/client.js"
 data-repo="[在此输入仓库]"
 data-repo-id="[在此输入仓库 ID]"
 data-category="[在此输入分类名]"
 data-category-id="[在此输入分类 ID]"
 data-mapping="pathname"
 data-strict="0"
 data-reactions-enabled="1"
 data-emit-metadata="0"
 data-input-position="bottom"
 data-theme="preferred_color_scheme"
 data-lang="zh-CN"
 crossorigin="anonymous"
 async>
</script>
你可以在嵌入的页面中使用 .giscus 和 .giscus-frame 选择器来自定义容器布局。
如果你使用了 giscus，请考虑在 GitHub 上 star 🌟 giscus 并为你的仓库添加 giscus 话题！🎉
高级用法
你可以依照高级用法指南添加额外配置（例如：仅允许特定来源的请求）。
如果想要在 React、Vue 和 Svelte 中使用 giscus，请查看 giscus 组件库。
迁移
如果你使用过利用 GitHub Issue 实现的评论系统（如 utterances、gitalk），你可将已有的 issue 转换成 discussion。转换后，只要确保 discussion 标题与页面的映射关系正确，giscus 就会自动使用这些 discussion。
正在使用 giscus 的网站
献一份力
请参阅 CONTRIBUTING.md。