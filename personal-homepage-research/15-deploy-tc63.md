# 15 · 部署到 knowledgediver.cloud/tc63

**日期**：2026-10-07 ｜ **状态**：✅ 已上线 https://knowledgediver.cloud/tc63/ ｜ 关联：[04 部署与工具链](04-deployment-and-tooling.md)

---

## 1. 为什么是 /tc63 子路径

服务器 `43.136.78.68`（Ubuntu 24.04，腾讯云）上**域名根已经被 KnowledgeDiver 占用**：

| 项 | 现状 |
| --- | --- |
| 反向代理 | nginx 1.24（`/etc/nginx/sites-available/knowledgediver`，80 + 443，Let's Encrypt 证书） |
| 域名根 `/` | `root /root/KnowledgeDiver/frontend/dist`（前端静态产物，root 目录下） |
| `/api/` | `proxy_pass http://127.0.0.1:8000/`（uvicorn `backend.main:app`，以 root 运行） |
| 可登录账号 | `tc63`（uid 1005，**没有 sudo**）；sudo 组里只有 `ubuntu` |

所以个人主页落在 **`/tc63/`**，文件放在 `tc63` 能写的目录：`/home/tc63/www/tc63/`。

## 2. 代码侧改动：子路径部署要处理的只有一件事

`astro.config.mjs`：

```js
export default defineConfig({
  site: 'https://knowledgediver.cloud',
  base: '/tc63',
  ...
});
```

`base` 会自动处理：JS/CSS 资源前缀、`canonical`、`og:url`、`og:image`、astro 生成的 `_astro/` 引用。
**但它不会改你手写的链接** —— 之前站内到处是 `href="/projects/"` 这种裸绝对路径，在子路径下会打到域名根（也就是别人的应用）上。

于是新增 `src/lib/url.ts` 作为唯一出口：

```ts
export const BASE = import.meta.env.BASE_URL;          // '/tc63' 或 '/'
const ROOT = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
export function url(path = '/') { ... }                // url('/projects/') → '/tc63/projects/'
```

然后把站内所有绝对链接/图片都改成 `url(...)`：`BaseLayout`（favicon、og、竖栏首页）、`site.nav`、
首页各面板与 noscript 链接、`ProjectRow` / `ProjectCard` / `AwardList` / 项目详情页 / 404 /
文档区（`docsHref()`、面包屑、顶栏）、以及项目配图 `/images/*`。

顺带修了 `isActive()`：原来用 `href === '/'` 判断首页，子路径下 `/` 会变成 `/tc63/`，
不改的话**每个页面都会点亮「终端」**；现在用 `url('/')` 作为判据。

### 踩到的坑：`import.meta.env.BASE_URL` 不带尾斜杠

Astro 把 `BASE_URL` 设成配置里的原样值 `'/tc63'`（**不是** Vite 习惯的 `'/tc63/'`），所以
`import.meta.env.BASE_URL + 'fluid/LDR_LLL1_0.png'` 拼出了 `/tc63fluid/...`，流体纹理与搜索索引**双重 404**。
统一换成 `url('/fluid/LDR_LLL1_0.png')` / `url('/docs/search-index.json')` 后实测零 404。

## 3. 服务器侧

```
/home/tc63/www/tc63/            ← 站点文件（rsync 上传，约 8 MB）
/home/tc63/www/enable-tc63.sh   ← 一次性启用脚本（需要 root 执行）
```

需要 root 的只有 nginx 这一步。脚本做的事：备份配置 → 在**每个 server 块**的 `location /api/` 之前插入：

```nginx
location = /tc63 { return 301 /tc63/; }
location ^~ /tc63/_astro/ {
    root /home/tc63/www;
    add_header Cache-Control "public, max-age=2592000, immutable";
}
location ^~ /tc63/ {
    root /home/tc63/www;
    index index.html;
    try_files $uri $uri/ =404;
    error_page 404 /tc63/404.html;
}
```

