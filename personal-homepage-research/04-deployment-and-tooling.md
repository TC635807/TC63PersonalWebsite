# 04 · 部署托管、域名、CI 与站点配套工具

- 调研人：deploy-tooling（task-4）
- 采集日期：**2026-10-05**（本文所有免费额度/限制均为该日期从官方页面抓取；平台随时会改，引用前请复核）
- 抓正文工具：better-crawler（真实浏览器渲染）；原始正文见 personal-homepage-research/raw/deploy/
- 本文覆盖：托管平台对比 → 域名与 DNS → GitHub Actions 部署（含完整 YAML）→ 配套能力选型 → 低代码 CMS → 国内访问与备案

---

## 0. 结论速览（先看这 8 条）

1. **纯静态个人主页首选 GitHub Pages**：免费、无按量带宽计费、和仓库同源，软限制只有 1GB 站点 / 100GB 月带宽 / 10 分钟部署超时；用自定义 Actions workflow 时连"10 次/小时构建"限制都不适用。（来源：https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits ，抓取 2026-10-05）
2. **要 Preview 部署 + 更好的国内边缘，选 Cloudflare Pages**：Free 档 500 次构建/月、1 并发、20 分钟超时、20,000 文件、单文件 ≤25MiB；**静态资源请求免费且不限量**，只有 Functions 才计入 Workers 每天 10 万次免费额度。（来源：https://developers.cloudflare.com/pages/platform/limits/ 、https://developers.cloudflare.com/pages/functions/pricing/ ，抓取 2026-10-05）
3. **Vercel Hobby 是"非商业个人项目"授权**：官方明确 Hobby 仅限 personal, non-commercial use；免费额度含 100GB Fast Data Transfer、100 万 CDN 请求、200 个项目、每天 100 次部署、构建步最长 45 分钟。（来源：https://vercel.com/docs/plans/hobby ，抓取 2026-10-05）
4. **Netlify 已改成 credit 制（2025-09-04 起新账户）**：Free = **300 credits/月**，而带宽 20 credits/GB、生产部署 15 credits/次、Web 请求 2 credits/万次；折算下来免费档大约只够"15GB 流量"或"20 次生产部署"中的一种组合，用完站点会被暂停。（来源：https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work.md 、https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans.md ，抓取 2026-10-05）
5. **国内访问**：本机（重庆电信，采集时公网 IP 归属 CN/AS4134）实测 *.github.io 200（0.45s）、*.pages.dev 可达（2.0s）、*.netlify.app 200（0.79s）、vercel.com / nextjs.org 200；但 **github.com 主站本次 15.5s 才返回**。这是单点单次实测，不能当长期 SLA。用**境外**主机通常无需 ICP 备案；用**中国大陆境内**服务器/CDN 才需要，此项官方页面本次抓取失败，标"未核实"。
6. **自定义域名最小闭环**：GitHub Pages = 仓库 Settings 填域名 + DNS 配 A/CNAME（A：185.199.108.153 / .109 / .110 / .111）+ 勾 Enforce HTTPS；用分支发布时 GitHub 会在源分支根目录自动生成 CNAME 文件，**用自定义 Actions workflow 发布时该文件不生成、且被忽略**。（来源：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site ，抓取 2026-10-05）
7. **项目站（project site）是子路径 /repo/，不是子域名**——这是"部署后 CSS 全 404"的最常见原因；必须在构建器里设 base，或用子域名 CNAME 指向该仓库绕开。（来源：https://docs.astro.build/en/guides/deploy/github/ ，抓取 2026-10-05）
8. **配套默认组合（个人主页）**：giscus 评论 + Cloudflare Web Analytics（或 Umami Cloud Hobby）统计 + Pagefind 搜索 + Astro 内置图片优化 + Fontsource/中文网字计划字体 + Formspree 表单；全部可零成本起步，且都不需要数据库。理由与限制见第 4 节表格。

---

## 1. 托管平台对比（关键限制，全部带官方来源与抓取日期）

### 1.1 平台对比表

