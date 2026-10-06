source index for raw/metadata（task-5 / repo-verifier，采集日期 2026-10-05）

本目录文件的来源说明。所有 GitHub 元数据来自未认证 REST API：GET https://api.github.com/repos/{owner}/{repo}
（首次调用前 rate_limit: core remaining=48；原始响应逐仓库存档于 raw/ 子目录）

- github-repos.json —— 交付用的合并数组（35 条：31 个仓库的 API 响应 + 3 条改名后的仓库响应 + 1 条 404 记录）。
  每条都带 `_seed`（种子清单里的名字）与 `_http`（HTTP 状态码）；改名解析出的条目另有 `_note`。
- http-codes.txt —— 32 个种子一次性批量请求的 "seed http_code" 记录。
- raw/*.json —— 每个种子一次 GET 的原始响应体（未修改）。命名 owner_repo.json。
- raw/REDIRECT_wowchemy.json / REDIRECT_eleventy.json / REDIRECT_pagefind.json —— 三个 301 种子经
  GET https://api.github.com/repositories/{id} 解析后的当前仓库响应（id 取自 301 响应体的 url 字段）。
- raw/USER_michael-andreuzza.json —— GET https://api.github.com/users/michael-andreuzza/repos?per_page=100&sort=updated
- raw/LICENSE_withastro_astro.json —— GET https://api.github.com/repos/withastro/astro/license
- raw/LICENSE_sanity_template.json —— GET https://api.github.com/repos/sanity-io/template-nextjs-personal-website/license （404，即无 LICENSE 文件）
- raw/README_senli1073.json / raw/README_senli1073.md —— GET .../repos/senli1073/academic-homepage-template/readme（含 polyfill.io 安全提示与演示链接 https://senli1073.github.io/）
- raw/README_evanca.json / raw/README_evanca.md —— GET .../repos/evanca/quick-portfolio/readme（DISCONTINUED，无演示链接）
- homepage-status.tsv —— curl 状态码原始记录（tab 分隔：标签 / URL / 不跟随重定向 / 跟随重定向）
- picocss-pico.md、11ty-buildawesome.md、cloudcannon-pagefind.md —— better-crawler 渲染的 GitHub 仓库页正文
  （用于核对 pico 归档声明 "v2.1.1 is the final release" 与两处改名）。每份文件首行为原始 URL。

工具局限：raw.githubusercontent.com 在本机返回 000（不可达），因此 README/LICENSE 改用 GitHub API 端点获取。
