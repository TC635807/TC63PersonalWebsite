https://github.com/fluid-dev/hexo-theme-fluid
(采集: 2026-10-05, better-crawler tier=browser, ok=true)

fluid-dev
/
hexo-theme-fluid
Public
Notifications
You must be signed in to change notification settings
Fork
1.1k
Star
8.2k
master
3
Branches
44
Tags
Go to file
Code
Open more actions menu
Latest commit
zkqiang
📝 更换官网域名
May 9, 2026
bcfd8bf
·
May 9, 2026
History
1,071 Commits
Open commit details
1,071 Commits
Folders and files
Name
Name
Last commit message
Last commit date
.github
.github
📝 更换官网域名
May 9, 2026
languages
languages
✨ 移动端菜单以方格样式展现
Mar 10, 2026
layout
layout
🐛 修复 Waline 引入
Mar 16, 2026
scripts
scripts
📝 更换官网域名
May 9, 2026
source
source
🐛 修复文章 TOC 中长标题引发的内容截断
Mar 18, 2026
.editorconfig
.editorconfig
✨ 增加代码 Lint 流
Apr 18, 2020
.eslintrc
.eslintrc
🔧 修改 Lint 配置
Jun 5, 2020
.gitattributes
.gitattributes
📝 增加 .gitattributes
Jun 29, 2020
.gitignore
.gitignore
🙈 更新 .gitignore
Oct 13, 2021
LICENSE
LICENSE
📝 更换为 GPL 开源许可
Feb 8, 2022
README.md
README.md
📝 更换官网域名
May 9, 2026
README_en.md
README_en.md
📝 更换官网域名
May 9, 2026
_config.yml
_config.yml
📝 更换官网域名
May 9, 2026
package.json
package.json
📝 更换官网域名
May 9, 2026
View all files
Repository files navigation
一款 Material Design 风格的主题
An elegant Material-Design theme for Hexo
🇨🇳 中文简体 |
🇬🇧 English
文档：
主题配置
|
文章配置
预览：
Fluid's blog
快速开始
1. 搭建 Hexo 博客
如果你还没有 Hexo 博客，请按照
Hexo 官方文档
进行安装、建站。
2. 获取主题最新版本
方式一：
Hexo 5.0.0 版本以上，推荐通过 npm 直接安装，进入博客目录执行命令：
npm install --save hexo-theme-fluid
然后在博客目录下创建
_config.fluid.yml
，将主题的
_config.yml
内容复制进去。
方式二：
下载
最新 release 版本
解压到 themes 目录，并将解压出的文件夹重命名为
fluid
。
3. 指定主题
如下修改 Hexo 博客目录中的
_config.yml
：
theme
:
fluid
#
指定主题
language
:
zh-CN
#
指定语言，会影响主题显示的语言，按需修改
4. 创建「关于页」
首次使用主题的「关于页」需要手动创建：
hexo new page about
创建成功后，编辑博客目录下
/source/about/index.md
，添加
layout
属性。
修改后的文件示例如下：
---
title
:
about
layout
:
about
---
这里写关于页的正文，支持 Markdown, HTML
更新主题
更新主题的方式
参照这里
。
功能特性
无比详实的
用户文档
页面组件懒加载
多种代码高亮方案
多语言配置
内置多款评论插件
内置网页访问统计
内置文章本地搜索
支持暗色模式
支持脚注语法
支持 LaTeX 数学公式
支持 mermaid 流程图
贡献者
英文文档翻译：
@EatRice
@橙子杀手
@Sinetian
其他贡献：
@zhugaoqi
@julydate
@xiyuvi
如你也想贡献代码，可参照
贡献指南
支持我们
如果你觉得这个项目有帮助，并愿意支持它的发展，可以通过以下方式支持我们的开源创作：
微信赞赏码
同时我们正在
寻求商业赞助
，如果贵司想在本页显著位置展示广告位（每月 6K+ Views 定向流量曝光），或者有其他赞助形式，可将联系方式发送邮件至 zkqiang#126.com (#替换为@)。
Star 趋势
About
🌊 一款 Material Design 风格的 Hexo 主题 / An elegant Material-Design theme for Hexo
hexo.fluid-dev.com/
Topics
article
blog
fluid
hexo
hexo-theme
material
material-design
static-site
theme
Resources
Readme
GPL-3.0 license
Activity
Custom properties
Stars
8.2k
stars
Watchers
27
watching
Forks
1.1k
forks
Report repository
Releases
Used by
Contributors
Languages