| 维度 | GitHub Pages | Cloudflare Pages | Vercel (Hobby) | Netlify (Free) | Zeabur | EdgeOne Pages / Makers |
|---|---|---|---|---|---|---|
| 免费档定位 | 仓库静态托管 | 静态站 + Functions | 个人非商业项目 | credit 制免费层 | 面板/管理自有服务器 | 全栈边缘平台 |
| 带宽/流量 | 软上限 **100 GB/月** | 静态资源请求**免费且不限量** | **100 GB/月** Fast Data Transfer（+10GB Fast Origin） | 20 credits/GB → 300 credits ≈ **15 GB** | 未在该页给数字 | 未在该页给数字 |
| 构建次数 | 软限制 10 次/小时（**用自定义 Actions workflow 不适用**） | **500 次/月**，1 并发 | 部署 100 次/天，200 个项目 | 生产部署 15 credits/次 → 300 credits ≈ **20 次** | Free 档 Monthly quota 显示 0 | 未在该页给数字 |
| 单次构建超时 | **10 分钟**（部署超时） | **20 分钟** | 构建步最长 **45 分钟** | 未在本次抓取页面出现（未核实） | 未说明 | 未说明 |
| 站点体积/文件数 | 源仓库建议 ≤1GB，发布站点 ≤1GB | **20,000 文件**（付费 100,000），单文件 **≤25MiB** | CLI 源码上传 Hobby **100MB** | 未在本次抓取页面出现（未核实） | 未说明 | 未说明 |
| 自定义域名 | 支持；每账户 1 个 user/org site | Free 档 **100 个/项目** | Hobby **50 个/项目** | 支持 | Free 档 Domains 显示 **0** | 支持，自动签发 SSL |
| HTTPS | Enforce HTTPS（最长 24h 生效） | 自动 | 自动 | 自动 | 自动 | 自动 |
| 纯静态 vs SSR | **仅纯静态** | 纯静态 + Pages Functions（SSR 走 Workers 计费） | 纯静态 + Serverless/Edge Functions | 纯静态 + Functions/Edge Functions | 容器/服务，任意栈 | 纯静态 + SPA + 全栈 Functions |
| 国内可达（本机实测） | academicpages.github.io 200 / 0.45s | astro-paper.pages.dev 200 / 1.15s | vercel.com 200；*.vercel.app 样本未能验证 | *.netlify.app 200 / 0.79s | zeabur.com 200；*.zeabur.app 502（可达） | edgeone.ai 200 / 0.59s |
| 适合谁 | 想"零运维 + 和代码同仓库"的个人静态站 | 想要 Preview + 免费不限量静态流量 | Next.js/SSR 项目、个人非商业 | 想要一站式（Forms、Identity、Edge） | 想跑容器/多服务 | 想要国内边缘 + 全栈 |
| 来源 | docs.github.com/pages/.../github-pages-limits | developers.cloudflare.com/pages/platform/limits | vercel.com/docs/plans/hobby | docs.netlify.com billing FAQ | zeabur.com/pricing | edgeone.ai/products/pages |

> 表内所有数字均来自上表"来源"列的官方页面，抓取日期 **2026-10-05**。国内可达性是**单机、单点、单次**测量（curl 取 http_code 与 time_total），仅作参考，不代表全国网络质量。

### 1.2 各平台要点与"坑"

**GitHub Pages**
- 官方 usage limits：一个账户只能建 **一个** user 或 organization site；源仓库建议 ≤1GB；发布站点 ≤1GB；部署超时 10 分钟；**软**带宽 100GB/月；**软**构建 10 次/小时（官方原文："This limit does not apply if you build and publish your site with a custom GitHub Actions workflow"）；可能触发 429 限流。
- 官方禁止把它当"免费商业主机"跑电商/SaaS，也禁止用于敏感交易（密码/信用卡）。
- 来源：https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits （抓取 2026-10-05）

**Cloudflare Pages**
- Free：构建 **1 并发、500 次/月**，超时 **20 分钟**；站点 **最多 20,000 文件**；单文件 **≤25MiB**；每项目 **100 个自定义域**；每账户 **100 个项目**；新账户前 48 小时限制新建项目数。
- 重要：**静态资源请求免费且不限量**；只有 Functions 请求才计入 Workers 配额（免费 100,000 次/天，UTC 零点重置）。
- 构建配置：官方给了各框架的 build command / output dir 对照表（Astro = npm run build / dist，Eleventy = npx @11ty/eleventy / _site，Hugo = hugo / public，Jekyll = jekyll build / _site）；不设 preset 时 build command 用 exit 0。
- 来源：https://developers.cloudflare.com/pages/platform/limits/ 、https://developers.cloudflare.com/pages/functions/pricing/ 、https://developers.cloudflare.com/pages/configuration/build-configuration/ （抓取 2026-10-05）

**Vercel**
- Hobby 免费额度（官方表）：Fast Data Transfer **100 GB/月**、Fast Origin Transfer 10 GB、CDN Requests **1,000,000**、Function Invocations 1,000,000、Active CPU 4 hrs、Provisioned Memory 360 GB-hrs、Image Transformations 5,000、Web Analytics 50,000 events、Workflow Events 50,000、Projects **200**、Domains per project **50**、Deployments per day **100**、Runtime Logs **1 小时**。
- 官方限制页补充：构建步最大 **45 分钟**；CLI 部署源码上限 Hobby **100MB**；环境变量总量 **64KB**（Node/Python/Ruby/Go/Java/.NET）；函数时长 Hobby 最大 60s（旧项目口径，另有计划页写 300s 的说法，两处口径不一致）；**Hobby 项目不能连接组织（Git organization）拥有的仓库**。
- 关键约束：官方明说 **Hobby 仅限 personal, non-commercial use**；超额不按量计费，只能等 30 天（Web Analytics 7 天）恢复。
- 来源：https://vercel.com/docs/plans/hobby 、https://vercel.com/docs/limits 、https://vercel.com/pricing （抓取 2026-10-05）

**Netlify**
- 计费改革：**2025-09-04 起新账户使用 credit-based 计划**；此前注册的 Free/Starter/Pro 属 Legacy 计划。
- 月额度：Free **300 credits/月**、Personal 1,000、Pro 从 3,000 起（可选 5k/10k/15k/20k）。
- 消耗率（billing FAQ 原表）：生产部署 **15 credits/次**、带宽 **20 credits/GB**、Web 请求 **2 credits/万次**、Compute **10 credits/GB-hour**、AI inference 180 credits/$1、**Forms 免费**。
- 用完当月额度后：**该 team 下所有站点暂停**，访客看到 "Site not available"；Free 计划是硬上限，不会产生费用。
- Netlify Functions 免费档具体额度本次未抓到数字 → **未核实**。
- 来源：https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work.md 、https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans.md 、https://docs.netlify.com/manage/forms/usage-and-billing.md （抓取 2026-10-05）

