# vlm-admittance 文档写作简报（本轮统一口径）

> 本文件是 `docs/36-VLM 机械臂抓取/` 六个单元的**统一口径与已核实事实**。
> 以 `_` 开头会被构建忽略，不会出现在站点上。
> 写之前先读 [文档撰写指南.md](./文档撰写指南.md) 的第 2、3 节，再读本文件。

## 0. 素材位置

源项目（只读，不要在源仓库里写任何东西）：

```
/home/tc63/mujoco/vlm_admittance/          # WSL 路径，公开仓库 github.com/TC635807/vlm-admittance
├── core/          # types.py config.py interfaces.py（冻结契约）
├── control/       # kinematics.py trajectory.py admittance.py motion.py
├── planning/      # collision.py rrt_connect.py planner.py
├── agent/         # state.py schema.py vlm_client.py loop.py taskplan.py
├── skills/        # library.py
├── sim/           # scene.py env.py render.py vision.py perception.py
├── tests/         # run_acceptance.py + 各专项回归
├── INTERFACES.md  # 模块契约（冻结版）
└── README.md      # 结果、已知问题、几点经验
```

读源码用 read / grep 工具，**不要**复制源仓库文件进本仓库。

## 1. 硬性风格要求（逐条执行）

1. **不写 `文件:行号`**。仓库在 commit `a366f1e` 全库删掉了 10,255 处行号引用，现行风格是
   写清「哪个文件的哪个函数/类、职责与返回」，必要时贴一段精简代码。指南第 3.1/3.3 节里的
   「附源码路径与行号」是旧口径，以现行文档为准：**路径写到文件名，方法写到函数名。**
2. 每篇 150–400 行；每篇 **至少 2 张 Mermaid**（`flowchart TD` / `sequenceDiagram` / `stateDiagram-v2`，
   节点标注用中文），禁止 ASCII/文字画图。
3. frontmatter 四字段：`title` / `summary` / `tags` / `updated: 2026-10-13`。
4. 加粗 `**` ≤ 10 处/篇；破折号 `——` ≤ 8 处/篇；`不是…而是` = 0；禁用词正文 0 处
   （陷阱/坑/体检/裸/翻车/地雷/手滑/摊开/一句话/值得/本章/本篇/其实/本质上/恰恰/真正…）。
   `陷阱` 只允许出现在「易错点与调试」这种小节标题里。
5. 代码块**必须标语言**；公式用 `$...$` / `$$...$$`（构建期 KaTeX）。
6. 小标题按本篇内容自拟，不要六篇共用「概念 / 机制与原理 / 落到本项目 / 小结」。
7. 事实只写源码里能核对的。推断、未实测、来自手册的内容要标注（「按手册」「属推断」「待实测」）。
8. 正文不出现第二人称「你」；用「需要……」「注意……」。
9. 文档里如果要引用站内作品页，写全 `/tc63/projects/...`；引用 GitHub 用完整 URL。
10. 文件命名用 `01-` 数字前缀；md 必须正好放在 `docs/<领域>/<单元>/` 这一层。

## 2. 领域与单元划分

领域：`docs/36-VLM 机械臂抓取/`（展示名「VLM 机械臂抓取」）

| 单元目录 | 负责 teammate | 覆盖的题目 |
| --- | --- | --- |
| `01-运动学与 DLS IK/` | kin-doc | 机械臂解算（正解/雅可比）、DLS IK 与零空间、位置伺服误差与任务空间积分 |
| `02-笛卡尔 min-jerk 轨迹/` | traj-doc | 笛卡尔 min-jerk 轨迹、四元数工具与 slerp、参考限速 |
| `03-六维导纳控制/` | adm-doc | 导纳控制方程、离散化与稳定性、柔顺档位、力看门狗 |
| `04-RRT-Connect 规划/` | rrt-doc | 关节空间碰撞检测、RRT-Connect、shortcut/densify、位姿规划 |
| `05-VLM 决策与子目标编排/` | vlm-doc | VLA 技术（多模态决策、function calling、闭环与复核） |
| `06-技能库与仿真集成/` | skill-doc | 技能库动作序列、纯视觉闭环、仿真场景与验收 |

