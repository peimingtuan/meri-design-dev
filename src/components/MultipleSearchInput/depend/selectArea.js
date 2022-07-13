import Vue from 'vue';
import Option from './selectArea.vue';
import RemoveDom from '../../static/utils/RemoveDom';
import CalcTargetPosition from '../../static/utils/CalcTargetPosition';

const selectAreaExtend = Vue.extend(Option);

let selectAreaVm = null;
const selectAreaInit = (options) => {
    const { tag, params } = options;
    const dom = document.body;
    const { X, Y, P } = CalcTargetPosition(tag, dom, params.height, params.width * 2);

    params.position = P;
    selectAreaVm = new selectAreaExtend({
        data: params
    }).$mount(); // 实例化并挂载
    selectAreaVm.tag = tag;
    selectAreaVm.dom = dom;
    // 设置位置
    selectAreaVm.$el.style.top = `${Y}px`;
    selectAreaVm.$el.style.left = `${X}px`;

    dom.appendChild(selectAreaVm.$el); // 插入dom
    return selectAreaVm;
};
selectAreaInit.renderPosition = (vm) => {
    const { X, Y, P } = CalcTargetPosition(vm.tag, vm.dom, vm.height, vm.width * 2);
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;
    vm.position = P;
};
selectAreaInit.remove = (vm) => {
    RemoveDom(vm);
};


export default selectAreaInit;
