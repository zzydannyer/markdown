# RegExp正则

```js
let regexp = /content/
let result = regexp.test(target) //return true or false
	result = target.match(regexp)//return "content" or null
```

* 正则表达式默认`贪婪匹配`，会匹配能匹配到的最大字符串

  * 使用`?`进行懒惰匹配
  * 匹配`"titanic"`，`/t[a-z]*i/`返回`["titani"]`，`/t[a-z]*?i/`返回`["ti"]`

* 大小写敏感，`/ignorecase/i`末尾加`i`忽略大小写

* 全局匹配，`/Repeat/g`末尾加`g`多次匹配

* `|`或，`/A|B/`

* `.`通配符

  * `/.un/`匹配`run`、`sun`、`fun`、`pun`、`nun` 和 `bun`

* `[]`字符集

  * `/b[aiu]g/`匹配`bag`、`big` 和 `bug`
  * `\w`是`[A-Za-z0-9_]`的缩写，匹配所有字母和数字
  * `\W`是`[^A-Za-z0-9_]`的缩写，与上面正好相反
  * `\d`等同于`[0-9]`
  * `\D`等同于`[^0-9]`
  * `\s`等同于`[\r\t\f\n\v]`，匹配空格、回车符、制表符、换页符和换行符
  * `\S`等同于`[^\r\t\f\n\v]`，匹配非空白字符

* `-`连字符，配合字符集

  * `/[a-e]at/`匹配`cat`、`bat` 和 `eat`

  不仅匹配字符，也可以匹配数字`/[a-z0-9]/`

* `^`否定字符

  * `/[^aeiou]/`排除指定非元音字符(**.match**)，会匹配`.`、`!`、`[`、`@`、`/` 和空白字符等
  * 也用于匹配文本是否在字符串的开始位置`/^begin/`(**.test**)

* `$` 搜寻字符串的结尾`/end$/`(**.test**)

* `+`匹配==一次或多次==的字符

  * `/a+/`匹配`/abc/`返回`["a"]`，匹配`/aabc /`返回`["aa"]`，匹配`/abab/`返回`["a","a"]`

* `*`匹配==零次或多个==字符

  * `/go*/`匹配` "gooooooooal!"`、 `"gut feeling"`，返回`["goooooooo"]`、`["g"]`
  
* `?`匹配==零个或一个字符==

  * `/colou?r/`
  
* `{}`数量说明，`/a{3,5}h/`匹配`"aaaah"`返回`true`

  * 只设置上下限，`/ha{3,}h/`匹配`"haaaah"`返回`true`
  * 匹配确定出现次数，`/ha{3}h/`匹配`"haaah"`返回true`

* 正向先行断言`(?=...)`，负向先行断言`(?!...)`



### 限制可能的用户名⌈freeCodeCamp⌋

  1. 用户名只能是数字字母字符。
  2. 用户名中的数字必须在最后`\d$`。 数字可以有零个或多个`\d*`。 用户名不能以数字开头`^[a-z]`。
  3. 用户名字母可以是小写字母和大写字母`/regexp/i`。
  4. 用户名长度必须至少为两个字符。 两位用户名只能使用字母。

  ```js
  let username = "JackOfAllTrades";
  let userCheck = /^[a-z][a-z]+\d*$|^[a-z]\d\d+$/i; 
  let result = userCheck.test(username);
  ```

  