import Vue from 'vue';

import CalcTargetPosition from '../../static/utils/CalcTargetPosition';
import RemoveDom from '../../static/utils/RemoveDom';

import TD2400 from './TimeDrop';

const TimeDropExtend2400 = Vue.extend(TD2400);

let vm2400 = null; // 当前实例

const TimeDrop2400 = (options) => {
    const {
        tag, data, propsData, methods
    } = options;
    const { range } = propsData;
    const dom = document.body;

    const { X, Y, P } = CalcTargetPosition(tag, dom, 372, range ? 626 : 330);
    data.position = P;
    vm2400 = new TimeDropExtend2400({ data, propsData, methods }); // 实例化

    vm2400 = vm2400.$mount(); // 挂载

    vm2400.tag = tag;
    vm2400.dom = dom;
    vm2400.range = range;

    // 设置位置
    vm2400.$el.style.top = `${Y}px`;
    vm2400.$el.style.left = `${X}px`;

    dom.appendChild(vm2400.$el); // 插入dom

    return vm2400;
};

TimeDrop2400.remove = RemoveDom;

TimeDrop2400.resetPosition = (vm) => {
    const { tag, dom, range } = vm;
    const { X, Y, P } = CalcTargetPosition(tag, dom, 372, range ? 626 : 330);
    vm.position = P;
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;
};

export default TimeDrop2400;
