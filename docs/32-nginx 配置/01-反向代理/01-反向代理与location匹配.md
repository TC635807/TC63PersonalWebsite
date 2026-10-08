---
title: 反向代理与 location 匹配
summary: 反向代理的职责、location 的修饰符优先级与最长前缀规则、/api/ 边界与 URI 规范化、try_files 回退链，以及样例配置与部署脚本两处配置来源。
tags: [nginx, 反向代理, location, try_files]
updated: 2026-10-07
---

# 反向代理与 location 匹配

反向代理站在客户端与上游服务之间：客户端只看到 nginx 监听的地址，实际处理进程由 nginx 按路径或域名选择。KnowledgeDiver 的前端是单页应用，构建产物在 `frontend/dist`；后端是监听 127.0.0.1:8000 的 FastAPI 进程。生产环境中只有 nginx 对公网监听 80 与 443，两类请求在同一台主机上按路径分流。

分流的全部依据是 nginx 的 `location` 匹配。反向代理与正向代理的差别决定了这条链路两端各做什么，`location` 的两步选择过程与修饰符优先级决定了请求落在哪一段配置上；本工程两条 `location` 的边界、`try_files` 回退链和配置来源都从这里读。对象是 `deploy/nginx.conf` 与 `deploy/deploy.sh` 生成的两条 `location`。

## 客户端只看到一个服务地址

| 维度 | 反向代理 | 正向代理 |
| --- | --- | --- |
| 代理对象 | 上游服务器 | 客户端 |
| 客户端感知 | 把 nginx 当作服务端 | 需显式配置代理地址 |
| 地址暴露 | 上游地址对客户端不可见 | 客户端地址对目标站点不可见 |
| 本工程用途 | 静态资源与 `/api/` 分流 | 未使用 |

正向代理替客户端出面，目标站点看到的是代理地址；反向代理替服务端出面，客户端看到的是 nginx 地址。本工程属于后一种：浏览器访问站点域名，nginx 决定这次请求是读磁盘上的前端产物，还是转发给 127.0.0.1:8000 的 uvicorn 进程。上游进程的监听地址与端口写在 systemd 单元与部署脚本里，不由 nginx 配置定义，因此两边的地址改动必须成对完成。

把静态与接口放在同一个 server 块里，浏览器只会看到一个源，前端不必为跨域准备 `Access-Control-Allow-*` 响应头。后端仍然注册了 CORS 中间件（`backend/main.py:71-77`），那是为本地开发时前端直连 8000 端口预留的路径，生产流量不经过它。

```mermaid
flowchart TD
  C["浏览器"] -->|"GET / 与静态资源"| N["nginx :80 / :443"]
  C -->|"GET /api/..."| N
  N -->|"location /"| S["frontend/dist"]
  N -->|"location /api/"| U["uvicorn 127.0.0.1:8000"]
  S -->|"文件未命中"| I["index.html"]
  U --> B["FastAPI 路由"]
```

## location 的选择顺序与修饰符

nginx 对每个请求只选一个 `location`，选择分两步：先按前缀找出最长的一项，再按书写顺序检查正则 `location`。修饰符决定一个 `location` 参与哪一步。

| 修饰符 | 匹配方式 | 优先级 |
| --- | --- | --- |
| `=` | 精确匹配 | 命中即结束 |
| `^~` | 前缀匹配，命中后跳过正则 | 高于正则 |
| `~`、`~*` | 正则，区分与不区分大小写 | 按书写顺序 |
| 无修饰符 | 前缀匹配，记录最长者 | 最后使用 |

正则 `location` 一旦命中就会覆盖之前记录的最长前缀，除非那条前缀带了 `^~`。因此一个 `/api/` 前缀如果写成正则 `location ~ ` 而又没有 `^~`，另一条更靠前的正则就可能把它抢走，代理规则不生效。

本工程只有两条无修饰符前缀 `location`：

```nginx
location / { ... }      # deploy/nginx.conf:9
location /api/ { ... }  # deploy/nginx.conf:15
```

## 前缀边界由结尾斜杠决定

