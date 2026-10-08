---
title: GPIO 模式与复用
summary: HAL_GPIO_Init 把方向、输出类型、速度、上下拉与复用编号写进哪几个寄存器，以及本工程复用引脚、输出引脚与中断引脚的完整配置清单。
tags: [STM32F407, HAL, GPIO, 复用功能, EXTI, 哨兵固件]
updated: 2026-10-07
---

# GPIO 模式与复用

引脚在复位后默认是浮空输入（`MODER` 为 `00`），调试口占用的 PA13 至 PA15 与 PB3 与 PB4 例外，它们复位即为复用模式。未配置的引脚既不驱动输出也读不到有效电平。`MX_GPIO_Init()` 与各外设的 `HAL_xxx_MspInit()` 把用到的引脚逐个配置成输出、复用或中断输入。

配置字段只有六个：方向、输出类型、速度、上下拉、复用编号、初始电平。按 `HAL_GPIO_Init()` 的写入顺序，可以看出这六个字段落到哪些寄存器；再对照两块板实际用到的模式。两块板的引脚配置完全相同，因此清单对云台板与底盘板通用。

## 源码索引

路径相对固件仓库根目录；云台板 `/home/wyx/rm/2026SentriOmeniGimbal/2026OmniSentryGimbal`，底盘板 `/home/wyx/rm/2026SentriOmeniChassis/2026OmniSentryChassis`。

| 文件 | 作用 |
| --- | --- |
| `Core/Src/gpio.c` | 端口时钟使能与纯 GPIO 配置 |
| `Core/Src/stm32f4xx_hal_msp.c` | `HAL_MspInit()`，SYSCFG 与 PWR 时钟 |
| `Core/Src/can.c`、`usart.c`、`spi.c`、`i2c.c`、`tim.c` | 各外设的 GPIO 复用配置 |
| `USB_DEVICE/Target/usbd_conf.c` | USB OTG FS 的 PA11 与 PA12 |
| `Drivers/STM32F4xx_HAL_Driver/Src/stm32f4xx_hal_gpio.c` | `HAL_GPIO_Init()` 的实现 |
| `BMI088/Src/BMI088.cpp` | 片选引脚的使用者 |

## 六个字段分别写哪个寄存器

- 端口与引脚：GPIOA 至 GPIOH，每个端口 16 个引脚。端口时钟挂在 AHB1，由 `RCC->AHB1ENR` 的 `GPIOxEN` 位门控。
- 配置寄存器：`GPIOx_MODER`（方向）、`GPIOx_OTYPER`（推挽或开漏）、`GPIOx_OSPEEDR`（压摆率）、`GPIOx_PUPDR`（上下拉）、`GPIOx_AFRL` 与 `GPIOx_AFRH`（复用编号）。
- 数据寄存器：`GPIOx_IDR` 读引脚电平，`GPIOx_ODR` 写输出电平。
- 复用（Alternate Function，AF）：每个引脚有 16 个可选功能，编号 0 至 15。`AFRL` 管 0 至 7 号引脚，`AFRH` 管 8 至 15 号引脚，每个引脚占 4 bit。
- 原子置位：`GPIOx_BSRR` 用一次写操作置位或复位单个引脚，不需要读改写，中断里改引脚不会破坏同端口其他位的电平。

六个字段里只有方向与复用编号是互斥的：配成复用之后，`AFRL`/`AFRH` 的编号才有意义；配成普通输出时这两个寄存器里的值被忽略。

## HAL_GPIO_Init 的写入顺序

`HAL_GPIO_Init()` 从 `Drivers/STM32F4xx_HAL_Driver/Src/stm32f4xx_hal_gpio.c:164` 开始，按固定顺序写寄存器：

