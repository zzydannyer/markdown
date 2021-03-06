# Vue

### Vue的特点

* 轻量级、速度快、易上手、低耦合、可复用、独立开发、文档全

### MVVM

* `model`、`view` 、`viewModel`

* 数据驱动视图。数据变更，页面渲染就会变更。

### 生命周期

* 每个Vue实例在被创建时都有一个初始化的过程，例如需要数据监听、模板编译、实例挂载，这个过程中会运行一些==生命周期钩子==函数

```js
/* Options API */

export default{
    beforeCreate(){},	//实例创建前，挂载元素$el和数据对象data都为undefined
    created(){},		//实例创建前，渲染成 HTML 前调用，初始化属性值，再渲染成视图
						//vue数据多项data有了，$el还没有
    
    beforeMounte(){},	//实例挂载前，$el和data初始化完毕，挂载在虚拟dom节点，data.message未替换
    mounted(){},		//实例挂载前，渲染后调用，初始化页面后对 DOM 节点进行操作，data.message成功渲染
    
    beforeUpdate(){},	//实例更新前
    updated(){},		//实例更新后
    
    Vue2:
    beforeDestroy(){},	/* 实例销毁前
    						1. 解绑自定义事件，DOM事件
    						2. 清除定时器
    					 */
    destroyed(){},		//实例销毁后，不再触发周期函数，解除事件监听和DOM绑定，但DOM结构依然存在
    
    Vue3:
    beforeUnmount(){},
    unmounted(){},
}

```

```js
/* Composition API */

import (
    onBeforeMount,
    onMounted,
    
    onBeforeUpdate,
    onUpdated,
    
    onBeforeUnmount,
    onUnmounted
) from Vue

export default{
    setup(){
        /* 
         * setup在beforeCreate前调用
         * 没有this
         *
         */
        
        onBeforeMount(()=>console.log('onBeforeMount'))
}
```

#### beforeDestroyed

* 用于被清除隐藏的,或容易被遗忘的执行任务

```jsx
let timer = null 
export default {
    methods:{
        autoPlay(){
            timer = setInterval(() => { dsth }, 2000)
        }
    },
    mounted(){
        this.autoPlay()
    },
    beforeDestroyed(){
        clearInterval(timer)
        timer = null
    }
}
```

### 父子组件生命周期

* 加载渲染过程

```js
-> /* 父 */ beforeCreate 
	-> /* 父 */ created 
		-> /* 父 */ beforeMount
			-> /* 子 */ beforeCreate				
				-> /* 子 */created
					-> /* 子 */beforeMount
						-> /* 子 */mounted
							-> /* 父 */ mounted
```

* 子组件更新

```js
-> /* 父 */ beforeUpdate
	-> /* 子 */ beforeUpdate
		-> /* 子 */ updated
			-> /* 父 */ updated
```

* 组件销毁

```js
-> /* 父 */ beforeDestroy
	-> /* 子 */ beforeDestroy
		-> /* 子 */ destroyed
			-> /* 父 */ destroyed
```



### 获取数据的周期

`created`、`beforeMount`、`mounted`

### Vue响应式

#### vue2

* 通过==数据劫持==、==观察者模式==的方式实现

* Vue2使用`Object.defineProperty`

* Vue2响应式缺点：
  1. 深度监听需要一次性全部递归，性能不好
  2. 无法新增和删除响应式属性，需要使用`Vue.set`、`Vue.delete`
  3. 无法对数组进行监听
  
  ```js
  const obj = {
      a: 'a',
      b: 'b'
  }
  
  const defineReactive = (target, key, value) => {
      Object.defineProperty(target, key, {
          get() {
              return value
          },
          set(newValue) {
              value = newValue
          }
      })
  }
  
  for (let key in obj) {
      defineReactive(obj, key, obj[key])
  }
  ```

#### Vue3

* Vue3使用`Proxy`，性能更好，不需要循环遍历

  ```js
  new Proxy(obj, {
      get(target, prop, receiver) {
          return target[prop]
      },
      set(target, prop, value, receiver) {
          target[prop] = value
          return true
      }
  })
  ```

* 基本类型值要用`ref`来包装，引用数据类型需要用`reactive`来包装
* 使用`proxy`代理对象，因为proxy只能接收对象作为参数，所以==基本类型值==被转化为了`{value：值}`
* 对用reactive包装的引用类型数据进行解构赋值的时候，需要使用`torefs`。原理：`torefs`把数据包装成``{key:proxy(value:值)}``

### 模板编译

