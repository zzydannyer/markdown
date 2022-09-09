### HTML5特性

- ==语义化标签==，比如header、footer、nav、aside、article、section
- 音视频，比如audio、video
- 画布canvas、矢量图svg
- 画布，canvas的api有getContext、fillStyle、fillRect等
- 本地存储localStorage、sessionStorage
- Web worker

### 语义化的好处

- 利于==维护==，代码分块清晰，页面结构清晰，增加代码可读性
- 利于==SEO==，便于浏览器解析，搜索引擎爬取

### 标签

* 转义字符

  |      |      |
  | ---- | ---- |
  |      |      |
  |      |      |
  |      |      |
  |      |      |

### 属性

#### integrity

* link或script中的 integrity 属性为了防止 CDN 篡改 javascript 用的
* `anonymous`会发起一个跨域请求(即包含 `Origin:` HTTP 头)， 但不会发送任何认证信息 (即不发送 cookie, X.509 证书和 HTTP 基本认证信息). 如果服务器没有给出源站凭证 (不设置 `Access-Control-Allow-Origin:` HTTP 头), 这张图片就会被污染并限制使用
* 这个 integrity 属性的值指定浏览器提取的资源（文件）的base64编码的加密哈希值。如果资源匹配其中一个哈希值，它将被加载。
* script、link的integrity值 至少一个字符串，每个串包括指示特定散列算法（目前允许的前缀的前缀sha256，sha384和sha512），然后用短划线，并与实际base64编码散列结束。

### 块级元素 和 行内元素

* 块级元素：width撑满，可以设置宽高

  div、p、h1、ul、ol、section、header 等

* 行内元素：a、span、i、em等

* 行内块元素：

### Canvas & SVG 

1. Canvas主要是用笔刷来绘制2D图形的。

2. SVG主要是用标签来绘制不规则矢量图的。
3. 相同点:都是主要用来画2D图形的。
4. 不同点:
  *  Canvas画的是位图，SVG 画的是矢量图。
  * SVG节点过多时渲染慢，Canvas性能更好一点，但写起来更复杂。
  *  SVG支持分层和事件，Canvas不支持，但是可以用库实现。

### CanvasAPI

- getContext：返回一个指定canvas的绘画环境对象
- beginPath：开始绘制
- moveTo：移动画笔位置
- lineTo：用来画线段
- stroke：用来实施绘制的操作
- lineStyle：设置线段的样式
- closePath：结束绘制