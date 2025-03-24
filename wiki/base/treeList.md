# 树形数据操作 (treeList)

树形数据操作模块提供了一系列用于处理树形数据的工具函数，包括树形数据的遍历、查找、转换等功能。

## 函数列表

### treeExecute

递归执行操作，全部操作一次，不终止。

```typescript
function treeExecute<T extends ITree>(
	list: T | T[],
	func: (item: T) => void,
	childrenKey: string = 'children'
): void;
```

**参数：**

-   `list` - 树形数据列表
-   `func` - 要执行的操作
-   `childrenKey` - 子节点字段名称，默认为 'children'

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const tree = [
	{
		id: 1,
		name: 'Node 1',
		children: [{ id: 2, name: 'Node 1.1' }]
	}
];

base.treeExecute(tree, (node) => {
	console.log(node.name);
});
```

### treeFind

查找首个符合条件的节点。

```typescript
function treeFind<T extends ITree>(
	list: T | T[],
	func: (item: T) => boolean,
	childrenKey: string = 'children'
): T | undefined;
```

**参数：**

-   `list` - 树形数据列表
-   `func` - 要匹配条件的函数
-   `childrenKey` - 子节点字段名称，默认为 'children'

**返回值：**

-   返回查找到的节点

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const tree = [
	{
		id: 1,
		name: 'Node 1',
		children: [{ id: 2, name: 'Node 1.1' }]
	}
];

const node = base.treeFind(tree, (node) => node.id === 2);
// 结果: { id: 2, name: 'Node 1.1' }
```

### treeFindAll

查找所有符合条件的节点。

```typescript
function treeFindAll<T extends ITree>(
	list: T | T[],
	func: (item: T) => boolean,
	childrenKey: string = 'children'
): T[];
```

**参数：**

-   `list` - 树形数据列表
-   `func` - 要匹配条件的函数
-   `childrenKey` - 子节点字段名称，默认为 'children'

**返回值：**

-   返回所有查找到的节点数组

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const tree = [
	{
		id: 1,
		name: 'Node 1',
		children: [
			{ id: 2, name: 'Node 1.1' },
			{ id: 3, name: 'Node 1.2' }
		]
	}
];

const nodes = base.treeFindAll(tree, (node) => node.id > 1);
// 结果: [{ id: 2, name: 'Node 1.1' }, { id: 3, name: 'Node 1.2' }]
```

### treeParents

从树形数据中递归获取顶级项目集合。

```typescript
function treeParents<V, T extends ITree<V>>(
	data: T[],
	value: V,
	map: ITreeMap = { value: 'id', parent: 'parentId' },
	includeSelf = false
): T[];
```

**参数：**

-   `data` - 树形数据
-   `value` - 要查询的值
-   `map` - 树形数据映射，只需要 value 与 parent 字段
-   `includeSelf` - 是否包含自身节点

**返回值：**

-   返回所有查找到的父级节点数组，当前级别在前面，顶级在后面

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const tree = [
	{
		id: 1,
		name: 'Node 1',
		children: [{ id: 2, parentId: 1, name: 'Node 1.1' }]
	}
];

const parents = base.treeParents(tree, 2);
// 结果: [{ id: 1, name: 'Node 1' }]
```

### listParents

从列表数据中递归获取顶级项目集合。

```typescript
function listParents<V, T extends IList<V>>(
	data: T[],
	value: V,
	map: ITreeMap = { value: 'id', parent: 'parentId' },
	includeSelf = false
): T[];
```

**参数：**

-   `data` - 列表数据
-   `value` - 要查询的值
-   `map` - 树形数据映射，只需要 value 与 parent 字段
-   `includeSelf` - 是否包含自身节点

**返回值：**

-   返回所有查找到的父级节点数组，当前级别在前面，顶级在后面

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const list = [
	{ id: 1, name: 'Node 1' },
	{ id: 2, parentId: 1, name: 'Node 1.1' }
];

const parents = base.listParents(list, 2);
// 结果: [{ id: 1, name: 'Node 1' }]
```

### listTop

递归列表数据获取顶级项目。

```typescript
function listTop<V, T extends IList<V>>(
	data: T[],
	value: V,
	map: ITreeMap = { value: 'id', parent: 'parentId' }
): T | undefined;
```

**参数：**

-   `data` - 列表数据
-   `value` - 要查询的值
-   `map` - 树形数据映射，只需要 value 与 parent 字段

**返回值：**

-   返回查找到的顶级节点

**示例：**

```typescript
import { base } from '@da.li/core-libs';

const list = [
	{ id: 1, name: 'Node 1' },
	{ id: 2, parentId: 1, name: 'Node 1.1' },
	{ id: 3, parentId: 2, name: 'Node 1.1.1' }
];

const top = base.listTop(list, 3);
// 结果: { id: 1, name: 'Node 1' }
```

### listConvert

将对象数据转换成标准的列表对象数据。

```typescript
function listConvert<T>(
	obj: Dict,
	map?: IListMap,
	ext?: (obj: Dict, map?: IListMap) => IList<T>,
	skipConvert: boolean = false
): IList<T> | undefined;
```

**参数：**

-   `obj` - 原始对象
-   `map` - 键值映射
-   `ext` - 扩展转换操作
-   `skipConvert` - 是否忽略转换，如果之前已经转换过仍然进行转换

**返回值：**

-   转换后的标准列表数据
