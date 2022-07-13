import Vue from 'vue';
import Popover from './depend/PopoverModal';
import RemoveDom from '../static/utils/RemoveDom';

const PopoverExtend = Vue.extend(Popover);

let PopoverExtendVm = null;
/**
 * flag 默认居中
 * 可选【top-center，top-left，top-right，bottom-left，bottom-center，bottom-right】
 */
const calcPopoverPosition = (triggerDom, flag, selfDom) => {
    const { pageYOffset, pageXOffset } = window;
    const {
        top, left, height, width
    } = triggerDom.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
    let targetOffsetY = pageYOffset + top + height,
        targetOffsetX = left + pageXOffset;
    const [py, px] = flag.split('-'),
        selfDomWidth = selfDom.clientWidth,
        selfDomHeight = selfDom.clientHeight,
        positionObj = {
            left: targetOffsetX,
            right: targetOffsetX - selfDomWidth + width
        };
    if (py === 'top') targetOffsetY = targetOffsetY - selfDomHeight - height - 12;
    else targetOffsetY += 12;
    if (px === 'center') {
        targetOffsetX = targetOffsetX - (selfDomWidth / 2) + width / 2;
    } else {
        if (px === 'left') targetOffsetX = positionObj[px] - Math.ceil(selfDomWidth * 0.13) + (width / 2) - 5;
        else targetOffsetX = positionObj[px] + Math.ceil(selfDomWidth * 0.13) - (width / 2) + 5;
    }
    return { X: targetOffsetX < 0 ? 0 : targetOffsetX, Y: targetOffsetY };
};
const PopoverExtendInit = (options) => {
    // const { tag, params } = options; // 解构参数
    const { params } = options; // 解构参数

    PopoverExtendVm = new PopoverExtend({
        data: params
    }).$mount(); // 实例化并挂载

    document.body.appendChild(PopoverExtendVm.$el); // 插入dom

    return PopoverExtendVm;
};
PopoverExtendInit.renderPosition = (vm) => {
    const { X, Y } = calcPopoverPosition(vm.triggerDom, vm.placement, vm.$el);
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;
};
PopoverExtendInit.remove = (vm) => {
    RemoveDom(vm);
};

export default PopoverExtendInit;
