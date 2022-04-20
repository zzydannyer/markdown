/* vue的自定义指令 */
<template>
  <div
    v-nav-change="{
      tabClass: 'tab-item',
      activeClass: 'active',
      currentIndex,
    }"
  >
    <!-- <a
      href="javascript:;"
      :class="['tab-item', { active: index === currentIndex }]"
      v-for="(item, index) of tabData"
      :key="item.id"
      @click="tabChange(index)"
    > -->
    <a
      href="javascript:;"
      class="tab-item"
      v-for="(item, index) of tabData"
      :key="item.id"
      @click="tabChange(index)"
    >
      {{ item.title }} /
    </a>
  </div>
  <div>
    <p>{{ tabContent }}</p>
  </div>
  <div
    v-nav-change="{
      tabClass: 'gender',
      activeClass: 'gender-active',
      currentIndex: currentGenderIndex,
    }"
  >
    <a href="javascript:;" class="gender" @click="genderChange(0)">男</a>
    <a href="javascript:;" class="gender" @click="genderChange(1)">女</a>
  </div>
</template>

<script>
import navChange from "../directives/navChange";

export default {
  name: "MyTab",
  directives: {
    navChange,
  },
  props: {
    tabData: {
      type: Array,
      default() {
        return []; /* 引用值最好用函数 */
      },
    },
    initialIndex: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      currentIndex: this.initialIndex,
      currentGenderIndex: 0,
    };
  },
  computed: {
    tabContent() {
      return this.tabData[this.currentIndex].content;
    },
  },
  methods: {
    tabChange(index) {
      this.currentIndex = index;
    },
    genderChange(index) {
      this.currentGenderIndex = index;
    },
  },
};
</script>

<style lang="scss">
a {
  text-decoration: none;
  color: #777;
  &.active {
    color: #000;
  }
  &.gender-active {
    color: red;
  }
}
</style>