# Vue

### Vue的特点

* 轻量级、速度快、易上手、低耦合、可复用、独立开发、文档全

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
    beforeDestroy(){},	//实例销毁前
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



### 获取数据在哪一个周期

`created`、`beforeMount`、`mounted`

## Vue2响应式

* 通过==数据劫持==、组合、==发布订阅==的方式实现双向绑定
* Vue2使用`Object.defineProperty`，Vue3使用Proxy，性能更好，不需要循环遍历

```js
let data = {
    user:"name",
    age:30
}

//实例
let _this = {}

for(let item in data){
    Object.defineProperty(_this, item, {
            get(){
                return data['item']
            },
            set(newVal){
                //不可直接修改_this，会出现死循环
                //修改data中的数据
                data[item] = newVal
            }
        }
    )
}
```

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

   

## SPA和MPA

* 单页面**SPA**，只有一个主页面的应用，浏览器一开始就加载所有的JTML、CSS、JS，页面由路由动态载入，仅刷新局部资源

  1. ==用户体验好，快，不需要重新加载真个页面==

  2. ==不利于**SEO**，页面复杂度高，初次加载性能不太好==

* 多页面**MPA**，以一个应用多个页面，跳转时整个页面刷新

## mixin

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



## ref获取DOM

```js
<Test ref="test" />

this.$refs.test.$el //获取组件渲染后的DOM
```

## 局部样式作用

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



## keep-alive

* 缓存页面，频繁切换时不需要重新渲染

## vue-loader

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

* 给循环的``VNode`加上唯一标识，`diff`算法可以正确识别这个节点，使页面渲染更迅速

### v-for和v-if优先级

==Vue2==v-for优先级更高，两个不能一起写，==Vue3==相反

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

  

### nextTick

* 动态属性修改后，无法获取修改后的数据，用`nextTick`获取更新后的DOM元素

### 获取事件对象

`<button @click="function($event)"></button >`

### Computed、watch、methods的区别

* computed：==有缓存==，依赖其他属性值，只有依赖值发生变化，下一次获取这个computed值时才会重新计算

  **多个因素影响一个**

  需要进行数值计算时用，有缓存避免每次获取值时重新计算

* watch：==无缓存==，用于观察数据，数据变化时执行回调进行后续操作

  **一个因素影响多个变化**

  需要在数据变化时进行异步或开销较大的操作时用，watch允许异步操作，比如访问API

* methods：==无缓存==，调用总会执行

## vue2数组方法

* `push`、`pop`、`shift`、`unshift`、`splice`、`sort`、`reverse`

## 组件中data必须是函数

* 函数的形式组件每次会返回新的对象，不会公用一个对象

## 组件传值

* 通过`Vuex`传值
* 通过`eventBus`传值

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

### 子组件调用父组件方法

* 调用`this.$parent.function`
* 调用`this.$emit(function, value)`，父组件监听这个事件
* 父组件吧方法传入子组件，子组件直接调用

## 模拟点击事件代理

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

## 环境变量

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

## 快速传递属性给子组件

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

## 动态组件

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
            comp1,comp2,comp3
		}
    }
</script>
```



# VueRouter

## 路由模式

> 分为 history、hash两种模式

* 哈希模式携带`#`
* 如果跳转找不到的页面 history 会发送请求，hash 不会
* 自测使用hash，使用 history 会出现空白页

## router-link

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

     

  

### 动态路由

```js
{
    path: 'xxx/:动态路由参数'
}
```

### route  和 router

* `$route`：当前路由信息对象，包含`path`、`params`、`query`、`hash`、`fullPath`、`matched`、`name`、等路由信息参数
* `$router`：全局路由实例，包含路由跳转方法、钩子函数等



### 导航钩子/导航守卫

* 全局钩子

```js
router.beforeEach(to, from, next) /* 跳转前进行判断拦截 */

beforeEach
beforeResolve
afterEach
```



# VueX

## Vuex基础

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

## 状态持久化

* 一般用本地存储的方案**localstorage**，或是第三方插件

## 日志插件

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
