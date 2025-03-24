# 颜色操作 (color)

颜色操作模块提供了一系列用于处理颜色的工具函数，包括颜色格式转换、颜色加深和减淡等功能。

## 函数列表

### HEX2RGB

将十六进制颜色代码转换为 RGB 格式。

```typescript
HEX2RGB(hex: string) => { r: number; g: number; b: number }
```

**参数：**

-   `hex` - 十六进制颜色代码（如："#FF0000"）

**返回值：**

-   包含 RGB 颜色值的对象，每个分量的取值范围为 0-255

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const rgb = base.HEX2RGB('#FF0000');
// 结果: { r: 255, g: 0, b: 0 }
```

### RGB2HEX

将 RGB 颜色格式转换为十六进制颜色代码。

```typescript
RGB2HEX(rgb: { r: number; g: number; b: number }) => string
```

**参数：**

-   `rgb` - 包含 RGB 颜色值的对象，每个分量的取值范围为 0-255

**返回值：**

-   十六进制颜色代码（如："#FF0000"）

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const hex = base.RGB2HEX({ r: 255, g: 0, b: 0 });
// 结果: "#ff0000"
```

### darken

将颜色加深指定程度。

```typescript
darken(color: string, level: number) => string
```

**参数：**

-   `color` - 要加深的颜色（十六进制格式）
-   `level` - 加深程度，取值范围为 [0, 1]，0 表示不变，1 表示完全变黑

**返回值：**

-   加深后的颜色（十六进制格式）

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const darkRed = base.darken('#FF0000', 0.5);
// 结果: "#800000"
```

### lighten

将颜色减淡指定程度。

```typescript
lighten(color: string, level: number) => string
```

**参数：**

-   `color` - 要减淡的颜色（十六进制格式）
-   `level` - 减淡程度，取值范围为 [0, 1]，0 表示不变，1 表示完全变白

**返回值：**

-   减淡后的颜色（十六进制格式）

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const lightRed = base.lighten('#FF0000', 0.5);
// 结果: "#ff8080"
```
