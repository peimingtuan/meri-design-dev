import Vue from 'vue';
import IsIE from '../static/utils/IsIE';
import RemoveDom from '../static/utils/RemoveDom';

import PopoverTipVue from './PopoverTip';

import GetScrollbarWidth from '../static/utils/GetScrollbarWidth';

const PTExtend = Vue.extend(PopoverTipVue);

let vm = null;

// 获取popoverTip宽高
const CountWh = (vm) => {
    const { content, split } = vm,
        contentArr = content.split('、');

    const { body } = document;
    const element = document.createElement('div');
    element.className = 'p-popover-tip';
    element.style.left = '0';
    element.style.bottom = '0';
    element.style.opacity = '0';
    element.style.zIndex = '-100';
    let html = '<section class="p-popover-tip-content">';
    if (split) {
        contentArr.forEach(d => {
            html += `<article class="p-popover-tip-content-item"><span class="p-popover-tip-item-text">${d}</span></article>`;
        });
    } else {
        html += `<article class="p-popover-tip-content-words">${content}</article>`;
    }
    html += '</section>';
    element.innerHTML = html;

    body.appendChild(element);
    const { width, height } = element.getBoundingClientRect();
    if (IsIE()) element.removeNode(true);
    else element.remove();
    const scrollWidth = GetScrollbarWidth();

    return { width, height, scrollWidth };
};

// 计算位置
const CalcPopoverTipPosition = (triggerDom, targetParent, targetHeight) => {
    const { clientHeight } = targetParent, // 当前触发器父级的宽高
        { pageYOffset } = window; // 基于window对象滚动的距离
    const {
        top, height
    } = triggerDom.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
    let targetOffsetY,
        P = true; // 动画执行方向 - 默认向下

    // 1.计算top位置
    const triggerPositionTop = top - 8, // 触发器距离顶部的距离
        triggerPositionBtm = clientHeight - (top + height + 8); // 触发器距离底部的距离
    if (triggerPositionTop >= targetHeight) {
        // 触发器距离顶部的距离 大于等于 目标元素高度，下拉列表向上弹出
        targetOffsetY = triggerPositionTop - targetHeight + pageYOffset;
        P = false;
    } else if (triggerPositionBtm >= targetHeight) {
        // 触发器距离底部的距离 大于等于 目标元素高度，下拉列表向下弹出
        targetOffsetY = top + height + 8 + pageYOffset;
    } else {
        // 上下都不满足条件，位置距离页面底部为0
        // 下拉列表向下弹出
        targetOffsetY = clientHeight - targetHeight + pageYOffset;
    }

    // Y-top位置，P-动画执行方向
    return { Y: targetOffsetY, P };
};

const PopoverTip = (options) => {
    const { propsData } = options;
    if (!propsData.content) return;
    const { tag, countTag } = options;
    const dom = document.body;
    vm = new PTExtend({ propsData }); // 实例化
    vm = vm.$mount(); // 挂载

    vm.tag = tag;
    vm.countTag = countTag;
    vm.dom = dom;

    dom.appendChild(vm.$el); // 插入dom
    return vm;
};

PopoverTip.remove = RemoveDom;
PopoverTip.resetPosition = (vm) => {
    if (!vm.content) return;
    const { innerWidth, pageXOffset } = window,
        { tag, countTag, dom } = vm,
        // 触发器位置参数
        { left: tagLeft, width: tagWidth } = tag.getBoundingClientRect(),
        // 数字位置参数
        { left: cLeft, width: cWidth } = countTag.getBoundingClientRect();

    // 当数字被浏览器遮挡就不在弹窗popover
    if (innerWidth <= cLeft + cWidth / 2 || innerWidth <= cWidth || cLeft < 0) return;
    // 获取popover的宽高
    const { width, height, scrollWidth } = CountWh(vm),
        // 计算popover位置
        { Y, P } = CalcPopoverTipPosition(tag, dom, height);
    vm.position = P;
    // 设置popover位置
    // vm.$el.style.maxWidth = `${width}px`;
    vm.$el.style.top = `${Y}px`;
    const triangle = vm.$el.lastChild;
    let popoverLeft = 0,
        triangleLeft;
    if (width === innerWidth) {
        // popover的宽度等于window宽度
        if (pageXOffset > 0) popoverLeft = 0;
        triangleLeft = cLeft + cWidth / 2 - 6;
    } else {
        // popover的宽度小于window宽度
        if (tagLeft === 0) {
            popoverLeft = 0;
        } else {
            const discoverWidth = innerWidth - tagLeft; // 触发器显示出来的宽度
            const centerPlace = cLeft + cWidth / 2, // 数字中心位置
                popoverLeftWidth = width / 2; // popover中心左边宽度
            if (centerPlace < popoverLeftWidth) {
                popoverLeft = 0;
            } else {
                if (width <= tagWidth) {
                    // popover的宽度小于等于触发器宽度
                    if (width <= discoverWidth) popoverLeft = centerPlace - popoverLeftWidth;
                    else popoverLeft = innerWidth - width;
                } else {
                    // popover的宽度大于触发器宽度
                    if (centerPlace >= popoverLeftWidth) {
                        // 右边剩下的宽度小于等于popover一半的宽度
                        if (innerWidth - centerPlace <= popoverLeftWidth) popoverLeft = innerWidth - width - scrollWidth;
                        else popoverLeft = centerPlace - popoverLeftWidth;
                    } else {
                        popoverLeft = 0;
                    }
                }
            }
        }
        triangleLeft = cLeft - popoverLeft + cWidth / 2 - 6;
    }
    vm.$el.style.left = `${popoverLeft + pageXOffset}px`;
    triangle.style.left = `${triangleLeft}px`;
    vm.show = true;
};

export default PopoverTip;
