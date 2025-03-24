# 数组操作 (array)

数组操作模块提供了一系列用于处理数组的工具函数，包括排序、分组、过滤、映射等功能。

## 函数列表

### compare

比较两个对象的大小，可以指定比较的属性或使用比较函数。

```typescript
compare<T extends Dict = any>(
  a: T,
  b: T,
  getter?: string | ((item: T) => number | string | undefined) | undefined
) => number
```

**参数：**

-   `a` - 第一个比较对象
-   `b` - 第二个比较对象
-   `getter` - 获取比较值的属性名或函数

**返回值：**

-   比较结果，负数表示 a < b，0 表示 a = b，正数表示 a > b

**示例：**

```typescript
import { base } from '@da.li/core-libs';

// 直接比较对象
base.compare({ value: 1 }, { value: 2 }, 'value');
// 结果: -1

// 使用函数比较
base.compare({ x: 1 }, { x: 2 }, (item) => item.x);
// 结果: -1
```

### sort

对数组进行排序，可以指定排序的属性和排序方向。

```typescript
sort<T>(
  array: Array<T>,
  getter: (item: T) => number | string | undefined,
  desc = false
) => Array<T>
```

**参数：**

-   `array` - 要排序的数组
-   `getter` - 获取排序值的函数
-   `desc` - 是否降序排序，默认为 false（升序）

**返回值：**

-   排序后的数组

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const items = [{ value: 3 }, { value: 1 }, { value: 2 }];

// 升序排序
base.sort(items, (item) => item.value);
// 结果: [{ value: 1 }, { value: 2 }, { value: 3 }]

// 降序排序
base.sort(items, (item) => item.value, true);
// 结果: [{ value: 3 }, { value: 2 }, { value: 1 }]
```

### range

创建用于迭代的范围生成器，可以指定开始值、结束值、映射函数和步长。

```typescript
range<T = number>(
  startOrLength: number,
  end?: number,
  valueOrMapper: T | ((i: number) => T) = (i) => i as T,
  step: number = 1
) => Generator<T>
```

**参数：**

-   `startOrLength` - 开始值或长度
-   `end` - 结束值（可选）
-   `valueOrMapper` - 值或映射函数
-   `step` - 步长，默认为 1

**返回值：**

-   生成器对象

**示例：**

```typescript
import { base } from '@da.li/core-libs';

// 生成 0-3 的数字
for (const i of base.range(3)) {
	console.log(i); // 输出: 0, 1, 2, 3
}

// 指定范围和步长
for (const i of base.range(0, 6, (i) => i, 2)) {
	console.log(i); // 输出: 0, 2, 4, 6
}
```

### list

创建包含特定项目的列表，是 range 函数的数组版本。

```typescript
list<T = number>(
  startOrLength: number,
  end?: number,
  valueOrMapper?: T | ((i: number) => T),
  step?: number
) => T[]
```

**参数：**

-   `startOrLength` - 开始值或长度
-   `end` - 结束值（可选）
-   `valueOrMapper` - 值或映射函数
-   `step` - 步长

**返回值：**

-   生成的数组

**示例：**

```typescript
import { base } from '@da.li/core-libs';

// 生成数字列表
base.list(3); // 结果: [0, 1, 2, 3]

// 使用映射函数
base.list(0, 3, (i) => `item${i}`); // 结果: ['item0', 'item1', 'item2', 'item3']
```

### counting

统计数组中每个项目出现的次数。

```typescript
counting<T, TId extends string | number | symbol>(
  list: readonly T[],
  identity: (item: T) => TId
) => Record<TId, number>
```

**参数：**

-   `list` - 要统计的数组
-   `identity` - 获取统计标识的函数

**返回值：**

-   统计结果对象

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const items = [
	{ name: 'Ra', culture: 'egypt' },
	{ name: 'Zeus', culture: 'greek' },
	{ name: 'Loki', culture: 'greek' }
];

base.counting(items, (item) => item.culture);
// 结果: { egypt: 1, greek: 2 }
```

### group

将数组中的项目按照指定条件分组。

```typescript
group<T, Key extends string | number | symbol>(
  array: readonly T[],
  getGroupId: (item: T) => Key
) => Partial<Record<Key, T[]>>
```

**参数：**

-   `array` - 要分组的数组
-   `getGroupId` - 获取分组标识的函数

**返回值：**

-   分组结果对象

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

base.group(numbers, (n) => n % 3);
// 结果: { 0: [3, 6, 9], 1: [1, 4, 7], 2: [2, 5, 8] }
```

### toObject

将列表转换为字典对象。

```typescript
toObject<T, Key extends string | number | symbol, Value = T>(
  array: readonly T[],
  getKey: (item: T) => Key,
  getValue: (item: T) => Value = (item) => item as unknown as Value
) => Record<Key, Value>
```

**参数：**

-   `array` - 要转换的数组
-   `getKey` - 获取键的函数
-   `getValue` - 获取值的函数（可选）

**返回值：**

-   转换后的对象

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

base.toObject(
	numbers,
	(n) => n % 3,
	(n) => n
);
// 结果: { 0: 3, 1: 6, 2: 9 }
```

### select

按条件过滤数组后映射返回对应数组，相当于 filter + map 的组合。

```typescript
select<T, K>(
  array: readonly T[],
  condition: (item: T, index: number) => boolean,
  mapper: (item: T, index: number) => K
) => K[]
```

**参数：**

-   `array` - 要操作的数组
-   `condition` - 过滤条件函数
-   `mapper` - 映射函数

**返回值：**

-   过滤并映射后的数组

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const numbers = [1, 2, 3, 4];

base.select(
	numbers,
	(x) => x > 2,
	(x) => x * x
);
// 结果: [9, 16]
```

### empty

从列表中删除所有空项目。

```typescript
empty<T>(
  list: readonly T[],
  filter: (value: any) => boolean = (x) => isNil(x)
) => T[]
```

**参数：**

-   `list` - 要操作的数组
-   `filter` - 过滤函数，默认移除 null 和 undefined

**返回值：**

-   移除空项后的数组

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const items = [1, null, 2, undefined, 3];

base.empty(items);
// 结果: [1, 2, 3]
```

### remove

移除数组中的项目。

```typescript
remove<T>(
  array: T[],
  predicate: T | ((value: T, index: number, obj: T[]) => unknown),
  position: boolean | 'left' | 'right' = false
) => T[]
```

**参数：**

-   `array` - 要操作的数组
-   `predicate` - 要移除的项目或判断函数
-   `position` - 移除位置
    -   `false`：移除所有匹配项（默认）
    -   `true`或`'left'`：仅移除从头开始第一个匹配项
    -   `'right'`：仅移除从尾开始第一个匹配项

**返回值：**

-   移除指定项后的数组

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const items = [1, 2, 3, 2, 4];

// 移除所有 2
base.remove(items, 2);
// 结果: [1, 3, 4]

// 仅移除第一个 2
base.remove(items, 2, true);
// 结果: [1, 3, 2, 4]

// 仅移除最后一个 2
base.remove(items, 2, 'right');
// 结果: [1, 2, 3, 4]
```

### cleanDuplicate

清除数组中的重复项目。

```typescript
cleanDuplicate<T>(
  array: T[],
  clearValue?: (value: T) => boolean
) => T[]
```

**参数：**

-   `array` - 要操作的数组
-   `clearValue` - 清除条件函数（可选）

**返回值：**

-   去重后的数组

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const items = [1, 2, 2, null, 3, undefined, 3];

base.cleanDuplicate(items);
// 结果: [1, 2, 3]
```