1. 速度。读 `OSPEEDR` 的 2 bit，按 `GPIO_InitStruct.Speed` 写入（第 194 至 197 行）。
2. 输出类型。读 `OTYPER` 的 1 bit，按 `Mode` 是否含 `GPIO_MODE_OUTPUT_OD` 或 `GPIO_MODE_AF_OD` 决定推挽还是开漏（第 200 至 203 行）。
3. 上下拉。读 `PUPDR` 的 2 bit，写入 `GPIO_NOPULL`、`GPIO_PULLUP` 或 `GPIO_PULLDOWN`（第 212 至 215 行）。
4. 复用编号。写 `AFR[position >> 3]`，位置由引脚号决定，值取 `GPIO_InitStruct.Alternate` 的低 4 bit（第 224 至 227 行）。
5. 方向。最后写 `MODER` 的 2 bit（第 231 至 234 行）。输入对应 `0b00`，输出对应 `0b01`，复用对应 `0b10`，模拟对应 `0b11`。
6. 中断线。若 `Mode` 含 `EXTI_MODE`，先使能 SYSCFG 时钟，再写 `SYSCFG->EXTICR` 选择端口（第 240 至 246 行），然后按触发方向写 `EXTI->RTSR` 与 `EXTI->FTSR`，最后写 `EXTI->IMR` 开放该线的中断请求（第 249 至 280 行）。

方向放在复用编号之后写，是为了让引脚在速度与上下拉就位之前不切到复用输出，避免配置期间输出一段无效波形。中断线只配到 SYSCFG 与 EXTI 两级，NVIC 的使能必须另外调用 `HAL_NVIC_EnableIRQ(EXTIx_IRQn)`。

```mermaid
flowchart TD
    A["HAL_GPIO_Init 入口"] --> B["端口时钟须已使能<br/>由 MspInit 或 gpio.c 打开"]
    B --> C["写 OSPEEDR 速度"]
    C --> D["写 OTYPER 推挽或开漏"]
    D --> E["写 PUPDR 上下拉"]
    E --> F["写 AFRL 或 AFRH 复用编号"]
    F --> G["写 MODER 方向"]
    G --> H{"Mode 是否含 EXTI_MODE"}
    H -->|是| I["开 SYSCFG 时钟<br/>写 EXTICR 选择端口"]
    I --> J["写 RTSR 与 FTSR 触发方向<br/>写 IMR 开放中断请求"]
    H -->|否| K["返回"]
    J --> L["NVIC 使能须单独调用<br/>HAL_NVIC_EnableIRQ"]
```

## 引脚状态之间怎么切换

配置不是一次性的：同一个引脚可以在启动阶段先做输出，随后被 MspInit 改成复用，调试时也可能被 `HAL_GPIO_DeInit()` 复位回输入。

```mermaid
stateDiagram-v2
    state "复位默认 输入模式 MODER 00" as Input
    state "输出 MODER 01 推挽或开漏" as Output
    state "复用 MODER 10 加 AFRL 或 AFRH" as Alternate
    state "中断输入 含 EXTI_MODE" as Exti
    [*] --> Input
    Input --> Output : HAL_GPIO_Init 输出模式
    Input --> Alternate : HAL_GPIO_Init 复用模式
    Input --> Exti : HAL_GPIO_Init 中断模式
    Output --> Alternate : 再次调用 HAL_GPIO_Init
    Alternate --> Output : 再次调用 HAL_GPIO_Init
    Exti --> Input : HAL_GPIO_DeInit 清 IMR 与 RTSR
    Output --> Input : HAL_GPIO_DeInit
    Alternate --> Input : HAL_GPIO_DeInit
```

状态图里没有从复用直接回到输入之外的路径：`HAL_GPIO_DeInit()` 会把该引脚的全部配置位清零，包括上下拉与复用编号，回到与复位相同的状态。

## 本项目用到的全部引脚

下表列出云台板的全部非虚拟引脚：

