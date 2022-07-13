import Vue from 'vue';
import CalcTargetPosition from '../../static/utils/CalcTargetPosition';
import RemoveDom from '../../static/utils/RemoveDom';

import DropCascade from './DropCascade';

const CascadeBox = (options) => {
    const { tag, propsData } = options;
    const dom = document.body;
    const DSExtend = Vue.extend(DropCascade);
    let vm = new DSExtend({ propsData });
    vm = vm.$mount(); // 挂载

    vm.tag = tag;
    vm.dom = dom;

    dom.appendChild(vm.$el); // 插入dom

    return vm;
};

CascadeBox.remove = RemoveDom;
CascadeBox.resetPosition = vm => {
    const {
        width, alignRight = false, data
    } = vm;
    const w = data.filter(d => (d.data && d.data.length)).length * width;

    const height = 192;
    const { X, Y, P } = CalcTargetPosition(vm.tag.$el, vm.dom, height, w, alignRight);
    vm.position = P;
    // 设置位置
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;
    vm.dropShow = true;
};

export default CascadeBox;