**Zeabur**
- 官方定价页：Free $0（面板基础、可管理 1 台自有服务器、构建机 2C4G、日志 48h、单文件上传 50MB）；Dev $5/月（首 14 天免费，Domains 5、Monthly quota 3,000、Daily 100）；Pro $19/月（Domains 10、Monthly 50,000、构建 4C8G）；Team $79/月。
- 对比表中 **Free 档 Domains = 0、Monthly quota = 0**：照表字面读，免费档不能给对外站点绑定域名、也没有月度部署配额，更适合"把自有服务器接进来管"。**这是按表格字面值的解读，是否为页面渲染缺项未核实。**
- 来源：https://zeabur.com/pricing （抓取 2026-10-05）

**EdgeOne Pages / EdgeOne Makers（腾讯云边缘）**
- 官方 FAQ：**Free plan 永久提供**；支持 Static Site / SPA / Full-Stack / Agent App；连 Git → 配构建命令与输出目录 → 全球边缘部署；自定义域名自动签发 SSL；宣称 3,200+ 全球边缘节点（含 2,500+ 亚洲）。
- 免费额度的**具体数字**该页未给 → **未核实**。国内访问友好度属推断（腾讯系 + 官方宣称亚洲节点多），未作为事实断言。
- 来源：https://edgeone.ai/products/pages （抓取 2026-10-05）

---

## 2. 自定义域名与 DNS

### 2.1 买域名的渠道（本次抓取到的）

| 渠道 | 抓取到的事实 | 备注 |
|---|---|---|
| Cloudflare Registrar | "Registration, transfer, and renewal prices are always at or below what registries and ICANN charge us"；支持 430+ TLD；**免费一键 DNSSEC**；域名默认锁定；WHOIS 隐私默认 | 按成本价、无加价，适合同时用 Cloudflare DNS/CDN 的人（https://www.cloudflare.com/products/registrar/ ，抓取 2026-10-05） |
| Porkbun | 价格表页面可访问，本次抓取到大量价格数字但**未与具体 TLD 对齐**，故 .com 具体价标"未核实" | https://porkbun.com/products/domains （抓取 2026-10-05） |
| Namecheap | 抓取返回 **HTTP 403**（反爬），未取得任何价格 | **未核实** |
| 国内注册商（阿里云/腾讯云等） | 未抓取 | **未核实** |

### 2.2 GitHub Pages 的 DNS 记录（官方原文）

- **apex 域（example.com）**：至少一条 ALIAS/ANAME/A 记录；用 A 记录时指向 185.199.108.153、185.199.109.153、185.199.110.153、185.199.111.153；用 AAAA 时指向 2606:50c0:8000::153、2606:50c0:8001::153、2606:50c0:8002::153、2606:50c0:8003::153（官方同时建议 A + AAAA 一起配，因为 IPv6 普及慢）。
- **子域 / www**：加 CNAME，指向 **user.github.io 或 org.github.io（不含仓库名）**；官方明确"不要指向仓库设置里显示的 *.pages.github.io 子域"。
- 官方建议 apex 和 www **都配**：配好后 GitHub Pages 会自动在两者间重定向。
- **不要用通配符 DNS（*.example.com）**：官方警告存在子域名接管风险（即使验证过 apex）。
- 建议**先验证自定义域名**再添加，以防 takeover。
- DNS 变更**最长 24 小时**才传播；"Enforce HTTPS" 最长 24 小时后才可用。
- 国际域名（IDN）需按 **Punycode** 填写。
- 来源：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site 、https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages （抓取 2026-10-05）

### 2.3 CNAME 文件：什么时候有、什么时候没有（最容易踩）

官方原文要点：
- 在仓库 Settings → Pages → Custom domain 保存域名时，**如果你用"分支"作为发布源**，GitHub 会自动往**源分支根目录**提交一个 CNAME 文件；
- **如果你用自定义 GitHub Actions workflow 发布，则不会创建 CNAME 文件，已有的 CNAME 文件也会被忽略、且不再必需**。
- 用 Astro 等生成器时，另一种常见做法是把 CNAME 放进 public/（构建后落到输出目录根），Astro 官方部署文档就是这么写的；同时要**把 astro.config 的 site 改成自定义域名并删掉 base**。
- 来源：GitHub 同上；https://docs.astro.build/en/guides/deploy/github/ （抓取 2026-10-05）

### 2.4 其他平台的 DNS 要点

| 平台 | apex 域 | 子域 |
|---|---|---|
| Cloudflare Pages | 必须把站点加为 Cloudflare zone 并把 **nameserver 指到 Cloudflare**（否则 apex 不可用） | 加 CNAME：shop.example.com → YOUR_SITE.pages.dev；若域名已是 Cloudflare zone，则确认后自动加记录 |
| Vercel | 改 nameservers，或只改 A/CNAME；wildcard 域会自动启用 Vercel nameservers | 每个项目有**唯一的 CNAME 值**（页面按项目显示），不要抄别的项目 |
| Netlify | apex 不支持 CNAME；推荐 ALIAS/ANAME/flattened CNAME 指向 **apex-loadbalancer.netlify.com**，或用 A 记录兜底（apex 会解析到负载均衡 IP，失去 CDN 直连的 DNS 路由优势） | CNAME 指向你的 site.netlify.app |

