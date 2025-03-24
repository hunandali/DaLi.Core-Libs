# 值判断 (value)

值判断模块提供了一系列用于判断值是否符合特定格式的工具函数，包括相等性判断、格式验证等功能。

## 函数列表

### isEqual

深度比较两个对象之间的值是否相等。

```typescript
function isEqual<TType>(x: TType, y: TType): boolean;
```

**参数：**

-   `x` - 要比较的值 X
-   `y` - 要比较的值 Y

**返回值：**

-   如果两个值相等则返回 true，否则返回 false

### isMatch

正则表达式判断。

```typescript
function isMatch(val: any, reg: RegExp): boolean;
```

**参数：**

-   `val` - 要检测的值
-   `reg` - 正则表达式

**返回值：**

-   如果匹配则返回 true，否则返回 false

### isMobile

判断是否为手机号码。

```typescript
function isMobile(val: number | string): boolean;
```

**参数：**

-   `val` - 要检测的值

### isCar

判断是否为车牌。

```typescript
function isCar(val: string): boolean;
```

**参数：**

-   `val` - 要检测的值

### isPhone

判断是否为电话号码。

```typescript
function isPhone(val: string): boolean;
```

**参数：**

-   `val` - 要检测的值

### isEmail

判断是否为 Email。

```typescript
function isEmail(val: string): boolean;
```

**参数：**

-   `val` - 要检测的值

### isUrl

判断是否为网址，必须含 http / https / ftp。

```typescript
function isUrl(val: string): boolean;
```

**参数：**

-   `val` - 要检测的值

### isFullUrl

判断是否为全网址，http / https / ftp 可选，且可以带路径与参数。

```typescript
function isFullUrl(val: string): boolean;
```

**参数：**

-   `val` - 要检测的值

### isHttp

判断是否为网址，仅支持 http / https。

```typescript
function isHttp(val: string): boolean;
```

**参数：**

-   `val` - 要检测的值

### isGuid

判断是否为 GUID。

```typescript
function isGuid(val: string): boolean;
```

**参数：**

-   `val` - 要检测的值

### isChinese

判断是否为汉字。

```typescript
function isChinese(val: string): boolean;
```

**参数：**

-   `val` - 要检测的值

### isEnglish

判断是否为英文字母。

```typescript
function isEnglish(val: string): boolean;
```

**参数：**

-   `val` - 要检测的值

### isName

判断是否为名称，即：英文开头的字符串（仅包含半角字母、数字、下划线与横线），类似于账号名，最少两个字符。

```typescript
function isName(val: string, len: number = 100): boolean;
```

**参数：**

-   `val` - 要检测的值
-   `len` - 最大长度限制，默认为 100

### isIP

判断是否为 IPv4 字符串。

```typescript
function isIP(val: string): boolean;
```

**参数：**

-   `val` - 要检测的值

### isJSON

判断是否为有效的 JSON 字符串。

```typescript
function isJSON(val: string): boolean;
```

**参数：**

-   `val` - 要检测的值
