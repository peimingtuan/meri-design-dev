import Vue from 'vue';
import LoadingTemp from './Loading';

const LoadingObj = Vue.extend(LoadingTemp);

let loadingVm = null,
    seed = 0;

const Loading = (options = { type: 'global' }) => {
    let dom;
    /**
     * type 取值【global-全局、local-局部】
     * dom 是局部loading挂载的dom
     * */
    if (options && options.type === 'local') {
        const { el } = options;
        const { position } = window.getComputedStyle(el);
        if (position === 'static' || !position) el.style.position = 'relative';
        dom = el;
    } else {
        dom = document.body;
    }
    loadingVm = new LoadingObj({ propsData: options });
    loadingVm.id = `${options.type}-${seed++}`;
    loadingVm = loadingVm.$mount();
    dom.appendChild(loadingVm.$el);

    return loadingVm;
};

['global', 'local'].forEach(type => {
    const obj = { type };
    Loading[type] = options => Loading({ ...options, ...obj });
});

Loading.close = (vm) => {
    if (!vm) return;
    if (vm._isDestroyed) return;
    vm.$destroy();
    const dom = vm.$el;
    if (dom) dom.parentNode.removeChild(dom);
};

export default Loading;
