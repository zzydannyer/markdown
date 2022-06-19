# CSS

#### css3特性

* `flex`、`animation`、`transform`、`border-radius`、`box-shadow`、`opacity`

### 选择器

* 序号选择器`:nth-child(an+b)`

  |                         |                        |
  | :---------------------- | ---------------------- |
  | `:first-child`          | 第一个子元素           |
  | `:last-child`           | 最后一个子元素         |
  | `:nth-child(3)`         | 第三个子元素           |
  | `:nth-last-child(3)`    | 倒数第三个子元素       |
  | `:nth-of-type(3)`       | 第三个某类型的子元素   |
  | `:nth-last-of -type(3)` | 倒数抵挡额某类型子元素 |

  * `2n+1`等价`odd`，表示奇数
  * `2n`等价`even`，表示偶数

### 伪类

* 伪类指元素的特殊状态

  + `a:link`		表示没有被访问的状态
  + `a:visited `  表示访问后的状态
  + `a:hover  `   表示鼠标悬停的状态
  + `a:active   `  表示正被激活的状态

  |             |                    |
  | ----------- | ------------------ |
  | `:empty`    | 空标签             |
  | `:focus`    | 获得焦点的表单元素 |
  | `:enabled`  | 有效的表单元素     |
  | `:disabled` | 无效的表单元素     |
  | `:checked`  | 已勾选的表单元素   |
  | `:root`     | 根元素。即`<html>` |

### 伪元素

* `::after`，`::before`表示在标签的原有元素之前或者之后添加元素。
* `::selection `  表示被鼠标选中部分的样式
* `::first-letter ` 表示第一个文字
* `::first-line ` 表示第一行文字



#### 背景毛玻璃的效果

* `filter：blur()`

### 重绘Repaint / 回流Reflow

1. 重绘：`元素外观改变`触发，不会重新布局
   * `outline`、`background-color`
2. 回流：渲染对象在创建完成并==添加到渲染树时，不包含`位置和大小信息`==，计算这些值的过程叫重排或回流
   * ==重绘不一定重排==，==重排一定导致重绘==

### 触发重绘的属性

`color`、`outline`、`outline-width`、`outline-color`、`outline-style`、`border-style`、`border-radius`、`background`、`background-size`、`background-image`、 `background-position`、`background-repeat`、`text-decoration`、`box-shadow`、`visibility`

### 触发回流的属性

`width`、`top`、 `text-align`、`height`、`bottom`、`overflow-y`、`padding-left`、`font-weight`、`margin-right`、`overflow`、`display`、`position`、`font-family`、`border-width`、`float`、`line-height`、`border					`、`clear`、`vertival-align`、`min-height`、`white-space`

### 针对重绘回流的优化方案

* 用`transform`代替`top`、``left`操作
* 不使用`table`
* 一次性操作样式
* 利用vue的优化方案-`文档素碎片（documentFragment）`
* 动画元素放在`z-index`较高的图层
* 编写动画时用`requestAnimationFrame`

### padding和margin的区别

* 作用对象不同，padding 作用于**自身**，margin作用于**外部**

### vw和百分比的区别

* 百分比会继承父级
* vw只和设备宽度有关系

### position属性

- `static`：默认
- `relative`：相对于自身
- `absolute`：相对于最近的一个非static的祖先级元素进行定位
- `fixed`：相对于屏幕窗口进行定位
- `sticky`：用来实现吸顶效果

### JS实现position：sticky

使用`getBoundingClientRect`或者`IntersectionObserver`计算指定元素位置，到达一定距离更改指定元素定位为fixed，从而实现sticky的效果

### 快速居中对齐

* flex

```css
.parent{
    display: flex;
}
.child{
    justify-content: center;
    align-item: center;
}
```

* table-cell 多行文字垂直居中

```html
<li class="item">
    <span class="text">
</li>

```

```css
.item{
    display:table;
}
.text{
    display:table-cell;
    vertical-align:middle;
}
```



### CSS加载会造成阻塞吗

1. 不阻塞 DOM 解析
2. 会阻塞 DOM 渲染
3. 会阻塞 JS 执行

### 渐变阴影

* 通过伪元素设置渐变阴影

```css
.box::before {
     content: '';
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background: linear-gradient(
         45deg,
         hsl(300deg, 100%, 50%),
         hsl(200deg, 100%, 50%),
         hsl(100deg, 100%, 50%));
     border-radius: 8px;
     filter: blur(24px);
     z-index: -1;
}
```

### link和@import

+ `link`在加载页面时同时加载，`@import`在页面加载完毕后加载
+ `link`是HTML提供的标签，`@import`是css的语法规则，只能加载在==style标签内==和==css文件中==
+ `link`支持js控制DOM改变样式，而`@import`不支持

## overflow

### 隐藏文字溢出

```css
.text {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
    word-break: break-all;
	}
```

### 不换行

```css
white-space: nowrap;
```



## Flex

### 水平垂直居中

```css
.center {
    justify-content: center;
    align-items: center;
}
```

### flex: 1

`flex-grow` 、`flex-shrink` 、`flex-basis`这三个样式的合集，全写状态为`flex:0 1 auto`，简写为flex: 1

### 最后一行元素左对齐

* 局限于一行三个元素

```css
.list{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;

}
.list::after{
    content: '',
    /* 宽度与前面的元素一致 */
}

