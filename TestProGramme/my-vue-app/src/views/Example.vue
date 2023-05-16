<template>
  <div>form1：{{ form1 }}</div>
  <div>form2：{{ form2 }}</div>
  <div>list1：{{ list1 }}</div>
  <div>list2：{{ list2 }}</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

interface IForm {
  name?: string;
  age?: number;
}

const form1 = ref<IForm>({
  age: 18,
});
const form2 = reactive<IForm>({
  age: 18,
});

const list1 = ref<number[]>([]);
const list2 = reactive<number[]>([0, 1, 2]);

onMounted(() => {
  form1.value.name = "name1";
  form2.name = "name2";

  delete form1.value.age;
  delete form2.age;

  list1.value[0] = 2;
  list2[0] = 2;
});
</script>
