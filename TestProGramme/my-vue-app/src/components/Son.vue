<template>
  <h3>i am son</h3>
  <p>son-msg: {{ msg }}</p>

  <button @click="handleClick">son button</button>
</template>

<script lang="ts" setup>
defineProps<{ msg: string }>();

const emit = defineEmits(["receive"]);

const handleClick = () => {
  emit("receive", "son -> app");
};
</script>
