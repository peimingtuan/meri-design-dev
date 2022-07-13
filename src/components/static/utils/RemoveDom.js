// 移除dom
const RemoveDom = (vm) => {
    if (!vm) return;
    if (vm._isDestroyed) return;
    vm.$destroy();
    const dom = vm.$el;
    if (dom) dom.parentNode.removeChild(dom);
};

export default RemoveDom;