每个文件的小标题自拟。单元内第一篇开头用一句话点明对应仓库与目录（例如「本文对应
`TC635807/vlm-admittance` 的 `control/`」），后续篇直接写相对路径，不重复介绍仓库。

## 3. 全局已核实事实

### 3.1 环境与模型

- Python 3.14 + MuJoCo 3.12 + numpy/scipy/pillow；离屏渲染要 `MUJOCO_GL=glfw`（WSL + WSLg）。
- 机器人：UR5e（Menagerie）+ Robotiq 2F85。用 `MjSpec.from_file` 读入，`arm.attach(grip, prefix="g_", site=arm.site("attachment_site"))` 挂法兰。
- 臂+夹爪装配的编译结果 `nq=nv=14`、`nu=7`、`neq=3`；TCP site = `g_pinch`；夹爪执行器 = `g_fingers_actuator`（ctrl 0..255）。**复核更正**：运行时场景在它之上再挂 N 个带 free joint 的物体，实测 `nq = 14 + 7N`、`nv = 14 + 6N`（默认 5 个物体时 `nq=49`、`nv=44`，`sim/test_env.py` 有断言），所以 `kin.jacobian()` 在有物体的场景下返回 `(6, 44)`。
- 6 个臂关节：`shoulder_pan_joint / shoulder_lift_joint / elbow_joint / wrist_1_joint / wrist_2_joint / wrist_3_joint`；`ARM_NDOF = 6`。
- `SIM_DT = 0.002`（500 Hz）；渲染 512×512；相机 `overview / wrist / top`。
- `ROBOT_BASE_POS = (0,0,0.40)`、`TABLE_HEIGHT = 0.40`。
- 关节限位：只有 elbow 是 ±3.1415，其余五关节 ±6.28319（`core/config.py` 的 `ARM_JOINT_LIMITS`）。
- `HOME_QPOS = [-1.5708, -1.5708, 1.5708, -1.5708, -1.5708, 0.0]`。
- 指间距按开合比例线性标定：ratio=1 → 93 mm，ratio=0 → 8.4 mm。
- `APPROACH_HEIGHT = 0.10`、`LIFT_HEIGHT = 0.12`；抓取成功要求抬升后物体 z 位移 > 0.02 m。
- `AGENT_MAX_STEPS = 12`。
- 场景物体 `size` 是**半尺寸**：`(0.02,0.02,0.02)` 是 40 mm 方块。默认场景是红/蓝/绿三个方块 + 托盘 + 黄色圆柱（`can_yellow`），日常场景是水瓶(cyan)与眼镜盒(black)。托盘 `is_container=True, graspable=False`。

### 3.2 运动学（`control/kinematics.py`）

- 私有 `MjData`：每次把 `env.data.qpos` 复制进来，只覆盖 6 个臂关节，跑 `mj_kinematics + mj_comPos`（不跑 `mj_forward`，因为 IK 内循环每步数千次）。绝不改 `env.data`（smoke 有断言）。
- FK 返回 TCP 世界位姿，四元数 **wxyz**。MuJoCo 3.12 的 MjData 没有 `site_xquat`，用 `mju_mat2Quat` 从 `site_xmat` 转。
- 雅可比 `(6, nv)` 世界系 = `[jacp; jacr]`（`mj_jacSite`），前 3 行平动、后 3 行转动；IK 只取臂关节列。
- DLS 更新式：`dq = Jᵀ(JJᵀ + λ²I)⁻¹e + (I − J⁺J)·k·(q_center − q)`；`e = [p_target − p; rotvec(q_target ⊗ q_cur*)]`，四元数误差走最短分支。
- 参数：`lam0 = 1e-3`，误差下降则 λ 减半、否则 ×4（上限 1e3 视为卡死）；`max_step = 0.25` rad/迭代；`nullspace_gain = 0.05`；`n_restarts = 6`；RNG `seed=0`；`max_iters = 300`；`tol = 1e-3`（位置 m 与姿态 rad 同时满足）。
- 种子：给了 `q0` 只做一次求解（热身，控制环每步调用才不慢）；`q0=None` 时用「当前关节角 + HOME + 6 次随机重启（限位内均匀采样与 HOME 附近 ±0.8 交替）」。
- 收敛失败返回 `ok=False`；调用方 `MotionRunner` 据此返回 `ik_fail`。
- 实测：IK 往返误差 0.38 mm / 4.9e-4 rad；`move_to_pose` 终态 0.98 mm。