* 虚拟DOM
  1. 通过js模拟DOM结构
  2. 通过`diff`算法比较更新结构
* ==vue==中有个`compiler`编译器模块，将template编译为js可执行的render函数
   * 便于前端高效编写视图模板，更直观高效
   * 手写render函数不仅效率低下，还失去了编译期的优化能力

### 组件渲染

* 初次渲染
  1. 解析模板为render函数
  2. 触发响应式，监听data的getter和setter
  3. 执行render函数，生成`vnode`、`patch(elem, vnode)`，会触发getter。模板用到的getter会被监听。
* 更新渲染
  1. 修改data，触发setter
  2. 重新执行render函数，生成newVnode
  3. `patch(vnode, newVnode)`使用diff算法进行比对，更新需要更新的DOM

### v-model双向绑定

1. **定义**

   * 双向绑定是一个指令`v-model`，可以绑定一个==响应式==数据到视图，数据变化视图也跟着改变

   * 本质上是语法糖，相当于`:value`和`@input`，可以减少繁琐的事件处理，提高开发效率

2. **使用**

   * 表单项

     * `input`上绑定值

     * `checkbox`上绑定`true-value`和`false-value`

       ```html
       <div>
         <input
           type="checkbox"
           v-model="toggle"
           :true-value="done"
           :false-value="todo"
         />{{ toggle }}
       </div>
       ```

       ```jsx
       const type = {
         done: '已完成',
         todo: '未完成',
       };
       setup() {
           const toggle = ref('已完成');
           return {
             toggle,
             ...toRefs(type),
           };
         },
       ```

     * `radio`上绑定`value`

       ```html
       <div>
         <input type="radio" v-model="sex" :value="male" />{{male}}
         <input type="radio" v-model="sex" :value="female" />{{female}}
         {{ sex }}
       </div>
       ```

       ```js
       const gender = {
         male: 'male',
         female: 'female',
       };
       setup() {
           const sex = ref('男');
           return {
             sex,
             ...toRefs(gender),
           };
         },
       ```

     * `select`通过`option`绑定`value`

       ```html
       <div>
         <select v-model="direct">
           <option :value="east">{{ east }}</option>
           <option :value="north">{{ north }}</option>
           <option :value="west">{{ west }}</option>
           <option :value="south">{{ south }}</option>
         </select>
         {{ direct }}
       </div>
       ```

       ```js
       const direction = {
         east: '东',
         north: '北',
         south: '南',
         west: '西',
       };
       setup() {
           const direct = ref('东');
           return {
             direct,
             ...toRefs(direction),
           };
         },
       ```

       

   * 自定义组件

   * 修饰符

     * `.lazy` - 当输入框失去焦点后触发`change`事件更新视图
     * `.number` - 获取转换后的数字
     * `.trim` - 去掉前后空格，中间的会保留一个空格，其余过滤

1. 获取节点

   ```jsx
   compile( node ){
       node.childNodes.forEach((item, index) => {
           if( item.hasAttribute('v-model') ){
               //获取v-model节点绑定的值
               let attr = item.getAttrtibute('v-model').trim()
               //在data中找到此值
               if( this.hasOwnProperty(attr)){
                   item.value = this[attr]
               }
               item.addEventListener('input', event => {
                   this[attr] = item.value
               })
           }
       })
   }
   ```



### SPA和MPA

* 单页面**SPA**，只有一个主页面的应用，浏览器一开始就加载所有的JTML、CSS、JS，页面由路由动态载入，仅刷新局部资源

  1. ==用户体验好，快，不需要重新加载真个页面==

  2. ==不利于**SEO**，页面复杂度高，初次加载性能不太好==

* 多页面**MPA**，以一个应用多个页面，跳转时整个页面刷新

### mixin

使用mixin抽离公共逻辑

```js
//mixin.js

export default{
    data(){
        return {
           ...commonData
        }
    },
    methods:{
        commonMethods(){}
        ...
    },
    mounted(){},
    ...
}
```

```js
//component A

import mixin from '.../mixin'

export default{
    mixins:[mixin,...],
}
```



### ref获取DOM

```js
<Test ref="test" />

this.$refs.test.$el //获取组件渲染后的DOM
```

### 局部样式作用

`<style scoped>`

### 样式穿透

```scss
//sass和less使用 ::v-deep 或者 /deep/
<style lang="scss" scoped>
    .User ::v-deep .formatter-text {	
      color: red;
    }
    .User /deep/ .ant-item{
        ...
    }
</style>
```



