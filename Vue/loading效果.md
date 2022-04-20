## **loading效果**
```
<div v-show="!data.length">
    <loading />
</div>
```
```
<p>{{title}}</p>

props:{
    title:{
        type:String,
        default:'正在加载中...'
    }
}
```