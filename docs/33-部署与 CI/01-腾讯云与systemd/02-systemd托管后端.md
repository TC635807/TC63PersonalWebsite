---
title: systemd 如何托管后端
summary: 从一份 unit 文件的三段结构读起，看懂 WorkingDirectory、Environment、ExecStart 与 Restart 各自约束什么，两个 service 文件的差异，以及日志与重启命令的实际用法
tags: [部署, systemd, unit, 日志, 进程托管]
updated: 2026-10-07
---

# systemd 如何托管后端

ssh 登上云主机，敲 `systemctl status knowledgediver`，屏幕上会给出一个 Main PID、一行 `active (running)` 和最近几条日志。这几项都由 systemd 根据 `deploy/knowledgediver.service` 这份十几行的配置文件托管出来，后端自己并不打印它们。没有 systemd，后端就只是一个挂在 ssh 会话上的前台进程：终端一关就退出，崩溃了也不会被拉起，更谈不上开机自启。和 `nohup`、`screen` 这类「把进程挂到后台」的做法相比，systemd 的差别在于它是声明式的：unit 描述的是期望状态（该跑什么、崩了怎么办），机器重启后它按这份描述重放；后台工具只保住当前这个进程，机器一关就没了。代价是要学 unit 的写法，收益是托管行为集中在一份可版本化的文件里。读懂这十几行，等于读懂了后端进程的目录、环境、启动命令与死亡后的行为。

unit 文件的三段结构对上 `ExecStart` 里的每个参数之后，仓库里两份长得不一样的 service 文件、日志与重启的实际命令，以及几个容易看错的地方都能串起来。

## 一份 unit 文件被 systemd 读成什么

unit 文件分成 `[Unit]`、`[Service]`、`[Install]` 三段。第一段描述"它是什么、什么时候可以启动"；第二段描述"怎么启动、失败怎么办"；第三段描述"开机时属于哪个 target"。

systemd 是 Linux 上的服务管理器，也是系统启动后由内核拉起的第一个进程；「拉起某个常驻程序、崩了按策略重拉、开机自启、把它的输出收进日志」这些活都归它管。描述「跑哪个程序、怎么跑」的配置文件叫 unit，服务类的扩展名是 `.service`。`deploy/knowledgediver.service` 全文只有十几行：

```ini
[Unit]
Description=KnowledgeDiver Backend
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/knowledgediver
Environment="PYTHONPATH=/opt/knowledgediver"
Environment="HF_ENDPOINT=https://hf-mirror.com"
ExecStart=/opt/knowledgediver/.venv/bin/uvicorn backend.main:app --host 127.0.0.1 --port 8000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

三段各管一件事：`[Unit]` 说它是什么、依赖谁；`[Service]` 是主体，说怎么启动、失败怎么办；`[Install]` 说 `systemctl enable` 时它挂到哪个启动目标上。

| 段 | 键 | 作用 |
| --- | --- | --- |
| Unit | `Description` | `systemctl status` 第一行显示的说明 |
| Unit | `After=network.target` | 网络就绪之后再启动 |
| Service | `Type=simple` | 启动命令就是主进程，不 fork |
| Service | `WorkingDirectory` | 进程的工作目录，相对路径的基准 |
| Service | `Environment` | 注入进程的环境变量，可写多行 |
| Service | `ExecStart` | 实际执行的命令行 |
| Service | `Restart=always` | 退出后总是重启 |
| Service | `RestartSec=5` | 两次重启之间等 5 秒 |
| Install | `WantedBy=multi-user.target` | 开机自启时的挂载点 |

`Type=simple` 是最常见的一种：systemd 认为 `ExecStart` 起来的进程就是服务本体，进程活着服务就是 running。uvicorn 不 fork 子进程，正好符合这个模型。

```mermaid
sequenceDiagram
  autonumber
  participant BOOT as systemd
  participant NET as network.target
  participant SVC as knowledgediver.service
  participant APP as uvicorn 进程
  BOOT->>NET: 等待网络就绪
  NET->>SVC: 满足 After 条件
  SVC->>SVC: 读取 WorkingDirectory 与 Environment
  SVC->>APP: 执行 ExecStart
  APP->>APP: 监听 127.0.0.1:8000
  SVC-->>BOOT: 状态变为 active (running)
