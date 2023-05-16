#### 实装

1. defineProps支持==外部引入==的类型和==条件==类型

   ```vue
   <script setup lang="ts">
   import type { Props } from './foo'
   
   defineProps<Props & true extends true ? { extraProp?: string } : {}>()
   </script>
   ```

2. 组件内泛型

   ```vue
   <script setup lang="ts" generic="T, U extends string">
   defineProps<{
     names: U[]
     age: T
   }>()
   </script>
   ```

   ```vue
   <MyComponent :names="['name1', 'name2']" :age="18" />
   ```

   * defineComponent写法

   ```tsx
   import { defineComponent } from 'vue';
   
   export default defineComponent(<T,>(props: { msg: T }) => {
   	return () => <div> { props.msg } </div>
   })
   ```

3. defineEmit写法变更

   ```ts
   // BEFORE
   const emit = defineEmits<{
     (e: 'foo', id: number): void
     (e: 'bar', name: string, ...rest: any[]): void
   }>()
   ```

   ```ts
   // AFTER
   const emit = defineEmits<{
     foo: [id: number]
     bar: [name: string, ...rest: any[]]
   }>()
   ```

4. defineSlots

   ```vue
   <template>
   	<SlotComponent>
           <template v-slot="{ msg }">{{ msg }}</template>
           <template v-slot:item="{ id }">{ id }</template>
       </SlotComponent>
   </template>
   ```

   

   ```vue
   <template>
   	<div>
           <slot :msg="'msg'"></slot>
           <slot name="item" :id="1"></slot>
       </div>
   </template>
   
   <script setup lang="ts">
   defineSlots<{
     default?: (props: { msg: string }) => any
     item?: (props: { id: number }) => any
   }>()
   </script>
   ```

### 实验性

1. 解构defineProps

   ```vue
   <script setup>
   import { watchEffect } from 'vue'
   
   const { msg = 'hello' } = defineProps(['msg'])
   
   watchEffect(() => {
     console.log(`msg is: ${msg}`)
   })
   </script>
   
   <template>{{ msg }}</template>
   ```

   