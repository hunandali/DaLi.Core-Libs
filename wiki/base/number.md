# 数值操作 (number)

数值操作模块提供了一系列用于处理数值的工具函数，包括类型转换、范围检查、格式化等功能。

## 函数列表

### number

尝试将任意值转换为数值，如果转换失败则返回 0。

```typescript
number(value: any) => number
```

**参数：**

-   `value` - 要转换的值

**返回值：**

-   转换后的数值，如果转换失败则返回 0

**示例：**

```typescript
import { base } from '@da.li/core-libs';

base.number('123'); // 结果: 123
base.number('abc'); // 结果: 0
base.number(null); // 结果: 0
```

### inRange

检查给定的数值是否在指定范围内。

```typescript
// 检查数值是否在 0 到指定数值之间
inRange(number: number, end: number) => boolean

// 检查数值是否在指定范围之间
inRange(number: number, start: number, end: number) => boolean
```

**参数：**

-   `number` - 要检查的数值
-   `start` - 范围起始值（包含）
-   `end` - 范围结束值（不包含）

**返回值：**

-   如果数值在指定范围内则返回 true，否则返回 false

**示例：**

```typescript
import { base } from '@da.li/core-libs';

// 检查是否在 0 到 5 之间
base.inRange(3, 5); // 结果: true

// 检查是否在 2 到 5 之间
base.inRange(3, 2, 5); // 结果: true
```

### toFloat

将任意值转换为浮点数。

```typescript
toFloat<T extends number | null = number>(
  value: any,
  defaultValue?: T
) => number | T
```

**参数：**

-   `value` - 要转换的值
-   `defaultValue` - 转换失败时的默认值，默认为 0.0

**返回值：**

-   转换后的浮点数，如果转换失败则返回默认值

**示例：**

```typescript
import { base } from '@da.li/core-libs';

base.toFloat('123.45'); // 结果: 123.45
base.toFloat('abc', 0.0); // 结果: 0.0
base.toFloat(null, null); // 结果: null
```

### toInt

将任意值转换为整数。

```typescript
toInt<T extends number | null = number>(
  value: any,
  defaultValue?: T
) => number | T
```

**参数：**

-   `value` - 要转换的值
-   `defaultValue` - 转换失败时的默认值，默认为 0

**返回值：**

-   转换后的整数，如果转换失败则返回默认值

**示例：**

```typescript
import { base } from '@da.li/core-libs';

base.toInt('123'); // 结果: 123
base.toInt('123.45'); // 结果: 123
base.toInt('abc', 0); // 结果: 0
base.toInt(null, null); // 结果: null
```

### DecimalLength

获取数值的小数位数。

```typescript
DecimalLength(value: number) => number
```

**参数：**

-   `value` - 要检查的数值

**返回值：**

-   数值的小数位数，如果没有小数则返回 0

**示例：**

```typescript
import { base } from '@da.li/core-libs';

base.DecimalLength(123); // 结果: 0
base.DecimalLength(123.45); // 结果: 2
base.DecimalLength(123.45); // 结果: 4
```

### toDate

将秒数转换为时间字符串（HH:MM:SS 格式）。

```typescript
toDate(seconds: number) => string
```

**参数：**

-   `seconds` - 要转换的秒数

**返回值：**

-   格式化后的时间字符串（HH:MM:SS）

**示例：**

```typescript
import { base } from '@da.li/core-libs';

base.toDate(3661); // 结果: "01:01:01"
base.toDate(7200); // 结果: "02:00:00"
```
