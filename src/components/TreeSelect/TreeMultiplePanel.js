import Vue from 'vue';
import Option from './depend/TreeMultiplePanel';
import RemoveDom from '../static/utils/RemoveDom';
import CalcTargetPosition from '../static/utils/CalcTargetPosition';

const TreeMultiplePanelExtend = Vue.extend(Option);

let TreeMultiplePanelVm = null;
const TreeMultiplePanelInit = (options) => {
    const { tag, params } = options;
    const { width } = tag.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
    const dom = document.body;
    const { X, Y, P } = CalcTargetPosition(tag, dom, params.height, width);
    params.position = P;
    TreeMultiplePanelVm = new TreeMultiplePanelExtend({
        data: params
    }).$mount(); // 实例化并挂载
    TreeMultiplePanelVm.tag = tag;
    TreeMultiplePanelVm.dom = dom;
    // 设置位置
    TreeMultiplePanelVm.$el.style.top = `${Y}px`;
    TreeMultiplePanelVm.$el.style.left = `${X}px`;

    dom.appendChild(TreeMultiplePanelVm.$el); // 插入dom
    return TreeMultiplePanelVm;
};
TreeMultiplePanelInit.renderPosition = (vm) => {
    const { X, Y, P } = CalcTargetPosition(vm.tag, vm.dom, vm.height, vm.width);
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;
    vm.position = P;
};
TreeMultiplePanelInit.remove = (vm) => {
    RemoveDom(vm);
};

export default TreeMultiplePanelInit;
