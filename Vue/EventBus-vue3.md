## **EventBus(全局事件总线)**
EventBus - Vue3
```
class Bus {
	list: { [key: string]: Array<Function> };
	constructor() {
		// 收集订阅信息,调度中心
		this.list = {};
	}

	// 订阅
	$on(name: string, fn: Function) {
		this.list[name] = this.list[name] || [];
		this.list[name].push(fn);
	}

	// 发布
	$emit(name: string, data?: any) {
		if (this.list[name]) {
      		this.list[name].forEach((fn: Function) => {
        	fn(data);
      });
    }
	}

	// 取消订阅
	$off(name: string) {
		if (this.list[name]) {
			delete this.list[name];
		}
	}
}
<<<<<<< HEAD
export default new Bus();
=======
export default new Bus();
>>>>>>> c38a18ae1c1d2ff4d33831d99dff05b2d05e0364
```
```
export default defineComponent({
  setup() {
    function changeMenu() {
      Bus.$emit("change-menu");
    }

    onBeforeUnmount(() => {
      Bus.$off("change-menu");
    });

    return { changeMenu };
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> c38a18ae1c1d2ff4d33831d99dff05b2d05e0364
```
```
export default defineComponent({
  setup() {
    onMounted(() => {
      Bus.$on("change-menu", () => {
        isCollapse.value = !isCollapse.value;
      });
    });
    return { };
  }
<<<<<<< HEAD
});
=======
});
>>>>>>> c38a18ae1c1d2ff4d33831d99dff05b2d05e0364
```
