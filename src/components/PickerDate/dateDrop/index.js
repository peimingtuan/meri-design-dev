import Vue from 'vue';

import CalcTargetPosition from '../../static/utils/CalcTargetPosition';
import RemoveDom from '../../static/utils/RemoveDom';

import DD from './DateDrop';

const DateDropExtend = Vue.extend(DD);

let vm = null; // 当前实例

const DateDrop = (options) => {
    const {
        tag, data, propsData, methods
    } = options;
    const { switchStatus } = data;
    const dom = document.body;

    const { X, Y, P } = CalcTargetPosition(tag, dom, 404, switchStatus ? 626 : 330);
    data.position = P;
    vm = new DateDropExtend({ data, propsData, methods }); // 实例化

    vm = vm.$mount(); // 挂载

    vm.tag = tag;
    vm.dom = dom;
    vm.switchStatus = switchStatus;

    // 设置位置
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;

    dom.appendChild(vm.$el); // 插入dom

    return vm;
};

DateDrop.remove = RemoveDom;

DateDrop.resetPosition = (vm) => {
    const { tag, dom, switchStatus } = vm;
    const { X, Y, P } = CalcTargetPosition(tag, dom, 404, switchStatus ? 626 : 330);
    vm.position = P;
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;
};

export default DateDrop;