### 3.3 位置伺服误差与任务空间积分外环（`control/motion.py`）

- Menagerie UR5e 位置执行器只是 PD，**没有重力补偿**。**复核更正**：前三个执行器 `kp=2000 / kv=400`，腕部三个是 `kp=500 / kv=100`（读模型实测），六个通道的 `kv/kp` 都等于 0.2 s，所以速度前馈系数不受分组影响：ctrl 固定 HOME 时 TCP 静沉约 11 mm；命令另一组关节角稳态静差约 14 mm。
- 单靠「IK → ctrl → step」满足不了验收的 <5 mm，所以加慢速任务空间积分外环：
  `e = [p_cmd − p_act; rotvec(q_cmd ⊗ q_act*)]`，`I ← clamp(I + gain·dt·e)`，`x_goal = p_cmd + I[:3]`，`quat_goal = exp(I[3:6]) ⊗ q_cmd`。
- 姿态修正必须**左乘（世界系）**；右乘（体坐标系）在参考姿态转动较大时收敛到错误固定点，实测残留 0.217 rad。
- 速度前馈：模型里 `kv/kp = −biasprm[2]/gainprm[0] = 0.2 s`；`qd_ref = J⁺[v_ref; w_ref]`；`q_cmd = q_ik + (kv/kp)·qd_ref`。轨迹中段最大误差 28 mm → 12 mm，收尾后 <1 mm。
- 收尾伺服：轨迹结束后继续按最终参考跑导纳+积分，直到平动误差 ≤ settle_tol 且姿态误差 ≤ settle_rot_tol，或到 settle_time（默认 1.5 s）。
- 所有 timeout 用**仿真时间**（steps × env.dt），不是墙钟。
- 错误码：`timeout | force_limit | ik_fail | unreachable | invalid_path`。目标位姿出发前先冷启动 IK 预检，失败判 `unreachable`。
- 中止即停住：任何非成功返回先把 6 个臂关节目标设成当前关节角并空步 `halt_steps`（默认 20）步。只改 ctrl 不 step 不够；实测不这么做时，一次失败的预检返回会让上一帧压入指令继续生效，0.2 s 内末端力冲到 7471 N。
- 力的独立硬上限 `force_limit_cap` 默认 200 N，外部传入更大的 force_limit 会被钳制并警告。
- 转动通道用「相对增量」：传给导纳的 `x_ref[3:6] = 0`，命令姿态 = `quat_ref ⊗ quat_from_rotvec(x_cmd[3:6])`，避开 ±π 附近的绝对旋转向量奇异。

### 3.4 笛卡尔轨迹（`control/trajectory.py`）