```stylus
//stylus 使用 >>>
<style lang="stylus" scoped>
    >>> .formatter-text {	
      color: red;
    }
</style>
```



### keep-alive

* 缓存页面，频繁切换时不需要重新渲染

  ```html
  <Tab />
  <keep-alive>
      <router-view><router-view />
  </keep-alive >
  ```

  

### vue-loader

* 是vue文件的一个加载器，将`template`、`js`、`style`转换为js

## vue指令

### 常用指令

* `v-model`：用于表单数据双向绑定

* `v-bind`：动态绑定数据，进行实时渲染

  绑定`class`的方法：

  1. 对象：`‘{red: isred}’`
  2. 三元：`‘isred?"red":"blue"’`
  3. 数组：`‘[{red:"isred"}, {bule:"isbule"}]’`

* `v-for`：循环数组或对象

* `v-show`、`v-hide`：显示与隐藏

* `v-if`、`v-else-if`、`v-else`

* `v-text`、`v-html`：绑定文本 / HTML

* `v-once`：进入页面时渲染，只渲染一次

* `v-cloak`：防止闪烁

* `v-pre`：输出标签内部元素

### v-for使用key

* 给循环的`VNode`加上唯一标识，`diff`算法可以正确识别这个节点，使页面渲染更迅速
  * `diff`算法通过`tag`和`key`来判断是不是同一个节点
* 不用index作为key值：index值可能会变化，导致重新渲染，影响性能

### v-for和v-if优先级

* ==Vue2==v-for优先级更高，两个不能一起写，每次渲染都会先循环再进行条件判断

* ==Vue3==相反

### v-show和v-if的异同

* 共同点：都是动态显示DOM元素

* 不同点：

  `v-if`动态修改DOM节点，会销毁和重建内部的事件监听和子组件

  `v-show`改变DOM元素display属性，只基于CSS

### v-on监听多个方法

`v-on='onClick,onBlur'`

### Vue.set / this.$set

* 如果实例在创建后，向响应式对象添加新的属性，==Vue无法探测普通的新增属性==，例如`this.obj.newProperty = 'hi'`，所以不会触发视图更新

  `Vue.set / this.$set(target, key, value)`

  ```js
  /* 	{Object | Arrray} target
  	{string | number} key
  	{any} value
  */
  Vue.set(this.arr, 0, {content: message})
  ```


### 自定义指令

指令提供如下（可选的）几个钩子函数

- `created `：绑定元素属性或事件监听器被应用之前调用，需要附加需要在普通的 v-on 事件监听器前调用的事件监听器时。
- `beforeMounted `：当指令第一次绑定到元素并且在挂载父组件之前执行。
- `mounted `：绑定元素的父组件被挂载之后调用。
- `beforeUpdate `：在更新包含组件的 VNode 之前调用。
- `updated `：在包含组件的 VNode 及其子组件的 VNode 更新后调用。
- `beforeUnmounted`：在卸载绑定元素的父组件之前调用
- `unmounted `：当指令与元素解除绑定且父组件已卸载时，只调用一次。

vue3的变化：

- **bind** 函数被替换成了`beforeMounted`
- **update** 被移除
- **componentUpdated** 被替换成了`updated`
- **unbind** 被替换成了 `unmounted`
- **inserted** 被移除。

### nextTick

* vue是异步渲染，合并data数据，提高渲染性能

* 动态属性修改后，无法获取修改后的数据，用`nextTick`获取更新后的DOM元素

### 获取事件对象

`<button @click="function($event)"></button >`

### Computed setter

```js
computed: {
    value: {
        get(){
            this.$store.getters.value    
        }，
        set(){
            this.$store.commit('update', value)
        }
    }
}
```



### Computed、watch、methods的区别

* `computed`：==有缓存==，依赖其他属性值，只有依赖值发生变化，下一次获取这个computed值时才会重新计算

  **多个因素影响一个**----return 返回一个属性

  需要进行数值计算时用，有缓存避免每次获取值时重新计算

* `watch`：==无缓存==，用于观察数据，数据变化时执行回调进行后续操作，每次渲染都会执行

  **一个因素影响多个变化**----监听一个属性

  需要在数据变化时进行异步或开销较大的操作时用，watch允许异步操作，比如访问API

* `methods`：==无缓存==，调用总会执行

### vue2数组方法

* `push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`

### 组件中data必须是函数

* 函数的形式组件每次会返回新的对象，不会公用一个对象

## 组件传值

* 通过`Vuex`传值

