import Vue from 'vue';
import CalcTargetPosition from '../../static/utils/CalcTargetPosition';
import RemoveDom from '../../static/utils/RemoveDom';

import DBX from './DropBox';

const DBXExtend = Vue.extend(DBX);

let vm = null; // 当前实例

const DropPanel = (options) => {
    const { tag, propsData } = options;
    const dom = document.body;
    vm = new DBXExtend({ propsData }); // 实例化
    vm = vm.$mount(); // 挂载

    vm.tag = tag;
    vm.dom = dom;

    dom.appendChild(vm.$el); // 插入dom

    return vm;
};
DropPanel.remove = RemoveDom;
DropPanel.resetPosition = (vm) => {
    const { status, data = [] } = vm;
    const width = DropPanel.getWidth(status, data),
        height = status.includes('multiple') ? 250 : 208;
    const { X, Y, P } = CalcTargetPosition(vm.tag, vm.dom, height, width);
    vm.position = P;
    // 设置位置
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;
};

// 获取宽度
DropPanel.getWidth = (status, data) => {
    const { body } = document;
    const tag = document.createElement('div');
    tag.className = 'p-drop-box';
    tag.style.padding = '0';
    tag.style.border = '0';
    tag.style.height = '0';
    tag.style.zIndex = '-100';
    let html = '<div class="p-drop-box-list">';
    data.forEach((d) => {
        html += `<article class="p-drop-box-item"><section class="p-drop-box-text">${d.name}</section></article>`;
    });
    html += '<div>';

    tag.innerHTML = html;
    body.appendChild(tag);
    const { width } = tag.getBoundingClientRect();
    body.removeChild(tag);
    return status.includes('single') ? width : (width + 20);
};

export default DropPanel;
