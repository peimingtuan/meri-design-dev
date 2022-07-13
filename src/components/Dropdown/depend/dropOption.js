import Vue from 'vue';

import CalcTargetPosition from '../../static/utils/CalcTargetPosition';
import RemoveDom from '../../static/utils/RemoveDom';

import D from './DOption';

const DOptionExtend = Vue.extend(D);

let vm = null; // 当前实例

const DropOption = (options) => {
    const { tag, propsData } = options;
    const dom = document.body;
    vm = new DOptionExtend({ propsData }); // 实例化
    vm = vm.$mount(); // 挂载

    vm.tag = tag;
    vm.dom = dom;

    dom.appendChild(vm.$el); // 插入dom

    return vm;
};
// 获取宽度
const GetWidth = (data, minWidth, maxWidth) => {
    const { body } = document;
    const tag = document.createElement('div');
    tag.className = 'p-drop-content';
    if (minWidth) tag.style.minWidth = `${minWidth}px`;
    if (maxWidth) tag.style.maxWidth = `${maxWidth}px`;
    tag.style.height = '0';
    tag.style.zIndex = '-100';
    let html = '<div class="p-drop-option">';
    data.forEach((d) => {
        html += `<section class="p-drop-option-item"><span>${d.name}</span></section>`;
    });
    html += '</div>';

    tag.innerHTML = html;
    body.appendChild(tag);
    const { width } = tag.getBoundingClientRect();
    body.removeChild(tag);
    return width;
};

DropOption.remove = RemoveDom;
DropOption.resetPosition = vm => {
    const {
        data = [], minWidth, maxWidth, alignRight, translateX, maxCount = 5,
        $refs: { dropOption }
    } = vm;
    const width = (minWidth && maxWidth && minWidth === maxWidth) ? maxWidth : GetWidth(data, minWidth, maxWidth);

    // const baseHei = 16 + (openSearch && 40), // 基本高度
    const h = data.length * 38,
        maxHeiByCount = maxCount * 38; // 最大容纳高度
    let height;
    if (h < maxHeiByCount) height = h;
    else height = maxHeiByCount;
    const { X, Y, P } = CalcTargetPosition(vm.tag, vm.dom, height, width, alignRight);
    vm.position = P;
    // 设置位置
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X + Number(translateX)}px`;
    dropOption.style.maxHeight = `${maxHeiByCount}px`;
};

export default DropOption;
