 ## **封装函数f,使函数的this指向指定对象**
方案1：

```
function bindThis(f，oTarget){
    return function (){
        return f.apply(oTarget,arguments);
        };
}
```
方案2：

```
function bindThis(f，oTarget){
    return f.bind(oTarget);
}
```


方案3：

```
function bindThis(f, oTarget) {
    return function(x,y){
        return f.call(oTarget,x,y);
    };
<<<<<<< HEAD
}
=======
}
>>>>>>> c38a18ae1c1d2ff4d33831d99dff05b2d05e0364
```