<template>
  <h1>i am gp</h1>
  <Father msg="App -> Son" @receive="handleReceive" />
  <mouse-position />
  <Example />
</template>

<script lang="ts" setup>
import Father from "@/components/Father.vue";
import MousePosition from "@/views/MousePosition.vue";
import Example from "@/views/Example.vue";

const handleReceive = (msg:string) => {
  alert("get msg from son " + msg);
};
</script>

<style>
Fragament {
  color: red;
}
</style>