- 来源：https://developers.cloudflare.com/pages/configuration/custom-domains/ 、https://vercel.com/docs/domains/working-with-domains/add-a-domain 、https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/ （抓取 2026-10-05）

### 2.5 子路径 vs 子域名（"部署后样式全丢"的根因）

1. **GitHub Pages 的 project site 天生在子路径**：https://user.github.io/repo/。生成器必须知道根不是 / 而是 /repo——Astro 官方文档要求在 config 里设 base: '/my-repo'，且**站内所有内部链接都要加上该前缀**；只有当仓库名是 user.github.io 这种特殊形式时才是根路径。
2. **换成自定义域名后要反向操作**：把 site 改成域名、**删掉 base**、并把内部链接的前缀去掉。只改 site 不改 base 是典型事故。
3. **要彻底避开子路径**：给该仓库配一个**子域名**（如 blog.example.com），用 CNAME 指过去，站点就落在根路径。
4. Netlify / Vercel / Cloudflare Pages 的每个项目自带一个 provider 子域（*.netlify.app / *.vercel.app / *.pages.dev），**天然是根路径**，不存在 base 问题；但换 apex 域时各自的 DNS 要求不同（见 2.4）。
- 来源：https://docs.astro.build/en/guides/deploy/github/ （抓取 2026-10-05）

---

## 3. CI/CD：GitHub Actions 部署要点 + 可直接复制的 workflow

### 3.1 要点清单

| 要点 | 结论 | 依据 |
|---|---|---|
| 发布源 | 仓库 Settings → Pages → Source 选 **GitHub Actions** | https://docs.astro.build/en/guides/deploy/github/ |
| 必需权限 | deploy job 至少 pages: write + id-token: write；GITHUB_TOKEN 的 pages 权限负责创建部署，id-token 用于申请 OIDC JWT 校验分支保护 | https://github.com/actions/deploy-pages （抓取 2026-10-05） |
| 环境 | 目标 environment: github-pages，url 取自部署步骤输出的 page_url | 同上 |
| needs | deploy job 必须 needs 到 build job，否则会"独立部署"并一直等一个不存在的 artifact | GitHub Docs: Using custom workflows with GitHub Pages |
| artifact 契约 | 用 upload-pages-artifact 打包；产物是 gzip 包里的单个 tar，**tar 必须 <10GB 且不含符号/硬链接** | 同上 |
| Node 缓存 | actions/setup-node 的 cache: npm 最省事；要手工控制就用 actions/cache + key 含 hashFiles('**/package-lock.json') + restore-keys 前缀匹配 | https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows （抓取 2026-10-05） |
| Node 版本 | 用 setup-node 固定主版本（示例用 22），别依赖 runner 默认值 | 同上 |
| 输出目录 | 各生成器不同：Astro dist、Eleventy _site、Hugo public、Jekyll _site、Vite dist；upload-pages-artifact 的 path 必须指到构建产物目录（不是仓库根） | https://developers.cloudflare.com/pages/configuration/build-configuration/ （同类对照表） |
| 并发 | 官方模板用 concurrency: {group: "pages", cancel-in-progress: false}，避免多个部署互相顶掉 | actions/starter-workflows pages/static.yml |
| Action 版本 | 2026-10-05 各仓库 Releases 最新大版本：checkout **v7.0.1**、setup-node **v7.0.0**、configure-pages **v6.0.0**、upload-pages-artifact **v5.0.0**、deploy-pages **v5.0.1**；GitHub 官方文档页当时示例仍写 checkout@v6 / configure-pages@v5 / upload-pages-artifact@v4 / deploy-pages@v4，两者不一致 | 各 action Releases 页（见 raw/deploy/） |

### 3.2 完整可复制 workflow（Node 系生成器，部署到 GitHub Pages）

放到 .github/workflows/deploy.yml。改两处即可用：node-version、path（构建输出目录）。

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

# 同一时间只允许一个 pages 部署；不取消进行中的部署，保证生产部署能跑完
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: npm            # 自动按 package-lock.json 做依赖缓存

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build       # Astro/Eleventy/Hugo 等换成对应命令

      - name: Configure Pages
        id: pages
        uses: actions/configure-pages@v6
        # 项目站（user.github.io/repo）需要 base 时，构建命令可用：
        #   npx astro build --site "${{ steps.pages.outputs.origin }}" --base "${{ steps.pages.outputs.base_path }}"

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v5
        with:
          path: dist             # ← 改成你的输出目录：dist / _site / public / build

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    permissions:
      pages: write
      id-token: write
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

**版本回退（若上面的大版本组合报错）**：换成 GitHub 官方文档该页当时给出的组合 —— actions/checkout@v6、actions/configure-pages@v5、actions/upload-pages-artifact@v4、actions/deploy-pages@v4（来源：https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages ）。

**没有构建步骤的纯静态仓库**（直接发布仓库内容）：把 build job 去掉，单 job 里 checkout → configure-pages → upload-pages-artifact（path: '.'）→ deploy-pages 即可（pages/static.yml 官方模板即此形态，注意其模板里用的是 upload-pages-artifact@v3 + deploy-pages@v5）。

**手工缓存写法**（不用 setup-node 的 cache 时）：

```yaml
      - name: Cache npm
        id: cache-npm
        uses: actions/cache@v4
        with:
          path: ~/.npm
          key: ${{ runner.os }}-build-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-build-
```

### 3.3 其他平台的构建配置（对照）

