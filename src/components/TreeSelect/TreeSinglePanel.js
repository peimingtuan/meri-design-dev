import Vue from 'vue';
import Option from './depend/TreeSinglePanel';
import RemoveDom from '../static/utils/RemoveDom';
import CalcTargetPosition from '../static/utils/CalcTargetPosition';

const TreeSinglePanelExtend = Vue.extend(Option);

let TreeSinglePanelVm = null;
const TreeSinglePanel = (options) => {
    const { tag, params } = options;
    const { width } = tag.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
    const dom = document.body;
    const { X, Y, P } = CalcTargetPosition(tag, dom, params.height, width);

    params.position = P;
    TreeSinglePanelVm = new TreeSinglePanelExtend({
        data: params
    }).$mount(); // 实例化并挂载
    TreeSinglePanelVm.tag = tag;
    TreeSinglePanelVm.dom = dom;
    // 设置位置
    TreeSinglePanelVm.$el.style.top = `${Y}px`;
    TreeSinglePanelVm.$el.style.left = `${X}px`;

    dom.appendChild(TreeSinglePanelVm.$el); // 插入dom
    return TreeSinglePanelVm;
};
TreeSinglePanel.renderPosition = (vm) => {
    const { X, Y, P } = CalcTargetPosition(vm.tag, vm.dom, vm.height, vm.width);
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;
    vm.position = P;
};
TreeSinglePanel.remove = RemoveDom;

export default TreeSinglePanel;
