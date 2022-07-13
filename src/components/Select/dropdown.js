import Vue from 'vue';
import O from './Drop';
import CalcTargetPosition from '../static/utils/CalcTargetPosition';

const OptionsExtend = Vue.extend(O); // 继承Vue

let OptionsVm = null, // 当前实例
    domHeight = null,
    domWidth = null;

/**
 * @param options
 * tag 基于当前点击的dom对象或点击的根对象
 * params 动态组件相关数据
 */
function calcHeightByData(props) {
    const { data = [], multiple, maxCount = 5 } = props,
        len = data.length;
    if (!len) return;
    let H,
        totalH;
    const item = data[0],
        addNum = data.filter(item => item.divider);
    if (item.src && item.sub) { // 有图片 有副标题
        H = 56;
    } else if (item.src && !item.sub) { // 有图片 没有副标题
        H = 52;
    } else if (item.label || (!item.sub && !item.src && !item.label)) { // 有标签
        H = 40;
    } else if (item.sub && !item.src && !item.label) { // 有副标题  没有图片 没有标签
        H = 58;
    } else {
        H = 38;
    }
    const maxHeight = maxCount * H + 16; // 最大高度
    totalH = H * len + addNum.length + 16;
    if (totalH > maxHeight) totalH = maxHeight;
    if (multiple) totalH = totalH + 46;

    if (!len) totalH = 56;
    return { height: totalH + 2, maxHeight };
}

const Options = (options) => {
    const { tag, data, props } = options;
    let { width } = tag.getBoundingClientRect(); // 根据当前点击的dom对象获取位置
    // 判断最大最小宽度
    if (width <= 180) {
        width = 180;
    }
    if (width > 600) {
        width = 600;
    }
    const { height, maxHeight } = calcHeightByData(props);
    domHeight = height;
    domWidth = width;

    const dom = document.body;
    const { X, Y, P } = CalcTargetPosition(tag, dom, domHeight, width);
    props.width = width;
    OptionsVm = new OptionsExtend({
        data,
        propsData: props
    }); // 实例化
    OptionsVm = OptionsVm.$mount(); // 挂载
    OptionsVm.position = P;

    // 设置位置
    OptionsVm.$el.style.top = `${Y}px`;
    OptionsVm.$el.style.left = `${X}px`;
    OptionsVm.$el.style.width = `${width}px`;
    OptionsVm.$el.style.zIndex = data.zIndex;
    OptionsVm.$refs.optionMenu.style.maxHeight = `${maxHeight}px`;
    dom.appendChild(OptionsVm.$el); // 插入dom
    return OptionsVm;
};

Options.remove = (vm) => {
    if (!vm || vm._isDestroyed) return;
    vm.$destroy();
    const dom = vm.$el;
    if (dom) dom.parentNode.removeChild(dom);
};
Options.resetPos = (vm, tag, dom, props) => {
    const { height, maxHeight } = calcHeightByData(props);
    const { X, Y, P } = CalcTargetPosition(tag, dom, height, domWidth);
    vm.position = P;
    vm.$el.style.top = `${Y}px`;
    vm.$el.style.left = `${X}px`;
    vm.$refs.optionMenu.style.maxHeight = `${maxHeight}px`;
};

export default Options;
