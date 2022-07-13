import Vue from 'vue';

import RemoveDom from '../../static/utils/RemoveDom';

import InputPopover from './InputPopover.vue';

const InputPopoverExtend = Vue.extend(InputPopover);

let vm = null; // 当前实例
const calcPopoverPosition = (triggerDom, flag, selfDom) => {
    // 获取页面滚动的距离
    const { pageYOffset, pageXOffset } = window;
    // 获取数字的容器以及相应数据
    const span = triggerDom.querySelector('span');
    const { left: NumberX, width: NumberWidth } = span.getBoundingClientRect();

    const { left: triggerX, y, height: tagHeight } = triggerDom.getBoundingClientRect();
    const { left: parentX, width: parentWidth } = triggerDom.offsetParent.getBoundingClientRect();
    const { width: popoverWidth, height: popoverHeight } = selfDom.getBoundingClientRect();
    let targetOffsetX = pageXOffset + NumberX - popoverWidth / 2 + NumberWidth / 2 - 2,
        targetOffsetY,
        pointOffsetX = 'calc(50% - 2px)';
    if (targetOffsetX < 0) {
        targetOffsetX = triggerX;
        pointOffsetX = `${NumberX - triggerX + NumberWidth / 2 - 4}px`;
    }
    if ((popoverWidth + targetOffsetX) > document.body.scrollWidth) {
        targetOffsetX = parentX + parentWidth - popoverWidth;
        pointOffsetX = `${popoverWidth - parentWidth + (NumberX - triggerX) + 8}px`;
    }
    if (flag === 'top') {
        targetOffsetY = pageYOffset + y - popoverHeight - 15;
    } else {
        targetOffsetY = pageYOffset + y + tagHeight + 15;
    }
    return { X: targetOffsetX, Y: targetOffsetY, PX: pointOffsetX };
};

const Popover = (options) => {
    const { params } = options;
    vm = new InputPopoverExtend({
        data: params
    }).$mount(); // 实例化并挂载

    document.body.appendChild(vm.$el); // 插入dom

    return vm;
};
Popover.renderPosition = (vm) => {
    const { X, Y, PX } = calcPopoverPosition(vm.triggerDom, vm.tipPlace, vm.$el);
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;
    vm.$el.querySelector('.p-popover-point').style.left = PX;
};
Popover.remove = RemoveDom;

export default Popover;