| 引脚 | 模式 | 输出类型 | 速度 | 上下拉 | 复用编号 | 配置位置 |
| --- | --- | --- | --- | --- | --- | --- |
| PD0、PD1 | 复用 | 推挽 | 很高 | 无 | AF9 | `Core/Src/can.c:117-122` |
| PB5、PB6 | 复用 | 推挽 | 很高 | 无 | AF9 | `Core/Src/can.c:150-155` |
| PC11、PC10 | 复用 | 推挽 | 很高 | 无 | AF7 | `Core/Src/usart.c:171-176` |
| PA9、PB7 | 复用 | 推挽 | 很高 | 无 | AF7 | `Core/Src/usart.c:140-152` |
| PG14、PG9 | 复用 | 推挽 | 很高 | 无 | AF8 | `Core/Src/usart.c:217-222` |
| PB4、PB3、PA7 | 复用 | 推挽 | 很高 | 无 | AF5 | `Core/Src/spi.c:83-95` |
| PC9、PH7 | 复用 | 开漏 | 很高 | 无 | AF4 | `Core/Src/i2c.c:75-87` |
| PA11、PA12 | 复用 | 推挽 | 很高 | 无 | AF10 | `USB_DEVICE/Target/usbd_conf.c:83-88` |
| PF6 | 复用 | 推挽 | 低 | 无 | AF3 | `Core/Src/tim.c:104-109` |
| PA4、PB0 | 输出 | 推挽 | 低 | 无 | 未使用 | `Core/Src/gpio.c:94-106` |
| PG6、PH11 | 输出 | 推挽 | 低 | 无 | 未使用 | `Core/Src/gpio.c:68-86` |
| PG3 | 中断 | 未使用 | 未设置 | 上拉 | 未使用 | `Core/Src/gpio.c:75-79` |
| PA0 | 中断 | 未使用 | 未设置 | 上拉 | 未使用 | `Core/Src/gpio.c:88-92` |
| PH0、PH1 | 复位默认 | 代码不配置 | 代码不配置 | 代码不配置 | 未使用 | HSE 使能后由振荡器电路使用 |
| PA13、PA14 | 复用 | 推挽 | 很高 | 上拉 | AF0 | 由调试端口默认配置 |

表里 15 行覆盖了 20 个引脚。按模式统计：复用 14 个、普通输出 4 个、中断输入 2 个；速度只有两档，复用一律很高，输出一律低。复用的 14 个引脚分布在 AF3 到 AF10 八个编号上，没有两个功能共用同一个编号。

## 片选、定时器通道与开漏三处细节

片选引脚由 GPIO 层配置，不由驱动配置。`Core/Src/gpio.c:63` 与 `:66` 在配置成输出之前先把 ODR 写成高电平，保证 SPI 通信开始前 PA4 与 PB0 已经是高电平的空闲状态。驱动只负责拉低与拉高，配置见 `BMI088/Src/BMI088.cpp:181-193`，引脚编号在 `:343-345` 传入构造函数。把 `HAL_GPIO_WritePin()` 移到 `HAL_GPIO_Init()` 之后，片选会先出现一段低电平。

PF6 的配置不在 `gpio.c` 里，而在 `HAL_TIM_MspPostInit()`（`Core/Src/tim.c:90-116`）。CubeMX 把带引脚的定时器通道单独生成到 post-init 函数，由 `MX_TIM10_Init()` 末尾第 67 行调用。查找定时器通道引脚时，只看 `gpio.c` 会漏掉它。

I2C3 用开漏加外部上拉。`Core/Src/i2c.c:77` 与 `:84` 都写 `GPIO_NOPULL`，片内上下拉不使能，400 kHz 总线的上拉电阻在板上。把这里改成 `GPIO_PULLUP` 不会提高总线质量，只会叠加一组弱上拉。

速度分两档。所有复用引脚用 `GPIO_SPEED_FREQ_VERY_HIGH`，纯输出与 TIM10 通道用 `GPIO_SPEED_FREQ_LOW`。加热 PWM 的边沿速率不影响控制精度，低速档可以少一些开关噪声。

## 静默失效与其它常见判断偏差

端口时钟未开导致静默失效。`HAL_GPIO_Init()` 返回 `void`，端口时钟未使能时寄存器写入被丢弃，不产生错误码。引脚停在复位默认的浮空输入状态，现象是既读不到有效电平也没有输出。检查时应先读回 `GPIOx_MODER` 确认。