- `min_jerk(s) = 10s³ − 15s⁴ + 6s⁵`（源码写法 `s*s*s*(10 + s*(-15 + 6*s))`），输入钳制到 [0,1]；满足 s(0)=0、s(1)=1，速度与加速度两端为 0（C2 连续）。
- 位置 `p(s) = p0 + (p1 − p0)·min_jerk(s)`；姿态用**同一个 s** 做 slerp，位置与姿态同时启停。
- 四元数全部 wxyz。`quat_mul` 是 Hamilton 乘积，语义与 R(a)R(b) 一致。
- `slerp` 走最短弧：`dot(q0,q1) < 0` 先把 q1 取反；`d > 0.9995` 退化成线性插值 + 归一化（避免 sinθ₀→0 除零）。
- `rotvec_from_quat` 先把 w<0 的分支翻正，得到 |angle| ≤ π 的最短表示；角度接近 0 用 `2v` 一阶近似，避免 `v/|v|` 除零。
- `quat_from_rotvec` 小角同理用 `[1, 0.5v]` 一阶展开。
- `CartesianTrajectory`：`duration` 以 1e-9 兜底（防除零）；`sample(t)` 对 t 做钳制（t<0 取 0，t>duration 取 duration）；`length = ‖p1−p0‖`；`rot0/rot1` 都给才插值，只给 rot0 则恒定返回 rot0。
- `move_to_pose` 在 `duration=None` 时按 `clip(max(0.6, dist/0.15), 0.6, 6.0)` 估算。
- 接触段参考限速（方法 A，`_RateLimitedTraj`）：忽略 duration，`n = ceil(length/(v_max·dt))`，duration = n·dt，按同一归一化进度对姿态 slerp；**关闭速度前馈**（前馈是按 0.15 m/s 量级的超前项，接触段会把参考顶进接触面）。
- 真实刚性桌面 60 mm 下降的首触力标定（桌面 z=0.40、z_only、force_limit=3.0、起始 TCP z=0.45）：v_max=None 171.2 N｜0.016 28.36 N｜0.008 13.42 N｜0.004 6.58 N｜0.0035 4.88 N｜0.003 7.23 N｜0.0025 6.74 N｜0.002 3.44 N。总体随 v_max 下降（≥0.008 近似正比），≤0.004 之后受「接触落在哪一控制步」的相位影响有 ±3 N 离散，不是单调函数；要稳定 ≤5 N 需 v_max ≤ 0.002。
- `follow_joint_path`：折线细分 → 弧长 min-jerk 时间律 → 关节速度前馈 → 末端收尾；不做笛卡尔导纳。

### 3.5 导纳控制（`control/admittance.py`）

- 被控方程：`M·ẍ + D·ẋ + K·(x − x_ref) = −f_ext`。x 为 6 维「位置3 + 旋转向量3」，顺序 `[x,y,z,rx,ry,rz]`，世界系；`f_ext = [force(3), torque(3)]`。
- 离散用半隐式（symplectic）欧拉，先更新速度、再用新速度更新位置：
  `a_k = (−f_ext − D·v_k − K·(x_k − x_ref))/M`；`v_{k+1} = v_k + dt·a_k`；`x_{k+1} = x_k + dt·v_{k+1}`。
- 稳定性：无阻尼时特征多项式 `L² − (2 − dt²w²)L + 1 = 0`，`w = √(K/M)`，要求 `dt·√(K/M) < 2`（推荐 ≤0.5）。dt=0.002、K=5000、M=5 时比值约 0.063。超限只 `warnings.warn` 不抛错（避免打断控制环）。
- 单步修正限幅 `STEP_LIMITS = [0.05, 0.05, 0.05, 0.15, 0.15, 0.15]`（前 3 平动 m、后 3 转动 rad），按组取模长限幅；限幅后用 `delta/dt` 回算速度（抗积分饱和），否则速度继续累积、离开接触时爆冲。
- `axes[i] == 0` 的轴不做导纳：`x = x_ref`、速度清零，等价纯位置控制（z_only 就是这个用法）。`axes[i] == 1` 但 `m[i] ≤ 0` 视为配置非法，同样退化为跟随并给一次警告，绝不除零。
- 力符号严格按冻结方程取 `−f_ext`。sim 的 `contact_force_on_ee()` 返回的是**作用在 EE 上**的力（下压时 +z）；`MotionRunner` 里 `adm_force_sign = −1`，使 EE 沿 +f 方向让位。需要顺着力退让时在调用处取负。
- 档位（`core/types.py` 的 `ComplianceParams`）：
  - `stiff()`：k=5000、d=200、m=5、axes 全 0、force_limit=15 → 几乎不产生位置修正，等同纯位置控制。
  - `soft()`：k=[300,300,300,30,30,30]、d=[30,30,30,6,6,6]、m=[2,2,2,0.2,0.2,0.2]、axes 全 1、force_limit=8。
  - `z_only(k=200, d=25)`：k/d/m 只有 z 非零，axes=[0,0,1,0,0,0]，force_limit 默认 8。
  - `scaled(f)`：k×f、d×√f、m 不变，f 钳制 [0.01, 100]。