* 通过`eventBus`传值（发布订阅模式）

  1. 创建一个vue的实例，并且导出为bus。

  2. 在传值和接值的组件引入这个实例。  

  3. 传值使用` bus.$emit('标识'，data)`

  4. 接收值使用`bus.$on('标识'，data=>())`

* EventBus - Vue2

  ```js
  /* main.js */
  Vue.prototype.$EventBus = new vue()
  或
  const EventBus = new Vue();
  
  Object.defineProperties(Vue.prototype, {
    $EventBus: {
      get: function () {
        return EventBus
      }
    }
  })
  /* 简单场景直接用 this.$root.$emit 和 this.$root.$on ，不必初始化 Vue 对象*/
  ```

  ```js
  // 发送消息
  this.$EventBus.$emit(channel: string, callback(payload1,…))
  
  // 监听接收消息
  this.$EventBus.$on(channel: string, callback(payload1,…))
  
  // 移除监听
  this.$EventBus.$off(channel: string)
  this.$EventBus.$off()
  ```

  ```js
  /* A.vue */
  <button @click="sendMsg()" />
  
   methods: {
      sendMsg() {
        this.$EventBus.$emit("receiveMsg", '来自A的消息');
      }
    }
  ```

  ```js
  /* B.vue */
  <p>{{msg}</p>
  
  data(){
      return {
        msg: ''
      }
   },
  mounted() {
      this.$EventBus.$on("receiveMsg", (msg) => {
        this.msg = msg;
      });
   }
  ```


* EventBus - Vue3

  ```js
  class Bus {
  	list: { [key: string]: Array<Function> };
  	constructor() {
  		// 收集订阅信息,调度中心
  		this.list = {};
  	}
  
  	// 订阅
  	$on(name: string, fn: Function) {
  		this.list[name] = this.list[name] || [];
  		this.list[name].push(fn);
  	}
  
  	// 发布
  	$emit(name: string, data?: any) {
  		if (this.list[name]) {
        		this.list[name].forEach((fn: Function) => {
          	fn(data);
        });
      }
  	}
  
  	// 取消订阅
  	$off(name: string) {
  		if (this.list[name]) {
  			delete this.list[name];
  		}
  	}
  }
  
  export default new Bus();
  ```

  ```js
  export default defineComponent({
    setup() {
      function changeMenu() {
        Bus.$emit("change-menu");
      }
  
      onBeforeUnmount(() => {
        Bus.$off("change-menu");
      });
  
      return { changeMenu };
    },
  });
  ```

  ```js
  export default defineComponent({
    setup() {
      onMounted(() => {
        Bus.$on("change-menu", () => {
          isCollapse.value = !isCollapse.value;
        });
      });
      return { };
    }
  });
  ```


* 父子组件传值：
  * 父组件
  
   ```html
   <component @add="addAge" :age="age" />
   ```
  
  ```js
  export default{
      data(){
          return{
      		age:20  //必须定义为响应式数据
  		}
      },
      methods:{
          addAge(newAge){
              this.age += newAge
          }
  	}
  }
  ```
  
  * 子组件
  
  ```html
  <h1> {{age}} </h1>
  <button @click="onClick"></button>
  ```
  
  ```js
  export default{
      props:{
          age:{
              type:Number
          }
      },
      methods:{
      	onClick(){
          	this.$emit('add',1)
      	}
      }
      
  }
  ```
  
* 兄弟组件传值

  * 创建一个vue的实例，并且导出为bus。
  * 在传值和接值的组件引入这个实例。  

  * 传值使用 `bus.$emit('标识'，data)`

  * 接收值使用`bus.$on('标识'，data=>())`

### v-model传值给子组件

* 子组件通过`modelValue`在`props`里接收
* 子组件在`methods`里，通过`this.$emit(update:modelValue, newValue)`进行数据更新
* 自定义名称`v-model:valueName`

### **组件中的v-model**

```jsx
/*APP.vue*/
<template>
    <Tab-bar v-model="select" :data="data"></Tab-bar>
    等同于
    <Tab-bar  :value="select" @input="select = $event"></Tab-bar>   Tab-bar组件
<template>

export default{
    data(){
    	return{
            index:0 ,
            data:[{label:'选项1'}...]
        }
    },
	computed:{
        select:{
            get(){  //getter
                return this.tabs[this.index].label
            },
            set(val){  //setter
                this.index = this.tabs.findIndex(tab => tab.label === val)
                //找到选中的tab赋值给index
            }
        }
	}
}

```

