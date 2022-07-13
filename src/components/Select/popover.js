import Vue from 'vue';
import popover from './popover.vue';
import { calcTipPosition } from '../static/utils/PopoverPositionCalc';

const PopoverExtend = Vue.extend(popover); // 继承Vue

let PopoverVm = null;

const createPopover = (options) => {
    const { tag, props } = options;
    const pos = tag.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
    props.pos = pos;
    const { tipPlace } = props;
    delete props.tipPlace;
    PopoverVm = new PopoverExtend({ data: props, propsData: { tipPlace } });
    PopoverVm = PopoverVm.$mount();
    const bodyDom = document.body;
    bodyDom.appendChild(PopoverVm.$el);
    return PopoverVm;
};

createPopover.resetPosition = (pDom, tDom, leftW, tipPlace, distance) => calcTipPosition(pDom, tDom, leftW, tipPlace, distance);
createPopover.remove = (vm) => {
    if (!vm) return;
    if (vm._isDestroyed) return;
    vm.$destroy();
    const dom = vm.$el;
    if (dom) dom.parentNode.removeChild(dom);
};
export default createPopover;
