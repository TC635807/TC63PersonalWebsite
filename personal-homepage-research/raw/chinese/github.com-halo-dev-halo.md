https://github.com/halo-dev/halo
(采集: 2026-10-05, better-crawler tier=browser, ok=true)

halo-dev
/
halo
Public
Notifications
You must be signed in to change notification settings
Fork
10.3k
Star
39.9k
main
33
Branches
271
Tags
Go to file
Code
Open more actions menu
Latest commit
JohnNiang
and
ruibaby
feat: support switching user in console (
#10354
)
Open commit details
failure
Sep 30, 2026
54e01bc
·
Sep 30, 2026
History
6,344 Commits
Open commit details
6,344 Commits
Folders and files
Name
Name
Last commit message
Last commit date
.claude
.claude
feat: add gradle-dependency-updates skill (
#10222
)
Aug 7, 2026
.codex/
skills
.codex/
skills
Update OpenSpec workflows and archive completed changes (
#10147
)
Jul 13, 2026
.github
.github
Upgrade Vite+ to 0.3.1 (
#10299
)
Sep 9, 2026
.vscode
.vscode
Migrate to vite-plus tooling (
#8431
)
Mar 23, 2026
api-docs/
openapi/
v3_0
api-docs/
openapi/
v3_0
feat: support switching user in console (
#10354
)
Sep 30, 2026
api
api
Remove deprecated user and post attachment settings (
#10346
)
Sep 28, 2026
application
application
feat: support switching user in console (
#10354
)
Sep 30, 2026
buildSrc
buildSrc
Add check for published status before uploading to Maven Central (
#8097
)
Dec 24, 2025
docs
docs
Add unified permalinks for comments and replies (
#10318
)
Sep 16, 2026
gradle
gradle
Upgrade Gradle wrapper to 9.8.0 (
#10347
)
Sep 25, 2026
hack
hack
chore: add cherry_pick_pull.sh for cherry-picking pull request (
#1554
)
Dec 3, 2021
openspec
openspec
Add unified permalinks for comments and replies (
#10318
)
Sep 16, 2026
platform
platform
improvement: add CLAUDE.md import bridges for AGENTS.md guides (
#10211
)
Aug 6, 2026
ui
ui
feat: support switching user in console (
#10354
)
Sep 30, 2026
.dockerignore
.dockerignore
chore: rename console to ui in some files (
#5347
)
Feb 7, 2024
.editorconfig
.editorconfig
build: integrate spotless and unify code style (
#9963
)
May 8, 2026
.gitignore
.gitignore
Switch formatter from Prettier to oxfmt (
#8381
)
Mar 3, 2026
AGENTS.md
AGENTS.md
improvement: add CLAUDE.md import bridges for AGENTS.md guides (
#10211
)
Aug 6, 2026
CLAUDE.md
CLAUDE.md
improvement: add CLAUDE.md import bridges for AGENTS.md guides (
#10211
)
Aug 6, 2026
CODE_OF_CONDUCT.md
CODE_OF_CONDUCT.md
docs: add CODE_OF_CONDUCT.md (
#2150
)
Jun 12, 2022
CONTRIBUTING.md
CONTRIBUTING.md
Cache UI builds with Vite+ tasks (
#10342
)
Sep 24, 2026
Dockerfile
Dockerfile
Upgrade Spring Boot to 4.1.0-RC1 (
#9919
)
Apr 24, 2026
LICENSE
LICENSE
Create LICENSE
Mar 21, 2018
OWNERS
OWNERS
Remove reviewers section from OWNERS file (
#7863
)
Oct 24, 2025
README.md
README.md
Remove Repobeats status section from README (
#10340
)
Sep 24, 2026
SECURITY.md
SECURITY.md
build: integrate spotless and unify code style (
#9963
)
May 8, 2026
build.gradle
build.gradle
fix: exclude openspec directory from spotless formatting (
#9982
)
May 11, 2026
gradle.properties
gradle.properties
Prepare 2.27.0 snapshot version (
#10280
)
Sep 2, 2026
gradlew
gradlew
chore: upgrade dependencies and Gradle wrapper (
#10168
)
Jul 23, 2026
gradlew.bat
gradlew.bat
Upgrade Gradle wrapper to 9.8.0 (
#10347
)
Sep 25, 2026
settings.gradle
settings.gradle
Remove deprecation warnings from Gradle (
#7468
)
May 23, 2025
View all files
Repository files navigation
Halo
[ˈheɪloʊ]，强大易用的开源建站工具。
官网
文档
社区
Gitee
Telegram 频道
Halo 是什么？
Halo 是一款强大易用的开源建站工具，从个人博客、知识库，到企业官网、在线商城，Halo 都能助您轻松实现，一站式满足您的多样化建站需求。
快速开始
如果你的设备有 Docker 环境，可以使用以下命令快速启动一个 Halo 的体验环境：
docker run -d --name halo -p 8090:8090 -v
~
/.halo2:/root/.halo2 halohub/halo:2.26
以上方式仅作为体验使用，推荐使用开源 Linux 服务器运维管理面板
1Panel
进行部署（
查看文档
），轻松搞定反向代理、SSL 证书及升级备份任务。更多部署方式，请
查看文档
。
在线体验
环境地址：
https://demo.halocms.site
后台地址：
https://demo.halocms.site/console
用户名：
demo
密码：
P@ssw0rd123..
版本对比
Halo 社区版
：开源免费， 遵循 GPLv3 协议
适合个人开发者、技术爱好者、开源项目
零成本搭建博客、作品集、技术文档站
超过 100 款免费主题和插件
Halo 专业版
：在社区版基础上，集成 10+ 高价值功能
移动端 APP：随时随地管理内容
AI 智能建站：快速生成专业站点
手机号验证登录：提升安全与用户体验
全站私有化部署：保障数据主权
付费主题/插件市场：专享精品主题和 SEO 优化、付费阅读、AI 助手等 10 款付费插件
Halo 商城版
：在专业版基础上，集成在线商城重磅功能
一体化在线商城：商品管理、订单处理、支付对接全流程
为中国商家定制：无缝集成微信支付、支付宝等本土生态
品牌官网 + CMS + 线上店铺一站式落地，助力生意高效增长
关于三个版本的详细对比，请参考
版本对比
。
应用生态
应用市场
：提供丰富的站点主题与功能插件，
立即访问
成为开发者
：支持自主发布并管理应用，
了解详情
halo-sigs/awesome-halo
许可证
Halo 使用 GPL-v3.0 协议开源，请遵守开源协议。
贡献
参考
CONTRIBUTING
。
About
Halo 是一款强大易用的开源建站工具，从个人博客、知识库，到企业官网、在线商城，Halo 都能助您轻松实现，一站式满足您的多样化建站需求。
www.halo.run
Topics
blog
blog-engine
cms
content-management-system
halo
halocms
website-builder
Resources
Readme
GPL-3.0 license
Code of conduct
Code of conduct
Contributing
Contributing
Security policy
Security policy
Activity
Custom properties
Stars
39.9k
stars
Watchers
482
watching
Forks
10.3k
forks
Report repository
Releases
Packages
Used by
Contributors
Languages