```jsx
/*Tab-bar.vue*/
<Tab v-for="..." :value="...">
   /* slot值 */
</Tab>

props:{
    data:Array
}
trigger(value){
    this.$emit('input',value)
}
```

```jsx
/*Tab.vue*/
<div @click="onClick">
    <slot></slot>
</div>

props:{
    value:String
}
onClick(){
    this.$parent.trigger(this.value)
}
```

### .sync操作符

* 父组件

  ```vue
  <document 
    :title="doc.title" 
    :content="doc.content" 
    @update:title="doc.title = $event"
    @update:content="doc.content = $event"
   />
  ```

* 子组件

  ```js
  changeTitle(){
    this.$emit('update:title','new title')
  }
  
  changeContent(){
    this.$emit('update:content','new content')
  }
  ```

* 使用.sync

  ```vue
  <document v-bind.sync="doc"/>
  ```

### 子组件调用父组件方法

* 调用`this.$parent.function`
* 调用`this.$emit(function, value)`，父组件监听这个事件
* 父组件吧方法传入子组件，子组件直接调用

### 模拟点击事件代理

```html
<ul @click="onClick">
    <li v-for="(item,index) in items" :key="index" :data-index="index" >
</ul>
```

```js
export default{
    methods:{
        onClick(e){
           const index = e.target.getAttribute('data-index') //获取点击事件对象的自定义属性
        }
    }
}

```

### 环境变量

* 根目录下创建 .env 配置环境变量

```js
process.env{
    NODE_ENV:''
    BASE_URL:''
}
//以VUE_APP_为前缀
```

* 根据环境配置请求地址

```js
const env = process.env.NODE_ENV
const config = {
    development:{
        baseURL: 'https://.....' 
    }，
    production:{
        baseURL: 'https://.....'
    }
}
export defualt{
    baseURL: config[env].baseURL
}
```

```js
import config from './config'
axios.get(config.baseURL + '../../')
    .then(res => {
        console.log(res.data)
})
```

### 快速传递属性给子组件

* 利用v-bind绑定多个属性

```vue
<template>
    <el-table-column
        v-for="column in columnList"
        :key="column.prop"
        :label="column.label"
        :prop="column.prop"
        :width="column.width"
    ></el-table-column>

    可以简写为

    <el-table-column
        v-for="column in columnList"
        :key="column.prop"
        v-bind=“column”
    ></el-table-column>
</template>

<script>
export default {
    data(){
        return {
            columnList:[
                {
                    label:'姓名',
                    prop:'name',
‘                   width:60,
                }
            ]
        }
    }
}
</script>
```

### 动态组件

```vue
<temlpate>
    <component :is="item" v-for="item in allComponents" :key="item" />
</temlpate>
<script>
    import comp1 from '@/components/Comp1'
    ...
    
    export default{
    	name:'App',
        data(){
            return{
                allComponents:['comp1','comp2','comp3'],
			};
        },
        components:{
            comp1, comp2, comp3
		}
    }
</script>
```

### 异步组件

* 不直接import

  ```js
  components{
      compName: ()=>import('path')
  }
  ```

* import写法

  ```js
  import Loading from './loading/'
  import Error from './error /'
  
  const AsyncList = () => ({
      component: import(/*webpackChunkName:"list"*/'./List'),
      loading: Loading,
      error: Error,
      delay: 200,       //延迟加载
      timeout: 3000     //加载失败显示Error组件
  })
  
  components:{
     AsyncList
  }
  ```

### 自动批量导入注册

  ~~~js
  /* /components/index.js */
  
  const requireAll = require.context('@/components',true,/\.vue$/)
  //匹配模块的名字组成的数组
  /* 插件对象提供install方法，
     app.use()的时候会调用这个插件的install方法 
     并把app实例传给install
  */
  const install = app =>{
      //把路径数组转化成模块对象
      requireAll
          .keys()
          .map(filename => requireAll(filename))
      	.forEach(({default:Component}) => app.component(Component.name,Component))
  }
  export default {
      install
  }
  ~~~

 

## Vue3

### 多根节点

* vue2只能有一个根，vue3支持多根节点

* vue2中vdom是单根树形结构，patch方法从根节点开始遍历，它要求只有一个根节点

  ```js
  //直接获取，没有考取数组的可能性
  const { type, ref, shapeFlag } = n2
  ```

* vue3引入了`Fragement`概念，如果发现有多根，会创建一个Fragement节点作为多根节点的父节点，patch直接遍历所有的这些子节点

  ```ts
  mountChildren(n2.children as VNodeArrayChildren,...)
  ```

  

