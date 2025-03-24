# 全局类型 (types)

全局类型模块提供了一系列基础类型定义和数据结构接口，用于在整个项目中统一类型定义，提高代码的可维护性和类型安全性。

## 基础类型

### Dict

定义基础字典数据类型，用于表示键值对对象。

```typescript
type Dict<T = any> = Record<string, T>;
```

**参数：**

-   `T` - 字典值的类型，默认为 any

### NVs

定义基础字典数据类型，专门用于字符串键值对。

```typescript
type NVs = Record<string, string>;
```

### Func

定义带返回值的函数类型。

```typescript
type Func<T = any> = (...args: any[]) => T;
```

**参数：**

-   `T` - 函数返回值类型，默认为 any
-   `args` - 函数参数列表，类型为 any[]

### Action

定义不带返回值的函数类型。

```typescript
type Action = (...args: any[]) => void;
```

**参数：**

-   `args` - 函数参数列表，类型为 any[]

### AsyncFunc

定义异步带返回值的函数类型。

```typescript
type AsyncFunc<T = any> = (...args: any[]) => Promise<T>;
```

**参数：**

-   `T` - 函数返回值类型，默认为 any
-   `args` - 函数参数列表，类型为 any[]

### AsyncAction

定义异步不带返回值的函数类型。

```typescript
type AsyncAction = (...args: any[]) => Promise<void>;
```

**参数：**

-   `args` - 函数参数列表，类型为 any[]

### Nullable

定义可空类型，表示一个类型可以为 null 或 undefined。

```typescript
type Nullable<T> = T | null | undefined;
```

**参数：**

-   `T` - 原始类型

## 数据结构接口

### IList

列表项目结构接口，继承自 Dict。

```typescript
interface IList<T = any> extends Dict {
	/** 值 */
	value: T;

	/** 文本 */
	label: string;

	/** 图标 */
	icon?: string;

	/** 禁用 */
	disabled?: boolean;
}
```

**参数：**

-   `T` - 值的类型，默认为 any

### ITree

树形数据结构接口，继承自 IList。

```typescript
interface ITree<T = any> extends IList<T> {
	/** 上级 */
	parent?: ITree<T> | T;

	/** 下级 */
	children?: ITree<T>[];
}
```

**参数：**

-   `T` - 值的类型，默认为 any

### IListMap

列表对象数据字段映射接口。

```typescript
interface IListMap {
	/** 值字段 */
	value?: string;

	/** 文本字段 */
	label?: string;

	/** 图标字段 */
	icon?: string;

	/** 禁用字段 */
	disabled?: string;

	/** 禁用是否取反,如果 disabled 字段,未设置此参数是,如果包含 enable 则强制取反 */
	rev?: boolean | undefined;

	/** 值是否为数值,是则需要将值转换成数值 */
	numberValue?: boolean;
}
```

### ITreeMap

树形对象数据字段映射接口，继承自 IListMap。

```typescript
interface ITreeMap extends IListMap {
	/** 上级字段 */
	parent?: string;

	/** 下级字段 */
	children?: string;
}
```
