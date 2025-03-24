# 基础工具函数 (base)

基础工具函数模块提供了一系列常用的工具函数，包括数组操作、字符串处理、类型判断等，是整个库的基础部分。

## 模块组成

-   [数组操作 (array)](./array.md) - 提供数组排序、查找、过滤等操作
-   [颜色处理 (color)](./color.md) - 提供颜色转换、处理等功能
-   [数字操作 (number)](./number.md) - 提供数字格式化、计算等功能
-   [对象操作 (object)](./object.md) - 提供对象合并、克隆、比较等功能
-   [字符串处理 (string)](./string.md) - 提供字符串模板、修剪、格式化等功能
-   [树形结构 (treeList)](./treeList.md) - 提供树形数据结构的处理功能
-   [类型判断 (type)](./type.md) - 提供各种类型判断函数
-   [工具函数 (utils)](./utils.md) - 提供其他通用工具函数
-   [值比较 (value)](./value.md) - 提供值比较相关功能

## 使用示例

```typescript
import { base } from '@da.li/core-libs';

// 使用数组排序
const sortedArray = base.sort(
	[
		{ name: '张三', age: 25 },
		{ name: '李四', age: 30 }
	],
	'age'
);

// 使用字符串模板
const greeting = base.template('Hello, {name}!', { name: 'World' });

// 类型判断
if (base.isString('test')) {
	// 执行字符串相关操作
}
```

## 导入方式

可以导入整个 base 模块：

```typescript
import { base } from '@da.li/core-libs';
```

也可以只导入需要的部分：

```typescript
import { isString, isNumber } from '@da.li/core-libs/base/type';
```
