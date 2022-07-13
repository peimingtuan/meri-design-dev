import Vue from 'vue';
import RemoveDom from '../../static/utils/RemoveDom';

import HSV from './HeaderSetting';

const HSExtend = Vue.extend(HSV);

let vm = null;

const HSDrop = (options) => {
    const { tag, propsData } = options,
        dom = document.body;
    vm = new HSExtend({ propsData }); // 实例化
    vm = vm.$mount(); // 挂载

    vm.tag = tag;
    vm.dom = dom;

    dom.appendChild(vm.$el); // 插入dom

    return vm;
};

HSDrop.remove = RemoveDom;
HSDrop.resetPosition = vm => {
    const { left, top } = vm.tag.getBoundingClientRect(),
        { innerHeight, pageXOffset, pageYOffset } = window,
        btm = innerHeight - top - 40, // 设置按钮距离底部高度
        tp = top + 40; // 默认距离顶部位置
    // 设置位置
    let topPlace, // 设置-下拉弹窗距离顶部距离
        position = false; // 弹出方向 - true向上弹窗
    if (btm < 480) {
        if (top >= 480) {
            topPlace = tp - 520;
            position = true;
        } else {
            topPlace = tp - (480 - btm);
        }
    } else {
        topPlace = tp;
    }
    vm.$el.style.top = `${topPlace + pageYOffset}px`;
    vm.$el.style.left = `${(left - 191) + pageXOffset}px`;
    vm.settingStatus = true;
    vm.position = position;
};

export default HSDrop;
