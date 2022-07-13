import Vue from 'vue';
import Option from './depend/AreaSelect';
import RemoveDom from '../static/utils/RemoveDom';
import CalcTargetPosition from '../static/utils/CalcTargetPosition';

const AreaSelectExtend = Vue.extend(Option);

let AreaSelectVm = null;
const AreaSelectInit = (options) => {
    const { tag, params } = options;
    const dom = document.body;
    const { X, Y, P } = CalcTargetPosition(tag, dom, params.height, params.width * 2);

    params.position = P;
    AreaSelectVm = new AreaSelectExtend({
        data: params
    }).$mount(); // 实例化并挂载
    AreaSelectVm.tag = tag;
    AreaSelectVm.dom = dom;
    // 设置位置
    AreaSelectVm.$el.style.top = `${Y}px`;
    AreaSelectVm.$el.style.left = `${X}px`;

    dom.appendChild(AreaSelectVm.$el); // 插入dom
    return AreaSelectVm;
};
AreaSelectInit.renderPosition = (vm) => {
    const { X, Y, P } = CalcTargetPosition(vm.tag, vm.dom, vm.height, vm.width * 2);
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;
    vm.position = P;
};
AreaSelectInit.remove = (vm) => {
    RemoveDom(vm);
};


export default AreaSelectInit;