| # | 判断偏差 | 表现 | 依据 |
| --- | --- | --- | --- |
| 1 | 认为端口时钟未开会报错 | `HAL_GPIO_Init()` 返回 `void` | `stm32f4xx_hal_gpio.c:164` |
| 2 | 复用编号按引脚号顺序排 | `AFRH` 管 8 至 15 号，`AFRL` 管 0 至 7 号 | `:224-227` |
| 3 | 认为方向在复用编号之前写 | 顺序相反，先写编号后写方向 | `:231-234` |
| 4 | 认为 `HAL_GPIO_Init()` 会开 NVIC | 需单独调用 `HAL_NVIC_EnableIRQ()` | `:249-280` |
| 5 | 同一引脚被两处配置 | 后写覆盖先写，`main.c:110` 之后各 MspInit 依次执行 | 调用顺序 |
| 6 | 认为 EXTI 配了就会触发 | PA0 与 PG3 未使能 NVIC，也无服务函数与回调 | 工程内无实现 |
| 7 | 片选初值写在 `HAL_GPIO_Init()` 之后 | 首次 SPI 事务偶发读回全零 | `gpio.c:63`、`:66` |
| 8 | 给 I2C 加片内上拉 | 与板上电阻并联，边沿变缓 | `i2c.c:77`、`:84` |
| 9 | 在 `gpio.c` 里找 PF6 | 它在 `HAL_TIM_MspPostInit()` | `tim.c:90-116` |

第三行与第五行合起来说明同一件事：配置结果取决于最后一次写入，而写入顺序由调用顺序决定。查找引脚冲突时应当按调用顺序核对，而不是只看一个文件。

## 用寄存器读回验证配置

因为 `HAL_GPIO_Init()` 不返回状态，验证只能靠读回寄存器：

| 检查项 | 寄存器 | 期望值 |
| --- | --- | --- |
| 方向 | `MODER` | 复用引脚 0b10，输出引脚 0b01，中断引脚 0b00 |
| 输出类型 | `OTYPER` | 只有 I2C3 的 PC9 与 PH7 两位为 0b1 |
| 上下拉 | `PUPDR` | PG3 与 PA0 为 0b01，其余为 0b00 |
| 复用编号 | `AFRL` 与 `AFRH` | 按引脚表逐个核对 |
| 中断开放 | `EXTI->IMR` | PA0 与 PG3 对应的位为 1 |

五张表项覆盖了六个配置字段中的五个，剩下的初始电平看 `ODR`。读回值与期望不符时，先查 `RCC->AHB1ENR` 里对应端口的使能位，再查是否有后执行的初始化覆盖了这次写入。

## 小结

### 核心概念

- 引脚复位默认是浮空输入（`MODER` 为 `00`），调试口相关的 PA13、PA14、PA15 与 PB3、PB4 复位即为复用模式；`MX_GPIO_Init()` 与各 MspInit 负责把用到的引脚改成输出、复用或中断输入。
- 六个配置字段分别写 `OSPEEDR`、`OTYPER`、`PUPDR`、`AFRL` 与 `AFRH`、`MODER`，中断模式还要写 `SYSCFG->EXTICR` 与 `EXTI->IMR/RTSR/FTSR`。
- `HAL_GPIO_Init()` 的写入顺序是速度、输出类型、上下拉、复用编号、方向、中断线，顺序本身有作用。
- NVIC 的使能不在 `HAL_GPIO_Init()` 内，要单独调用 `HAL_NVIC_EnableIRQ()`。
- `GPIOx_BSRR` 提供原子置位，中断里改引脚安全。
- 本工程复用引脚统一用 `GPIO_SPEED_FREQ_VERY_HIGH`，纯输出用 LOW；I2C3 用开漏且不启用片内上下拉。
- TIM10 的 PF6 配置在 `HAL_TIM_MspPostInit()`，不在 `gpio.c`。

### 设计权衡