### ref 和 reactive

* 两者均用于构造响应式数据

* `ref`：封装`RefImpl`类，并设置`get value`/`set value`，拦截用户的访问

  * 处理单值、原始值的响应式，接收`inner value`，返回响应式`Ref`对象

  * 可以是数组、对象，内部依然是`reactive`实现响应式
  * 在`JS`中需要加上`.value`，在视图中不需要

* `reactive`：使用`Proxy`代理对象并拦截操作

  * 处理对象类型的响应式，返回响应式代理对象
  * 接收`Ref`对象会自动脱`Ref`
  * 使用`...`会使其失去响应性，需使用`toRefs()`将其转化为`Ref`对象

### 插件

+ 语法:

  ```js
  const plugin ={
  install(app,option){
  //app 是vue的根实例，option是使用插件传入的参数
      do someting
  }
  }
  // 插件的使用方法
  createApp(App).use(plugin,option)
  ```

+ `app.config.globalProperties.$http = axios  ` 把属性或者方法挂在到vue的实例上面。



# VueRouter

### 路由模式

> 分为 history、hash两种模式

* 哈希模式携带`#`
* 如果跳转找不到的页面 history 会发送请求，hash 不会
* 自测使用hash，使用 history 会出现空白页
* hash模式
  1. hash变化触发网页跳转，不会刷新网页
  2. hash不会提交到server端
  3. 通过`window.onhashchange`监听hash变化
* history模式
  1. `window.onpopstate`监听浏览器的前进后退
  2. `history.pushState()`打开新路由，不刷新页面
  3. 需要后端支持

### router-link

* 链接是`‘/'`，从根路由开始，不带就从当前路由开始

```vue
<router-link :to="{name:'home'}"></router-link> //name
<router-link :to="{name:'/home'}"></router-link> //path
```

* 带参数

```vue
<router-link :to="{name:'home',params: {id: 1}}"></router-link>	//params 刷新后不保存
																 //只能配合 name
<router-link :to="{name:'home',query: {id: 1}}"></router-link> 	//query 刷新后会保存
																 //配合 path 和 name
<router-link :to="{name:'/home/:id}"></router-link>
//传递对象
<router-link :to="{name:'detail',query: {item: JSON.stringify(obj)}}"></router-link>
```

### 路由传参

* 有直接携带、`params` 和`query`三种方式

  1. 页面刷新数据不丢失

     ```js
     this.$router.push({
     	path:'page/${id}'
     })
     ```

     * 路由配置

     ```vue
     {
     	path:'/page/:id',
     	name:'page',
     	component: pageComp
     }
     ```

     * 获取方式

     ```js
     this.$route.params.id
     ```

     

  2. 页面刷新数据会丢失，通过 `name` 匹配路由，`params `传参

     ```js
     this.$router.push({
     	name:'page',
     	params:{
     		id:id
     	}
     })
     ```

     * params 只能用 name 来引入路由，路由必须配置name
     * 获取方式

     ```js
     this.$route.params.id
     ```

  3. 页面刷新数据会丢失，通过 `path` 匹配路由，``query`传参，参数会显示在 url 后面以`?`拼接

     ```js
     this.$router.push({
     	path:'/page',
     	query:{
     		id:id
     	}
     })
     ```

     * 获取方式

     ```js
     this.$route.query.id
     ```

### <a id="router-import">路由懒加载</a>

* 打包构建应用时，JS包会非常大，影响页面加载，需要利用路由懒加载把不同路由对应的组件分割成不同的代码块，被访问到时才加载

  ```js
  //webpackChunkName把若干路由分割到某些代码块中
  { 
      path:'/user/:id'}, 
      component: () => import (/* webpackChunkName:"user" */  './view/userDetails' )
  }
  ```

  * `vite`中结合`rollupOptions`定义分块

  ```js
  export default defineConfig({
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'group-user': [
              './src/UserDetails',
              './src/UserDashboard',
              './src/UserProfileEdit',
            ],
          },
      },
    },
  })
  ```

  > **不要**在路由中使用[异步组件](https://v3.vuejs.org/guide/component-dynamic-async.html#async-components)。路由组件本身就是动态导入的。

### 动态路由

```js
{
    path: 'xxx/:动态路由参数'
}
```

### route  和 router

* `$route`：当前路由信息对象，包含`path`、`params`、`query`、`hash`、`fullPath`、`matched`、`name`、等路由信息参数
* `$router`：全局路由实例，包含路由跳转方法、钩子函数等



### 导航守卫

* 全局钩子

```js
router.beforeEach(to, from, next) /* 跳转前进行判断拦截 */

