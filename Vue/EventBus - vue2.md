## **EventBus(全局事件总线)**
EventBus - Vue2
```
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
```
// 发送消息
this.$EventBus.$emit(channel: string, callback(payload1,…))

// 监听接收消息
this.$EventBus.$on(channel: string, callback(payload1,…))

// 移除监听
this.$EventBus.$off(channel: string)
this.$EventBus.$off()
```
```
/* A.vue */
<button @click="sendMsg()" />

 methods: {
    sendMsg() {
      this.$EventBus.$emit("receiveMsg", '来自A的消息');
    }
  }
```
```
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