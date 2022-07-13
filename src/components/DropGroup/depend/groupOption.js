import Vue from 'vue';

import CalcTargetPosition from '../../static/utils/CalcTargetPosition';
import RemoveDom from '../../static/utils/RemoveDom';

import G from './GOption';

// 计算数据长度-计算数据高度
const CountLen = (data) => {
    const arr = [];
    data.forEach((d) => {
        arr.push(d);
        if (d && d.children && d.children.length) {
            d.children.forEach((d2) => {
                arr.push(d2);
            });
        }
    });
    const h = arr.length * 38 + 16;
    return h > 246 ? 246 : h;
};

const GOptionExtend = Vue.extend(G);

let vm = null; // 当前实例

const GroupOption = (options) => {
    const { tag, propsData } = options;
    const dom = document.body;
    vm = new GOptionExtend({ propsData }); // 实例化
    vm = vm.$mount(); // 挂载

    vm.tag = tag;
    vm.dom = dom;

    dom.appendChild(vm.$el); // 插入dom

    return vm;
};

GroupOption.remove = RemoveDom;
GroupOption.resetPosition = (vDom) => {
    const data = vDom.data || [];
    const width = GroupOption.getWidth(data);
    const { X, Y, P } = CalcTargetPosition(vDom.tag, vDom.dom, CountLen(data), width);
    vDom.position = P;
    // 设置位置
    vDom.$el.style.top = `${Y}px`;
    vDom.$el.style.left = `${X}px`;
};

// 获取宽度
GroupOption.getWidth = (data) => {
    const { body } = document;
    const tag = document.createElement('div');
    tag.className = 'p-drop-group-box';
    tag.style.padding = '0';
    tag.style.border = '0';
    tag.style.height = '0';
    tag.style.zIndex = '-100';
    let html = '';
    data.forEach((d) => {
        html += `${'<div>'
            + '<section class="p-drop-item-title">'}${d.name}</section>`;
        if (d.children && d.children.length) {
            d.children.forEach((d2) => {
                html += `<article class="p-drop-group-option">${d2.name}</article>`;
            });
        }

        html += '</div>';
    });

    tag.innerHTML = html;
    body.appendChild(tag);
    const { width } = tag.getBoundingClientRect();
    body.removeChild(tag);
    return width;
};

export default GroupOption;
