# 模块加载 (modules)

模块加载模块提供了一系列用于处理模块加载的工具函数，包括模块的初始化、更新等功能。

## 函数列表

### modulesLoad

对模块加载进行基础处理。

```typescript
function modulesLoad(
	modules: Dict,
	options: moduleOptions = { fullPath: false, incIndex: false }
): Dict | undefined;
```

**参数：**

-   `modules` - 模块数据集合
-   `options` - 模块加载属性
    -   `fullPath` - 是否使用全路径做为 key，否则仅保留文件名作为 key
    -   `incIndex` - 是否包含 index 文件，默认不包含

**返回值：**

-   处理后的模块对象

### modulesUpdateSync

异步方式更新模块对象数据，并异步初始化。

```typescript
async function modulesUpdateSync(
	modules: Dict,
	options: moduleOptions = { fullPath: false, incIndex: false },
	...args: any
): Promise<Dict>;
```

**参数：**

-   `modules` - 模块数据集合，使用 import.meta.glob 获取
-   `options` - 模块加载属性
-   `...args` - 其他附加参数，用于初始化附加参数

**返回值：**

-   返回模块对象

**示例：**

```typescript
import { base } from '@da.li/core-libs';

// 异步加载模块
const modules = await base.modulesUpdateSync({
	'./components/*.vue': true
});
```

### modulesUpdate

同步方式更新模块对象数据，并同步初始化。

```typescript
function modulesUpdate(
	modules: Dict,
	options: moduleOptions = { fullPath: false, incIndex: false },
	...args: any
): Dict;
```

**参数：**

-   `modules` - 模块数据集合，使用 import.meta.glob 获取
-   `options` - 模块加载属性
-   `...args` - 其他附加参数，用于初始化附加参数

**返回值：**

-   返回模块对象

**示例：**

```typescript
import { base } from '@da.li/core-libs';

// 同步加载模块
const modules = base.modulesUpdate({
	'./components/*.vue': true
});
```
