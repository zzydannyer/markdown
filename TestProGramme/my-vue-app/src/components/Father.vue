<template>
  <h2>i am father</h2>
  <p>father-attrs： {{ attrs.msg }}</p>
  <Son v-bind="attrs" />
</template>

<script lang="ts" setup>
import Son from "./Son.vue";
import { useAttrs } from "vue";

const attrs: any = useAttrs();
</script>
