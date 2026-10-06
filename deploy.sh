#!/usr/bin/env bash
# ============================================================================
# 部署个人主页到 https://knowledgediver.cloud/tc63/
#
#   ./deploy.sh              # 构建 → 提交（源码 + dist）→ push main → 服务器 git pull
#   ./deploy.sh --no-build   # 跳过构建（dist 已是想要的产物时）
#   ./deploy.sh --dry        # 只构建，不提交/不推送
#
# 工作方式（2026-10-07 起改成 git 流程）：
#   · 本地构建，dist/ 一起进 main —— 服务器因此不需要 node / node_modules
#   · 服务器 ~/site 是仓库克隆，~/www/tc63 是指向 ~/site/dist 的软链 → nginx 配置不用动
#   · 服务器侧只跑 ~/site/update.sh：git pull + 修权限（本脚本自动 ssh 执行）
#
# 可用环境变量覆盖：DEPLOY_HOST
# ============================================================================
set -euo pipefail

HOST="${DEPLOY_HOST:-tc63@43.136.78.68}"
# 本机 /etc/ssh/ssh_config.d/20-systemd-ssh-proxy.conf 权限异常会让 ssh 直接罢工；
# -F /dev/null 跳过系统配置（默认身份 ~/.ssh/id_ed25519 仍生效）
SSH="ssh -F /dev/null -o StrictHostKeyChecking=accept-new"

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

echo "==> 服务器更新（git pull）"
$SSH "$HOST" 'bash ~/site/update.sh'

echo
echo "==> 完成： https://knowledgediver.cloud/tc63/"