```

* 使用 grid

```css
.list{
   	 display: grid；
     justify-content: space-between;
     grid-template-columns: repeat(auto-fill, /* 元素宽度 */);
     grid-gap: /* 垂直间距 */;
}
```

## Grid布局

* 基本属性：

  * 行`row`

  * 列`column`
  * 容器`container`
  * 内容`content`
  * 区域`area`
  * 项目`item`
  * 间距`gap`

### 容器属性

#### grid-template-*

* 填写相应属性个数，不填写自动分配充满容器

  ```css
  grid-template-columns：100px 100px 100px //表示三列
  grid-template-rows：100px 100px 100px 100px //表示四行
  ```

* `repeat()`

  ```css
  grid-template-columns：100px 100px 100px   
  grid-template-columns：repeat(3, 100px)
  ```

* `auto-fill`：项目大小固定，容器大小不固定，自动填充

  ```css
  grid-template-rows：repeat(auto-fill, 100px)
  ```

* `fr`：fraction表示比例关系

  ```css
  grid-template-columns：1fr 1fr 1fr 1fr //宽度平均分为四列等分
  grid-template-columns：repeat（4，1fr）
  ```

* `minmax()`：设置长度范围

  ```css
  grid-template-columns：1fr minmax（150px,1fr） //不小于150px
  ```

* `auto`：根据浏览器的大小自动计算

  ```css
  grid-template-columns：100px auto 100px  //不写默认auto
  ```

* 网格线：帮助定位

  ```css
  grid-template-columns:[c1] 100px [c2] 100px [c3]    //2列3根网格线
  ```

#### grid-row / column-gap

* 项目间距

  ```css
  grid-row-gap:20px  //行间距
  grid-column-gap:20px  //列间距
  ```

#### grid-template-areas

* 一个区域由单个或多个单元格组成

  ```css
  grid-template-areas : 'a b c'
                        'd e f'
                        'g h i';
  grid-template-areas : 'a a a'
                        'b b b'
                        'c c c';
  ```

* `.`表示区域不利用

  ```css
  grid-template-areas : 'a . a'
                        'b . b'
                        'c . c';
  ```

#### grid-auto-flow

* 划分网格线后，容器的子项目自动放置在每一个网格

  ```css
  grid-auto-flow：row   先行后列
  grid-auto-flow：column  先列后行
  ```

* `dense`：提高空间利用率

  ```css
  grid-auto-flow：row dense
  
  ■■■■        ■■■■  □
  ■■■■  □ ->  ■■■■  □
  □  □  □     □  □  □
  ```

#### justify / align-content

* 设置容器内容的对齐方式

  ```css
  justify-content：center
  align-content：center
  ```

#### justify / align-items

* 设置所有项目内容的对齐方式

  ```css
  justify-items: start | end | center | stretch
  ```

* 水平垂直居中合并写法

  ```css
  place-items：center center
  ```

#### grid-auto-columns / rows

* 设置多余项目的宽高

  ```css
  grid-auto-rows: 50px; 项目高为50px
  ```

### 项目属性

#### grid-column / row-start / end

* 单独设置项目的位置，可占用多格空间

  ```css
  grid-column-start: 1;  ■  ■  □
  grid-column-end: 3;    ■  ■  □
  grid-row-start: 1;     □  □  □
  grid-row-end: 3;
  ```

* 简写

  ```css
  grid-column: 1 / 3;  一行平分成三份，占前两份
  grid-column-star: span 2;从开始方向跨越两个单元格
  grid-column-end: span 2;从结束方向跨越两个单元格
  ```

#### grid-area

* 指定项目占哪个区域

  ```css
  grid-template-areas: 'a a a'
                       'b b b'
                       'c c c';
  grid-area: b; 占满第二行
  ```

* 可用作`grid-column/row-start/end`的合并

  ```css
  grid-column-start: 1; 
  grid-column-end: 3;
  grid-row-start: 1; 
  grid-row-end: 3;
  
  grid-area: row-start / column-start / row-end / column-end
  grid-area: 1 / 1 / 3 / 3;
  ```

#### justify / align-self

* 用于单个项目内容的对齐方式

  ```css
  justify-self: center;
  ```

* 简写

  ```css
  place-self: center center;
  ```

  



  

## rem布局

```css
html{
    font-size:26.66667vw;
    /* 
    100/375= x/100 
    => 
    x=26.66667 */
}
obj{
    font-size:0.16rem;
}
```

### rem与em

- rem：相对于`<html>`标签的`font-size`决定大小，例如html标签font-size为14px，则2rem === 28px
- em：相对于自身的font-size去决定大小，自身没有font-size则继承祖先级元素的font-size

### **阻止旋转屏幕时自动调整字体大小**

```css
html, body, form, fieldset, p, div, h1, h2, h3, h4, h5, h6 {
    -webkit-text-size-adjust:none;
}
```

### margin:0 auto;失效

1. **没有指定宽度**

   解决：设置width

2. **浮动、绝对定位、固定定位的盒子失效**

3. **行内元素失效（只要display不是block就会失效）**

   解决：
   ① 设置display:block；
   ② 给定要居中的行内元素的宽度。（自带宽度的input/button等元素无需设置宽度）

4. **其他解决方法**

   所有元素通过对父元素设置 text-align：center；的方式来实现居中
