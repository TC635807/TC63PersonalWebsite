#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
#  个人主页 · 一键启动脚本
#
#  ./start.sh              开发模式（热更新）   默认 http://localhost:4321
#  ./start.sh host         开发模式 + 局域网    手机/平板可访问，会打印局域网地址
#  ./start.sh preview      预览构建产物         先构建，再以静态方式预览（等价线上）
#  ./start.sh build        只构建到 dist/
#  ./start.sh stop         停掉占用该端口的服务
#  ./start.sh check        只做环境自检，不启动
#
#  -p, --port N   指定端口（也可用环境变量，例：PORT=5000 ./start.sh）
#  -h, --help     显示本说明
#
#  例：./start.sh host -p 5000
# ─────────────────────────────────────────────────────────────
set -euo pipefail

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

MODE="dev"
PORT="${PORT:-4321}"
HOST_FLAG=""
HOST_LABEL="仅本机"

c_ok()   { printf '\033[32m%s\033[0m\n' "$1"; }
c_warn() { printf '\033[33m%s\033[0m\n' "$1"; }
c_err()  { printf '\033[31m%s\033[0m\n' "$1"; }

usage() { sed -n '2,16p' "$0" | cut -c3-; }

while [ $# -gt 0 ]; do
  case "$1" in
    dev|preview|build|stop|check|host) MODE="$1"; shift ;;
    -p|--port) PORT="${2:-}"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) c_err "未知参数：$1"; echo; usage; exit 1 ;;
  esac
done

if [ "$MODE" = "host" ]; then
  MODE="dev"
  HOST_FLAG="--host"
  HOST_LABEL="局域网（手机可访问）"
fi

if ! [[ "$PORT" =~ ^[0-9]+$ ]] || [ "$PORT" -lt 1 ] || [ "$PORT" -gt 65535 ]; then
  c_err "端口不合法：$PORT"; exit 1
fi

# ── 1. 环境检查 ───────────────────────────────────────────────
if ! command -v node >/dev/null 2>&1; then
  c_err "没找到 node。请先安装 Node 22+（推荐 24）：https://nodejs.org/"
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  c_err "没找到 npm（通常随 Node 一起安装）"
  exit 1
fi

NODE_VER="$(node -v)"
NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [ "$NODE_MAJOR" -lt 22 ]; then
  c_err "当前 Node $NODE_VER，Astro 7 需要 >= 22.12。请升级 Node 后重试。"
  exit 1
fi

# ── 2. 端口占用查询 / stop ────────────────────────────────────
port_pid() {
  local p="$1" pid=""
  if command -v lsof >/dev/null 2>&1; then
    pid="$(lsof -tiTCP:"$p" -sTCP:LISTEN 2>/dev/null | head -1 || true)"
  fi
  if [ -z "$pid" ] && command -v ss >/dev/null 2>&1; then
    pid="$(ss -ltnp 2>/dev/null | awk -v p=":$p" '$4 ~ p {print $NF}' | grep -o 'pid=[0-9]*' | head -1 | cut -d= -f2 || true)"
  fi
  printf '%s' "$pid"
}

if [ "$MODE" = "stop" ]; then
  PID="$(port_pid "$PORT")"
  if [ -z "$PID" ]; then
    c_warn "端口 $PORT 上没有在监听的服务，无需停止。"
    exit 0
  fi
  CMDLINE="$(ps -p "$PID" -o args= 2>/dev/null || true)"
  case "$CMDLINE" in
    *astro*|*vite*|*node*)
      kill "$PID" 2>/dev/null || true
      sleep 1
      if [ -n "$(port_pid "$PORT")" ]; then
        c_warn "普通停止没生效，强制结束 PID $PID"
        kill -9 "$PID" 2>/dev/null || true
      fi
      c_ok "已停止端口 $PORT 上的服务（PID $PID）"
      ;;
    *)
      c_err "端口 $PORT 被另一个进程占用，不是本项目，未做处理："
      echo "  PID $PID  $CMDLINE"
      echo "  确认要停的话：kill $PID"
      exit 1
      ;;
  esac
  exit 0
fi

# ── 3. 依赖 ───────────────────────────────────────────────────
if [ ! -d node_modules ]; then
  c_warn "首次运行，正在安装依赖（约 25 秒）…"
  npm install --no-audit --no-fund
fi

# ── 4. 环境自检 ───────────────────────────────────────────────
echo
c_ok "环境 OK"
echo "  项目   $(basename "$PWD")"
echo "  Node   $NODE_VER"
if [ -f node_modules/astro/package.json ]; then
  echo "  Astro  v$(node -p "JSON.parse(require('fs').readFileSync('node_modules/astro/package.json','utf8')).version" 2>/dev/null || echo '?')"
fi
echo

if [ "$MODE" = "check" ]; then
  PID="$(port_pid "$PORT")"
  if [ -n "$PID" ]; then
    c_warn "端口 $PORT 已被占用（PID $PID）—— 启动时脚本会自动换到下一个空闲端口。"
  else
    c_ok "端口 $PORT 空闲"
  fi
  exit 0
fi

# ── 5. 构建 ───────────────────────────────────────────────────
if [ "$MODE" = "build" ]; then
  npm run build
  c_ok "构建完成 → dist/"
  exit 0
fi

if [ "$MODE" = "preview" ] && [ ! -d dist ]; then
  c_warn "还没有构建产物，先构建…"
  npm run build
fi

# ── 6. 找空闲端口 ─────────────────────────────────────────────
if [ -n "$(port_pid "$PORT")" ]; then
  c_warn "端口 $PORT 已被占用，自动往后找一个空闲端口…"
  FOUND=""
  for p in $(seq $((PORT + 1)) $((PORT + 30))); do
    if [ -z "$(port_pid "$p")" ]; then PORT="$p"; FOUND="1"; break; fi
  done
  if [ -z "$FOUND" ]; then
    c_err "从 $PORT 往后 30 个端口都被占用了，请手动指定：./start.sh -p 5555"
    exit 1
  fi
fi

# ── 7. 启动 ───────────────────────────────────────────────────
echo "─────────────────────────────────────────────"
c_ok "启动中…   模式：$MODE   访问范围：$HOST_LABEL"
echo "  本机访问   http://localhost:$PORT/"
if [ "$MODE" = "dev" ]; then
  echo "  热更新     改 src/ 下文件存盘即生效"
fi
echo "  停止       Ctrl+C，或另开终端跑 ./start.sh stop"
echo "─────────────────────────────────────────────"
echo

if [ "$MODE" = "preview" ]; then
  exec npm run preview -- --port "$PORT" $HOST_FLAG
else
  exec npm run dev -- --port "$PORT" $HOST_FLAG
fi
