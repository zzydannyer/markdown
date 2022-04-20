/* vue的自定义指令 */
export default {
    mounted(el, bindings, vNode) {
        console.log(el, bindings, vNode);
        const { tabClass, activeClass, currentIndex } = bindings.value

        el.tabClass = tabClass;
        el.activeClass = activeClass;
        el.tabItems = el.getElementsByClassName(tabClass)

        el.tabItems[currentIndex].className = `${tabClass} ${activeClass}`
    },
    updated(el, bindings, vNode) {
        const { currentIndex } = bindings.value,
            oldIndex = bindings.oldValue.currentIndex,
            { tabClass, activeClass, tabItems } = el

        tabItems[oldIndex].className = tabClass
        tabItems[currentIndex].className = `${tabClass} ${activeClass}`

    }
}

