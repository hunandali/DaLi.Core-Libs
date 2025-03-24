# 类型判断 (type)

类型判断模块提供了一系列用于判断数据类型的工具函数，包括基本类型判断、对象类型判断、数组类型判断等功能。

## 函数列表

### typeName

分析数据的类型名称。

```typescript
function typeName(value: any): string;
```

**参数：**

-   `value` - 要分析的值

**返回值：**

-   返回类型名称字符串

### isArray

判断是否数组，是 Array.isArray 的别名。

```typescript
const isArray: (value: any) => value is any[];
```

### isSymbol

判断是否 Symbol 类型。

```typescript
function isSymbol(value: any): value is symbol;
```

### isObject

判断是否 Object 对象，仅 {}，不包含 [] null 等对象。

```typescript
function isObject(value: any): value is object;
```

### isPrimitive

判断是否原始类型（number, string, boolean, symbol, bigint, undefined, null）。

```typescript
function isPrimitive(value: any): boolean;
```

### isFunction

判断是否函数。

```typescript
function isFunction(value: any): value is Function;
```

### isFn

isFunction 的简写。

```typescript
const isFn: (value: any) => value is Function;
```

### isPromise

判断是否 Promise 对象。

```typescript
function isPromise(value: any): value is Promise<any>;
```

### isAsync

判断是否异步函数（async function）。

```typescript
function isAsync(value: any): boolean;
```

### isString

判断是否字符串。

```typescript
function isString(value: any): value is string;
```

### isNumber

判断是否数值。

```typescript
function isNumber(value: any): value is number;
```

### isDate

判断是否日期对象。

```typescript
function isDate(value: any): value is Date;
```

### isEmpty

判断是否空值（空对象、空数组、空字符串、空函数、空 Symbol）。

```typescript
function isEmpty(value: any): boolean;
```

### isBoolean

判断是否布尔值。

```typescript
function isBoolean(value: any): value is boolean;
```

### isRegExp

判断是否正则表达式。

```typescript
function isRegExp(value: any): value is RegExp;
```

### isReg

isRegExp 的简写。

```typescript
const isReg: (value: any) => value is RegExp;
```

### isNil

判断是否 null 或 undefined。

```typescript
function isNil(value: any): value is null | undefined;
```

### isNaN

判断是否 NaN。一个 NaN 原始值是唯一一个不等于自身的值。

```typescript
function isNaN(value: any): boolean;
```

### notEmpty

判断是否不为空（非空对象、非空数组、非空字符串、非空函数、非空 Symbol）。

```typescript
function notEmpty(value: any): boolean;
```

### hasObject

判断是否 Object 对象且对象存在内容。

```typescript
function hasObject(value: any): value is object;
```

### hasObjectName

判断对象是否包含指定的属性。

```typescript
function hasObjectName(value: any, name: string): boolean;
```

**参数：**

-   `value` - 要检查的对象
-   `name` - 属性名称

### hasArray

判断数组是否存在内容。

```typescript
function hasArray(value: any): boolean;
```

### hasString

判断是否字符串，且字符串存在内容。

```typescript
function hasString(value: any): boolean;
```