按最长前缀规则，`/api/pipeline/collect` 命中 `location /api/`；`/api` 与 `/apix` 都命中 `location /`。`/api/` 结尾的斜杠决定了这条边界：前缀匹配按字符逐个比较，没有结尾斜杠的路径不会被第二条 `location` 接住。

`/api` 落在 `location /` 之后走 `try_files`，磁盘上不存在 `api` 这个文件，最终回退到 `index.html`，客户端拿到的是 HTML 外壳而不是 JSON。这类症状容易被当成后端报错，实际请求从未到达后端。

| 请求路径 | 命中 location | 结果 |
| --- | --- | --- |
| `/api/pipeline/collect` | `location /api/` | 代理到上游 |
| `/api/` | `location /api/` | 代理到上游 |
| `/api` | `location /` | 返回 index.html |
| `/apix` | `location /` | 返回 index.html |
| `/assets/app.js` | `location /` | 返回磁盘文件 |

## URI 规范化发生在匹配之前

前缀比较发生在 URI 规范化之后。nginx 会合并路径里的 `.` 与 `..`、解码百分号转义，`/api/../index.html` 会先归一成 `/index.html` 再匹配，因此这类路径落到 `location /` 而不是代理。

规范化同时解码 `%2F` 之外的大部分转义字符，并压缩重复斜杠。这一点对边界判断有直接影响：`/api%2Ffoo` 是否被解码成 `/api/foo` 取决于 nginx 版本对编码斜杠的处理策略，默认不把 `%2F` 当作路径分隔符。要确认实际行为，应在目标版本上用 `curl` 打一条带转义的路径，看访问日志里的 `$request` 与 `$uri`。

```mermaid
flowchart TD
  R["请求 URI"] --> Q{"以 /api/ 开头"}
  Q -->|"是"| A["location /api/ proxy_pass"]
  Q -->|"否"| B["location / root + try_files"]
  B --> T{"$uri 或 $uri/ 存在"}
  T -->|"是"| F["返回磁盘文件"]
  T -->|"否"| H["内部重定向 /index.html"]
```

## try_files 的三级回退

`try_files $uri $uri/ /index.html;` 依次检查三个候选：

1. `$uri`：规范化后的请求路径，对应磁盘上的文件。
2. `$uri/`：同路径作为目录，用于目录索引或后续规则。
3. `/index.html`：前两项都不存在时做内部重定向，由前端路由接管。

前两项命中就返回文件；否则内部重定向到 `index.html`，状态码仍是 200。内部重定向会重新走一遍 `location` 匹配，`/index.html` 以 `/` 开头，重新落回 `location /` 并命中磁盘文件，不会再次进入回退分支，所以不存在无限循环。

这条回退支撑了前端路由的直接刷新。用户刷新 `/cards/abc` 时磁盘上没有同名文件，服务器返回应用外壳，前端再按路径渲染对应组件。代价是磁盘上不存在的资源路径也返回 200，监控里看不到 404，前端拿到的是一页 HTML 而不是错误。判断资源是否真的存在只能看响应体的 `Content-Type` 或直接比对文件列表。

## 静态目录的 root 归属

`deploy/nginx.conf:10` 把 `root` 写死为 `/opt/knowledgediver/frontend/dist`，`deploy/deploy.sh:48` 用变量 `$APP_DIR/frontend/dist`。二者语义相同，差别在部署脚本按自身位置推导 `APP_DIR`（`deploy/deploy.sh:9-10`），不依赖固定安装路径。

`root` 决定文件的根目录，`try_files` 的每一项都相对它解析。两条 `location` 各自声明 `root`，不存在 server 级 `root`，因此改动其中一条不会影响另一条。把 `root` 写在 `location /` 之外会让两条规则共享同一个根，静态路径与代理路径的耦合就出现了。

`root` 与 `alias` 的差别也在这里：`root` 把 `location` 前缀拼到路径前面，`alias` 用别名替换该前缀。本工程两条规则都用 `root`，`/assets/app.js` 解析为 `$root/assets/app.js`。要换成 `alias` 必须同时调整 `try_files` 的相对性，属于容易改错的一类改动。