→ `nginx -t` 通过才 `systemctl reload nginx`，不通过自动回滚到备份。用 `root` 而不是 `alias`，
是因为文件本来就放在 `/home/tc63/www/tc63/`，`root` 的路径拼接天然对上，避开 `alias + try_files` 的经典坑。

### 服务器上没有 python3 / curl / wget

第一次执行脚本失败在 `python3: command not found`。查明原因：`/usr/bin/python3` 是个**断链**
（`python3 -> python3.12`，而 `python3.12` 不存在 —— 这台机器的 Python 只活在
`/root/KnowledgeDiver/.venv` 里）。`curl`、`wget` 也都没装。

所以脚本改成只用 **`awk` 做插入**（插入前先在本地对一份 mock 配置跑通、逐行核对缩进与 `$uri` 是否被误展开）、
用 **`nc` 发 `HTTP/1.0` 请求**做自测。可用工具只有 `awk / sed / perl / nc / busybox`。

权限：`chmod o+x /home/tc63`（让 `www-data` 能穿过家目录）+ `chmod -R o+rX /home/tc63/www`。

## 4. 日常更新

```bash
./deploy.sh              # 构建 + rsync + 修权限
./deploy.sh --no-build   # 只上传 dist/
```

## 5. 验证

| 项 | 结果 |
| --- | --- |
| 本地子路径构建 | `npm run build` 15 页；HTML 里链接全部 `/tc63/...`，`og:url` = `https://knowledgediver.cloud/tc63/` |
| 本地 `astro preview` | `/tc63/`、`/tc63/about/`、`/tc63/docs/`、`/tc63/docs/search-index.json`、`/tc63/images/*`、`/tc63/favicon.svg` 全部 200；`/` 返回 404（符合预期） |
| 无头浏览器巡检 | 首页 4 模块 + canvas 正常、项目详情图 `naturalWidth=1200`、文档区卡片与搜索索引路径正确、搜索「公式」命中 2 条且 href 带 `/tc63/`，**零 console 错误** |
| 服务器上传 | `/home/tc63/www/tc63/` 7.9 MB，`index.html` / `about/` / `docs/` / `projects/` / `_astro` / `images` / `fluid` 齐全，权限 `o+rX` |
| nginx 启用 | ✅ `nginx -t` 通过 → reload；配置备份 `knowledgediver.bak-20261007-020423` |
| 线上状态码（外网 curl） | `/` 200（KnowledgeDiver 未动）· `/tc63` **301 → /tc63/** · `/tc63/` 200 · `/tc63/about/` 200 · `/tc63/docs/` 200 · `/tc63/docs/search-index.json` 200 · `/tc63/favicon.svg` 200 · `/tc63/nope/` **404**（自定义 404 页） |
| 线上浏览器巡检 | 标题「终端 · 王宇翔」· 4 个模块 · 流体 canvas 正常 · `canonical` = `https://knowledgediver.cloud/tc63/` · 项目配图 `naturalWidth=1200` · 文档区 2 张卡 + 搜索索引 5 个文件 + 搜「公式」命中 2 条（href 带 `/tc63/`）· 404 页正常，**零 console 错误** |

### 权限说明（当时的实际情况）

`tc63` 一开始**不在 sudo 组**（sudo 组里只有 `ubuntu`，而 `ubuntu`/`root` 用给的密码都登不上）。
后来用户给 `tc63` 加了 sudo，于是用 `echo <密码> | sudo -S bash /home/tc63/www/enable-tc63.sh` 完成。
**建议事后把这条 sudo 权限收回，并改用 SSH key 登录。**

## 6. 备注 / 后续

- **tc63 没有 sudo**，所以 nginx 只能由 root 或 `ubuntu` 账号（sudo 组）执行；密码是明文给的，建议之后改成 SSH key 登录并把密码换掉
- 文档区现在带着两套示例内容（`示例领域` / `另一个领域`）会被一起发布；要干净上线就把它们移回 `docs/_template/` 再 `./deploy.sh`
- 域名根的 KnowledgeDiver 完全没动（只新增 location）
