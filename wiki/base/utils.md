# 工具函数 (utils)

工具函数模块提供了一系列通用的工具函数，包括哈希计算、时间格式化、函数跟踪等功能。

## 函数列表

### hash

计算对象的 HASH 值。

```typescript
function hash(obj: any): number;
```

**参数：**

-   `obj` - 要计算的对象

**返回值：**

-   返回计算后的 hash 值

### rnd

生成随机 ID。

```typescript
function rnd(): string;
```

**返回值：**

-   返回生成的随机 ID

### dateFormat

将任何可以转换成时间的对象，按条件格式化成字符串。所有早于 2000 年的时间都无效。

```typescript
function dateFormat(date?: any, format: string = 'YYYY-MM-DD'): string;
```

**参数：**

-   `date` - 用于格式化的时间
-   `format` - 格式。支持：YYYY MM DD HH mm ss / desc 间隔描述

**返回值：**

-   返回格式化后的时间字符串
-   无效时间返回 '✖'
-   早于 2000 年返回 '➖'

### dateLong

计算时长。

```typescript
function dateLong(start: any, end?: any, isEn: boolean = false, incSuffix: boolean = false): string;
```

**参数：**

-   `start` - 开始时间
-   `end` - 结束时间，不指定则使用当前时间
-   `isEn` - 使用英文还是中文
-   `incSuffix` - 是否包含前、后缀

**返回值：**

-   返回计算后的时长字符串

**示例：**

```typescript
import { base } from '@da.li/core-libs';

// 中文输出
base.dateLong('2024-01-01', '2024-01-02');
// 结果: '1天'

// 英文输出
base.dateLong('2024-01-01', '2024-01-02', true);
// 结果: '1day'

// 包含后缀
base.dateLong('2024-01-01', '2024-01-02', false, true);
// 结果: '1天前'
```

### errorTrace

函数跟踪，检查指定到当前位置函数的所有信息。

```typescript
function errorTrace(
	returnCount: number = 1,
	removeCount: number = 1,
	removeContents: string[] = []
): string | string[];
```

**参数：**

-   `returnCount` - 最多返回记录数
-   `removeCount` - 移除前几条，第一行内容是 ERROR，第二行为当前函数，此 2 行不计算在内
-   `removeContents` - 移除包含的内容

**返回值：**

-   返回跟踪信息

### sleep

异步休眠，使用 await 执行。

```typescript
function sleep(ms: number): Promise<void>;
```

**参数：**

-   `ms` - 休眠时长，单位：毫秒

**示例：**

```typescript
import { base } from '@da.li/core-libs';

async function example() {
	console.log('Start');
	await base.sleep(1000); // 休眠 1 秒
	console.log('End');
}
```
