import Vue from 'vue';

import CalcTargetPosition from '../../static/utils/CalcTargetPosition';
import RemoveDom from '../../static/utils/RemoveDom';

import TD from './TimeDrop';

const TimeDropExtend = Vue.extend(TD);

let vm = null; // 当前实例

const TimeDrop = (options) => {
    const {
        tag, data, propsData, methods
    } = options;
    const { range } = propsData;
    const dom = document.body;

    const { X, Y, P } = CalcTargetPosition(tag, dom, 372, range ? 626 : 330);
    data.position = P;
    vm = new TimeDropExtend({ data, propsData, methods }); // 实例化

    vm = vm.$mount(); // 挂载

    vm.tag = tag;
    vm.dom = dom;
    vm.range = range;

    // 设置位置
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;

    dom.appendChild(vm.$el); // 插入dom

    return vm;
};

TimeDrop.remove = RemoveDom;

TimeDrop.resetPosition = (vm) => {
    const { tag, dom, range } = vm;
    const { X, Y, P } = CalcTargetPosition(tag, dom, 372, range ? 626 : 330);
    vm.position = P;
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;
};

export default TimeDrop;
