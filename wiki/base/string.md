# 字符串处理 (string)

字符串处理模块提供了一系列用于处理和转换字符串的工具函数，包括模板替换、字符串修剪、类型转换、字符串截取等功能。

## 函数列表

### template

字符串模板替换，用于在模板字符串中通过名称替换数据。默认表达式会寻找 {name} 以识别名称。

```typescript
function template(str: string, data: Record<string, any>, regex = /\{(.+?)\}/g): string;
```

**参数：**

-   `str` - 模板字符串
-   `data` - 要替换的数据对象
-   `regex` - 自定义匹配表达式，默认为 /\{(.+?)\}/g

**示例：**

```typescript
template('Hello, {name}', { name: 'ray' }); // => Hello, ray
template('Hello, <name>', { name: 'ray' }, /<(.+?)>/g); // => Hello, ray
```

### trim

从给定的字符串中修剪所有前缀和后缀字符。类似于内置的 trim 函数，但接受您希望修剪的其他字符并修剪多个字符。默认移除回车、换行、制表符和全半角空格。

```typescript
function trim(str: string | null | undefined, charsToTrim: string = '\b\f\n\r\t\v　 '): string;
```

**参数：**

-   `str` - 要处理的字符串
-   `charsToTrim` - 要移除的字符，默认为回车、换行、制表符和全半角空格

**示例：**

```typescript
trim('  hello '); // => 'hello'
trim('__hello__', '_'); // => 'hello'
trim('/repos/:owner/:repo/', '/'); // => 'repos/:owner/:repo'
trim('222222__hello__1111111', '12_'); // => 'hello'
```

### string2Value

文本转换成实际类型值。如果存在 splitter 则按照分隔符分割成数组再转换。

```typescript
function string2Value(value: string, splitter?: string | RegExp): any | any[];
```

**参数：**

-   `value` - 要转换的文本值
-   `splitter` - 分隔符，如果设置则将结果分割成数组

**返回值：**

返回任何有效的类型值或者值数组。支持以下转换：

-   `"undefined"` -> `undefined`
-   `"null"` -> `null`
-   `"true"` -> `true`
-   `"false"` -> `false`
-   数字字符串 -> 数字
-   其他 -> 保持字符串

### stringCut

按指定长度截取字符串。

```typescript
function stringCut(str: string, len: number = 10, eli: string = '……', mode: number = 0): string;
```

**参数：**

-   `str` - 待截取的字符串
-   `len` - 截取长度，0 不截取
-   `eli` - 省略部分替换的文本，默认为省略号
-   `mode` - 截取方式：
    -   0: 保留两头
    -   1: 保留左侧
    -   2: 保留右侧

### stringClear

清除字符串中的任何 html 标签，并移除首尾的空白字符后截取指定长度文本，省略部分用省略号代替。

```typescript
function stringClear(str: string, len: number, mode: number = 0): string;
```

**参数：**

-   `str` - 待处理的字符串
-   `len` - 截取长度，0 不截取
-   `mode` - 截取方式：
    -   0: 保留两头
    -   1: 保留左侧
    -   2: 保留右侧

### htmlClear

清除字符串中的任何 html 标签，并移除首尾的空白字符。

```typescript
function htmlClear(str: string): string;
```

**参数：**

-   `str` - 待处理的字符串

### htmlSafe

HTML 安全化处理，去除危险标记，防止 XSS 攻击。

```typescript
function htmlSafe(html: string): string;
```

**参数：**

-   `html` - 待处理的 HTML 字符串

### htmlEncode

编码 HTML 符号。

```typescript
function htmlEncode(str: string): string;
```

**参数：**

-   `str` - 待编码的字符串

**处理规则：**

-   `&` -> `&amp;`
-   `>` -> `&gt;`
-   `<` -> `&lt;`
-   `"` -> `&quot;`
-   `'` -> `&#39;`
-   ` ` -> `&nbsp;`
