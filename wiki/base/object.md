# 对象操作 (object)

对象操作模块提供了一系列用于处理对象的工具函数，包括对象的清理、转换、遍历、合并等功能。

## 函数列表

### empty

清除对象中指定条件的值，默认移除 null 或 undefined。

```typescript
empty<RemovedKeys extends string, T>(
  obj: T,
  filter: (value: any) => boolean = (x) => isNil(x)
) => Omit<T, RemovedKeys>
```

**参数：**

-   `obj` - 要处理的对象
-   `filter` - 过滤条件函数，默认移除 null 和 undefined

**返回值：**

-   移除指定值后的对象

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const obj = { a: 1, b: null, c: undefined, d: 2 };

base.empty(obj);
// 结果: { a: 1, d: 2 }
```

### clear

深度去除对象中的空值，默认移除所有 null、undefined 以及空文本。

```typescript
clear<RemovedKeys extends string, T>(
  obj: T,
  filter: (value: any) => boolean = (x) => isNil(x) || x.toString().trim() === '',
  deep = false
) => Omit<T, RemovedKeys> | undefined
```

**参数：**

-   `obj` - 要处理的对象
-   `filter` - 过滤条件函数，默认移除空内容与空文本
-   `deep` - 是否递归处理，默认为 false

**返回值：**

-   移除空值后的对象

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const obj = {
	a: 1,
	b: null,
	c: { d: undefined, e: 2 },
	f: ''
};

// 非递归清理
base.clear(obj);
// 结果: { a: 1, c: { d: undefined, e: 2 } }

// 递归清理
base.clear(obj, undefined, true);
// 结果: { a: 1, c: { e: 2 } }
```

### get

从对象或数组中获取指定路径的值。

```typescript
get<TDefault = unknown>(
  value: any,
  path: string | string[],
  defaultValue?: TDefault
) => TDefault
```

**参数：**

-   `value` - 要检索的对象或数组
-   `path` - 要解析的属性路径，可以是字符串或字符串数组
-   `defaultValue` - 当解析结果为 undefined 或 null 时的默认值

**返回值：**

-   获取的值，如果未找到则返回默认值

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const obj = {
	a: {
		b: [{ c: 1 }]
	}
};

// 使用字符串路径
base.get(obj, 'a.b[0].c');
// 结果: 1

// 使用数组路径
base.get(obj, ['a', 'b', '0', 'c']);
// 结果: 1

// 使用默认值
base.get(obj, 'x.y.z', 'default');
// 结果: 'default'
```

### set

向对象或数组中设置指定路径的值。

```typescript
set<T extends object, K>(
  initial: T,
  path: string | string[],
  value: K
) => T
```

**参数：**

-   `initial` - 要设置的对象或数组
-   `path` - 要设置的属性路径
-   `value` - 要设置的值

**返回值：**

-   设置值后的对象

**示例：**

```typescript
import { base } from '@da.li/core-libs';

// 设置简单属性
base.set({}, 'name', 'ra');
// 结果: { name: 'ra' }

// 设置嵌套属性
base.set({}, 'cards[0].value', 2);
// 结果: { cards: [{ value: 2 }] }
```

### remove

从对象或数组中移除指定路径的值。

```typescript
remove(value: any, path: string | string[]) => any
```

**参数：**

-   `value` - 要操作的对象或数组
-   `path` - 要移除的属性路径

**返回值：**

-   移除指定值后的对象

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const obj = {
	a: {
		b: { c: 1 }
	}
};

base.remove(obj, 'a.b.c');
// 结果: { a: { b: {} } }
```

### has

检查对象或数组中是否存在指定路径的值。

```typescript
has(value: any, path: string | string[]) => boolean
```

**参数：**

-   `value` - 要检查的对象或数组
-   `path` - 要检查的属性路径

**返回值：**

-   如果路径存在则返回 true，否则返回 false

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const obj = {
	a: {
		b: { c: 1 }
	}
};

base.has(obj, 'a.b.c'); // 结果: true
base.has(obj, 'x.y.z'); // 结果: false
```

### each

遍历对象或数组的简化操作。

```typescript
each(
  obj: Dict | any[],
  action: (value: any, key: string | number, obj: any) => void
) => boolean
```

**参数：**

-   `obj` - 要遍历的对象或数组
-   `action` - 遍历操作函数，参数分别为：值、键/索引、对象本身

**返回值：**

-   遍历是否成功

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const obj = { a: 1, b: 2, c: 3 };

base.each(obj, (value, key) => {
	console.log(`${key}: ${value}`);
});
// 输出:
// a: 1
// b: 2
// c: 3
```