| 平台 | 需要设置 | 抓取到的对照示例 |
|---|---|---|
| Cloudflare Pages | Build command + Build output directory +（monorepo 时）Root directory | Astro npm run build/dist；Eleventy npx @11ty/eleventy/_site；Hugo hugo/public；Jekyll jekyll build/_site；无 preset 时 build command 用 exit 0 |
| Netlify | Build command + Publish directory +（可选）Base directory / Package directory | 支持 netlify.toml，配置文件优先级高于 UI 设置；monorepo 用 base/package directory |
| Vercel | 通常零配置（框架预设）；注意构建步上限 45 分钟 | Hobby 项目不能连组织仓库 |
| GitHub Actions | 见 3.2 | — |

来源：https://developers.cloudflare.com/pages/configuration/build-configuration/ 、https://docs.netlify.com/build/configure-builds/overview/ 、https://vercel.com/docs/limits （抓取 2026-10-05）

---

## 4. 配套能力选型

### 4.1 "配套工具默认推荐"表

| 能力 | 默认推荐 | 备选 | 费用/依赖（2026-10-05） | 关键限制 | 来源 |
|---|---|---|---|---|---|
| 评论 | **giscus** | utterances、Disqus | giscus：开源、无跟踪无广告、**永久免费**，数据全部存在 **GitHub Discussions**，无需数据库 | 访客评论要授权 GitHub OAuth（即**必须有 GitHub 账号**）；仍处活跃开发，GitHub Discussions API 变动可能影响它 | https://giscus.app/ |
| 评论（轻量备选） | utterances | giscus | 开源、无跟踪无广告、永久免费，数据存 **GitHub Issues**，Primer 样式，原生暗色 | 同样要求访客有 GitHub 账号；基于 Issues，不如 Discussions 的线程/分类灵活 | https://utteranc.es/ |
| 评论（慎选） | Disqus | — | 官方页仅说明 Plus/Pro/Polls Pro 有 **30 天免费试用**，需绑支付方式；非营利小站可申请免费 Comments Plus | 免费档具体条款该页未给 → **未核实**；第三方脚本 + 广告/追踪取向 | https://disqus.com/pricing/ |
| 统计 | **Cloudflare Web Analytics** | Umami Cloud、Plausible、GA4 | 官方标题即 "Free website analytics … for free"，隐私优先、无 cookie | 官方该页未说明是否**必须**把域名接入 Cloudflare 代理 → **未核实** | https://www.cloudflare.com/web-analytics/ |
| 统计（可自托管） | Umami | — | Cloud Hobby：**100K events/月、1 个网站、6 个月数据保留**，社区支持；也支持完全自托管 | Hobby 无 API 访问、无团队成员；Pro 起才有（1M events 起） | https://umami.is/pricing 、https://umami.is/docs |
| 统计（隐私优先） | Plausible | — | Starter 档 **≤10k 月 pageviews、1 个网站、3 年数据保留**；30 天试用 | **具体订阅价格未抓到**（页面交互式渲染）→ 未核实 | https://plausible.io/#pricing |
| 统计（默认不推荐） | GA4 | — | 官方页称"将免费提供各种工具" | 体积大、隐私合规负担、国内加载不稳（未实测） | https://marketingplatform.google.com/about/analytics/ |
| 搜索 | **Pagefind** | Fuse.js、Algolia | 开源静态搜索库（MIT）；仓库页显示 5.5k stars，最新提交 **2026-10-01** | 需要构建期生成索引；索引体积随站点增大（官方定位"大站点也性能良好"） | https://github.com/cloudcannon/pagefind 、https://pagefind.app/docs/ |
| 搜索（极轻量） | Fuse.js | — | 零依赖、浏览器/Node/Deno 均可；full 构建 ~8.6kB gzip | 纯客户端：数据要全量下发，条目多时首屏变大；**首页未见 License 声明 → 未核实** | https://www.fusejs.io/ |
| 搜索（托管） | Algolia | — | 免费层：**10,000 search requests + 10,000 recommend requests + 100,000 records + 10,000 crawls/月** | 需要索引同步与 API Key 管理；超出按量计费（$0.60/1K requests 起） | https://www.algolia.com/pricing/ |
| 图片优化 | **构建器内置**（如 Astro Image/Picture 组件） | Cloudflare Images、ImageKit | Astro 官方：内置 Image/Picture、Markdown 图片处理、可全局开启响应式 | **public/ 里的图片永远不会被优化、也不支持响应式**（官方明确） | https://docs.astro.build/en/guides/images/ |
| 图片（CDN） | Cloudflare Images Free | — | Free 档：**5,000 次 unique transformations/月**，超出免费档不会被收费 | 存图/交付（Images Stored/Delivered）**只有付费档**才有（$5/100k stored、$1/100k delivered） | https://developers.cloudflare.com/images/pricing/ |
| 字体 | **Fontsource（自托管）** | 中文网字计划、Google Fonts | Fontsource：开源字体仓库，**2,100 个字体族**，下载即自托管 | 自托管要自己管子集化与缓存；中文字体全量文件大 | https://fontsource.org/ |
| 字体（中文） | 中文网字计划 | — | 免费 CDN + 在线分包；开源工具 cn-font-split / vite-plugin-font | 官方公告：**CDN 域名已迁移**（chinese-fonts-cdn.deno.dev → cn-font.claude-code-best.win），旧域名即将退役 | https://chinese-font.netlify.app/ |
| 表单 | **Formspree** | Netlify Forms | Free $0；付费档 $10 / $20 / $60 每月 | Free 档**具体提交次数未抓取到**（价格表未对齐）→ 未核实 | https://formspree.io/pricing/ |
| 表单（若已用 Netlify） | Netlify Forms | — | credit-based 计划下 **Forms 免费且不限量**；Legacy 计划按 submission/文件上传计量 | 仅 Netlify 平台可用 | https://docs.netlify.com/manage/forms/usage-and-billing.md |