- 项目里另有三档专用：`PLACE_COMPLIANCE = z_only(k=120, d=20, force_limit=20)`；`GRASP_COMPLIANCE = z_only(k=200, d=25, force_limit=15)`；`PLACE_TOUCH_COMPLIANCE = z_only(k=120, d=20, force_limit=6)`。
- 抓取下降只用 z 向柔顺：全 6 维柔顺时接触反力把末端推横、指垫夹偏，30 mm 圆柱实测必失败。
- 验证口径：导纳阶跃稳态 = −f/k、不发散。
- 已知缺陷：`tests/test_target_overlay.py::test_injected_force_pure_compliance` 失败（外力 +z 时参考位移应为负，实测 +0.32），验收里唯一的红。

### 3.6 规划（`planning/`）

- 碰撞检测用私有临时 MjData：`data.qpos[:] = env.data.qpos`，只覆盖 6 个臂关节，`qvel` 清零，跑 `mj_forward`；不污染 `env.data`，且看到的是「当前场景」（物体已经落在哪儿就按哪儿算）。
- `ncon > 0` 不等于碰撞：只统计至少一个 geom 属于机器人（UR5e 本体 + 挂法兰的夹爪）的接触对；纯环境接触（物体压桌子）忽略。
- UR5e 的碰撞 geom 在 XML 里没有 name（只有 visual mesh 有名），所以忽略对同时支持 geom 名与 body 名；默认忽略「body 属于夹爪子树」的接触（夹爪内部 4 杆自接触、手指互插）。
- MuJoCo 默认 `filterparent=true`：同 body 内、父子 body 之间不生成接触；要担心的是非相邻连杆自碰撞。
- `min_penetration` 默认 0，即「只要有接触就算碰撞」。
- `is_state_valid` = 关节限位内（端点含）且无碰撞；`is_edge_valid` 默认 12 段采样。
- RRT-Connect（Kuffner & LaValle 2000）：双树 `tree_start`/`tree_goal`；每轮采样（goal_bias=0.1 直接取另一棵树的根，否则限位盒内均匀采样）→ EXTEND 当前树 → 成功则另一棵树 CONNECT 贪心连接 → 交换角色。
- 参数：`step_size = 0.15` rad、`max_iters = 4000`、`edge_resolution = 0.02`（每条边离散 2..64 段，比 is_edge_valid 默认 12 段更细，防止细障碍穿墙）、`connect_eps = 1e-9`。
- **每次 `plan()` 都按 seed 重新播种** `np.random.default_rng(seed)`，同 seed + 同查询完全可复现；只播种一次会让多次 plan 的结果漂移。
- 快路径：起点直连终点无障碍就直接返回两点，省掉整棵树。
- `shortcut(path, checker, iters=200, seed=0)`：随机取两点直连，能连就删中间节点，端点保持不变。
- `densify(path, max_step=0.05)`：每段线性插值切成 ≤ max_step 的小段，首尾严格等于原首尾。
- `JointPlanner`：`n_attempts = 3`（seed, seed+1, ...），每次重试换种子；`plan_pose` 用 20 个 IK 种子（首个是当前位形，第一枪给 `q0=None` 走多次随机重启，之后显式种子热身精化，约 0.3~2 ms）。
- `plan_pose` **不信任 ik 的 ok**：用 `kin.fk` 复核位置误差 < `pos_tol = 5 mm`；显式给了 quat 才额外检查姿态误差 < `rot_tol = 0.05` rad。quat=None 时 IK 欠约束，ok 可能因姿态误差置 False 而位置已达。
- 路径后处理后逐段 `is_edge_valid` 再复核一遍（防御性），任何一段非法就换下一个种子。
- 验收：`planning.smoke` 5 用例；`plan_pose` 误差 0.0000 m；绕障 0.12 s、挡板接触 0。
- 已知限制：规划只对「臂 + 夹爪」做碰撞检测，**不建模被夹着的物体**，所以 `--with-barrier` 场景下的抓放不可靠。

