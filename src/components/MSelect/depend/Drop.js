import Vue from 'vue';

import CalcTargetPosition from '../../static/utils/CalcTargetPosition';
import RemoveDom from '../../static/utils/RemoveDom';

import DB from './DropBox';

const DBOptionExtend = Vue.extend(DB);

let vm = null; // 当前实例

const DropBox = (options) => {
    const { tag, propsData } = options;
    const dom = document.body;
    vm = new DBOptionExtend({ propsData }); // 实例化
    vm = vm.$mount(); // 挂载

    vm.tag = tag;
    vm.dom = dom;

    dom.appendChild(vm.$el); // 插入dom

    return vm;
};

DropBox.remove = RemoveDom;
DropBox.resetPosition = vm => {
    const {
        data = [], width, alignRight = false
    } = vm;

    const h = data.length * 38 + 16;
    let height;
    if (h < 208) height = h;
    else height = 208;
    const { X, Y, P } = CalcTargetPosition(vm.tag, vm.dom, height, width, alignRight);
    vm.position = P;
    // 设置位置
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;
    vm.dropShow = true;
};

export default DropBox;
