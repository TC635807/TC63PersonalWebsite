#!/usr/bin/env bash
# ============================================================================
# 部署个人主页到 https://knowledgediver.cloud/tc63/
#
#   ./deploy.sh              # 构建 + 上传（默认）
#   ./deploy.sh --no-build   # 只上传现有 dist/
#
# 前置：
#   · 本机要能免密 ssh 到服务器（推荐 ssh-copy-id；没配 key 时会提示输密码）
#   · 服务器侧的一次性配置需要 root，只做一次：
#         sudo bash /home/tc63/www/enable-tc63.sh
#
# 可用环境变量覆盖：DEPLOY_HOST / DEPLOY_DEST
# ============================================================================
set -euo pipefail

HOST="${DEPLOY_HOST:-tc63@43.136.78.68}"
DEST="${DEPLOY_DEST:-/home/tc63/www/tc63/}"
cd "$(dirname "$0")"

if [ "${1:-}" != "--no-build" ]; then
  echo "==> 构建（astro.config.mjs 里 base=/tc63）"
  npm run build
fi

[ -f dist/index.html ] || { echo "dist/ 里没有 index.html，先跑 npm run build"; exit 1; }

echo "==> 上传 dist/ → $HOST:$DEST"
rsync -az --delete --info=stats1 dist/ "$HOST:$DEST"

echo "==> 修正权限（让 nginx 的 www-data 能读到家目录下的文件）"
ssh "$HOST" 'chmod o+x ~; chmod -R o+rX ~/www'

echo "==> 完成：https://knowledgediver.cloud/tc63/"