beforeEach
beforeResolve
afterEach
```



# VueX

### Vuex基础

* 定义

  vue框架的状态管理插件

  * **state**：基本数据
  * **getters**：派生数据
  * **mutations**：==同步==提交更改数据的方法
  * **actions**：==异步==提交数据，包裹mutations
  * **modules**：模块化Vuex

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    items: [ ]
}

const getters = {
    items = state => state.items
}

const mutations = {
    PUSH(state, product){
        state.items.push(product)
    }
}

const actions = {
    asyncAdd({commit, state}, product){
        commit('PUSH', product)
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions, 
})
```

* 组件使用

```js
import { mapState, mapGetters, mapMutations, mapActtions } from 'vuex'

export default{
    computed: {
        ...mapState(['items']),
        ...mapGetters(['items'])
    },
    methods: {
        ...mapMutations ({
            push: 'PUSH',
        }),
        ...mapActions([ 'asyncAdd' ])
    }
}


```

### Module

* 项目规模变大需要，通过模块方式拆分开来维护，防止`store`对象过于庞大臃肿

  ```js
  const moduleA ={
      state: ()=>({...}),
      mutations: {...},
      actions: {...},
      getters: {...}
  }
  const moduleB = {...}
  ```

  * 创建store时通过modules组织多个模块

  ```js
  const store = createStore({
  	modules:{
  		a: moduleA,
          b: moduleB
  	}
  })
  ```

  * 访问状态需要加上子模块名称

  ```js
  store.state.a //moduleA的状态
  store.state.b //moduleB的状态
  ```

  * 默认情况下`getters`、`mutations`、`actions`在全局命名空间

  ```js
  store.getters.function
  store.commit('function')
  store.dispatch('function')
  ```

  * 可以通过`namespaced`来设置命名空间

  ```js
  const moduleA ={
  	namespaced: true,
      getters:{
          function(){}
      }
  	...
  	modules:{
  		post:{
  			namespaced: true,getters:{
          		function(){}
      		}	
  			...
  		}
  	}
  }
  
  store.getters['moduleA/funciton']
  store.getters['moduleA/post/funciton']
  ```

  



### 状态持久化

* 一般用本地存储的方案**localstorage**，或是第三方插件

  ```js
  import Vue from 'vue'
  import Vuex from 'vuex'
  
  Vue.use(Vuex)
  
  const store = new Vuex.Store({
      state: {
          status: false
      },
      mutations: {
          markStatus(state){
              state.status= true
              /* 设置storage */
              window.localStorage.status = JSON.stringify(true}
          },
          setStatus(state, status){
              state.status = status
          }
      },
      actions: {
          loadStatus({commit}){
              const status = JSON.parse(window.localStorage.status);
              commit('setStatus', status)
          }
      }
  })
  ```

  ```jsx
  <template>
      <h1> {{ $store.state.status}}</h1>
      <button @click="onClick" />
  </template>
  
  mounted(){
      this.$store.dispatch('loadStatus')
  },
  methods:{
      onClick(){
          this.$store.commit('markStatus')
      }
  ```

  

### 日志插件

```jsx
import Vue from 'vue'
import Vuex from 'vuex'
import { createrLogger } from 'vuex'

Vue.use(Vuex)

/* 环境判断 */
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
    modules: {},
    strict: debug,
    plugins :debug ? [ createrLogger() ] : []
})
```

# Vite

### 起步

```shell
# npm 6.x
$ npm init vite@latest <project-name> --template vue

# npm 7+，需要加上额外的双短横线
$ npm init vite@latest <project-name> -- --template vue

$ yarn create vite <project-name> --template vue

$ pnpm create vite <project-name> -- --template vue
```



# 最佳实践

### 编码风格

* 命名组件使用”多词“避免和HTML元素冲突

  ```jsx
  export default {
    name: 'TodoItem',
    // ...
  }
  ```

* 组件`data`必须为函数

  ```jsx
  export default {
    data () {
      return {
        foo: 'bar'
      }
    }
  }
  ```

* `prop`定义尽量详细

  ```jsx
  props: {
    status: {
      type: String,
      required: true,
      validator: function (value) {
        return [
          'syncing',
          'synced',
          'version-conflict',
          'error'
        ].indexOf(value) !== -1
      }
    }
  }
  ```