本工程没有用到 `alias`，静态根只有两条 `root`，检查配置时可以用 `nginx -T` 把展开后的完整配置打出来，确认每条 `location` 解析到的磁盘路径。

## 安装口径：样例文件与脚本生成

`deploy/nginx.conf` 是一份独立的样例，`deploy/deploy.sh` 并不读取它。脚本在 `:40-64` 用 here-doc 写 `/etc/nginx/sites-available/knowledgediver`，其中 `:44` 增加 `listen [::]:80`，`:45` 用 `$DOMAIN www.$DOMAIN` 替换占位域名，`:48` 用 `$APP_DIR` 替换固定路径。随后 `:100-102` 建立软链、删除默认站点、执行 `nginx -t` 并在通过后 `systemctl reload nginx`。

脚本开头有 `set -e`（`deploy/deploy.sh:6`），`nginx -t` 失败会直接终止，不会留下未验证的配置被加载。`server_name` 只在同一端口存在多个 server 块时用于选择；脚本删掉了 `sites-enabled/default`（`deploy/deploy.sh:101`），当前 server 是该端口上的唯一站点，请求的 Host 不匹配也会落到它。这一点的后果是：即使域名写错，请求也会被这条规则接住，问题不会表现为连接失败。

已有证书时，脚本在 `:67-98` 追加 `listen 443 ssl http2` 的 server 块，并把两条 `location` 原样复制一份。同一份路由规则因此出现两次，改动需要同步两处。

```mermaid
flowchart TD
  D["deploy.sh 运行"] --> H["写 sites-available/knowledgediver"]
  H --> C{"证书文件存在"}
  C -->|"是"| SSL["追加 443 server 块"]
  C -->|"否"| T["nginx -t"]
  SSL --> T
  T --> L["软链并删除 default"]
  L --> R["systemctl reload nginx"]
```

## 两类请求的分流落点

| 请求前缀 | location | 处理方式 | 源码位置 |
| --- | --- | --- | --- |
| `/`、`/assets/...` | `location /` | `root` 加 `try_files`，返回 dist 内文件 | `deploy/nginx.conf:9-12` |
| `/api/...` | `location /api/` | `proxy_pass` 到 127.0.0.1:8000 | `deploy/nginx.conf:15-25` |

前端所有请求都写成相对路径，例如 `frontend/src/api/agent.ts:52` 的 `fetch('/api/agent/chat', ...)`。同源路径经 nginx 分流，浏览器不触发跨域预检。

后端的路径前缀与 `location /api/` 对齐。FastAPI 应用在 `backend/main.py:47` 建立，路由模块逐个注册（`backend/main.py:130-144`）。部分路由把完整路径写在装饰器里，例如 `backend/routes/pipeline.py:65` 的 `/api/pipeline/collect`、`backend/routes/auth.py:58` 的 `/api/auth/register`；部分模块用 `APIRouter(prefix=...)`，例如 `backend/routes/classification.py:17` 的 `/api/classification`。两类写法的最终路径都以 `/api` 开头。

根路径是少数例外：`backend/main.py:147-150` 注册了 `/` 的健康检查，但公网请求 `/` 先命中 `location /`，返回的是前端 `index.html`，不会到达后端。后端的 `/` 只在 nginx 之外（例如本机直连 8000）可见。上游只监听回环（`deploy/knowledgediver.service:7-10`），因此这个健康检查也不从公网暴露。

## 常见误用与边界情况

