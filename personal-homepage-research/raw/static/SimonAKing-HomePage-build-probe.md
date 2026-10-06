# 本机构建实测记录 — SimonAKing/HomePage

- 原始仓库：https://github.com/SimonAKing/HomePage
- 采集/实测日期：**2026-10-06** ｜ 实测目录：`/tmp/hp-probe`（`git clone --depth 1`）
- 环境：Node v24.21.0 ｜ npm 11.19.0

## 1. 安装与构建

```text
$ npm install --no-audit --no-fund --loglevel=error
added 934 packages in 32s
install_exit=0

$ npm run build
> simonaking-homepage@1.0.0 build
> gulp build
[13:14:09] Using gulpfile /tmp/hp-probe/gulpfile.js
[13:14:09] Starting 'build'...
[13:14:09] Starting 'clean'...   Finished 'clean' after 6.29 ms
[13:14:09] Starting 'assets'...  Finished 'assets' after 22 ms
[13:14:09] Starting 'pug'...     Finished 'pug' after 155 ms
[13:14:09] Starting 'css'...     Finished 'css' after 360 ms
[13:14:09] Starting 'js'...      Finished 'js' after 1.5 s
[13:14:09] Starting 'html'...    Finished 'html' after 28 ms
[13:14:09] Finished 'build' after 2.07 s
build_exit=0
```

`dist/` 内容：`index.html` 6,268 B ｜ `css/style.css` 11,991 B ｜ `js/main.js` 21,599 B ｜ `js/background.js` 35,025 B ｜ `assets/` ｜ `favicon.ico` ｜ 合计 **128 KB**。

## 2. 体积（raw vs gzip）

| 文件 | raw | gzip |
|---|---:|---:|
| css/style.css | 11,991 | 4,882 |
| js/main.js | 21,599 | 5,684 |
| js/background.js | 35,025 | 8,119 |
| **合计（css+js）** | **68,615 B ≈ 67 KB** | **18,177 B ≈ 17.75 KB** |

→ README 自称 "referenced css and js files do not exceed 18.5 kb" **成立，但指 gzip 后**，且不含外部 CDN 文件。

## 3. `dist/index.html` 中的外部依赖

```text
https://cdn.jsdelivr.net/gh/SimonAKing/font/font.min.css     ← 站点字体（作者仓库，不可配置）
https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js  ← 转场动画
https://cdn.jsdelivr.net/gh/SimonAKing/js/log.min.js          ← supportAuthor 的 console 脚本（受 intro.supportAuthor 门控）
https://cdn.bootcss.com/html5shiv/r29/html5.min.js           ← 仅 IE8 条件注释内
https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js      ← 仅 IE8 条件注释内
```

`src/components/scripts.pug` L41-42 确认：`if intro.supportAuthor` 才输出 `log.min.js`。

## 4. `dist/index.html` 的 `<head>`（SEO 相关）

实际只包含：`title`、`charset`、`viewport`、`X-UA-Compatible`、`renderer`、`theme-color`、`apple-mobile-web-app-status-bar-style`、`msapplication-navbutton-color`、`description`、`icon` / `shortcut icon`、`dns-prefetch`、`prefetch`。

→ **没有 og: / twitter: 任何标签**，也没有 canonical、robots、sitemap 引用。

## 5. 内容结构（产物核对）

`dist/index.html` 的 `content-main` 区：`<header>`（avatar + h1 姓名 + h2 签名）+ `<ul>` **恰好 4 个 `<li>`**（Blog / About / Email / Github）。确认"4 个硬编码链接位"的判断。
