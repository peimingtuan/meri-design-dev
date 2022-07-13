import Vue from 'vue';

import DropSelectVue from './DropSelect.vue';

import CalcTargetPosition from '../../static/utils/CalcTargetPosition';
import RemoveDom from '../../static/utils/RemoveDom';

const DropSelectExtend = Vue.extend(DropSelectVue);
let VM = null;

const DropSelect = (options) => {
    const { tag, propsData } = options,
        dom = document.body;
    VM = new DropSelectExtend({ propsData }); // 实例化
    VM = VM.$mount(); // 挂载

    // const { top, left } = tag.getBoundingClientRect();
    // VM.top = top;
    // VM.left = left;
    VM.tag = tag;
    VM.dom = dom;

    dom.appendChild(VM.$el); // 插入dom

    return VM;
};

DropSelect.resetPosition = (vm) => {
    const { width, height } = vm,
        { X, Y, P } = CalcTargetPosition(vm.tag, vm.dom, height, width);
    vm.position = P;
    // 设置位置
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;
    // vm.dropShow = true;
};
DropSelect.remove = RemoveDom;

export default DropSelect;