### 4.2 选型要点

- **评论**：个人技术主页的读者大多有 GitHub 账号，giscus 是"零成本 + 零数据库 + 数据可导出"的默认解；要覆盖非技术读者才考虑 Disqus 或自建（后者成本高）。
- **统计**：只要"看过多少人、从哪来"，Cloudflare Web Analytics 免费且隐私友好；要事件/留存/自托管就上 Umami。GA4 功能最强但最重、合规成本最高，个人主页通常不值。
- **搜索**：内容规模在几百页以内，Pagefind 静态索引是性价比最高的（无服务、无 API key）；只有几十条且能全量下发时用 Fuse.js；要跨站/多语言/权重调优才上 Algolia。
- **图片**：先榨干构建器内置优化（Astro 的 Image 组件会自动出多尺寸/多格式），public/ 直出的图片是例外；CDN 变换按"unique transformations"计费，注意"不同尺寸 × 不同图片 = 多次变换"。
- **字体**：中文站点务必做子集化或分区加载，否则一个中文字体动辄数 MB；中文网字计划的 cn-font-split / vite-plugin-font 就是解决这个。
- **表单**：静态站没有后端，Formspree/Netlify Forms 是最短路径；注意免费档额度和垃圾提交。

---

## 5. 低代码 / 无代码内容编辑（不改代码更新作品）

| 方案 | 类型 | 费用（2026-10-05 抓取） | 你要付出的代价 |
|---|---|---|---|
| **Decap CMS** | Git-based，自托管 | **MIT 开源、永久免费**；另有商业版 Decap Turbo（托管鉴权、数据库代理、限流防护、S3 媒体库、部署通知、审计日志） | 需要自备**认证/后端**（OAuth 或 GitHub 授权服务），这是最常见的卡点；全部配置集中在一个 config.yml；官方称内容留在你自己的 Git 仓库 |
| **Sveltia CMS** | Git-based，自托管 | 开源（官网首页展示大量"从 Decap 迁移"的用户证言） | 仓库页显示 2.9k stars、最新提交 **2026-10-05**（活跃）；官网首页未见 License 文本 → **License 未核实**；支持用 fine-grained PAT 登录（社区反馈里被反复提到"绕开了 Decap 的 OAuth 痛点"） |
| **Sanity** | 托管内容数据库（非 Git） | Free：**20 user seats、2 permission roles、2 datasets（仅公开）、10k documents、2k unique attributes/dataset**；Growth **$15/seat/月**（50 seats、5 roles、2 datasets 公私皆可、25k documents） | 内容在 **Sanity 云**而非你的 Git 仓库（数据主权/迁移成本）；前端通过 API 取数，构建要处理缓存与限流；更多 dataset 是 $999/个加购 |
| **TinaCMS** | Git-backed + 可视化编辑 | Free $0（**2 用户、2 角色**、社区支持）；Team **$24/project/月**（年付 $290，3 用户）；Team Plus $41/月；Business $249/月 | Free 档只有 2 个用户；Editorial Workflow 要 Team Plus 起；资源上限（Asset Size cap 100MB）；生产使用通常要付费 |
| **Notion 作为内容源** | SaaS → 构建期拉取 | Notion 官方 API 存在（需创建 integration、拿 token） | 构建期依赖第三方 API（限流/失败会影响部署）、**内容不是标准 front-matter**，字段映射要自己写；本地无法预览；本次未核实具体第三方工具链及其可靠性 |

- 来源：https://decapcms.org/ 、https://sveltiacms.app/ 、https://github.com/sveltia/sveltia-cms 、https://www.sanity.io/pricing 、https://tina.io/pricing 、https://developers.notion.com/docs/getting-started （抓取 2026-10-05）

**给本项目的建议**：个人主页 + 偶尔更新作品，用 **Decap CMS 或 Sveltia CMS（二选一，Sveltia 更活跃、迁移成本低）** + GitHub 仓库即可，零成本；只有当你需要"团队协作 + 定时发布 + 媒体库"才值得上 Sanity/TinaCMS 的付费档。

---

## 6. 国内访问与备案要点

### 6.1 本机实测（2026-10-05，公网出口：重庆 / AS4134 CHINANET）

方法：curl 取 http_code 与 time_total，超时 20s，跟随重定向。4xx 说明**网络可达**（只是该路径无内容），FAIL 表示失败。

| 目标 | 结果 | 说明 |
|---|---|---|
| academicpages.github.io | **200 / 0.45s** | GitHub Pages 站点可达且快 |
| astro-paper.pages.dev | **200 / 1.15s** | Cloudflare Pages 站点可达 |
| example.pages.dev | 404 / 2.02s | 可达（无此项目） |
| example.netlify.app | 200 / 0.79s | 可达 |
| chinese-font.netlify.app | 200 / 1.55s | 可达 |
| github.com | **200 / 15.5s** | 可达但**很慢**（首次 HEAD 曾超时失败） |
| vercel.com / nextjs.org | 200 | Vercel 平台与其托管站点可达 |
| example.vercel.app | **FAIL**（DNS 解析异常） | 未找到可用的真实 *.vercel.app 样本，**站点级可达性未核实** |
| zeabur.com / example.zeabur.app | 200 / 502 | 可达（502 是项目不存在） |
| edgeone.ai | 200 / 0.59s | 可达 |
| fonts.googleapis.com / fonts.gstatic.com | 404 | **可达**（本次网络下 Google Fonts 未被阻断） |
| cdn.jsdelivr.net | 200 / 2.26s | 可达 |

