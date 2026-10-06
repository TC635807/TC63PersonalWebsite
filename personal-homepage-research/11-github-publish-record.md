# 11 · 两个 RM 哨兵项目发布到 GitHub 记录

> 执行日期：**2026-10-06** ｜ 触发：用户要求「把本地 rm 机器人文件放到我名下新仓库 + 写好看的 README」

## 1. 结果

| 仓库 | 地址 | 首次提交 | 文件数 |
|---|---|---|---|
| 2026OmniSentryGimbal | https://github.com/TC635807/2026OmniSentryGimbal | `352fc3c` | 1341 |
| 2026OmniSentryChassis | https://github.com/TC635807/2026OmniSentryChassis | `7ed0fcf` | 1333 |

- **可见性：公开（public）** —— README 只有公开才有意义，且这两个项目本就要放到作品集里展示。
  要改回私有：仓库 Settings → General → Danger Zone → Change visibility，或用 API
  `PATCH /repos/TC635807/<repo> -d '{"private":true}'`
- 已加 topics：`robomaster`、`stm32f407`、`freertos`、`embedded`、`firmware`、`can-bus`、`cpp` + 各自特有项
- 两个 README 均已用 better-crawler 复核渲染正常（标题、徽章、表格都在）

## 2. 关键发现：本地版本比团队仓库落后约 3 个月

在动手前核对了本地与远端的历史，避免**覆盖队友的提交**：

| 仓库 | 本地 HEAD | 远端 `QianLi2027` 的 main | 差异 |
|---|---|---|---|
| Gimbal | `428f528` 2026-04-02（TC635807） | `7e2e941` 2026-07-06（ChaoPhone，大规模重构） | 本地**落后 3 个提交**，无本地独有提交 |
| Chassis | `121ea30` 2026-03-28（TC635807） | `121ea30`（同） | 完全同步 |

> 另：本地 remote 写的是 `QianLi2026`，实测该账号**已改名** → `QianLi2027`（GitHub 301 重定向证实）。

**决定**：按用户要求，「提交我本地版本即可」——**新建独立仓库**承载本地版本，**不触碰** `QianLi2027` 的团队仓库。
因此新仓库是**本地快照**，不含 7 月的团队重构；团队仓库仍是权威版本。

## 3. 发布前的密钥扫描（公开前的必做项）

扫描范围：两个项目工作区（排除 `build/`、`build_test/` 与 ST 驱动库），匹配
`password / secret / api_key / token / PRIVATE KEY / ssid / AKIA / ghp_ / xox` 等模式，并检查 `.env / .pem / .key / credentials` 类文件。

**结果：干净**。唯一命中是 `Communication/Inc/referee_decode.h` 里一行注释「0x0A06 对方干扰波密钥」——
那是 DJI 裁判系统协议的**字段名说明**，不是凭据。

## 4. 发布内容与排除项

- **包含**：源码（`Task/ Communication/ Algorithm/ PID/ BSP/ BMI088/ Message_Bus/ Debug_vars/ USB_DEVICE/ Chassis/ referee/ Core/`）、CubeMX 工程（`.ioc`）、
  `CMakeLists.txt` / `CMakePresets.json` / `cmake/` 工具链、`.vscode/`、仓库自带中文文档
- **排除**：`build/`（gimbal 84 MB、chassis 76 MB 编译产物）、`build_test/`、`.idea/`、`.git/`
- 新增 `.gitignore`（覆盖 build 产物与 IDE 缓存）
- 新增 `README.md`：项目定位、硬件构成、CAN 拓扑、模块表、串口协议字段表、编译烧录步骤、目录结构、限制与致谢（中英双语）

## 5. Token 处理

- 用户提供的 PAT **仅用于本次操作**，写入 `/tmp/.ghtok`（权限 600），结束后**已 shred 删除**
- 推送使用 `git -c url."https://x-access-token:$T@github.com/".insteadOf=...` ，**token 未写入任何 `.git/config`**
- 已确认项目文件与站点源码中没有 token 残留
- ⚠️ **token 出现在对话记录里，属于已暴露状态，建议到 GitHub Settings → Developer settings → Personal access tokens 撤销并重新签发**

## 6. 连带更新

作品集站点（仓库根目录）同步更新：这两个项目从「进行中 · 仓库暂未公开」改为**「已开源」**并接上 GitHub 链接，
`projects/index.astro` 的「有 N 个仓库目前是私有的」提示改为条件渲染（现在 5 个全部公开，提示不再出现）。
