# CSS

## css3新特性

* `flex`、`animation`、`transform`、`border-radius`、`box-shadow`、`opacity`

## 背景毛玻璃的效果

* `filter：blur()`

## 重绘Repaint / 回流Reflow

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

## padding和margin的区别

* 作用对象不同，padding 作用于**自身**，margin作用于**外部**

## vw和百分比的区别

* 百分比会继承父级
* vw只和设备宽度有关系

## position属性

- `static`：默认
- `relative`：相对于自身
- `absolute`：相对于最近的一个非static的祖先级元素进行定位
- `fixed`：相对于屏幕窗口进行定位
- `sticky`：用来实现吸顶效果

## JS实现position：sticky

使用`getBoundingClientRect`或者`IntersectionObserver`计算指定元素位置，到达一定距离更改指定元素定位为fixed，从而实现sticky的效果

## 快速居中对齐

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



## CSS加载会造成阻塞吗

1. 不阻塞 DOM 解析
2. 会阻塞 DOM 渲染
3. 会阻塞 JS 执行

## 渐变阴影

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

## 响应式菜单按钮

```css
<style>
    ul,
    input{
        display: none;
    }
    input:checked + ul {
        display: block;
    }
    @media( min-width:900px ){
        span{
            display: none;
        }
    }
</style>

<label for="menu">
    <span>菜单</span>
</label>
<input id="menu" type="checkbox" />
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
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

## **阻止旋转屏幕时自动调整字体大小**

```css
html, body, form, fieldset, p, div, h1, h2, h3, h4, h5, h6 {
    -webkit-text-size-adjust:none;
}
```

## margin:0 auto;失效

1. **没有指定宽度**

   解决：设置width

2. **浮动、绝对定位、固定定位的盒子失效**

3. **行内元素失效（只要display不是block就会失效）**

   解决：
   ① 设置display:block；
   ② 给定要居中的行内元素的宽度。（自带宽度的input/button等元素无需设置宽度）

4. **其他解决方法**

   所有元素通过对父元素设置 text-align：center；的方式来实现居中
