<template>
  <div>鼠标位置：X {{ x }} / Y {{ y }}</div>
</template>

<script lang="ts" setup>
import useMousePosition from "../Hooks/mousePosition";

const { x, y } = useMousePosition();
</script>
