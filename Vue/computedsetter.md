## **computed setter**
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