### eachSync

遍历对象或数组的异步操作。

```typescript
eachSync(
  obj: Dict | any[],
  action: (value: any, key: string | number, obj: any) => Promise<void>
) => Promise<boolean>
```

**参数：**

-   `obj` - 要遍历的对象或数组
-   `action` - 异步遍历操作函数

**返回值：**

-   遍历是否成功的 Promise

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const obj = { a: 1, b: 2, c: 3 };

await base.eachSync(obj, async (value, key) => {
	await someAsyncOperation(value);
	console.log(`${key}: ${value}`);
});
```

### reduce

对对象或数组进行归约操作。

```typescript
reduce<T = Dict | any[], TDefault = any>(
  obj: T,
  callbackfn: (previousValue: TDefault, currentValue: any, currentIndex: number | string, data: T) => any,
  initialValue?: TDefault
) => any
```

**参数：**

-   `obj` - 要归约的对象或数组
-   `callbackfn` - 归约函数
-   `initialValue` - 初始值

**返回值：**

-   归约结果

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const obj = { a: 1, b: 2, c: 3 };

const sum = base.reduce(obj, (acc, value) => acc + value, 0);
// 结果: 6
```

### math

对对象或数组中的数值进行数学运算。

```typescript
math(
  obj: Dict | any[],
  value: (value: any, key: string | number, obj: any) => number,
  math: 'max' | 'min' | 'sum' | 'avg' = 'sum',
  defaultValue?: number
) => number
```

**参数：**

-   `obj` - 要计算的对象或数组
-   `value` - 获取计算值的函数
-   `math` - 计算方法（max/min/sum/avg）
-   `defaultValue` - 默认值

**返回值：**

-   计算结果

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const obj = { a: 1, b: 2, c: 3 };

// 计算总和
base.math(obj, (value) => value, 'sum');
// 结果: 6

// 计算平均值
base.math(obj, (value) => value, 'avg');
// 结果: 2
```

### every

检查对象或数组中的所有元素是否都满足指定条件。

```typescript
every<T = Dict | any[]>(
  obj: T,
  callbackfn: (element: any, index: number | string, data: T) => boolean
) => boolean
```

**参数：**

-   `obj` - 要检查的对象或数组
-   `callbackfn` - 检查条件函数

**返回值：**

-   如果所有元素都满足条件则返回 true，否则返回 false

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const obj = { a: 1, b: 2, c: 3 };

base.every(obj, (value) => value > 0);
// 结果: true

base.every(obj, (value) => value > 2);
// 结果: false
```

### some

检查对象或数组中是否存在满足指定条件的元素。

```typescript
some<T = Dict | any[]>(
  obj: T,
  callbackfn: (element: any, index: number | string, data: T) => boolean
) => boolean
```

**参数：**

-   `obj` - 要检查的对象或数组
-   `callbackfn` - 检查条件函数

**返回值：**

-   如果存在满足条件的元素则返回 true，否则返回 false

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const obj = { a: 1, b: 2, c: 3 };

base.some(obj, (value) => value > 2);
// 结果: true

base.some(obj, (value) => value > 3);
// 结果: false
```

### toArray

将对象转换为数组。

```typescript
toArray<TValue, TKey extends string | number | symbol, KResult>(
  obj: Record<TKey, TValue>,
  toItem: (key: TKey, value: TValue) => KResult
) => KResult[]
```

**参数：**

-   `obj` - 要转换的对象
-   `toItem` - 转换函数

**返回值：**

-   转换后的数组

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const obj = { a: 1, b: 2, c: 3 };

base.toArray(obj, (key, value) => ({ key, value }));
// 结果: [{ key: 'a', value: 1 }, { key: 'b', value: 2 }, { key: 'c', value: 3 }]
```

### toHtml

将对象或数组转换为 HTML 代码。

```typescript
toHtml(
  value: any,
  maxDeep: number = 10,
  skipFunction: boolean = true,
  skipEmpty: boolean = false,
  skipUnderline: boolean = false,
  enSort: boolean = false
) => string
```

**参数：**

-   `value` - 要转换的对象或数组
-   `maxDe