**怎么用这些数据**：单点单次测量只能回答"这台机器当时能不能打开"。要给出结论性判断，请在目标地区/运营商多测几次，并优先把**你自己的域名**（而非 provider 默认域）纳入监控。

### 6.2 备案（简述，标注不确定）

- **通行说法（非本次核实）**：站点只用**境外**服务器/CDN（GitHub Pages、Cloudflare Pages、Vercel、Netlify 等），一般**不需要** ICP 备案；用**中国大陆境内**的服务器或境内节点 CDN，域名需先完成 **ICP 备案**，否则境内接入会被拦截。
- **本次未能核实**：官方入口 https://beian.miit.gov.cn/ 抓取失败（HTTP **521**），本文不对流程、材料、时限做任何断言。
- **未核实**：公安联网备案、经营性 ICP 许可证、以及"国内注册商 + 境外托管"等组合的具体要求。需要决策时请以工信部/服务商官方说明为准。

---

## 7. 未解决 / 待核实

1. **Vercel 站点级国内可达性**：未找到可用的真实 *.vercel.app 样本（example.vercel.app DNS 异常、vercel.app 主域不可达），仅验证了 vercel.com / nextjs.org 可达。
2. **Netlify 构建时长上限 / Functions 免费额度**：本次抓取的 limits 相关页面未给出数字。
3. **Zeabur Free 档**：对比表中 Domains=0、Monthly quota=0 是按表格字面值解读，无法排除页面渲染缺项。
4. **EdgeOne Pages（Makers）免费额度数字**：产品页未给出量化限制。
5. **Plausible 订阅价格**：页面为交互式渲染，文本中无价格。Umami Cloud 各档价格同样未抓到（只抓到额度）。
6. **Formspree Free 档提交次数**：价格表抓取后未与档位对齐。
7. **Disqus 免费档条款**：官方 pricing 页只描述了 Plus/Pro 试用与"非营利可申请免费"，免费基础档细节未给。
8. **Fuse.js License**：官网首页未声明（功能与体积已核实）。
9. **Sveltia CMS License**：仓库页文本本次未显示 license 字段。
10. **Cloudflare Web Analytics** 是否要求域名接入 Cloudflare 代理/DNS：官网页面未说明。
11. **域名价格**：Namecheap 抓取 403；Porkbun 表格价格未与 TLD 对齐；国内注册商未抓取。
12. **ICP 备案**：官方站点抓取失败（521），本文相关表述均标"未核实"。
13. **GitHub Actions 版本口径不一致**：官方文档页示例（checkout@v6 / configure-pages@v5 / upload-pages-artifact@v4 / deploy-pages@v4）与各仓库 Releases 最新大版本（v7/v6/v5/v5）不一致；本文 YAML 采用**较保守的稳定大版本**（checkout@v6、setup-node@v6、configure-pages@v6、upload-pages-artifact@v5、deploy-pages@v5），**未经真实运行验证**。
14. **国内可访问性**：全部为 2026-10-05 单机单次测量，不代表全国网络状况。
15. **Vercel"函数最长时长"口径**：Hobby 计划页写最大 300s，limits 页旧项目口径写 60s，两处不一致，未核实以哪个为准。

---

## 附：原始正文清单（personal-homepage-research/raw/deploy/）