| 选择 | 本工程取值 | 代价与收益 |
| --- | --- | --- |
| 复用引脚速度 | 很高 | 边沿陡，满足 CAN 与 SPI 时序；代价是开关噪声略高 |
| 输出引脚速度 | 低 | 噪声低；片选与加热使能不需要快速边沿 |
| I2C 输出类型 | 开漏 | I2C 电气规范要求；代价是必须依赖板上上拉电阻 |
| I2C 上下拉 | 不启用片内 | 避免与板上电阻并联；代价是板上电阻缺失时总线无上拉 |
| 中断引脚上下拉 | 上拉 | 悬空时电平确定；代价是与外部上拉并联 |
| 片选初值位置 | 配置之前写 | 空闲电平从第一刻起正确；代价是代码顺序不能随意调整 |

## 练习

### 基础题

1. 写出 `GPIO_InitStruct.Mode` 取 `GPIO_MODE_AF_PP` 时 `MODER` 对应引脚两位的取值，以及 `OTYPER` 对应位的取值。
2. 说明 `HAL_GPIO_Init()` 为什么要先写 `AFRL/AFRH` 再写 `MODER`。
3. 计算把 CAN2 的 PB5、PB6 复用编号从 AF9 写成 AF7 的后果（提示：查 STM32F407 数据手册的复用功能表）。
4. 按表统计本工程复用引脚用到的 AF 编号，说明为什么不能把两个功能配到同一编号。

### 挑战题

5. 说明 `GPIOx_BSRR` 与直接写 `GPIOx_ODR` 在中断上下文里的差异，并指出本工程里哪些代码属于后者。
6. 写出为一个新的 EXTI 引脚补齐中断所需的全部步骤，从 `.ioc` 配置一直列到中断服务函数。
7. 说明把 PA4 改成 `GPIO_MODE_OUTPUT_OD` 后 BMI088 通信是否仍然可用，以及需要什么外部条件。
8. 已知 `HAL_GPIO_Init()` 不返回状态。设计一种在启动阶段检查端口时钟是否使能的办法。

## 附：本页引用的固件路径

| 路径 | 用途 |
| --- | --- |
| `/home/wyx/rm/2026SentriOmeniGimbal/2026OmniSentryGimbal/Core/Src/gpio.c` | 片选初值（:63、:66）、输出引脚（:68-86、:94-106）、中断引脚（:75-79、:88-92） |
| `/home/wyx/rm/2026SentriOmeniGimbal/2026OmniSentryGimbal/Core/Src/can.c` | CAN1 与 CAN2 复用配置（:117-122、:150-155） |
| `/home/wyx/rm/2026SentriOmeniGimbal/2026OmniSentryGimbal/Core/Src/usart.c` | USART1、USART3、USART6 复用配置（:140-152、:171-176、:217-222） |
| `/home/wyx/rm/2026SentriOmeniGimbal/2026OmniSentryGimbal/Core/Src/spi.c` | SPI1 复用配置（:83-95） |
| `/home/wyx/rm/2026SentriOmeniGimbal/2026OmniSentryGimbal/Core/Src/i2c.c` | I2C3 开漏与上下拉（:75-87、:77、:84） |
| `/home/wyx/rm/2026SentriOmeniGimbal/2026OmniSentryGimbal/Core/Src/tim.c` | TIM10 通道引脚（:67、:90-116）与配置（:104-109） |
| `/home/wyx/rm/2026SentriOmeniGimbal/2026OmniSentryGimbal/USB_DEVICE/Target/usbd_conf.c` | USB OTG FS 引脚（:83-88） |
| `/home/wyx/rm/2026SentriOmeniGimbal/2026OmniSentryGimbal/BMI088/Src/BMI088.cpp` | 片选使用（:181-193）与引脚编号传入（:343-345） |
| `/home/wyx/rm/2026SentriOmeniGimbal/2026OmniSentryGimbal/Core/Src/main.c` | `MX_GPIO_Init()` 调用顺序（:110） |
| `/home/wyx/rm/2026SentriOmeniGimbal/2026OmniSentryGimbal/Drivers/STM32F4xx_HAL_Driver/Src/stm32f4xx_hal_gpio.c` | `HAL_GPIO_Init()` 全部写入（:164、:194-197、:200-203、:212-215、:224-227、:231-234、:240-246、:249-280） |
