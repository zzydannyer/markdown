# TypeScript

### 原始数据类型

#### boolean

```typescript
let isDone: boolean = false;
let createdByNewBoolean: Boolean = new Boolean(1);
let createdByNewBoolean: Boolean = new Boolean(1);
```

#### number

```typescript
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
```

#### string

```typescript
let myName: string = 'Tom';
let myAge: number = 25;
// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
```

#### void

```typescript
function alertName(): void {
    alert('My name is Tom');
}
let unusable: void = undefined;
```

#### null & undefined

```typescript
let u: undefined = undefined;
let n: null = null;
let num: number = undefined;
```

#### any

* 任意值（Any）用来表示允许赋值为任意类型

### 类型

#### 类型推论

* 如果没有明确的指定类型，编译器会依照类型推论（Type Inference）的规则推断出一个类型

#### interface & type

`interface `和` type` 都可以声明自定义类型

* `type`：类型

  ```typescript
  export type User = {
      name: string;
      age: number;
  }
  export const users: User[] = []
  ```

* `interface`：接口

  ```typescript
  interface User {
      name: string;
      age: number;
  }
  export const users: User[] = []
  ```
  
  > 定义变量类型用type，实现继承约束用interface

#### 交叉类型

* 类型合并（Intersection Types）：每次都是多个类型的合并类型

  ```typescript
  type MarketPerson = Person & { phone: string }
  ```

#### 联合类型

* 联合类型（Union Types）：一次是能用一个类型

  ```typescript
  export type Person = User | Admin
  ```

#### 类型断言

* 告诉编译器确定的类型

  ```typescript
  if (<Admin>person).role) {
      information = (<Admin>person).role;
  } else {
      information = (<User>person).occupation
  }
  ```

#### 类型收敛

* `is`、`in`、`typeof`、`instanceof`

* `in`

  ```typescript
  if ("role" in person) {
      information = (<Admin>person).role;
  } else {
      information = (<User>person).occupation
  }
  ```

* `is`

  ```typescript
  export function isAdmin(person: Person): person is Admin {
    return person.type === "admin";
  }
   
  export function isUser(person: Person): person is User {
    return person.type === "user";
  }
  ```

#### 函数重载

* 一个函数可有不同的函数签名（参数和返回值）

  ```typescript
  declare function func(name: string): string;
  declare function func(name: number): number;
  
  interfac Func {
  	(name: string): string;
      (name: number): number;
  }
  
  type Func2 = ((name: string) => string) & ((name: number) => number)
  ```

  

### 泛型

#### 类型约束

* 约束接口类型

  ```typescript
  interface Sizeable{
      size: number;
  }
  
  function trace<T extends Sizeable>(arg: T):T {
      return arg
  }
  ```

#### 默认参数

* 指定默认类型参数

  ```typescript
  type A<T = string> = Array<T>;
  ```

#### 泛型嵌套

* 泛型支持函数嵌套

  ```typescript
  type CutTail<Tuple extends any[]> = Reverse<CutHead<Reverse<Tuple>>>
  ```

#### 泛型递归

* 泛型支持递归

  ```typescript
  //例1
  type ListNode<T> = {
      data: T;
      next: ListNode<T> | null;
  }
  
  //例2
  declare var HTMLElement: {
      prototype: HTMLElement;;
      new(): HTMLElement;
  }
  
  //例3
  type DeepPartial<T> = T extends Function
    ? T
    : T extends object
    ? { [P in keyof T]?: DeepPartial<T[P]> }
    : T;
  
  type PartialedWindow = DeepPartial<Window>; // 现在window 上所有属性都变成了可选啦
  ```

#### Partial<T>

* 将T的所有属性变成可选，Partial的实现：

  ```typescript
  type Partial<T> = { [P in keyof T]?: T[P]}
  ```

* 使用

  ```typescript
  type PartialStudent = Partial<Student>
  ```

#### Required<T>

* 将T的所有属性变成必填，Required的实现：

  ```typescript
  type Required<T> = { [P in keyof T]-?: T[p] }
  ```

#### Readonly<T>

* 将T的所有属性变成只读，Readonly的实现：

  ```typescript
  type Readonly<T> = { readonly [P in keyof T]: T[P] }
  ```

#### Mutable<T>

* 将T的所有属性变成可修改，Mutable的实现：

  ```typescript
  type Mutable<T> = {
      -readonlu [P in keyof T]: T[P];
  }
  ```

#### Record<K,T>

#### Pick<T,K>

#### Omit<T,K>

* 删除指定类型字段

  ```typescript
  type newUser = Omit<User, "type">
  ```

#### Exclude<T,U>

#### Extract<T,U>

#### NonNullable<T>

#### Parameters<T>

#### ConstructorParameters<T>

#### ReturnType<T>

* 得到函数返回值的类型，ReturnType的实现：

  ```typescript
  type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;
  ```

* 实现

  ```typescript
  type Func = (value: number) => string;
  const foo: ReturnType<Func> = "1"
  ```

#### InstanceType<T>

#### ThisParameterType

#### OmitThisPatameter

#### ThisType<T>