```

## 逐行读 ExecStart 里的每个参数

脚本生成的启动命令是 `ExecStart=$APP_DIR/.venv/bin/uvicorn backend.main:app --host 127.0.0.1 --port 8000`。其中 `$APP_DIR/.venv/bin/uvicorn` 用的是虚拟环境里的解释器入口，而不是系统 `uvicorn`，这样后端依赖与系统 Python 隔离；`backend.main:app` 指向应用对象；后两个参数决定只监听本机 8000。

环境变量有三行，都由 `deploy/deploy.sh` 写进 unit：`PYTHONPATH` 让 `backend` 包可以被找到；`HF_ENDPOINT` 指向国内镜像，模型下载走它；`PLAYWRIGHT_BROWSERS_PATH` 指向项目内的浏览器目录。三行缺一行都会以某种功能失败的形式暴露出来，而不是启动失败。

```bash
# deploy/deploy.sh 第 6 步：把 unit 写到 /etc/systemd/system/（节选）
cat > /etc/systemd/system/knowledgediver.service << EOF
[Service]
WorkingDirectory=$APP_DIR
Environment="PYTHONPATH=$APP_DIR"
Environment="HF_ENDPOINT=https://hf-mirror.com"
Environment="PLAYWRIGHT_BROWSERS_PATH=$APP_DIR/.playwright"
ExecStart=$APP_DIR/.venv/bin/uvicorn backend.main:app --host 127.0.0.1 --port 8000
Restart=always
RestartSec=5
EOF
```

这里的 `$APP_DIR` 会在写入前被替换成脚本所在仓库的真实路径，所以换目录部署不用改脚本；留档版里写死的 `/opt/knowledgediver` 是那种情况的示例。三行环境变量各自解决一个问题：`PYTHONPATH` 是 Python 的模块搜索路径，不设它时从 `/etc/systemd/system` 启动的进程找不到项目的 `backend` 包（`backend.main:app` 直接 import 失败）；`HF_ENDPOINT` 是 HuggingFace 的下载入口，指向 `hf-mirror.com` 是为了国内拉模型不走直连；`PLAYWRIGHT_BROWSERS_PATH` 告诉 Playwright 去项目内的 `.playwright` 找浏览器。

## 两份 service 文件的差异

仓库里同时存在两份 unit：`deploy/knowledgediver.service` 是手写留档版，`deploy/deploy.sh` 里用 `cat > /etc/systemd/system/knowledgediver.service` 生成的是实际安装版。两者只有三处不同：

| 项 | 留档版 | 脚本生成版 |
| --- | --- | --- |
| 目录 | `/opt/knowledgediver`（写死在 `deploy/knowledgediver.service`） | `$APP_DIR`，即仓库根（由 `deploy/deploy.sh` 生成） |
| 浏览器路径 | 没有这一行 | 有 `PLAYWRIGHT_BROWSERS_PATH`，由 `deploy/deploy.sh` 生成 |
| 其余键 | 与生成版一致 | 与留档版一致 |

差异里最有后果的是浏览器路径。`server_start.sh` 里有一处专门检查了这一行：脚本里的 `export` 不会传进 systemd 服务，如果 unit 里没有 `PLAYWRIGHT_BROWSERS_PATH`，后端运行时找不到项目内的浏览器。留档版照抄安装会踩到这个点。

## 进程死掉之后会发生什么

`Restart=always` 与 `RestartSec=5` 决定了自愈行为：无论退出码是什么，systemd 都等 5 秒再拉起一次。写代码时如果启动即崩，`systemctl status` 会看到 PID 不断更换、日志里重复同一段报错，这种"每 5 秒一条"的节奏本身就是线索。

需要注意的是，反复重启不会无限试下去之外的额外保护：没有 `StartLimitIntervalSec` 的限制时，崩溃循环会持续。排查这类问题的顺序是先把 `Restart` 临时停掉，手动执行 `ExecStart` 的那条命令看报错，定位完再恢复。

```mermaid
stateDiagram-v2
  [*] --> inactive
  inactive --> active: systemctl start
  active --> failed: 进程非零退出
  failed --> active: Restart=always 等待 5 秒后拉起
  active --> inactive: systemctl stop
```

## 以前台身份运行意味着什么

两份 unit 都没有写 `User=`。system 级 unit 默认以 root 运行，这也是 `deploy.sh` 要求 `sudo` 的原因之一。以 root 运行的文件读写权限最宽松，但任何由接口触发的写操作也带着 root 的权限，部署脚本本身又要求用 root 执行，两者叠加之后权限问题的表现会变少、风险会变高。要收窄权限，需要补 `User=`、`Group=`，并把应用目录的属主改成对应的用户。

## 前端 service 与 nginx 的关系

`deploy/knowledgediver-frontend.service` 用 `npm run preview -- --host 127.0.0.1 --port 5173` 把构建产物再起一个预览服务。nginx 的配置里没有任何一行指向 5173，对外页面始终由 `dist` 目录直接提供。`server_start.sh` 里对前端的处理顺序也印证了这一点：它优先 `systemctl restart knowledgediver-frontend`，服务没装时退化成 `nohup npm run preview`。两条路都不会影响对外访问。

```ini
# deploy/knowledgediver-frontend.service（全文）
[Unit]
Description=KnowledgeDiver Frontend
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/knowledgediver/frontend
ExecStart=/usr/bin/npm run preview -- --host 127.0.0.1 --port 5173
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

它比后端 unit 还简单：就是一个常驻的 `npm run preview`，即 Vite 的静态预览服务器。它监听 5173 而不是 80/443，外面也没有任何转发指向它，所以重启它页面不会变化；留着它的意义只是本机也能用 systemd 的方式预览前端。

## 重启与看日志的命令