### 3.7 VLM / VLA（`agent/`）

- 两条环：慢环 0.5~2 Hz（事件触发）在 `agent/`；快环 500 Hz（每步 `mj_step`）在 `control/` + `planning/` + `skills/`。
- 每步数据流：`env.get_state()` + `env.render(camera)` → `build_messages` → `vlm.decide` → `validate_skill_call` → `executor(call)` → history 追加 `assistant(调用 JSON)` + `user(OBSERVATION_JSON)`。
- 结束条件：`skill == "stop"/"ask_user"`；同一 `skill + error_code` 连续失败 ≥2 次而 VLM 仍提议同一技能；不可重试错误码第 2 次出现；步数达 `max_steps`（默认 12）。
- 不可重试错误码：`home_blocked / stuck / object_disturbed / scene_reset`。
- 健壮性：渲染失败跳过该相机；VLM 抛异常记一条失败结果并结束；校验失败记 `invalid_call` 并继续（让模型看到原因自我纠正）；执行器抛异常记 `executor_exception`。
- 场景 JSON 只给物体 id / color / category / graspable / is_container / 尺寸等，**不含真值位姿**；文本块用 `SCENE_JSON_BEGIN`/`SCENE_JSON_END` 包住（MockVLM 靠它做确定性解析）。`include_poses=False` 是 no-oracle 模式。
- 图像：多相机 data URI（默认 JPEG q=85），不落盘；图像顺序固定 `sorted(images.keys())`，同一场景多次调用产生逐字节一致的消息。PIL 不可用时用标准库 zlib 手写最小 PNG 编码器兜底。
- 场景 JSON 必须显式 `float()/int()`：numpy 标量不是 JSON 可序列化类型。
- `VLMClient` 只用标准库 `urllib.request`（不引 openai SDK）；POST `{base_url}/chat/completions`，请求体含 `tools` + `tool_choice="auto"`；解析顺序：先 `message.tool_calls`，失败再从 `message.content` 括号平衡扫描抽 JSON（不少兼容端点把 function call 塞进 content）。
- 重试：`VLM_MAX_RETRIES = 4`（最多 5 次尝试）；退避 `(0.6, 1.5, 3.0, 5.0)` s；空回复时把 `max_tokens` 翻倍（上限 `VLM_MAX_TOKENS_CAP = 8192`）并追加一次强制工具调用提示；可重试 HTTP 状态码 408/425/429/500/502/503/504。
- 实机教训：旧实现靠中文子串判断「是否值得重试」，而 `decide()` 抛的两条消息都不匹配，导致空回复一次都不重试、任务直接死掉。现在每个 `VLMError` 都显式带 `retryable` 与 `error_code`。
- 默认端点 `https://dashscope.aliyuncs.com/compatible-mode/v1`、默认模型 `qwen-vl-max-latest`；`VLM_TIMEOUT` 默认 120 s（30 s 会被服务端掐断）、`VLM_MAX_TOKENS` 默认 1024。
- 凭据优先级：环境变量 > `config.local.json` > 内置默认；`VLM_*` / `OPENAI_*` / `AI_*` 三套别名；必须在 import 期填入（`core.config` 的常量是 import 时求值），绝不打印 key。
- `MockVLM`：确定性规则决策器，从 messages 文本反向解析 SCENE JSON 与历史 observation，按 pick → place 推进；接触力超阈值先 `set_compliance(soft)`；只依据 color / category / is_container / graspable，不硬编码具体 id。没有 key 时走同一条代码路径，CI 依赖它。
- 工具清单 14 个：`home, move_to, pick, place, push, open_gripper, close_gripper, set_compliance, stop, ask_user` + v2 控制面 `plan_subgoals, locate, subgoal_done, verify_subgoal`。`plan_subgoals` 只在规划阶段解析；`locate / subgoal_done` 由 AgentLoop 特判，不交给技能执行器。
- 参数处理：模型多塞的未知字段走**白名单过滤**并写进 reasoning（不直接报错）；`arguments` 兼容 JSON 字符串 / dict / 空串三种形态；校验顺序是「白名单 → 类型/范围 → 场景一致性」，失败信息具体到参数名。
- 子目标编排（`agent/taskplan.py`）：一条自然语言任务拆成有序 `SubGoal`（`goal_type ∈ place_in_container / place_on_top / place_at / pick / free`），每个子目标开一个**新的 AgentLoop epoch**，跑完由 `SubGoalVerifier` 用独立证据判定，不通过带上次失败原因重试，最多 `SUBGOAL_MAX_ATTEMPTS = 3` 次。
- 判定顺序（冻结）：`place_in_container → check_inside`；`place_on_top → check_stacked`；`pick → 技能 metrics 的 holding/grasp_gap_mm 优先，缺失则 check_gone(before, after)`；`place_at / free → 问 VLM 复核（confidence ≥ 0.6 才算 done）`。几何 ok 记 `evidence: "geometry"`，几何否/不确定降级到 VLM 复核，两者都否 `done=False`；任何异常一律 done=False，绝不上抛、绝不谎报成功。
- 信息隔离强制：不调用 `env.object_pose / set_object_pose`，不读 `state.objects[*].pose`；喂给复核 VLM 的 metrics 只保留白名单证据键，键名含 `pose/truth/oracle/position/xy/quat/qpos` 一律丢弃。
- 抓取验证按路径分级（`agent/loop.py` 的 `_verify_pick_grasp`）：开卷路径直接采信技能 `metrics.moved >= 0.02`（20 mm）并再做一次图像复核；无真值路径的主判据才是 top 相机的 `check_gone`（`after.area_px * 3 < before.area_px`，即面积掉到 1/3 以下），再加物理随动证据兜底与「夹的必须是目标物 / 腕部看不到目标色不放行」的反闸。腕部相机单独用是**近似恒真的假阳性**（夹爪停在物体上方也能看到上万像素），它只做诊断、兜底与反闸，诊断阈值 `WRIST_GRASP_MIN_AREA_PX = 1500`。
- 验收：`agent.smoke` 239 用例；`interactive_flows` 17 用例；`test_isolation_no_truth` 5 用例（该用例里 `object_pose` 一类真值接口直接抛异常，纯视觉闭环仍要跑通）。
- 端到端：`box_red` 抓起抬升 119.3 mm（峰值力 1.46 N）→ 放进托盘，落点偏差 0.5 mm。
- 真实端点实测（`AI_API_URL=https://ollama.com/v1` + `deepseek-v4.1-flash`）：`把红色方块放进托盘` → pick(box_red) → place(tray) → stop，11.9 s；绿色 9.1 s；`轻放进托盘` → 先 set_compliance(soft)，10.6 s。
- `tests/run_acceptance.py` 2026-10-12 实跑 **9/10 通过**，唯一失败是 `test_target_overlay` 的导纳让位方向用例。