| # | 误用 | 现象 | 位置 |
| --- | --- | --- | --- |
| 1 | 把 `/api` 当作 `/api/` 的别名 | 请求落到 `location /`，返回 index.html 而非 JSON | `deploy/nginx.conf:9-15` |
| 2 | 认为 `deploy/nginx.conf` 会被自动安装 | 改了样例文件，服务器上仍是旧配置 | `deploy/deploy.sh:40-64` |
| 3 | 只改一处 443 块 | HTTP 正常、HTTPS 仍走旧路径 | `deploy/deploy.sh:52-62`、`:85-95` |
| 4 | 用正则 `location` 匹配 `/api/` 而未加 `^~` | 前缀被正则抢先，代理规则不生效 | `deploy/nginx.conf:15` |
| 5 | 把不存在的前端路由当成 404 | 监控统计里全是 200，问题被掩盖 | `deploy/nginx.conf:11` |
| 6 | 在 `location /` 内再写 `root` 又期望外部继承 | 静态路径与预期不符 | `deploy/nginx.conf:10` |
| 7 | 忽略 `server_name` 的唯一站点效应 | 域名配错也能访问，误以为配置生效 | `deploy/deploy.sh:101` |

第 1 行与第 5 行是同一类问题的两个方向：一个把代理路径漏给了静态规则，一个把静态规则当成正常。判断请求到底去了哪里，最短的路径是看 nginx 访问日志里的 `$request` 与 `$status`，再对比响应体的首行是 `<!DOCTYPE html>` 还是 JSON。

## 小结

### 核心概念

- 反向代理对客户端隐藏上游地址，本工程的 nginx 同时承担静态托管与 `/api/` 代理。
- 无修饰符前缀 `location` 取最长匹配，`/api/` 与 `/` 的分界由结尾斜杠决定。
- URI 先规范化再匹配，`.`、`..` 与转义字符会影响最终命中的规则。
- `try_files $uri $uri/ /index.html` 支撑 SPA 刷新，代价是不存在的资源也返回 200。
- `deploy/nginx.conf` 与 `deploy/deploy.sh` 的 here-doc 是两处配置来源，安装以脚本为准。
- 上游地址 127.0.0.1:8000 只出现在 `location /api/` 内，后端不直接对公网监听。

### 设计权衡

| 权衡点 | 本工程选择 | 收益与代价 |
| --- | --- | --- |
| 静态与 API 同域 | 一个 server 两条 location | 前端调用无需跨域配置；代价是路径前缀成为接口契约 |
| SPA 回退 | `try_files` 落到 index.html | 前端路由可直接刷新；代价是 404 语义丢失 |
| 配置来源 | 脚本生成，样例文件留档 | 安装自包含；代价是两处规则要同步维护 |
| `root` 的归属 | 每条 location 各自声明 | 互不影响；代价是重复书写与易漏改 |

## 练习

### 基础题

1. 写出 `/api`、`/api/`、`/api/pipeline/collect` 三条路径在 `deploy/nginx.conf` 下分别命中哪条 location，并说明 `/api` 的响应体来自哪里。
2. 说明 `location ~ ` 与 `location ^~ ` 同时存在时，请求 `/api/foo` 会命中哪一条，并解释原因。
3. 给定 `/api/../index.html`，说明规范化后的路径与命中的 location。

### 挑战题

4. 设计一组 location，使 `/api` 与 `/api/` 都被代理，同时不影响静态文件回退。写出配置并说明每条规则的优先级。
5. 若把后端路由前缀改成 `/v1`，列出需要同步修改的文件与行号，并给出验证路径一致性的一条命令。
6. 说明 `root` 与 `alias` 在 `location /assets/` 下的差别，写出两种写法的 `try_files` 应如何调整。

### 附：本页引用的路径

| 路径 | 用途 |
| --- | --- |
| `deploy/nginx.conf` | server 与两条 location 的定义（`:4-26`、`:9-12`、`:15-25`） |
| `deploy/deploy.sh` | 生成 HTTP/HTTPS server 块与重载（`:40-64`、`:100-102`） |
| `deploy/knowledgediver.service` | 后端监听 127.0.0.1:8000（`:7-10`） |
| `backend/main.py` | 应用建立与路由注册（`:47`、`:130-150`） |
| `backend/routes/pipeline.py`、`backend/routes/auth.py` | 完整 `/api` 路由路径（`:65`、`:58`） |
| `frontend/src/api/agent.ts` | 前端以相对路径请求 `/api/...`（`:52`） |
| 仓库根 `~/KnowledgeDiver` | 正文路径相对该根，部署素材在 `deploy/` |