| 目的 | 命令 |
| --- | --- |
| 看状态与最近日志 | `systemctl status knowledgediver` |
| 实时跟日志 | `journalctl -u knowledgediver -f` |
| 只重启后端 | `systemctl restart knowledgediver` |
| 改过 unit 之后 | `systemctl daemon-reload` 再 restart |
| 开机自启 | `systemctl enable knowledgediver` |
| 临时停掉自愈 | 改 `Restart=no` 后 `daemon-reload` |

日志没有写到文件，而是进了 journal。`systemctl status` 只显示最后几行，追一次完整启动过程要用 `journalctl -u knowledgediver --since "10 min ago"`。命令里的 `-u` 表示只看这个 unit 的日志，`-f` 表示持续跟随新输出，作用相当于日志版的 `tail -f`。

改完 unit 之后容易漏掉 `daemon-reload`：systemd 启动时把 unit 文件读进内存，之后一直使用内存里的那一份；磁盘上的文件改了却不 reload，`restart` 用的仍是旧配置。

## 常见判断偏差

| # | 判断偏差 | 表现 | 依据 |
| --- | --- | --- | --- |
| 1 | 认为服务日志写在项目目录 | 找遍目录看不到日志文件 | 没有配置 `StandardOutput`，输出进 journal |
| 2 | 改完 unit 直接 restart | 新配置没生效 | 需要先 `daemon-reload` |
| 3 | 用系统 `uvicorn` 复现 | 手动能跑、服务报模块缺失 | 服务用的是 `.venv` 里的解释器 |
| 4 | 把浏览器路径 export 在 shell 里 | 手动跑抓取正常、服务里失败 | shell 环境不传给 systemd |
| 5 | 把前端 service 当成对外入口 | 重启它却发现页面没变 | nginx 读的是 `dist`，不是 5173 |
| 6 | 崩溃循环时只看最后一行日志 | 分不清是启动失败还是依赖缺失 | 重复的 5 秒节奏说明在反复重启 |

## 小结

### 核心概念

- unit 分 `[Unit]`、`[Service]`、`[Install]` 三段，分别回答是什么、怎么跑、开机挂在哪。
- `Type=simple` 下 `ExecStart` 的进程就是服务本体，`WorkingDirectory` 决定相对路径的基准。
- 三行 `Environment` 分别管模块导入路径、模型下载镜像与浏览器目录。
- `Restart=always` 加 `RestartSec=5` 构成自愈，同时也会掩盖崩溃循环。
- 两份 service 的差异只在目录与浏览器路径，后者缺了会让抓取功能失败。
- 日志在 journal 里，`journalctl -u knowledgediver` 是主要入口。

### 设计权衡

| 权衡点 | 本工程的选择 | 收益与代价 |
| --- | --- | --- |
| 进程模型 | `Type=simple` 直接跑 uvicorn | 配置最少、日志直接；代价是没有多进程与平滑重启 |
| 运行身份 | 不写 `User=`，以 root 运行 | 免去权限排查；代价是应用侧写操作权限过大 |
| 环境注入 | 写死在 unit 的 `Environment` | 与 systemd 解耦、直观；代价是改配置要 `daemon-reload` |
| 前端形态 | 静态文件交给 nginx，同时留一个预览 service | 本机预览方便；代价是多一个空转进程与一处易误判的分支 |
| 自愈 | `always` 加固定 5 秒 | 偶发崩溃自动恢复；代价是持续崩溃时反复拉起 |

## 练习

### 基础题

1. 写出 unit 文件三段各自的职责，并指出 `After=network.target` 属于哪一段。
2. 解释 `WorkingDirectory` 与 `ExecStart` 里解释器路径之间的关系，换目录部署时为什么要同时改。
3. `PLAYWRIGHT_BROWSERS_PATH` 为什么必须在 unit 里写一遍，即使部署脚本里已经 export 过？
4. 用两条命令分别查看服务状态与实时日志。

### 挑战题

5. 把后端改成以专用用户运行：列出需要新增的 unit 键、目录属主调整与验证步骤。
6. 设计一次"启动即崩"的定位流程：写出如何临时停掉自愈、如何手动复现 `ExecStart`、如何判断是依赖缺失还是配置错误。
7. 两份 service 文件合并成一份（用 `EnvironmentFile` 承载路径）有哪些好处与代价？
8. 线上 nginx 重启后接口 502，但服务状态是 active，写出三条能区分"进程活着但没监听""监听了但 nginx 指错端口""代理配置未加载"的命令。

## 附：本页引用的路径

| 路径 | 用途 |
| --- | --- |
| `/mnt/d/KnowledgeDiver/deploy/knowledgediver.service` | 留档版后端 unit：三段结构与 `/opt` 目录 |
| `/mnt/d/KnowledgeDiver/deploy/knowledgediver-frontend.service` | 前端预览 unit 与 5173 端口 |
| `/mnt/d/KnowledgeDiver/deploy/deploy.sh` | 实际安装的 unit 生成段（目录、环境变量、启动命令） |
| `/mnt/d/KnowledgeDiver/server_start.sh` | 浏览器路径检查与前端重启的两条分支 |
| `/mnt/d/KnowledgeDiver/deploy/nginx.conf` | 静态目录与 `/api/` 代理，证明 5173 未被使用 |