### 3.8 技能库与仿真（`skills/`、`sim/`）

- 技能库每个技能 = 一段「规划 → 运动 → 抓取/放置 → 导纳 → 校验」的确定性流程；VLM 只选技能与参数，失败给结构化 `error_code` 让上层带信息重试。
- 自由段用刚性档，接触/抓取段用柔顺档。
- 抓取方向：2F85 的 TCP(`g_pinch`) 局部 +z 是接近轴（pinch 相对 base_mount 沿 +z 偏移 0.145），所以「从上往下抓」= 让 TCP 局部 +z 指向世界 −z；用 `mju_quatZ2Vec` 求姿态，再绕局部 z 转 yaw 选手指开合方向。
- 放置下降是 guarded move：不精确算高度，接触力到阈值即认为「碰到容器/桌面 = 到位」（`PLACE_TOUCH_COMPLIANCE` force_limit=6 N）。实测用 20 N 档下降先 21.6 N 中止、随后卡死、接触力 400~500 N。
- 撤退/脱身：`retreat` 的 force_limit 硬封顶 45 N；旧实现传 `1e9`，卡死时位置伺服+导纳积分正反馈，撤退期间 TCP 反而下沉、|F| 从 20 N 涨到 8437 N。
- 夹爪闭合量按物体宽度线性估算（ratio=1→93 mm，ratio=0→8.4 mm），没有接触力闭环。
- 接触力尺度大：位置执行器刚性压入时末端力能到 1e3 N，force_limit（8~20 N）很容易触发，所以接近段都用柔顺或慢速轨迹。
- `env.home()` 是裸瞬移；持物时调用会掉件，流水线里全部改成带载禁瞬移（返回 `home_blocked`），带载归位改走关节路径。瞬移兜底要求接触力接近 0 且夹爪已张开。
- `sim/vision.py`：相机标定与像素↔世界反投影；`sim/perception.py`：纯图像工具（颜色分割、blob、bbox 转世界、三角定位、check_inside/check_stacked/check_gone）。
- 场景构建的坑：`ur5e.xml` 的 base body 在世界原点，必须抬到 `ROBOT_BASE_POS`；不要用 `MjSpec.from_string` + attach 加 props，attach 之后子 spec 元素名会被加 `/` 前缀，`mj_name2id` 返回 −1；MuJoCo 相机沿自身局部 −z 轴看。
- 交互式下取图必须和 `viewer.sync()` 同锁：`Renderer` 会读 `data`，与主线程并发是数据竞争（实测 SIGABRT）。
- `--headless` 下面板照常出图（纯文件产出）。
- 已知问题：`can_yellow`（30 mm 细高圆柱）抓取不稳，2F85 指垫接触窗口窄，成败对末端下沉量敏感（位置伺服无重力补偿，随位形漂约 1 cm）；感知给的 z 不稳，`residual < 15 mm` 不是有效的可信度判据。

