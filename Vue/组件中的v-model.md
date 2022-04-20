## **组件中的v-model**

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