* `v-for`设置`key`

  ```jsx
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      {{ todo.text }}
    </li>
  </ul>
  ```

* 避免`v-if`和`v-for`一起使用

  ```jsx
  <ul v-if="shouldShowUsers">
    <li v-for="user in users" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
  ```

* 组件样式作用域

  1. `scoped`

  2. CSS Modules

     ```jsx
     <template>
       <button :class="[$style.button, $style.buttonClose]">X</button>
     </template>
      
     <style module>
     .button {
       border: none;
       border-radius: 2px;
     }
     
     .buttonClose {
       background-color: red;
     }
     </style>
     ```

* 私有`property`名

  ```jsx
  var myGreatMixin = {
    methods: {
      $_myGreatMixin_update: function () {
        // ...
      }
    }
  }
  ```

  ```jsx
  var myGreatMixin = {
    methods: {
      publicMethod() {
        // ...
        myPrivateFunction()
      }
    }
  }
  
  function myPrivateFunction() {
    // ...
  }
  
  export default myGreatMixin
  ```

* 自闭和组件

  ```jsx
  <!-- 在单文件组件、字符串模板和 JSX 中 -->
  <MyComponent/>
  <!-- 在 DOM 模板中 -->
  <my-component></my-component>
  ```

* `prop`大小写

  ```jsx
  props: {
    greetingText: String
  }
  <WelcomeMessage greeting-text="hi"/>
  ```

* `attribute`元素分多行撰写

  ```jsx
  <img
    src="https://vuejs.org/images/logo.png"
    alt="Vue Logo"
  >
  ```

* 复杂计算属性分割为更简单的 `property`

  ```jsx
  computed: {
    basePrice: function () {
      return this.manufactureCost / (1 - this.profitMargin)
    },
    discount: function () {
      return this.basePrice * (this.discountPercent || 0)
    },
    finalPrice: function () {
      return this.basePrice - this.discount
    }
  }
  ```

* 统一指令缩写

  ```jsx
  <input
    v-bind:value="newTodoText"
    :placeholder="newTodoInstructions"
  >
  <input
    v-on:input="onInput"
    @focus="onFocus"
  >
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
  
  <template #footer>
    <p>Here's some contact info</p>
  </template>
  ```

# 性能优化

### 性能优化

* 服务端渲染（SSR）/  静态网站生成（SSG）

* 组件缓存

  * `keep-alive`缓存页面，避免重复创建实例，且保留组件状态

  ```jsx
  <router-view v-slot="{ Component }">
    <keep-alive>
       <component :is="Component"></component>
     </keep-alive>
  </router-view>
  ```

  * `v-show`复用DOM，避免复杂组件重复创建

* 长列表优化

  * 采用虚拟滚动，只渲染少部分区域
  * `vue-virtual-scroller`
  * `vue-virtual-scroller-grid`s

* [路由懒加载](#router-import)、代码分割

  * 有效拆分App尺寸，分包打包，访问时异步加载

  ```js
  const router = createRouter({
      routes: [
          { path:'/foo', component: () => import(/* webpackChunkName:"" */ './Foo.vue') }
      ]
  })
  ```

* 其他优化

  * `v-for`和`v-if`不同时使用

  * 不再变化的数据使用`v-once`

    ```jsx
    <!--single element-->
    <span v-once>{{msg}}</span>
    
    <!--children-->
    <div v-once>
        <h1>comment</h1>
        <p>{{msg}}</p>
    </div>
    
    <!--component-->
    <component v-once></component>
    
    <!--v-for-->
    <li v-for="i in list" v-once>{{i}}</li>
        
    ```

  * 按条件跳过更新时使用`v-memo`

    * 下面例子中列表只会更新选中状态的变化项

    ```jsx
    <div 
        v-for="item in list" 
        :key="item.id" 
        v-memo="{ item.id===selected }"
    >
        ID: {{item.id}}
        selected: {{ item.id===selected }}
    </div>
    ```

  * 自定义事件、DOM事件及时销毁

  * 图片懒加载 `vue-lazyload`
  
    ```jsx
    <img v-lazy="xxxx.png">
    ```
  
  * 第三方组件库按需加载(element-plus)
  
  * 组件分割策略：较重的状态组件适合拆分
  
    * 同时也不宜过度拆分组件，尤其是组件实例消耗大于DOM节点的不需要抽离
  
  1. 合理使用computed
  2. data层级不要太深
  3. 使用vue-loader在开发环境做模板编译（预编译）
  5. 前端通用的性能优化，如图片懒加载使用
