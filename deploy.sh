#!/usr/bin/env bash
# ============================================================================
# 个人主页 · 本地这一侧：构建 + 提交 + push
#
#   ./deploy.sh              # 构建 → 提交（源码 + dist）→ push main
#   ./deploy.sh --no-build   # 跳过构建（dist 已是想要的产物）
#   ./deploy.sh --dry        # 只构建，不提交/不推送
#
# 这个脚本**只跟 GitHub 打交道，不碰服务器**。
# 服务器那一侧要你自己登录上去执行（一行命令）：
#
#     ssh tc63@43.136.78.68
#     ~/update-tc63.sh          # = cd ~/site && git pull && 修权限
#
# 分工：
#   · 本地构建，dist/ 一起进 main —— 服务器因此不需要 node / node_modules
#   · 服务器 ~/site 是仓库克隆，~/www/tc63 是指向 ~/site/dist 的软链（nginx 配置不用动）
# ============================================================================
set -euo pipefail

MODE="${1:-}"
cd "$(dirname "$0")"

if [ "$MODE" != "--no-build" ]; then
  echo "==> 构建（base 默认 /tc63）"
  npm run build
fi

[ -f dist/index.html ] || { echo "✗ dist/index.html 不存在，构建失败了？"; exit 1; }
if ! grep -q 'href="/tc63/' dist/index.html; then
  echo "⚠️ dist 里的链接不是 /tc63 前缀 —— 是不是用 SITE_BASE 构建过 Pages 版本？重新构建。"
  exit 1
fi

if [ "$MODE" = "--dry" ]; then
  echo "==> --dry：只构建，不提交"; exit 0
fi

echo "==> 提交（源码 + dist）"
git add -A
if git diff --cached --quiet; then
  echo "    （没有改动，跳过提交）"
else
  git commit -q -m "deploy: $(date '+%F %H:%M')"
  git log --oneline -1
fi

echo "==> push main"
git push origin main

echo
echo "==> 本地这边做完了。要上线，登录服务器跑一行："
echo "    ssh tc63@43.136.78.68 '~/update-tc63.sh'"
echo "    （或在服务器上直接执行 ~/update-tc63.sh）"