## 4. 交付与自检

每写完一个文件就地自检，全部写完后再跑一次：

```bash
DIR="docs/36-VLM 机械臂抓取/<你的单元>"
for f in "$DIR"/*.md; do
  printf "%-46s bold=%s dash=%s erShi=%s bad=%s lines=%s\n" "$(basename "$f")" \
    "$(grep -o '\*\*' "$f" | wc -l)" "$(grep -o '——' "$f" | wc -l)" \
    "$(grep -oE '不是[^。；]{0,30}而是' "$f" | wc -l)" \
    "$(grep -oE '陷阱|坑|体检|裸|翻车|地雷|手滑|摊开|一句话|值得|本章|本篇' "$f" | wc -l)" \
    "$(wc -l < "$f")"
done
node docs/_plan/check-mermaid.mjs "$DIR"
```

硬指标：加粗 ≤10/篇、破折号 ≤8/篇、`不是…而是` = 0、禁用词正文 0、每篇 ≥2 张 Mermaid、
每篇 150–400 行、`check-mermaid.mjs` 输出 `failed: 0`。

**不要跑 `npm run build`**（构建只由 Lead 跑，并发构建会互相覆盖 `dist/`）。

回报格式（直接返回文本，不用写额外文件）：

```
【单元】目录名
【文件】每篇一行：文件名 | 行数 | Mermaid 数 | 加粗数 | 破折号数
【引用】本单元引用到的源文件（相对仓库根）
【不确定项】标注为「按手册/属推断/待实测」的点
【冲突】发现「文档 vs 代码」不一致的地方
```
