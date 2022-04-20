## **beforeDestroyed**
* 用于被清除隐藏的,或容易被遗忘的执行任务
```
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