| 文件（去 .md） | 原始 URL |
|---|---|
| docs.github.com-en-pages-getting-started-with-github-pages-github-pages-limits | https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits |
| docs.github.com-en-pages-getting-started-with-github-pages-about-github-pages | https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages |
| docs.github.com-en-pages-getting-started-with-github-pages-using-custom-workflows-with-git | https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages |
| docs.github.com-en-pages-configuring-a-custom-domain-for-your-github-pages-site-managing-a | https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site |
| docs.github.com-en-pages-configuring-a-custom-domain-for-your-github-pages-site-about-cust | https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages |
| developers.cloudflare.com-pages-platform-limits- | https://developers.cloudflare.com/pages/platform/limits/ |
| developers.cloudflare.com-pages-functions-pricing- | https://developers.cloudflare.com/pages/functions/pricing/ |
| developers.cloudflare.com-pages-configuration-build-configuration- | https://developers.cloudflare.com/pages/configuration/build-configuration/ |
| developers.cloudflare.com-pages-configuration-custom-domains- | https://developers.cloudflare.com/pages/configuration/custom-domains/ |
| developers.cloudflare.com-pages-configuration-preview-deployments- | https://developers.cloudflare.com/pages/configuration/preview-deployments/ |
| vercel.com-docs-plans-hobby | https://vercel.com/docs/plans/hobby |
| vercel.com-docs-limits | https://vercel.com/docs/limits |
| vercel.com-docs-limits-usage | https://vercel.com/docs/limits/usage |
| vercel.com-pricing | https://vercel.com/pricing |
| vercel.com-docs-domains-working-with-domains-add-a-domain | https://vercel.com/docs/domains/working-with-domains/add-a-domain |
| vercel.com-docs-domains-working-with-domains-deploying-and-redirecting | https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting |
| www.netlify.com-pricing- | https://www.netlify.com/pricing/ |
| docs.netlify.com-build-configure-builds-overview- | https://docs.netlify.com/build/configure-builds/overview/ |
| docs.netlify.com-llms.txt | https://docs.netlify.com/llms.txt |
| docs.netlify.com-manage-accounts-and-billing-billing-billing-for-credit-based-plans-how-credits | https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work.md |
| docs.netlify.com-manage-accounts-and-billing-billing-billing-for-credit-based-plans-billing-faq | https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans.md |
| docs.netlify.com-manage-accounts-and-billing-billing-overview.md | https://docs.netlify.com/manage/accounts-and-billing/billing/overview.md |
| docs.netlify.com-manage-accounts-and-billing-billing-change-your-pricing-plan.md | https://docs.netlify.com/manage/accounts-and-billing/billing/change-your-pricing-plan.md |
| docs.netlify.com-manage-forms-usage-and-billing.md | https://docs.netlify.com/manage/forms/usage-and-billing.md |
| docs.netlify.com-build-functions-usage-and-billing.md | https://docs.netlify.com/build/functions/usage-and-billing.md |
| docs.netlify.com-manage-domains-configure-domains-configure-external-dns- | https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/ |
| zeabur.com-pricing | https://zeabur.com/pricing |
| edgeone.ai-products-pages | https://edgeone.ai/products/pages |
| giscus.app- | https://giscus.app/ |
| utteranc.es- | https://utteranc.es/ |
| disqus.com-pricing- | https://disqus.com/pricing/ |
| umami.is-pricing | https://umami.is/pricing |
| umami.is-docs | https://umami.is/docs |
| plausible.io-pricing | https://plausible.io/#pricing |
| www.cloudflare.com-web-analytics- | https://www.cloudflare.com/web-analytics/ |
| marketingplatform.google.com-about-analytics- | https://marketingplatform.google.com/about/analytics/ |
| github.com-cloudcannon-pagefind | https://github.com/cloudcannon/pagefind |
| pagefind.app-docs- | https://pagefind.app/docs/ |
| www.fusejs.io- | https://www.fusejs.io/ |
| www.algolia.com-pricing- | https://www.algolia.com/pricing/ |
| docs.astro.build-en-guides-images- | https://docs.astro.build/en/guides/images/ |
| developers.cloudflare.com-images-pricing- | https://developers.cloudflare.com/images/pricing/ |
| fontsource.org- | https://fontsource.org/ |
| chinese-font.netlify.app- | https://chinese-font.netlify.app/ |
| formspree.io-pricing- | https://formspree.io/pricing/ |
| decapcms.org- | https://decapcms.org/ |
| sveltiacms.app- | https://sveltiacms.app/ |
| github.com-sveltia-sveltia-cms | https://github.com/sveltia/sveltia-cms |
| www.sanity.io-pricing | https://www.sanity.io/pricing |
| tina.io-pricing | https://tina.io/pricing |
| developers.notion.com-docs-getting-started | https://developers.notion.com/docs/getting-started |
| www.cloudflare.com-products-registrar- | https://www.cloudflare.com/products/registrar/ |
| porkbun.com-products-domains | https://porkbun.com/products/domains |
| github.com-actions-deploy-pages | https://github.com/actions/deploy-pages |
| github.com-actions-checkout-releases | https://github.com/actions/checkout/releases |
| github.com-actions-setup-node-releases | https://github.com/actions/setup-node/releases |
| github.com-actions-deploy-pages-releases | https://github.com/actions/deploy-pages/releases |
| github.com-actions-upload-pages-artifact-releases | https://github.com/actions/upload-pages-artifact/releases |
| github.com-actions-configure-pages-releases | https://github.com/actions/configure-pages/releases |
| github.com-actions-starter-workflows-blob-main-pages-static.yml | https://github.com/actions/starter-workflows/blob/main/pages/static.yml |
| github.com-actions-starter-workflows-blob-main-pages-astro.yml | https://github.com/actions/starter-workflows/blob/main/pages/astro.yml |

补充条目（上文未逐一展开的原始正文）：

| 文件（去 .md） | 原始 URL |
|---|---|
| developers.cloudflare.com-pages-get-started- | https://developers.cloudflare.com/pages/get-started/ |
| developers.cloudflare.com-web-analytics- | https://developers.cloudflare.com/web-analytics/ |
| developers.cloudflare.com-registrar- | https://developers.cloudflare.com/registrar/ |
| docs.github.com-en-actions-using-workflows-caching-dependencies-to-speed-up-workflows | https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows |
| docs.github.com-en-pages-getting-started-with-github-pages-securing-your-github-pages-site-with | https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https |
| docs.astro.build-en-guides-deploy-github- | https://docs.astro.build/en/guides/deploy/github/ |
| docs.astro.build-en-guides-deploy-cloudflare- | https://docs.astro.build/en/guides/deploy/cloudflare/ |

> 本节共对应 raw/deploy/ 下 **69** 个文件（少数 URL 因 404/403/521 未保存，已在上文标注"未核实"）。

> 注：better-crawler 会把 URL 规整为文件名，个别长文件名在 95 字符处截断（例如上面的 how-credits、billing-faq）；每个文件第一行均为原始 URL，可直接对照。
